import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, CheckCircle, XCircle, ArrowRight, Trophy, RotateCcw } from 'lucide-react'
import { updateUserStats, logActivity } from '../../lib/utils'

const allQuizQuestions = [
    // ── Legal Rights ──────────────────────────────────────────────
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
        category: 'Legal Rights',
        question: 'How many weeks of paid maternity leave are first-time mothers entitled to?',
        options: ['12 weeks', '16 weeks', '26 weeks', '52 weeks'],
        correct: 2,
        explanation: 'Under the Maternity Benefit Act (Amended 2017), women are entitled to 26 weeks of paid leave for the first two children.'
    },
    {
        category: 'Legal Rights',
        question: 'What is the minimum number of employees for a company to require an Internal Complaints Committee?',
        options: ['5', '10', '25', '50'],
        correct: 1,
        explanation: 'Any organization with 10 or more employees must constitute an Internal Complaints Committee (ICC) under the POSH Act.'
    },
    {
        category: 'Legal Rights',
        question: 'Under which section can a woman claim maintenance from her husband regardless of religion?',
        options: ['Section 125 CrPC', 'Section 498A IPC', 'Section 354 IPC', 'Section 376 IPC'],
        correct: 0,
        explanation: 'Section 125 CrPC provides maintenance rights to wives (and children) regardless of religion, applicable to divorced women until remarriage.'
    },
    {
        category: 'Legal Rights',
        question: 'What type of offense is cruelty by husband/relatives under Section 498A IPC?',
        options: ['Bailable & non-cognizable', 'Non-bailable & cognizable', 'Compoundable', 'Summary offense'],
        correct: 1,
        explanation: 'Section 498A IPC (Cruelty by Husband/Relatives) is a non-bailable and cognizable offense with punishment up to 3 years.'
    },

    // ── Safety ────────────────────────────────────────────────────
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
        category: 'Safety',
        question: 'What should you do FIRST when experiencing cyber harassment?',
        options: ['Delete the evidence', 'Screenshot everything', 'Confront the harasser', 'Change your number'],
        correct: 1,
        explanation: 'Always screenshot and preserve digital evidence first. This includes messages, URLs, timestamps, and sender details which strengthen your case.'
    },
    {
        category: 'Safety',
        question: 'Which number is for reporting cyber crimes in India?',
        options: ['100', '112', '1930', '181'],
        correct: 2,
        explanation: 'The Cyber Crime Helpline is 1930. You can also file a complaint at cybercrime.gov.in.'
    },

    // ── Confidence ────────────────────────────────────────────────
    {
        category: 'Confidence',
        question: 'Which assertiveness technique involves calmly repeating your position?',
        options: ['Fogging', 'Broken Record', 'Negative Assertion', 'DESC Script'],
        correct: 1,
        explanation: 'The Broken Record Technique means calmly repeating your position without getting drawn into arguments.'
    },
    {
        category: 'Confidence',
        question: 'What does DESC stand for in the DESC Script technique?',
        options: ['Describe, Express, Specify, Consequences', 'Defend, Explain, State, Conclude', 'Define, Empathize, Suggest, Close', 'Direct, Evaluate, Solve, Confirm'],
        correct: 0,
        explanation: 'DESC stands for: Describe the situation, Express how you feel, Specify what you want, and state the positive Consequences.'
    },
    {
        category: 'Confidence',
        question: 'What is "Fogging" in assertiveness training?',
        options: ['Ignoring the conversation', 'Acknowledging someone\'s point without giving in', 'Changing the subject', 'Raising your voice'],
        correct: 1,
        explanation: 'Fogging means acknowledging the other person\'s perspective without agreeing or getting defensive: "I understand your view, and I still need..."'
    },
    {
        category: 'Confidence',
        question: 'How long does research suggest it takes to form a new habit?',
        options: ['21 days', '30 days', '66 days', '90 days'],
        correct: 2,
        explanation: 'Research shows it takes about 66 days of consistent practice to form a new habit, including assertive communication habits.'
    },

    // ── Self Defense ──────────────────────────────────────────────
    {
        category: 'Self Defense',
        question: 'When escaping a wrist grab, which part of the attacker\'s hand should you move toward?',
        options: ['The palm', 'The thumb', 'The pinky', 'The wrist'],
        correct: 1,
        explanation: 'The thumb is the weakest part of any grip. Always rotate and pull toward the thumb to escape a wrist grab.'
    },
    {
        category: 'Self Defense',
        question: 'What should be your FIRST priority after using a self-defense technique?',
        options: ['Continue fighting', 'Call the police', 'Create distance and escape', 'Look for witnesses'],
        correct: 2,
        explanation: 'The primary goal of self-defense is escape, not fighting. Create distance immediately and run toward a safe, populated area.'
    },
    {
        category: 'Self Defense',
        question: 'Why are gross motor techniques (palm strike, knee) preferred in real self-defense situations?',
        options: ['They look more impressive', 'Adrenaline impairs fine motor skills', 'They\'re quieter', 'They require less training'],
        correct: 1,
        explanation: 'Adrenaline causes tunnel vision and fine motor skill loss. Simple, gross motor techniques like palm strikes and knee strikes remain effective under stress.'
    },
    {
        category: 'Self Defense',
        question: 'What is the "fence" position in self-defense?',
        options: ['Standing behind a barrier', 'Hands up at chest height, palms outward', 'Crossing your arms', 'Turning your back'],
        correct: 1,
        explanation: 'The "fence" position (hands up, palms outward at chest height) looks natural but provides protection and helps maintain safe distance.'
    },

    // ── Digital Safety ────────────────────────────────────────────
    {
        category: 'Digital Safety',
        question: 'What is the minimum recommended password length for security?',
        options: ['6 characters', '8 characters', '12 characters', '16 characters'],
        correct: 2,
        explanation: 'Security experts recommend a minimum of 12 characters for passwords, using a mix of letters, numbers, and symbols.'
    },
    {
        category: 'Digital Safety',
        question: 'Under which IT Act section is cyberstalking a criminal offense?',
        options: ['Section 66E', 'Section 354D IPC', 'Section 72', 'Section 67'],
        correct: 1,
        explanation: 'Section 354D IPC makes cyberstalking a criminal offense. IT Act sections 66E (privacy), 67 (obscene material), and 72 (confidentiality) also protect women online.'
    },

    // ── Mental Health ─────────────────────────────────────────────
    {
        category: 'Mental Health',
        question: 'Which of these is a common trauma response?',
        options: ['Improved concentration', 'Hypervigilance', 'Increased appetite', 'Better sleep'],
        correct: 1,
        explanation: 'Hypervigilance (constantly scanning for danger) is a common trauma response, along with flashbacks, emotional numbness, and difficulty sleeping.'
    },
    {
        category: 'Mental Health',
        question: 'What is the free women\'s counseling helpline number in India?',
        options: ['100', '181', '1098', '1930'],
        correct: 1,
        explanation: 'The National Women\'s Helpline 181 provides free, confidential counseling and support for women in distress, available 24/7.'
    },
]

