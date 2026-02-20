import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, CheckCircle, XCircle, ArrowRight, Trophy, RotateCcw } from 'lucide-react'
import { updateUserStats, logActivity } from '../../lib/utils'

const quizQuestions = [
    {
        category: 'Legal Rights',
        question: 'What is the time limit to file a complaint under the POSH Act?',
        options: ['1 month', '3 months', '6 months', '1 year'],
        correct: 1,
        explanation: 'Under the POSH Act, a complaint must be filed within 3 months of the incident, extendable by another 3 months.'
    },
    {
        category: 'Legal Rights',
        question: 'Which act gives daughters equal coparcenary rights as sons?',
        options: ['PWDVA 2005', 'Hindu Succession Act (Amended 2005)', 'Dowry Prohibition Act', 'Maternity Benefit Act'],
        correct: 1,
        explanation: 'The Hindu Succession Act (Amended 2005) grants daughters equal coparcenary rights as sons in ancestral property.'
    },
    {
        category: 'Safety',
        question: 'What is the unified emergency number in India?',
        options: ['100', '108', '112', '181'],
        correct: 2,
        explanation: '112 is the unified emergency number for police, fire, and ambulance services across India.'
    },
    {
        category: 'Safety',
        question: 'Can a Zero FIR be filed at any police station?',
        options: ['Only at the nearest station', 'Yes, at any police station', 'Only online', 'Only where the crime happened'],
        correct: 1,
        explanation: 'A Zero FIR can be filed at ANY police station in India, regardless of jurisdiction.'
    },
    {
        category: 'Confidence',
        question: 'Which assertiveness technique involves calmly repeating your position?',
        options: ['Fogging', 'Broken Record', 'Negative Assertion', 'DESC Script'],
        correct: 1,
        explanation: 'The Broken Record Technique means calmly repeating your position without getting drawn into arguments.'
    },
]

const KnowledgeQuiz = () => {
    const [quizState, setQuizState] = useState('idle') // idle, playing, result
    const [currentQ, setCurrentQ] = useState(0)
    const [selected, setSelected] = useState(null)
    const [showExplanation, setShowExplanation] = useState(false)
    const [score, setScore] = useState(0)

    const startQuiz = () => {
        setQuizState('playing')
        setCurrentQ(0)
        setScore(0)
        setSelected(null)
        setShowExplanation(false)
    }

    const handleAnswer = (index) => {
        if (selected !== null) return
        setSelected(index)
        setShowExplanation(true)
        if (index === quizQuestions[currentQ].correct) {
            setScore(s => s + 1)
        }
    }

    const nextQuestion = async () => {
        if (currentQ < quizQuestions.length - 1) {
            setCurrentQ(q => q + 1)
            setSelected(null)
            setShowExplanation(false)
        } else {
            setQuizState('result')
            const points = score * 5
            if (points > 0) {
                await updateUserStats(points)
                await logActivity({ module_type: 'quiz', title: 'Knowledge Quiz', type: 'quiz', points, status: 'completed' })
            }
        }
    }

    const q = quizQuestions[currentQ]

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <div className="glass-card p-5 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-gradient-to-br from-cyan-500/15 to-blue-500/10 rounded-full blur-2xl" />

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                                <Brain className="w-4 h-4 text-white" />
                            </div>
                            <h3 className="font-display font-bold text-white text-sm">Knowledge Quiz</h3>
                        </div>
                        {quizState === 'playing' && (
                            <span className="text-xs text-slate-400">{currentQ + 1}/{quizQuestions.length}</span>
                        )}
                    </div>

                    <AnimatePresence mode="wait">
                        {quizState === 'idle' && (
                            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-4">
                                <p className="text-sm text-slate-300 mb-4">Test your knowledge on legal rights, safety, and confidence!</p>
                                <button
                                    onClick={startQuiz}
                                    className="flex items-center justify-center space-x-2 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <span>Start Quiz</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </motion.div>
                        )}

                        {quizState === 'playing' && (
                            <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                                <div className="mb-1">
                                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">{q.category}</span>
                                </div>
                                <p className="text-sm font-medium text-white mb-3">{q.question}</p>
                                <div className="space-y-2">
                                    {q.options.map((opt, i) => {
                                        const isCorrect = i === q.correct
                                        const isSelected = selected === i
                                        let cls = 'border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/30 hover:border-slate-600/50 cursor-pointer'
                                        if (selected !== null) {
                                            if (isCorrect) cls = 'border-emerald-500/40 bg-emerald-500/10'
                                            else if (isSelected) cls = 'border-red-500/40 bg-red-500/10'
                                            else cls = 'border-slate-800/30 bg-slate-800/20 opacity-50'
                                        }
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => handleAnswer(i)}
                                                disabled={selected !== null}
                                                className={`w-full text-left p-3 rounded-xl border text-sm transition-all duration-300 flex items-center space-x-2 ${cls}`}
                                            >
                                                {selected !== null && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                                                {selected !== null && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
                                                <span className={selected !== null && isCorrect ? 'text-emerald-300' : isSelected && !isCorrect ? 'text-red-300' : 'text-slate-300'}>{opt}</span>
                                            </button>
                                        )
                                    })}
                                </div>

                                {showExplanation && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3">
                                        <p className="text-xs text-slate-400 bg-slate-800/30 p-3 rounded-lg border border-slate-700/30">{q.explanation}</p>
                                        <button
                                            onClick={nextQuestion}
                                            className="mt-3 w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold py-2.5 rounded-xl hover:shadow-lg transition-all"
                                        >
                                            <span>{currentQ < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}

                        {quizState === 'result' && (
                            <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/20">
                                    <Trophy className="w-7 h-7 text-white" />
                                </div>
                                <div className="text-2xl font-display font-bold text-white mb-1">{score}/{quizQuestions.length}</div>
                                <p className="text-sm text-slate-400 mb-1">
                                    {score === quizQuestions.length ? 'Perfect! 🎉' : score >= 3 ? 'Great job! 💪' : 'Keep learning! 📚'}
                                </p>
                                <p className="text-xs text-amber-400 font-medium mb-4">+{score * 5} points earned</p>
                                <button
                                    onClick={startQuiz}
                                    className="flex items-center justify-center space-x-2 mx-auto bg-white/[0.06] border border-white/[0.1] text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-white/[0.1] transition-all"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    <span>Try Again</span>
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    )
}

export default KnowledgeQuiz
