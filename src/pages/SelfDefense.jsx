import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Shield,
  Play,
  Clock,
  Star,
  CheckCircle,
  AlertTriangle,
  Target
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Progress } from '../components/ui/progress'
import { Badge } from '../components/ui/badge'
import TechniqueGuide from '../components/defense/TechniqueGuide'
import SafetyTips from '../components/defense/SafetyTips'
import { mockLessons } from '../lib/mockData'
import { mockEntityOperations, getModulePoints } from '../lib/utils'

const SelfDefense = () => {
  const [lessons, setLessons] = useState([])
  const [moduleProgress, setModuleProgress] = useState(0)
  const [modulePoints, setModulePoints] = useState(0)
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [showTechnique, setShowTechnique] = useState(false)

  const loadProgress = useCallback(async () => {
    const baseLessons = mockLessons.self_defense || []
    const trainingProgress = await mockEntityOperations.list('TrainingProgress')

    const enriched = baseLessons.map(lesson => {
      const saved = trainingProgress.find(
        p => p.module_type === 'self_defense' && p.lesson_id === lesson.id
      )
      return { ...lesson, progress: saved?.completion_percentage || 0 }
    })

    setLessons(enriched)
    if (enriched.length > 0) {
      const totalProgress = enriched.reduce((sum, l) => sum + (l.progress || 0), 0)
      setModuleProgress(Math.round(totalProgress / enriched.length))
    }
    const points = await getModulePoints('self_defense')
    setModulePoints(points)
  }, [])

  useEffect(() => { loadProgress() }, [loadProgress])

  const handleStartLesson = (lesson) => {
    setSelectedLesson(lesson)
    setShowTechnique(true)
  }

  const handleTechniqueComplete = () => {
    setShowTechnique(false)
    setSelectedLesson(null)
    loadProgress()
  }

  const handleBackToLessons = () => {
    setShowTechnique(false)
    setSelectedLesson(null)
    loadProgress()
  }

  if (showTechnique && selectedLesson) {
    return (
      <TechniqueGuide
        lessonId={selectedLesson.id}
        lessonTitle={selectedLesson.title}
        onComplete={handleTechniqueComplete}
        onBack={handleBackToLessons}
      />
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center space-x-4">
        <Link to="/"><Button variant="outline" size="icon" className="hover:bg-gray-100 hover:text-gray-900 transition-colors bg-white/50 backdrop-blur-sm shadow-sm"><ArrowLeft className="w-5 h-5" /></Button></Link>
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 transform rotate-3">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 tracking-tight">Self-Defense Training</h1>
            <p className="text-emerald-700/80 font-medium text-lg mt-0.5">Essential techniques to protect yourself</p>
          </div>
        </div>
      </motion.div>

      {/* Overview Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Progress Overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="md:col-span-8 h-full">
          <Card className="h-full bg-white/60 backdrop-blur-lg border-emerald-100 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <CardContent className="p-8 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="text-center sm:text-left bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                  <div className="text-4xl font-black text-emerald-600 mb-1 drop-shadow-sm">{moduleProgress}%</div>
                  <div className="text-sm font-bold text-emerald-800/60 uppercase tracking-widest">Mastery</div>
                </div>
                <div className="text-center sm:text-left bg-teal-50/50 p-4 rounded-2xl border border-teal-100">
                  <div className="text-4xl font-black text-teal-600 mb-1 drop-shadow-sm">
                    {lessons.filter(l => l.progress === 100).length}<span className="text-2xl text-teal-400">/{lessons.length}</span>
                  </div>
                  <div className="text-sm font-bold text-teal-800/60 uppercase tracking-widest">Completed</div>
                </div>
                <div className="text-center sm:text-left bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
                  <div className="text-4xl font-black text-amber-500 mb-1 drop-shadow-sm">{modulePoints}</div>
                  <div className="text-sm font-bold text-amber-800/60 uppercase tracking-widest">Points</div>
                </div>
              </div>
              <div className="">
                <div className="flex justify-between text-sm font-bold mb-3 uppercase tracking-wider">
                  <span className="text-gray-500">Overall Progress</span>
                  <span className="text-emerald-600">{moduleProgress}%</span>
                </div>
                <Progress value={moduleProgress} className="h-3 bg-emerald-100" indicatorClassName="bg-gradient-to-r from-emerald-500 to-teal-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Safety Disclaimer */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="md:col-span-4 h-full">
          <Card className="h-full border-red-200 bg-red-50/80 backdrop-blur-md shadow-lg overflow-hidden relative">
            <div className="absolute top-0 right-0 text-red-200/50 transform rotate-12 -mr-4 -mt-4 opacity-50">
              <AlertTriangle className="w-32 h-32" />
            </div>
            <CardContent className="p-6 relative z-10 flex flex-col h-full justify-center">
              <div className="flex items-start space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" />
                <h3 className="font-bold text-red-900 text-lg uppercase tracking-wider">Safety First</h3>
              </div>
              <p className="text-sm text-red-800/80 font-medium leading-relaxed">
                These techniques are for educational and emergency purposes only. Always prioritize escape and de-escalation over combat. Avoid using force unless absolutely necessary to ensure your safety.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Lessons Grid */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="flex items-center space-x-3 mb-6">
          <Target className="w-6 h-6 text-emerald-600" />
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Available Masterclasses</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {lessons.map((lesson, index) => (
            <motion.div key={lesson.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.1 }}>
              <Card className="h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white/70 backdrop-blur-lg border-emerald-100 overflow-hidden group border-2">

                {lesson.progress === 100 && (
                  <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-8 py-1 transform translate-x-[30%] translate-y-2 rotate-45 shadow-sm">
                    Mastered
                  </div>
                )}

                <CardHeader className={`p-6 pb-4 ${lesson.progress === 100 ? 'bg-emerald-50/50' : 'bg-white/40'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-6">
                      <CardTitle className="flex items-center space-x-3 mb-3 text-xl">
                        {lesson.progress === 100 ? (
                          <CheckCircle className="w-6 h-6 text-emerald-500 shadow-sm rounded-full bg-white" />
                        ) : lesson.progress > 0 ? (
                          <div className="relative flex items-center justify-center">
                            <Play className="w-4 h-4 text-emerald-600 relative z-10 ml-0.5" />
                            <div className="absolute inset-0 bg-emerald-100 rounded-full w-6 h-6 flex items-center justify-center animate-ping opacity-70"></div>
                            <div className="absolute inset-0 bg-emerald-200 rounded-full w-6 h-6 flex items-center justify-center shadow-inner"></div>
                          </div>
                        ) : (
                          <Shield className="w-6 h-6 text-gray-300" />
                        )}
                        <span className="font-extrabold text-gray-900 tracking-tight">{lesson.title}</span>
                      </CardTitle>
                      <p className="text-sm text-gray-600 font-medium leading-relaxed line-clamp-2">{lesson.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-2 space-y-6">
                  <div className="flex items-center space-x-6 text-xs font-bold text-gray-500 uppercase tracking-widest">
                    <div className="flex items-center space-x-1.5"><Clock className="w-4 h-4 text-emerald-500" /><span>{lesson.duration}</span></div>
                    <div className="flex items-center space-x-1.5"><Star className="w-4 h-4 text-emerald-500" /><span>{lesson.topics?.length || 0} techniques</span></div>
                  </div>

                  {lesson.topics && (
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {lesson.topics.map((topic, topicIndex) => (
                          <Badge key={topicIndex} className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-bold px-2 py-0.5 shadow-sm" variant="outline">{topic}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                      <span className="text-gray-500">Progress</span>
                      <span className="text-emerald-600">{lesson.progress || 0}%</span>
                    </div>
                    <Progress value={lesson.progress || 0} className="h-2 bg-gray-200" indicatorClassName="bg-gradient-to-r from-emerald-500 to-teal-500" />
                  </div>

                  <div className="pt-2">
                    <Button
                      className={`w-full text-md font-bold py-6 rounded-xl transition-all shadow-md group-hover:shadow-xl ${lesson.progress === 100
                          ? "bg-white text-emerald-700 border-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300"
                          : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                        }`}
                      onClick={() => handleStartLesson(lesson)}
                    >
                      {lesson.progress === 100 ? (<><Shield className="w-5 h-5 mr-3" />Review Masterclass</>) :
                        lesson.progress > 0 ? (<><Play className="w-5 h-5 mr-3 fill-current" />Resume Masterclass</>) :
                          (<><Play className="w-5 h-5 mr-3 fill-current" />Start Masterclass</>)}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Safety Tips Component Space */}
      <div className="pt-8">
        <SafetyTips />
      </div>
    </div>
  )
}

export default SelfDefense
