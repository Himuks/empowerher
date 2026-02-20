import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Scale, Star, Lock, Play, CheckCircle, Book
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import StoryPlayer from '../components/legal/StoryPlayer'
import { mockEntityOperations, getModulePoints } from '../lib/utils'
import { mockLessons } from '../lib/mockData'

const LegalRights = () => {
  const [lessons, setLessons] = useState([])
  const [moduleProgress, setModuleProgress] = useState(0)
  const [modulePoints, setModulePoints] = useState(0)
  const [activeChapter, setActiveChapter] = useState(null)
  const [activeLesson, setActiveLesson] = useState(null)

  const loadProgress = useCallback(async () => {
    const baseLessons = mockLessons.legal_rights || []
    const chapterProgress = await mockEntityOperations.list('ChapterProgress')
    const trainingProgress = await mockEntityOperations.list('TrainingProgress')
    const enriched = baseLessons.map(lesson => {
      const lessonTraining = trainingProgress.find(p => p.module_type === 'legal_rights' && p.lesson_id === lesson.id)
      const chapters = (lesson.chapters || []).map(ch => {
        const chProgress = chapterProgress.find(p => p.chapter_id === ch.id && p.lesson_id === lesson.id)
        return { ...ch, completed: chProgress?.completion_percentage === 100 }
      })
      const completedChapters = chapters.filter(c => c.completed).length
      const totalChapters = chapters.length
      const progress = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0
      return { ...lesson, chapters, progress: lessonTraining?.completion_percentage || progress }
    })
    setLessons(enriched)
    if (enriched.length > 0) {
      const totalProgress = enriched.reduce((sum, l) => sum + (l.progress || 0), 0)
      setModuleProgress(Math.round(totalProgress / enriched.length))
    }
    const points = await getModulePoints('legal_rights')
    setModulePoints(points)
  }, [])

  useEffect(() => { loadProgress() }, [loadProgress])

  const handleStartChapter = (lesson, chapter) => { setActiveLesson(lesson); setActiveChapter(chapter) }
  const handleBackFromStory = () => { setActiveChapter(null); setActiveLesson(null); loadProgress() }
  const handleChapterComplete = () => { setActiveChapter(null); setActiveLesson(null); loadProgress() }

  const getDifficultyColor = (d) => {
    const map = { basic: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', intermediate: 'text-amber-400 bg-amber-500/10 border-amber-500/20', advanced: 'text-orange-400 bg-orange-500/10 border-orange-500/20', expert: 'text-red-400 bg-red-500/10 border-red-500/20' }
    return map[d] || 'text-slate-400 bg-slate-500/10 border-slate-500/20'
  }

  if (activeChapter && activeLesson) {
    return <StoryPlayer lessonId={activeLesson.id} chapterId={activeChapter.id} chapterTitle={activeChapter.title} onBack={handleBackFromStory} onComplete={handleChapterComplete} />
  }

  const circumference = 2 * Math.PI * 42

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center space-x-4">
        <Link to="/"><Button variant="outline" size="icon" className="border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300"><ArrowLeft className="w-4 h-4" /></Button></Link>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-white">Legal Rights & Procedures</h1>
            <p className="text-slate-400">Know your rights and how to exercise them</p>
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
                <motion.circle cx="50" cy="50" r="42" fill="none" stroke="url(#legalGrad)" strokeWidth="6" strokeLinecap="round" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: circumference * (1 - moduleProgress / 100) }} transition={{ duration: 1.5, ease: "easeOut" }} />
                <defs><linearGradient id="legalGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient></defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-display font-bold text-white">{moduleProgress}%</div>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-4 text-center w-full">
              <div><div className="text-2xl font-display font-bold text-blue-400">{moduleProgress}%</div><div className="text-xs text-slate-400">Progress</div></div>
              <div><div className="text-2xl font-display font-bold text-emerald-400">{lessons.filter(l => l.progress === 100).length}</div><div className="text-xs text-slate-400">Completed</div></div>
              <div><div className="text-2xl font-display font-bold text-amber-400">{modulePoints}</div><div className="text-xs text-slate-400">Points</div></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {lessons.map((lesson, index) => {
          const isLocked = index > 0 && lessons[index - 1].progress < 100
          const completedChapters = lesson.chapters?.filter(c => c.completed).length || 0
          const totalChapters = lesson.chapters?.length || 0
          return (
            <motion.div key={lesson.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.1 }}>
              <div className={`glass-card overflow-hidden ${isLocked ? 'opacity-50' : 'glass-hover'}`}>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {isLocked ? <Lock className="w-5 h-5 text-slate-500" /> : lesson.progress === 100 ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <Book className="w-5 h-5 text-blue-400" />}
                      <h3 className={`font-display font-bold ${isLocked ? 'text-slate-500' : 'text-white'}`}>{lesson.title}</h3>
                    </div>
                    <Badge className={`${getDifficultyColor(lesson.difficulty)} border text-[10px] font-bold uppercase`}>{lesson.difficulty}</Badge>
                  </div>
                  <p className={`text-sm mb-4 ${isLocked ? 'text-slate-600' : 'text-slate-400'}`}>{lesson.description}</p>

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-blue-400 font-medium">{lesson.progress || 0}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800/50 rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" initial={{ width: 0 }} animate={{ width: `${lesson.progress || 0}%` }} transition={{ duration: 1, ease: "easeOut" }} />
                    </div>
                  </div>

                  {/* Chapters */}
                  {lesson.chapters && (
                    <div className="space-y-1.5 mb-4">
                      <div className="text-xs text-slate-500 font-medium">Chapters ({completedChapters}/{totalChapters})</div>
                      {lesson.chapters.map((ch) => (
                        <button key={ch.id} className={`w-full flex items-center justify-between text-sm p-2.5 rounded-lg transition-all ${!isLocked ? 'hover:bg-white/[0.04] cursor-pointer' : ''}`} onClick={() => !isLocked && handleStartChapter(lesson, ch)} disabled={isLocked}>
                          <div className="flex items-center space-x-2">
                            {ch.completed ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <div className="w-4 h-4 rounded-full border-2 border-slate-600" />}
                            <span className={ch.completed ? 'text-slate-200' : 'text-slate-400'}>{ch.title}</span>
                            <span className="text-[10px] text-slate-500">({ch.scenarios} scenarios)</span>
                          </div>
                          {!isLocked && !ch.completed && <Play className="w-3 h-3 text-blue-400" />}
                        </button>
                      ))}
                    </div>
                  )}

                  <button
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${isLocked ? 'bg-slate-800/50 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5'}`}
                    disabled={isLocked}
                    onClick={() => { if (!isLocked && lesson.chapters?.length > 0) { const next = lesson.chapters.find(c => !c.completed) || lesson.chapters[0]; handleStartChapter(lesson, next) } }}
                  >
                    {isLocked ? <><Lock className="w-4 h-4 mr-2 inline" />Complete Previous</> :
                      lesson.progress === 100 ? <><Star className="w-4 h-4 mr-2 inline" />Review</> :
                        lesson.progress > 0 ? <><Play className="w-4 h-4 mr-2 inline" />Continue</> :
                          <><Play className="w-4 h-4 mr-2 inline" />Start Lesson</>}
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default LegalRights
