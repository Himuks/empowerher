import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Mic, Star, CheckCircle, ArrowRight, Timer, AlertCircle, Volume2 } from 'lucide-react'
import { Slider } from '../ui/slider'
import { mockEntityOperations, updateUserStats, logActivity } from '../../lib/utils'
import { voiceExercises } from '../../lib/mockData'

const VoiceExercise = ({ standalone = false, lessonId = "", lessonTitle = "", onComplete = () => { }, onBack = () => { } }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [confidence, setConfidence] = useState([3])
  const [completed, setCompleted] = useState(false)
  const [timer, setTimer] = useState(0)
  const intervalRef = useRef(null)
  const [transcript, setTranscript] = useState("")
  const [feedback, setFeedback] = useState(null)
  const [isListening, setIsListening] = useState(false)
  const [browserSupported, setBrowserSupported] = useState(true)
  const recognitionRef = useRef(null)

  const exercises = lessonId && voiceExercises[lessonId] ? voiceExercises[lessonId] : [
    { title: "Practice saying 'No' clearly", scenario: "Someone is pushing you to do something you don't want to.", practicePhrase: "No, I can't do that. I have other priorities.", tips: ["Keep your voice steady", "Maintain eye contact", "Stand tall", "Speak slowly and clearly"] },
    { title: "Express your opinion confidently", scenario: "Your idea was dismissed in a meeting.", practicePhrase: "I'd like to revisit my suggestion. Here's why I believe it has merit...", tips: ["Use confident body language", "Keep voice calm", "Be respectful but firm", "Don't apologize for your opinion"] },
    { title: "Request what you need", scenario: "Someone keeps interrupting you when you speak.", practicePhrase: "Please let me finish my point before responding.", tips: ["Be direct and specific", "Use 'I' statements", "Keep tone professional", "Don't over-explain"] }
  ]

  const exercise = exercises[currentExercise]

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) { setBrowserSupported(false); return }
    try {
      const recognition = new SpeechRecognition()
      recognition.continuous = true; recognition.interimResults = true; recognition.lang = 'en-US'
      recognition.onstart = () => setIsListening(true)
      recognition.onresult = (event) => { let t = ''; for (let i = event.resultIndex; i < event.results.length; i++) t += event.results[i][0].transcript; setTranscript(t) }
      recognition.onerror = (event) => {
        if (event.error === 'not-allowed') setFeedback({ type: 'error', message: 'Microphone access denied.' })
        else setFeedback({ type: 'error', message: `Speech error: ${event.error}` })
        setIsPlaying(false); setIsListening(false)
      }
      recognition.onend = () => setIsListening(false)
      recognitionRef.current = recognition
    } catch (e) { setBrowserSupported(false) }
    return () => { if (recognitionRef.current) recognitionRef.current.stop() }
  }, [])

  useEffect(() => {
    if (isPlaying) intervalRef.current = setInterval(() => setTimer(t => t + 1), 1000)
    else clearInterval(intervalRef.current)
    return () => clearInterval(intervalRef.current)
  }, [isPlaying])

  const formatTime = (s) => `${Math.floor(s / 60)}:${s % 60 < 10 ? '0' : ''}${s % 60}`

  const evaluateSpeech = (spoken, target) => {
    if (!spoken?.trim()) return
    const sw = spoken.toLowerCase().replace(/[.,!?;:]/g, '').trim().split(' ')
    const tw = target.toLowerCase().replace(/[.,!?;:]/g, '').trim().split(' ')
    const m = tw.filter(w => sw.includes(w)).length / tw.length
    if (m > 0.7) { setFeedback({ type: 'success', message: 'Excellent! Clear and confident delivery.' }); setConfidence([Math.max(4, confidence[0])]); setCompleted(true) }
    else if (m > 0.4) setFeedback({ type: 'warning', message: 'Good start. Try to enunciate key words more clearly.' })
    else setFeedback({ type: 'error', message: "Didn't quite catch that. Try speaking louder." })
  }

  const handlePracticeToggle = () => {
    if (!browserSupported) { setIsPlaying(!isPlaying); return }
    if (isPlaying) { recognitionRef.current?.stop(); setIsPlaying(false); if (transcript) evaluateSpeech(transcript, exercise.practicePhrase) }
    else { setTranscript(""); setFeedback(null); try { recognitionRef.current?.start() } catch (e) { /* already started */ } setIsPlaying(true) }
  }

  const handleRestart = () => { recognitionRef.current?.stop(); setIsPlaying(false); setConfidence([3]); setTimer(0); setTranscript(""); setFeedback(null); setCompleted(false) }

  const handleComplete = async () => {
    recognitionRef.current?.stop(); setIsPlaying(false); setCompleted(true)
    if (!standalone && lessonId) {
      const pts = 15 + (confidence[0] * 3)
      await mockEntityOperations.upsert('TrainingProgress', (p) => p.module_type === 'voice_assertiveness' && p.lesson_id === lessonId,
        { module_type: 'voice_assertiveness', lesson_id: lessonId, lesson_title: lessonTitle, completion_percentage: Math.round(((currentExercise + 1) / exercises.length) * 100), points_earned: pts, confidence_level: confidence[0], time_spent: timer, last_accessed: new Date().toISOString() })
    }
  }

  const handleNextExercise = () => { if (currentExercise < exercises.length - 1) { setCurrentExercise(currentExercise + 1); handleRestart() } }

  const handleLessonComplete = async () => {
    if (!standalone && lessonId) {
      const pts = 25 + (confidence[0] * 5)
      await mockEntityOperations.upsert('TrainingProgress', (p) => p.module_type === 'voice_assertiveness' && p.lesson_id === lessonId,
        { module_type: 'voice_assertiveness', lesson_id: lessonId, lesson_title: lessonTitle, completion_percentage: 100, points_earned: pts, confidence_level: confidence[0], time_spent: timer, last_accessed: new Date().toISOString() })
      await updateUserStats(pts)
      await logActivity({ module_type: 'voice_assertiveness', title: lessonTitle, type: 'lesson', points: pts, status: 'completed' })
    }
    onComplete({ lessonComplete: true })
  }

  if (standalone) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <div className="glass-card p-5">
          <div className="flex items-center space-x-2 mb-3"><div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"><Mic className="w-4 h-4 text-white" /></div><h3 className="font-display font-bold text-white text-sm">Daily Voice Practice</h3></div>
          <p className="text-xs text-slate-400 italic mb-3">"The most courageous act is still to think for yourself. Aloud."</p>
          <button className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white text-sm font-semibold py-2.5 rounded-xl flex items-center justify-center"><Volume2 className="w-4 h-4 mr-2" />Go to Voice Training</button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div><h2 className="text-2xl font-display font-bold text-white">{lessonTitle}</h2><p className="text-sm text-slate-400">Exercise {currentExercise + 1} of {exercises.length}</p></div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded-full">Voice Training</span>
          {timer > 0 && <span className="text-[10px] font-medium text-slate-400 bg-slate-800/50 border border-slate-700 px-2.5 py-1 rounded-full"><Timer className="w-3 h-3 mr-1 inline" />{formatTime(timer)}</span>}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="glass-card overflow-hidden">
          <div className="p-5 border-b border-white/[0.06]">
            <div className="flex items-center space-x-2"><Mic className="w-5 h-5 text-violet-400" /><h3 className="font-display font-bold text-white">{exercise.title}</h3></div>
          </div>
          <div className="p-5 space-y-5">
            {!browserSupported && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <div className="flex items-center space-x-2 text-amber-400 text-xs font-medium mb-1"><AlertCircle className="w-3.5 h-3.5" /><span>Browser Not Supported</span></div>
                <p className="text-xs text-slate-400">Speech API unavailable. Use Chrome for voice recognition. Timer mode still works.</p>
              </div>
            )}

            {exercise.scenario && (
              <div className="p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                <div className="text-[10px] font-bold text-violet-400 uppercase tracking-wider mb-1">Scenario</div>
                <p className="text-sm text-slate-300">{exercise.scenario}</p>
              </div>
            )}

            {exercise.practicePhrase && (
              <div className="p-5 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-xl border border-indigo-500/20 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-2">Say this out loud</div>
                <p className="text-xl font-display font-semibold text-white leading-relaxed">"{exercise.practicePhrase}"</p>
              </div>
            )}

            <AnimatePresence>
              {(transcript || feedback) && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="overflow-hidden">
                  <div className="p-4 bg-slate-800/30 rounded-xl border border-white/[0.06] space-y-3">
                    <div><div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Your Speech</div><p className="text-sm text-slate-300 italic">{transcript || "..."}</p></div>
                    {feedback && (
                      <div className={`p-3 rounded-xl flex items-start space-x-2 text-xs ${feedback.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : feedback.type === 'warning' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                        {feedback.type === 'success' ? <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" /> : <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />}
                        <span className="font-medium">{feedback.message}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col items-center space-y-3 py-2">
              <div className="flex items-center space-x-3">
                <button onClick={handleRestart} className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:bg-slate-800/50 text-sm flex items-center space-x-2"><RotateCcw className="w-4 h-4" /><span>Reset</span></button>
                <div className="relative">
                  {isListening && <div className="absolute inset-0 bg-red-400 rounded-xl animate-ping opacity-20" />}
                  <button onClick={handlePracticeToggle} className={`relative z-10 px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center space-x-2 transition-all ${isListening ? 'bg-red-500 text-white' : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-violet-500/20 hover:-translate-y-0.5'}`}>
                    <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} /><span>{isListening ? 'Stop' : transcript ? 'Retry' : 'Start Practice'}</span>
                  </button>
                </div>
              </div>
              {timer > 0 && <span className="text-xs text-slate-500 font-mono">{formatTime(timer)}</span>}
            </div>

            <div>
              <h4 className="font-semibold text-white text-sm mb-2 flex items-center space-x-1.5"><Star className="w-4 h-4 text-amber-400" /><span>Pro Tips</span></h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {exercise.tips.map((tip, i) => (
                  <div key={i} className="flex items-center space-x-2 p-2.5 bg-slate-800/30 border border-white/[0.04] rounded-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span className="text-xs text-slate-300">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] space-y-3">
              <label className="block text-sm font-medium text-slate-300 text-center">How confident did you feel?</label>
              <div className="px-4 max-w-md mx-auto">
                <Slider value={confidence} onValueChange={setConfidence} max={5} min={1} step={1} className="w-full" />
                <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-medium uppercase tracking-wider"><span>Needs Work</span><span>Very Confident</span></div>
              </div>
              <div className="flex items-center justify-center space-x-1 bg-slate-800/30 p-3 rounded-xl mx-auto max-w-[200px]">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`w-6 h-6 transition-colors ${i < confidence[0] ? 'text-amber-400 fill-current' : 'text-slate-600'}`} />)}
                <span className="ml-2 text-lg font-bold text-white">{confidence[0]}<span className="text-slate-500 text-sm">/5</span></span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
              <button onClick={onBack} className="text-sm text-slate-400 hover:text-white">Back to Lessons</button>
              <div className="flex items-center space-x-3">
                {!completed ? (
                  <button onClick={handleComplete} className="text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl"><CheckCircle className="w-4 h-4 mr-1.5 inline" />Mark Complete</button>
                ) : (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1.5 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 text-xs"><CheckCircle className="w-4 h-4" /><span className="font-bold">Great Job!</span></div>
                    {currentExercise < exercises.length - 1 ? (
                      <button onClick={handleNextExercise} className="text-sm font-semibold bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl">Next <ArrowRight className="w-3.5 h-3.5 ml-1 inline" /></button>
                    ) : (
                      <button onClick={handleLessonComplete} className="text-sm font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2 rounded-xl">Finish <Star className="w-3.5 h-3.5 ml-1 inline fill-current" /></button>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default VoiceExercise
