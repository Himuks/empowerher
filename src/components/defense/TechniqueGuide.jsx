import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield,
  Target,
  AlertTriangle,
  CheckCircle,
  Star,
  ArrowRight,
  Hand,
  Eye,
  PlayCircle,
  Pause
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Slider } from '../ui/slider'
import { Badge } from '../ui/badge'
import { mockEntityOperations, updateUserStats, logActivity } from '../../lib/utils'
import { defenseTechniques } from '../../lib/mockData'

const TechniqueGuide = ({
  standalone = false,
  lessonId = "",
  lessonTitle = "",
  onComplete = () => { },
  onBack = () => { }
}) => {
  const [currentTechnique, setCurrentTechnique] = useState(0)
  const [confidence, setConfidence] = useState([3])
  const [completed, setCompleted] = useState(false)
  const [isPlayingMockVideo, setIsPlayingMockVideo] = useState(false)

  const techniques = lessonId && defenseTechniques[lessonId]
    ? defenseTechniques[lessonId]
    : defenseTechniques.basic_techniques

  const handleComplete = async () => {
    setCompleted(true)

    if (!standalone && lessonId) {
      // Save partial progress
      await mockEntityOperations.upsert(
        'TrainingProgress',
        (p) => p.module_type === 'self_defense' && p.lesson_id === lessonId,
        {
          module_type: 'self_defense',
          lesson_id: lessonId,
          lesson_title: lessonTitle,
          completion_percentage: Math.round(((currentTechnique + 1) / techniques.length) * 100),
          points_earned: 10,
          confidence_level: confidence[0],
          last_accessed: new Date().toISOString()
        }
      )
    }
  }

  const handleNextTechnique = () => {
    if (currentTechnique < techniques.length - 1) {
      setCurrentTechnique(currentTechnique + 1)
      setConfidence([3])
      setCompleted(false)
      setIsPlayingMockVideo(false)
    }
  }

  const handleLessonComplete = async () => {
    if (!standalone && lessonId) {
      const pointsEarned = 20 + (confidence[0] * 4)

      await mockEntityOperations.upsert(
        'TrainingProgress',
        (p) => p.module_type === 'self_defense' && p.lesson_id === lessonId,
        {
          module_type: 'self_defense',
          lesson_id: lessonId,
          lesson_title: lessonTitle,
          completion_percentage: 100,
          points_earned: pointsEarned,
          confidence_level: confidence[0],
          last_accessed: new Date().toISOString()
        }
      )

      await updateUserStats(pointsEarned)
      await logActivity({
        module_type: 'self_defense',
        title: lessonTitle,
        type: 'lesson',
        points: pointsEarned,
        status: 'completed'
      })
    }
    onComplete({ lessonComplete: true })
  }

  if (standalone) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200/50 shadow-lg overflow-hidden relative group">
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-emerald-400/20 blur-3xl rounded-full transition-transform group-hover:scale-150 duration-700"></div>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              <span className="font-bold text-gray-900">Quick Defense Reference</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <p className="text-gray-700 font-medium">Essential self-defense techniques for emergency situations.</p>
            <div className="grid grid-cols-2 gap-3">
              {techniques.slice(0, 4).map((technique, index) => (
                <div key={index} className="px-4 py-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/80 shadow-sm hover:shadow-md transition-shadow cursor-default group/item">
                  <div className="font-bold text-sm text-gray-900 group-hover/item:text-emerald-700 transition-colors w-full line-clamp-1">{technique.name}</div>
                  <div className="text-xs font-medium text-gray-500 mt-1 line-clamp-1">{technique.whenToUse}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  const technique = techniques[currentTechnique]

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{lessonTitle}</h2>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-gray-500 font-medium">Technique {currentTechnique + 1} of {techniques.length}</span>
            <div className="flex space-x-1 ml-2">
              {techniques.map((_, idx) => (
                <div key={idx} className={`h-1.5 rounded-full ${idx === currentTechnique ? 'w-6 bg-emerald-500' : idx < currentTechnique ? 'w-3 bg-emerald-300' : 'w-3 bg-gray-200'} transition-all duration-300`}></div>
              ))}
            </div>
          </div>
        </div>
        <Badge className="bg-emerald-100 text-emerald-800 self-start px-3 py-1 font-bold tracking-widest uppercase shadow-sm" variant="outline">Self Defense</Badge>
      </motion.div>

      {/* Technique Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTechnique}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-emerald-100 shadow-xl overflow-hidden bg-white/90 backdrop-blur-sm">

            {/* Mock Video Player Area */}
            <div className="w-full aspect-video bg-gradient-to-br from-gray-900 to-slate-800 relative group flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
              {isPlayingMockVideo ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-x-0 bottom-0 h-1 bg-gray-700">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                    className="h-full bg-emerald-500"
                  />
                </motion.div>
              ) : null}

              <div className="relative z-10 flex flex-col items-center text-center p-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlayingMockVideo(!isPlayingMockVideo)}
                  className={`w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${isPlayingMockVideo ? 'bg-white/10 text-white/50 border border-white/20' : 'bg-emerald-500/80 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)] border border-emerald-400'}`}
                >
                  {isPlayingMockVideo ? <Pause className="w-8 h-8 ml-0.5" /> : <PlayCircle className="w-10 h-10 ml-1" />}
                </motion.button>
                {!isPlayingMockVideo && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-4">
                    <h3 className="text-white font-bold text-xl drop-shadow-md">{technique.name}</h3>
                    <p className="text-gray-300 text-sm font-medium mt-1">Tap to see demonstration</p>
                  </motion.div>
                )}
                {isPlayingMockVideo && (
                  <div className="absolute top-4 right-4 text-white/70 flex items-center space-x-2 text-xs font-bold uppercase tracking-wider bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span>Live Demo</span>
                  </div>
                )}
              </div>
            </div>

            <CardHeader className="bg-white border-b border-gray-100">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <Hand className="w-7 h-7 text-emerald-600" />
                <span className="font-extrabold text-gray-900 tracking-tight">{technique.name}</span>
                {technique.difficulty && (
                  <Badge className="ml-3 bg-emerald-50/80 text-emerald-700 border-emerald-200 text-xs font-bold uppercase tracking-wider px-3" variant="outline">{technique.difficulty}</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">

              <div className="grid grid-cols-1 md:grid-cols-3">
                {/* Left Column: Instructions */}
                <div className="md:col-span-2 p-6 md:p-8 md:border-r border-gray-100 space-y-8 bg-white">
                  {/* Description */}
                  <p className="text-lg text-gray-700 leading-relaxed font-medium">{technique.description}</p>

                  {/* Step-by-Step Instructions */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-5 flex items-center space-x-2 text-xl tracking-tight">
                      <Target className="w-6 h-6 text-emerald-600" />
                      <span>Execution Steps</span>
                    </h4>
                    <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-[19px] before:w-0.5 before:bg-gradient-to-b before:from-emerald-200 before:to-transparent">
                      {technique.steps.map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                          className="flex items-start space-x-6 relative group"
                        >
                          <div className="w-10 h-10 rounded-full bg-white border-4 border-emerald-500 text-emerald-700 font-black flex items-center justify-center flex-shrink-0 relative z-10 shadow-sm transition-transform group-hover:scale-110">
                            {index + 1}
                          </div>
                          <div className="flex-1 bg-gray-50/80 hover:bg-emerald-50/50 transition-colors rounded-xl p-4 border border-gray-100 group-hover:border-emerald-100">
                            <p className="text-gray-800 font-medium leading-relaxed">{step}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Tips & Safety */}
                <div className="p-6 md:p-8 bg-gray-50/50 space-y-6">

                  {/* Safety Warning */}
                  <div className="p-5 bg-red-50/80 rounded-2xl border border-red-100 shadow-sm relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 text-red-100 opacity-50 transform rotate-12 pointer-events-none">
                      <AlertTriangle className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center space-x-2 text-red-800 mb-2">
                        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                        <span className="font-black uppercase tracking-wider text-sm">Critical Rule</span>
                      </div>
                      <div className="text-red-700 text-sm font-medium leading-relaxed">{technique.safetyNote}</div>
                    </div>
                  </div>

                  {/* When to Use */}
                  <div className="p-5 bg-blue-50/80 rounded-2xl border border-blue-100 shadow-sm">
                    <div className="flex items-center space-x-2 text-blue-800 mb-2">
                      <Eye className="w-5 h-5 flex-shrink-0" />
                      <span className="font-black uppercase tracking-wider text-sm">When to Use</span>
                    </div>
                    <div className="text-blue-700 text-sm font-medium leading-relaxed">{technique.whenToUse}</div>
                  </div>

                  {/* Practice Tips */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-xs">Pro Tips</h4>
                    <div className="space-y-3">
                      {technique.tips.map((tip, index) => (
                        <div key={index} className="flex items-start space-x-3 text-sm text-gray-600 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                          <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="font-medium">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Confidence Rating & Footer Area */}
              <div className="border-t border-gray-100 bg-white p-6 md:p-8">
                <div className="max-w-xl mx-auto mb-8">
                  <label className="block text-center font-bold text-gray-900 mb-6 text-lg tracking-tight">
                    How confident are you with this technique?
                  </label>
                  <div className="px-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <Slider value={confidence} onValueChange={setConfidence} max={5} min={1} step={1} className="w-full" />
                    <div className="flex justify-between text-xs font-bold text-gray-400 mt-4 uppercase tracking-wider">
                      <span>Needs Work</span>
                      <span>Mastered</span>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-8 h-8 transition-colors duration-300 ${i < confidence[0] ? 'text-amber-400 fill-amber-400 drop-shadow-sm' : 'text-gray-200'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <Button variant="ghost" onClick={onBack} className="text-gray-500 font-bold hover:text-gray-900 w-full sm:w-auto">Cancel Lesson</Button>
                  <div className="w-full sm:w-auto flex items-center justify-end">
                    {!completed ? (
                      <Button size="lg" onClick={handleComplete} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-600/20 text-md px-8">
                        <CheckCircle className="w-5 h-5 mr-2" /> Mark Technique Completed
                      </Button>
                    ) : (
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        <div className="flex items-center justify-center space-x-2 text-emerald-700 bg-emerald-50 px-6 py-3 rounded-xl border border-emerald-200 font-bold w-full sm:w-auto">
                          <CheckCircle className="w-6 h-6" />
                          <span>Technique Logged!</span>
                        </div>
                        {currentTechnique < techniques.length - 1 ? (
                          <Button size="lg" onClick={handleNextTechnique} className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold shadow-lg shadow-emerald-500/30">
                            Next Technique <ArrowRight className="w-5 h-5 ml-2" />
                          </Button>
                        ) : (
                          <Button size="lg" onClick={handleLessonComplete} className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold shadow-lg shadow-emerald-500/30">
                            Complete Full Lesson <Star className="w-5 h-5 ml-2 fill-current" />
                          </Button>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default TechniqueGuide
