import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Shield, Play, Clock, Star, CheckCircle, Zap, AlertTriangle
} from 'lucide-react'
import { Badge } from '../components/ui/badge'
import TechniqueGuide from '../components/defense/TechniqueGuide'
import { mockLessons } from '../lib/mockData'
import { mockEntityOperations, getModulePoints } from '../lib/utils'

const SelfDefense = () => {
  const [lessons, setLessons] = useState([])
  const [moduleProgress, setModuleProgress] = useState(0)
  const [modulePoints, setModulePoints] = useState(0)
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [showGuide, setShowGuide] = useState(false)

  const loadProgress = useCallback(async () => {
    const baseLessons = mockLessons.self_defense || []
    const trainingProgress = await mockEntityOperations.list('TrainingProgress')
    const enriched = baseLessons.map(lesson => {
      const saved = trainingProgress.find(p => p.module_type === 'self_defense' && p.lesson_id === lesson.id)
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

  const handleStartLesson = (lesson) => { setSelectedLesson(lesson); setShowGuide(true) }
  const handleComplete = () => { setShowGuide(false); setSelectedLesson(null); loadProgress() }
  const handleBack = () => { setShowGuide(false); setSelectedLesson(null); loadProgress() }

  if (showGuide && selectedLesson) {
    return <TechniqueGuide lessonId={selectedLesson.id} lessonTitle={selectedLesson.title} onComplete={handleComplete} onBack={handleBack} />
  }

  const circumference = 2 * Math.PI * 42

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center space-x-4">
        <Link to="/"><button className="p-2 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 transition-colors"><ArrowLeft className="w-4 h-4" /></button></Link>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-white">Self Defense</h1>
            <p className="text-slate-400">Learn techniques to protect yourself</p>
          </div>
        </div>
      </motion.div>

      {/* Progress */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="glass-card p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-28 h-28 flex-shrink-0">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth="6" />
                <motion.circle cx="50" cy="50" r="42" fill="none" stroke="url(#defenseGrad)" strokeWidth="6" strokeLinecap="round" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: circumference * (1 - moduleProgress / 100) }} transition={{ duration: 1.5, ease: "easeOut" }} />
                <defs><linearGradient id="defenseGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#22c55e" /></linearGradient></defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center"><div className="text-2xl font-display font-bold text-white">{moduleProgress}%</div></div>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-4 text-center w-full">
              <div><div className="text-2xl font-display font-bold text-emerald-400">{moduleProgress}%</div><div className="text-xs text-slate-400">Progress</div></div>
              <div><div className="text-2xl font-display font-bold text-emerald-400">{lessons.filter(l => l.progress === 100).length}</div><div className="text-xs text-slate-400">Completed</div></div>
              <div><div className="text-2xl font-display font-bold text-amber-400">{modulePoints}</div><div className="text-xs text-slate-400">Points</div></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Safety Note */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <div className="glass-card p-4 border-amber-500/20">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-amber-300 text-sm mb-1">Safety First</h4>
              <p className="text-xs text-slate-400">These techniques are for self-defense only. The best defense is always awareness and avoidance. Only use physical techniques when there is no other option.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lessons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {lessons.map((lesson, index) => (
          <motion.div key={lesson.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.1 }}>
            <div className="glass-card p-5 glass-hover">
              <div className="flex items-center space-x-2 mb-2">
                {lesson.progress === 100 ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <Shield className="w-5 h-5 text-emerald-400" />}
                <h3 className="font-display font-bold text-white">{lesson.title}</h3>
              </div>
              <p className="text-sm text-slate-400 mb-3">{lesson.description}</p>
              <div className="flex items-center space-x-4 text-xs text-slate-500 mb-3">
                <span className="flex items-center space-x-1"><Clock className="w-3 h-3" /><span>{lesson.duration}</span></span>
                <span className="flex items-center space-x-1"><Zap className="w-3 h-3" /><span>{lesson.topics?.length || 0} techniques</span></span>
              </div>
              {lesson.topics && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {lesson.topics.map((topic, i) => (
                    <Badge key={i} className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px]">{topic}</Badge>
                  ))}
                </div>
              )}
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1"><span className="text-slate-400">Progress</span><span className="text-emerald-400 font-medium">{lesson.progress || 0}%</span></div>
                <div className="w-full h-1.5 bg-slate-800/50 rounded-full overflow-hidden">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500" initial={{ width: 0 }} animate={{ width: `${lesson.progress || 0}%` }} transition={{ duration: 1 }} />
                </div>
              </div>
              <button onClick={() => handleStartLesson(lesson)} className="w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition-all duration-300">
                {lesson.progress === 100 ? <><Star className="w-4 h-4 mr-2 inline" />Review</> : lesson.progress > 0 ? <><Play className="w-4 h-4 mr-2 inline" />Continue</> : <><Play className="w-4 h-4 mr-2 inline" />Start Lesson</>}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default SelfDefense
