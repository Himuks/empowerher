import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Target, AlertTriangle, CheckCircle, Star, ArrowRight, Hand, Eye, PlayCircle, Pause } from 'lucide-react'
import { Slider } from '../ui/slider'
import { mockEntityOperations, updateUserStats, logActivity } from '../../lib/utils'
import { defenseTechniques } from '../../lib/mockData'

const TechniqueGuide = ({ standalone = false, lessonId = "", lessonTitle = "", onComplete = () => { }, onBack = () => { } }) => {
  const [currentTechnique, setCurrentTechnique] = useState(0)
  const [confidence, setConfidence] = useState([3])
  const [completed, setCompleted] = useState(false)
  const [isPlayingMockVideo, setIsPlayingMockVideo] = useState(false)

  const techniques = lessonId && defenseTechniques[lessonId] ? defenseTechniques[lessonId] : defenseTechniques.basic_techniques
  const technique = techniques[currentTechnique]

  const handleComplete = async () => {
    setCompleted(true)
    if (!standalone && lessonId) {
      await mockEntityOperations.upsert('TrainingProgress', (p) => p.module_type === 'self_defense' && p.lesson_id === lessonId,
        { module_type: 'self_defense', lesson_id: lessonId, lesson_title: lessonTitle, completion_percentage: Math.round(((currentTechnique + 1) / techniques.length) * 100), points_earned: 10, confidence_level: confidence[0], last_accessed: new Date().toISOString() })
    }
  }

  const handleNextTechnique = () => { if (currentTechnique < techniques.length - 1) { setCurrentTechnique(currentTechnique + 1); setConfidence([3]); setCompleted(false); setIsPlayingMockVideo(false) } }

  const handleLessonComplete = async () => {
    if (!standalone && lessonId) {
      const pts = 20 + (confidence[0] * 4)
      await mockEntityOperations.upsert('TrainingProgress', (p) => p.module_type === 'self_defense' && p.lesson_id === lessonId,
        { module_type: 'self_defense', lesson_id: lessonId, lesson_title: lessonTitle, completion_percentage: 100, points_earned: pts, confidence_level: confidence[0], last_accessed: new Date().toISOString() })
      await updateUserStats(pts)
      await logActivity({ module_type: 'self_defense', title: lessonTitle, type: 'lesson', points: pts, status: 'completed' })
    }
    onComplete({ lessonComplete: true })
  }

  if (standalone) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <div className="glass-card p-5 relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-3"><div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center"><Shield className="w-4 h-4 text-white" /></div><h3 className="font-display font-bold text-white text-sm">Quick Defense Reference</h3></div>
            <p className="text-xs text-slate-400 mb-3">Essential self-defense techniques for emergencies.</p>
            <div className="grid grid-cols-2 gap-2">
              {techniques.slice(0, 4).map((t, i) => (
                <div key={i} className="px-3 py-2 bg-slate-800/40 rounded-xl border border-white/[0.06]">
                  <div className="font-semibold text-xs text-white line-clamp-1">{t.name}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{t.whenToUse}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-5 pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">{lessonTitle}</h2>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-xs text-slate-400">Technique {currentTechnique + 1} of {techniques.length}</span>
            <div className="flex space-x-1 ml-2">
              {techniques.map((_, idx) => <div key={idx} className={`h-1.5 rounded-full ${idx === currentTechnique ? 'w-6 bg-emerald-500' : idx < currentTechnique ? 'w-3 bg-emerald-400/40' : 'w-3 bg-slate-700'} transition-all`} />)}
            </div>
          </div>
        </div>
        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-wider self-start">Self Defense</span>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div key={currentTechnique} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
          <div className="glass-card overflow-hidden">
            {/* Video Player */}
            <div className="w-full aspect-video bg-gradient-to-br from-slate-900 to-slate-800 relative flex items-center justify-center overflow-hidden">
              {isPlayingMockVideo && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-x-0 bottom-0 h-1 bg-slate-700">
                  <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 5, ease: "linear", repeat: Infinity }} className="h-full bg-emerald-500" />
                </motion.div>
              )}
              <div className="relative z-10 flex flex-col items-center text-center p-6">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setIsPlayingMockVideo(!isPlayingMockVideo)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${isPlayingMockVideo ? 'bg-white/10 text-white/50 border border-white/20' : 'bg-emerald-500/80 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)] border border-emerald-400'}`}>
                  {isPlayingMockVideo ? <Pause className="w-6 h-6" /> : <PlayCircle className="w-8 h-8 ml-0.5" />}
                </motion.button>
                {!isPlayingMockVideo && <div className="mt-3"><h3 className="text-white font-bold text-lg">{technique.name}</h3><p className="text-slate-400 text-xs mt-0.5">Tap to see demonstration</p></div>}
                {isPlayingMockVideo && <div className="absolute top-3 right-3 text-white/70 text-[10px] font-bold uppercase tracking-wider bg-black/40 px-2.5 py-1 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block mr-1" />Live Demo</div>}
              </div>
            </div>

            {/* Technique Header */}
            <div className="p-5 border-b border-white/[0.06]">
              <div className="flex items-center space-x-3">
                <Hand className="w-6 h-6 text-emerald-400" />
                <h3 className="font-display font-bold text-white text-xl">{technique.name}</h3>
                {technique.difficulty && <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase">{technique.difficulty}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Left: Instructions */}
              <div className="md:col-span-2 p-5 md:border-r border-white/[0.06] space-y-5">
                <p className="text-sm text-slate-300 leading-relaxed">{technique.description}</p>
                <div>
                  <h4 className="font-bold text-white mb-3 flex items-center space-x-2"><Target className="w-5 h-5 text-emerald-400" /><span>Execution Steps</span></h4>
                  <div className="space-y-3">
                    {technique.steps.map((step, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.08 }} className="flex items-start space-x-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 font-bold flex items-center justify-center flex-shrink-0 text-sm">{i + 1}</div>
                        <div className="flex-1 bg-slate-800/30 rounded-xl p-3 border border-white/[0.04]"><p className="text-sm text-slate-200">{step}</p></div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Tips */}
              <div className="p-5 space-y-4">
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 text-red-500/10"><AlertTriangle className="w-24 h-24" /></div>
                  <div className="relative z-10">
                    <div className="flex items-center space-x-1.5 text-red-400 text-[10px] font-bold uppercase tracking-wider mb-1.5"><AlertTriangle className="w-3.5 h-3.5" /><span>Critical Rule</span></div>
                    <p className="text-xs text-red-300/80">{technique.safetyNote}</p>
                  </div>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <div className="flex items-center space-x-1.5 text-blue-400 text-[10px] font-bold uppercase tracking-wider mb-1.5"><Eye className="w-3.5 h-3.5" /><span>When to Use</span></div>
                  <p className="text-xs text-blue-300/80">{technique.whenToUse}</p>
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">Pro Tips</h4>
                  <div className="space-y-2">
                    {technique.tips.map((tip, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-slate-300 bg-slate-800/30 p-2.5 rounded-lg border border-white/[0.04]">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" /><span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Confidence & Actions */}
            <div className="border-t border-white/[0.06] p-5">
              <div className="max-w-md mx-auto mb-6">
                <label className="block text-center text-sm font-medium text-slate-300 mb-4">How confident are you with this technique?</label>
                <div className="bg-slate-800/30 p-4 rounded-xl border border-white/[0.06]">
                  <Slider value={confidence} onValueChange={setConfidence} max={5} min={1} step={1} className="w-full" />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-2 uppercase tracking-wider"><span>Needs Work</span><span>Mastered</span></div>
                  <div className="flex items-center justify-center mt-3">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`w-7 h-7 transition-colors ${i < confidence[0] ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />)}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <button onClick={onBack} className="text-sm text-slate-400 hover:text-white">Cancel Lesson</button>
                <div className="flex items-center space-x-3">
                  {!completed ? (
                    <button onClick={handleComplete} className="text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-600/20"><CheckCircle className="w-4 h-4 mr-1.5 inline" />Mark Completed</button>
                  ) : (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-3">
                      <div className="flex items-center space-x-1.5 text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20 text-xs font-bold"><CheckCircle className="w-4 h-4" /><span>Logged!</span></div>
                      {currentTechnique < techniques.length - 1 ? (
                        <button onClick={handleNextTechnique} className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-2.5 rounded-xl shadow-lg">Next <ArrowRight className="w-4 h-4 ml-1 inline" /></button>
                      ) : (
                        <button onClick={handleLessonComplete} className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-2.5 rounded-xl shadow-lg">Finish <Star className="w-4 h-4 ml-1 inline fill-current" /></button>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default TechniqueGuide
