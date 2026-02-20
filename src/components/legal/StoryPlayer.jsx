import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Star, BookOpen, Zap, Award } from 'lucide-react'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'
import { mockEntityOperations, updateUserStats, logActivity } from '../../lib/utils'
import { storyScenarios } from '../../lib/mockData'

const StoryPlayer = ({ lessonId, chapterId, chapterTitle, onBack, onComplete }) => {
    const [scenarios, setScenarios] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedChoice, setSelectedChoice] = useState(null)
    const [showFeedback, setShowFeedback] = useState(false)
    const [totalPoints, setTotalPoints] = useState(0)
    const [correctCount, setCorrectCount] = useState(0)
    const [finished, setFinished] = useState(false)

    useEffect(() => {
        const chapterScenarios = storyScenarios[chapterId] || []
        setScenarios(chapterScenarios)
        const loadProgress = async () => {
            const progress = await mockEntityOperations.list('ChapterProgress')
            const saved = progress.find(p => p.chapter_id === chapterId && p.lesson_id === lessonId)
            if (saved && saved.current_scenario > 0 && saved.completion_percentage < 100) {
                setCurrentIndex(Math.min(saved.current_scenario, chapterScenarios.length - 1))
                setTotalPoints(saved.points_earned || 0)
                setCorrectCount((saved.choices_made || []).filter(c => c.was_correct).length)
            }
        }
        loadProgress()
    }, [chapterId, lessonId])

    const currentScenario = scenarios[currentIndex]
    const progressPercent = scenarios.length > 0 ? Math.round(((currentIndex + (showFeedback ? 1 : 0)) / scenarios.length) * 100) : 0

    const handleChoiceSelect = async (choice, choiceIndex) => {
        if (showFeedback) return
        setSelectedChoice({ ...choice, index: choiceIndex })
        setShowFeedback(true)
        const pointsEarned = choice.points || 0
        setTotalPoints(prev => prev + pointsEarned)
        if (choice.correct) setCorrectCount(prev => prev + 1)
        await mockEntityOperations.upsert('ChapterProgress', (p) => p.chapter_id === chapterId && p.lesson_id === lessonId,
            { module_type: 'legal_rights', lesson_id: lessonId, chapter_id: chapterId, chapter_title: chapterTitle, current_scenario: currentIndex + 1, completion_percentage: Math.round(((currentIndex + 1) / scenarios.length) * 100), points_earned: totalPoints + pointsEarned, last_accessed: new Date().toISOString() })
    }

    const handleNext = async () => {
        if (currentIndex < scenarios.length - 1) { setCurrentIndex(prev => prev + 1); setSelectedChoice(null); setShowFeedback(false) }
        else {
            setFinished(true)
            await mockEntityOperations.upsert('ChapterProgress', (p) => p.chapter_id === chapterId && p.lesson_id === lessonId,
                { module_type: 'legal_rights', lesson_id: lessonId, chapter_id: chapterId, chapter_title: chapterTitle, completion_percentage: 100, current_scenario: scenarios.length, points_earned: totalPoints, last_accessed: new Date().toISOString() })

            const allChapterProgress = await mockEntityOperations.list('ChapterProgress')
            const lessonChapterIds = Object.keys(storyScenarios).filter(id => {
                if (lessonId === 'legal_basics') return ['workplace_rights', 'domestic_violence', 'property_rights'].includes(id)
                if (lessonId === 'legal_procedures') return ['filing_fir', 'court_procedures'].includes(id)
                return false
            })
            const completedChapters = allChapterProgress.filter(p => p.completion_percentage === 100 && lessonChapterIds.includes(p.chapter_id))
            const lessonComplete = completedChapters.length >= lessonChapterIds.length
            const lessonTitleText = lessonId === 'legal_basics' ? 'Legal Rights Fundamentals' : 'Legal Procedures & Documentation'
            const lessonProgress = lessonComplete ? 100 : Math.round((completedChapters.length / lessonChapterIds.length) * 100)

            await mockEntityOperations.upsert('TrainingProgress', (p) => p.module_type === 'legal_rights' && p.lesson_id === lessonId,
                { module_type: 'legal_rights', lesson_id: lessonId, lesson_title: lessonTitleText, completion_percentage: lessonProgress, points_earned: totalPoints, confidence_level: Math.min(5, Math.round((correctCount / scenarios.length) * 5)) })

            await updateUserStats(totalPoints)
            await logActivity({ module_type: 'legal_rights', title: chapterTitle, type: 'chapter', points: totalPoints, status: 'completed' })
        }
    }

    if (scenarios.length === 0) {
        return (<div className="max-w-4xl mx-auto text-center py-12"><p className="text-slate-400">No scenarios available.</p><button onClick={onBack} className="mt-4 px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800/50"><ArrowLeft className="w-4 h-4 mr-2 inline" />Back</button></div>)
    }

    if (finished) {
        const accuracy = scenarios.length > 0 ? Math.round((correctCount / scenarios.length) * 100) : 0
        return (
            <div className="max-w-4xl mx-auto">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <div className="glass-card p-8 text-center space-y-6">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20"><Award className="w-8 h-8 text-white" /></div>
                        </motion.div>
                        <div><h2 className="text-2xl font-display font-bold text-white mb-1">Chapter Complete! 🎉</h2><p className="text-slate-400">{chapterTitle}</p></div>
                        <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
                            <div className="text-center"><div className="text-2xl font-display font-bold text-blue-400">{totalPoints}</div><div className="text-[10px] text-slate-400 uppercase">Points</div></div>
                            <div className="text-center"><div className="text-2xl font-display font-bold text-emerald-400">{accuracy}%</div><div className="text-[10px] text-slate-400 uppercase">Accuracy</div></div>
                            <div className="text-center"><div className="text-2xl font-display font-bold text-violet-400">{correctCount}/{scenarios.length}</div><div className="text-[10px] text-slate-400 uppercase">Correct</div></div>
                        </div>
                        <div className="flex items-center justify-center space-x-3 pt-2">
                            <button onClick={onBack} className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800/50 text-sm"><ArrowLeft className="w-4 h-4 mr-1.5 inline" />Back</button>
                            <button onClick={() => onComplete && onComplete({ points: totalPoints, accuracy })} className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold">Continue <ArrowRight className="w-4 h-4 ml-1.5 inline" /></button>
                        </div>
                    </div>
                </motion.div>
            </div>
        )
    }

    const getChoiceClass = (idx) => {
        const isSelected = selectedChoice?.index === idx
        const isCorrect = scenarios[currentIndex]?.choices[idx]?.correct
        if (!showFeedback) return 'border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/30 hover:border-blue-500/30 cursor-pointer'
        if (isSelected && isCorrect) return 'border-emerald-500/40 bg-emerald-500/10'
        if (isSelected && !isCorrect) return 'border-red-500/40 bg-red-500/10'
        if (isCorrect) return 'border-emerald-500/20 bg-emerald-500/5'
        return 'border-slate-800/30 bg-slate-800/20 opacity-40'
    }

    const getCircleClass = (idx) => {
        const isSelected = selectedChoice?.index === idx
        const isCorrect = scenarios[currentIndex]?.choices[idx]?.correct
        if (showFeedback && isSelected && isCorrect) return 'bg-emerald-600 text-white'
        if (showFeedback && isSelected && !isCorrect) return 'bg-red-500 text-white'
        if (showFeedback && isCorrect) return 'bg-emerald-400 text-white'
        return 'bg-slate-700 text-slate-300'
    }

    return (
        <div className="max-w-4xl mx-auto space-y-5">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <button onClick={onBack} className="p-2 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300"><ArrowLeft className="w-4 h-4" /></button>
                    <div><h2 className="text-xl font-display font-bold text-white">{chapterTitle}</h2><p className="text-xs text-slate-400">Scenario {currentIndex + 1} of {scenarios.length}</p></div>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">Legal Rights</span>
                    <div className="flex items-center space-x-1 text-amber-400"><Zap className="w-3.5 h-3.5" /><span className="text-xs font-medium">{totalPoints} pts</span></div>
                </div>
            </motion.div>

            <div className="space-y-1">
                <div className="flex justify-between text-xs"><span className="text-slate-400">Progress</span><span className="text-blue-400 font-medium">{progressPercent}%</span></div>
                <Progress value={progressPercent} className="h-1.5" />
            </div>

            <AnimatePresence mode="wait">
                <motion.div key={currentIndex} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                    <div className="glass-card overflow-hidden">
                        <div className="p-5 border-b border-white/[0.06]">
                            <div className="flex items-center space-x-2 mb-1"><BookOpen className="w-4 h-4 text-blue-400" /><h3 className="font-display font-bold text-white">{currentScenario.title}</h3></div>
                            <span className="text-[10px] text-slate-500">Character: {currentScenario.character} · {currentScenario.context}</span>
                        </div>
                        <div className="p-5 space-y-5">
                            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                                <p className="text-sm text-slate-200 leading-relaxed">{currentScenario.story}</p>
                            </div>

                            <div className="space-y-2">
                                <h4 className="font-semibold text-white text-sm">What would you do?</h4>
                                {currentScenario.choices.map((choice, idx) => {
                                    const isSelected = selectedChoice?.index === idx
                                    const isCorrect = choice.correct
                                    return (
                                        <motion.div key={idx} whileHover={!showFeedback ? { scale: 1.01 } : {}} onClick={() => handleChoiceSelect(choice, idx)} className={`p-3.5 rounded-xl border transition-all ${getChoiceClass(idx)} ${showFeedback ? 'cursor-default' : ''}`}>
                                            <div className="flex items-start space-x-3">
                                                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${getCircleClass(idx)}`}>
                                                    {showFeedback && isSelected && isCorrect ? <CheckCircle className="w-4 h-4" /> : showFeedback && isSelected && !isCorrect ? <XCircle className="w-4 h-4" /> : String.fromCharCode(65 + idx)}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm text-slate-200">{choice.text}</p>
                                                    {showFeedback && (isSelected || isCorrect) && (
                                                        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5">
                                                            <p className={`text-xs ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>{choice.feedback}</p>
                                                            {isSelected && <span className="text-[10px] text-amber-400 font-medium">+{choice.points} points</span>}
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>

                            {showFeedback && currentScenario.learning && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                                    <div className="flex items-start space-x-2"><Star className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" /><div><div className="text-[10px] font-bold text-amber-400 uppercase mb-0.5">Key Learning</div><p className="text-xs text-slate-300">{currentScenario.learning}</p></div></div>
                                </motion.div>
                            )}

                            {showFeedback && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
                                    <button onClick={handleNext} className="text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2 rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all">
                                        {currentIndex < scenarios.length - 1 ? <>Next <ArrowRight className="w-3.5 h-3.5 ml-1 inline" /></> : <>Complete <Award className="w-3.5 h-3.5 ml-1 inline" /></>}
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default StoryPlayer
