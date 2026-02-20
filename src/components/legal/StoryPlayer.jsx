import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    XCircle,
    Star,
    BookOpen,
    Zap,
    Award
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'
import { Badge } from '../ui/badge'
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

        await mockEntityOperations.upsert(
            'ChapterProgress',
            (p) => p.chapter_id === chapterId && p.lesson_id === lessonId,
            {
                module_type: 'legal_rights',
                lesson_id: lessonId,
                chapter_id: chapterId,
                chapter_title: chapterTitle,
                current_scenario: currentIndex + 1,
                completion_percentage: Math.round(((currentIndex + 1) / scenarios.length) * 100),
                points_earned: totalPoints + pointsEarned,
                last_accessed: new Date().toISOString()
            }
        )
    }

    const handleNext = async () => {
        if (currentIndex < scenarios.length - 1) {
            setCurrentIndex(prev => prev + 1)
            setSelectedChoice(null)
            setShowFeedback(false)
        } else {
            setFinished(true)

            await mockEntityOperations.upsert(
                'ChapterProgress',
                (p) => p.chapter_id === chapterId && p.lesson_id === lessonId,
                {
                    module_type: 'legal_rights',
                    lesson_id: lessonId,
                    chapter_id: chapterId,
                    chapter_title: chapterTitle,
                    completion_percentage: 100,
                    current_scenario: scenarios.length,
                    points_earned: totalPoints,
                    last_accessed: new Date().toISOString()
                }
            )

            const allChapterProgress = await mockEntityOperations.list('ChapterProgress')
            const allChaptersIds = Object.keys(storyScenarios)
            const lessonChapterIds = allChaptersIds.filter(id => {
                if (lessonId === 'legal_basics') return ['workplace_rights', 'domestic_violence', 'property_rights'].includes(id)
                if (lessonId === 'legal_procedures') return ['filing_fir', 'court_procedures'].includes(id)
                return false
            })
            const completedChapters = allChapterProgress.filter(p => p.completion_percentage === 100 && lessonChapterIds.includes(p.chapter_id))
            const lessonComplete = completedChapters.length >= lessonChapterIds.length

            const lessonTitleText = lessonId === 'legal_basics' ? 'Legal Rights Fundamentals' : 'Legal Procedures & Documentation'

            if (lessonComplete) {
                await mockEntityOperations.upsert(
                    'TrainingProgress',
                    (p) => p.module_type === 'legal_rights' && p.lesson_id === lessonId,
                    {
                        module_type: 'legal_rights',
                        lesson_id: lessonId,
                        lesson_title: lessonTitleText,
                        completion_percentage: 100,
                        points_earned: totalPoints,
                        confidence_level: Math.min(5, Math.round((correctCount / scenarios.length) * 5))
                    }
                )
            } else {
                const lessonProgress = Math.round((completedChapters.length / lessonChapterIds.length) * 100)
                await mockEntityOperations.upsert(
                    'TrainingProgress',
                    (p) => p.module_type === 'legal_rights' && p.lesson_id === lessonId,
                    {
                        module_type: 'legal_rights',
                        lesson_id: lessonId,
                        lesson_title: lessonTitleText,
                        completion_percentage: lessonProgress,
                        points_earned: totalPoints,
                        confidence_level: Math.min(5, Math.round((correctCount / scenarios.length) * 5))
                    }
                )
            }

            await updateUserStats(totalPoints)
            await logActivity({
                module_type: 'legal_rights',
                title: chapterTitle,
                type: 'chapter',
                points: totalPoints,
                status: 'completed'
            })
        }
    }

    if (scenarios.length === 0) {
        return (
            <div className="max-w-4xl mx-auto text-center py-12">
                <p className="text-gray-500">No scenarios available for this chapter.</p>
                <Button variant="outline" onClick={onBack} className="mt-4">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Lessons
                </Button>
            </div>
        )
    }

    if (finished) {
        const accuracy = scenarios.length > 0 ? Math.round((correctCount / scenarios.length) * 100) : 0
        return (
            <div className="max-w-4xl mx-auto space-y-6">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                    <Card className="bg-gradient-to-r from-blue-50 to-sky-50 border-blue-200">
                        <CardContent className="p-8 text-center space-y-6">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
                                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center mx-auto">
                                    <Award className="w-10 h-10 text-white" />
                                </div>
                            </motion.div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Chapter Complete! 🎉</h2>
                                <p className="text-gray-600">{chapterTitle}</p>
                            </div>

                            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">{totalPoints}</div>
                                    <div className="text-sm text-gray-600">Points Earned</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
                                    <div className="text-sm text-gray-600">Accuracy</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-600">{correctCount}/{scenarios.length}</div>
                                    <div className="text-sm text-gray-600">Correct</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-center space-x-4 pt-4">
                                <Button variant="outline" onClick={onBack}>
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Lessons
                                </Button>
                                <Button
                                    onClick={() => onComplete && onComplete({ points: totalPoints, accuracy })}
                                    className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700"
                                >
                                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        )
    }

    const getChoiceBorderClass = (idx) => {
        const isSelected = selectedChoice?.index === idx
        const isCorrect = scenarios[currentIndex]?.choices[idx]?.correct
        if (!showFeedback) return 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer'
        if (isSelected && isCorrect) return 'border-green-500 bg-green-50'
        if (isSelected && !isCorrect) return 'border-red-400 bg-red-50'
        if (isCorrect) return 'border-green-300 bg-green-50/50'
        return 'border-gray-200 opacity-60'
    }

    const getCircleClass = (idx) => {
        const isSelected = selectedChoice?.index === idx
        const isCorrect = scenarios[currentIndex]?.choices[idx]?.correct
        if (showFeedback && isSelected && isCorrect) return 'bg-green-600 text-white'
        if (showFeedback && isSelected && !isCorrect) return 'bg-red-500 text-white'
        if (showFeedback && isCorrect) return 'bg-green-400 text-white'
        return 'bg-gray-200 text-gray-700'
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Button variant="outline" size="icon" onClick={onBack}>
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{chapterTitle}</h2>
                        <p className="text-sm text-gray-600">Scenario {currentIndex + 1} of {scenarios.length}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <Badge className="bg-blue-100 text-blue-800" variant="outline">Legal Rights</Badge>
                    <div className="flex items-center space-x-1 text-amber-600">
                        <Zap className="w-4 h-4" />
                        <span className="text-sm font-medium">{totalPoints} pts</span>
                    </div>
                </div>
            </motion.div>

            {/* Progress Bar */}
            <div className="space-y-1">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-blue-600 font-medium">{progressPercent}%</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
            </div>

            {/* Scenario Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card>
                        <CardHeader>
                            <div className="flex items-center space-x-2 mb-2">
                                <BookOpen className="w-5 h-5 text-blue-600" />
                                <CardTitle className="text-lg">{currentScenario.title}</CardTitle>
                            </div>
                            <div className="text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1 inline-block">
                                Character: {currentScenario.character} &bull; {currentScenario.context}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Story */}
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-gray-800 leading-relaxed">{currentScenario.story}</p>
                            </div>

                            {/* Choices */}
                            <div className="space-y-3">
                                <h4 className="font-medium text-gray-900">What would you do?</h4>
                                {currentScenario.choices.map((choice, idx) => {
                                    const isSelected = selectedChoice?.index === idx
                                    const isCorrect = choice.correct

                                    return (
                                        <motion.div
                                            key={idx}
                                            whileHover={!showFeedback ? { scale: 1.01 } : {}}
                                            onClick={() => handleChoiceSelect(choice, idx)}
                                            className={"p-4 rounded-lg border-2 transition-all " + getChoiceBorderClass(idx) + (showFeedback ? ' cursor-default' : '')}
                                        >
                                            <div className="flex items-start space-x-3">
                                                <div className={"w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold " + getCircleClass(idx)}>
                                                    {showFeedback && isSelected && isCorrect ? <CheckCircle className="w-4 h-4" /> :
                                                        showFeedback && isSelected && !isCorrect ? <XCircle className="w-4 h-4" /> :
                                                            String.fromCharCode(65 + idx)}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-gray-800 text-sm">{choice.text}</p>
                                                    {showFeedback && (isSelected || isCorrect) && (
                                                        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-2">
                                                            <p className={"text-xs " + (isCorrect ? 'text-green-700' : 'text-red-600')}>
                                                                {choice.feedback}
                                                            </p>
                                                            {isSelected && <span className="text-xs text-amber-600 font-medium">+{choice.points} points</span>}
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>

                            {/* Learning Objective */}
                            {showFeedback && currentScenario.learning && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                                    <div className="flex items-start space-x-2">
                                        <Star className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <div className="font-medium text-amber-800 text-sm mb-1">Key Learning</div>
                                            <p className="text-amber-700 text-sm">{currentScenario.learning}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Navigation */}
                            {showFeedback && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end pt-2">
                                    <Button onClick={handleNext} className="bg-gradient-to-r from-sky-500 to-blue-600">
                                        {currentIndex < scenarios.length - 1 ? (
                                            <>Next Scenario <ArrowRight className="w-4 h-4 ml-2" /></>
                                        ) : (
                                            <>Complete Chapter <Award className="w-4 h-4 ml-2" /></>
                                        )}
                                    </Button>
                                </motion.div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default StoryPlayer