// Shuffle and pick N questions for each quiz session
function getRandomQuestions(n = 7) {
    const shuffled = [...allQuizQuestions].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, Math.min(n, shuffled.length))
}

const KnowledgeQuiz = () => {
    const [quizState, setQuizState] = useState('idle') // idle, playing, result
    const [currentQ, setCurrentQ] = useState(0)
    const [selected, setSelected] = useState(null)
    const [showExplanation, setShowExplanation] = useState(false)
    const [score, setScore] = useState(0)
    const [questions, setQuestions] = useState(() => getRandomQuestions())

    const startQuiz = () => {
        const newQuestions = getRandomQuestions()
        setQuestions(newQuestions)
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
        if (index === questions[currentQ].correct) {
            setScore(s => s + 1)
        }
    }

    const nextQuestion = async () => {
        if (currentQ < questions.length - 1) {
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

    const q = questions[currentQ]

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
                            <span className="text-xs text-slate-400">{currentQ + 1}/{questions.length}</span>
                        )}
                    </div>

                    <AnimatePresence mode="wait">
                        {quizState === 'idle' && (
                            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-4">
                                <p className="text-sm text-slate-300 mb-2">Test your knowledge on legal rights, safety, confidence, and more!</p>
                                <p className="text-xs text-slate-500 mb-4">{allQuizQuestions.length} questions · 7 per round · randomized</p>
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
                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-3">
                                        <p className="text-xs text-slate-400 bg-slate-800/30 p-3 rounded-lg border border-slate-700/30">{q.explanation}</p>
                                        <button
                                            onClick={nextQuestion}
                                            className="mt-3 w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold py-2.5 rounded-xl hover:shadow-lg transition-all"
                                        >
                                            <span>{currentQ < questions.length - 1 ? 'Next Question' : 'See Results'}</span>
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
                                <div className="text-2xl font-display font-bold text-white mb-1">{score}/{questions.length}</div>
                                <p className="text-sm text-slate-400 mb-1">
                                    {score === questions.length ? 'Perfect! 🎉' : score >= 5 ? 'Great job! 💪' : score >= 3 ? 'Good effort! 📚' : 'Keep learning! 🌱'}
                                </p>
                                <p className="text-xs text-amber-400 font-medium mb-4">+{score * 5} points earned</p>
                                <button
                                    onClick={startQuiz}
                                    className="flex items-center justify-center space-x-2 mx-auto bg-white/[0.06] border border-white/[0.1] text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-white/[0.1] transition-all"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    <span>New Round</span>
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
