import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play,
  Pause,
  RotateCcw,
  Mic,
  Star,
  CheckCircle,
  ArrowRight,
  Timer,
  AlertCircle,
  Volume2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Slider } from '../ui/slider'
import { Badge } from '../ui/badge'
import { mockEntityOperations, updateUserStats, logActivity } from '../../lib/utils'
import { voiceExercises } from '../../lib/mockData'

const VoiceExercise = ({
  standalone = false,
  lessonId = "",
  lessonTitle = "",
  onComplete = () => { },
  onBack = () => { }
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [confidence, setConfidence] = useState([3])
  const [completed, setCompleted] = useState(false)
  const [timer, setTimer] = useState(0)
  const intervalRef = useRef(null)

  // Speech Recognition States
  const [transcript, setTranscript] = useState("")
  const [feedback, setFeedback] = useState(null)
  const [isListening, setIsListening] = useState(false)
  const [browserSupported, setBrowserSupported] = useState(true)
  const recognitionRef = useRef(null)

  const exercises = lessonId && voiceExercises[lessonId]
    ? voiceExercises[lessonId]
    : [
      {
        title: "Practice saying 'No' clearly",
        scenario: "Someone is pushing you to do something you don't want to.",
        practicePhrase: "No, I can't do that. I have other priorities.",
        tips: ["Keep your voice steady", "Maintain eye contact", "Stand tall", "Speak slowly and clearly"]
      },
      {
        title: "Express your opinion confidently",
        scenario: "Your idea was dismissed in a meeting.",
        practicePhrase: "I'd like to revisit my suggestion. Here's why I believe it has merit...",
        tips: ["Use confident body language", "Keep voice calm", "Be respectful but firm", "Don't apologize for your opinion"]
      },
      {
        title: "Request what you need",
        scenario: "Someone keeps interrupting you when you speak.",
        practicePhrase: "Please let me finish my point before responding.",
        tips: ["Be direct and specific", "Use 'I' statements", "Keep tone professional", "Don't over-explain"]
      }
    ]

  const exercise = exercises[currentExercise]

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setBrowserSupported(false)
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true)
      };

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript)
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        if (event.error === 'not-allowed') {
          setFeedback({ type: 'error', message: 'Microphone access denied. Please allow microphone permissions.' })
        } else {
          setFeedback({ type: 'error', message: `Speech recognition error: ${event.error}` })
        }
        setIsPlaying(false)
        setIsListening(false)
      };

      recognition.onend = () => {
        setIsListening(false)
      };

      recognitionRef.current = recognition;
    } catch (e) {
      console.error(e)
      setBrowserSupported(false)
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => setTimer(t => t + 1), 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isPlaying])

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const evaluateSpeech = (spoken, target) => {
    if (!spoken || spoken.trim() === '') return;

    const cleanSpoken = spoken.toLowerCase().replace(/[.,!?;:]/g, '').trim()
    const cleanTarget = target.toLowerCase().replace(/[.,!?;:]/g, '').trim()

    // Calculate word overlap
    const spokenWords = cleanSpoken.split(' ')
    const targetWords = cleanTarget.split(' ')

    let matches = 0;
    targetWords.forEach(word => {
      if (spokenWords.includes(word)) matches++;
    })

    const matchPercentage = matches / targetWords.length;

    if (matchPercentage > 0.7) {
      setFeedback({ type: 'success', message: 'Excellent! You spoke clearly and confidently.' })
      setConfidence([Math.max(4, confidence[0])]) // Auto boost confidence for good delivery
      setCompleted(true)
    } else if (matchPercentage > 0.4) {
      setFeedback({ type: 'warning', message: 'Good start. Try to enunciate the key words a bit more clearly.' })
    } else {
      setFeedback({ type: 'error', message: 'Didn\'t quite catch that. Try speaking louder and matching the phrase.' })
    }
  }

  const handlePracticeToggle = () => {
    if (!browserSupported) {
      setIsPlaying(!isPlaying)
      return;
    }

    if (isPlaying) {
      // Stopping
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsPlaying(false)
      if (transcript) {
        evaluateSpeech(transcript, exercise.practicePhrase)
      }
    } else {
      // Starting
      setTranscript("")
      setFeedback(null)
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.error(e) // Handle case where it's already started
        }
      }
      setIsPlaying(true)
    }
  }

  const handleRestart = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
    setIsPlaying(false)
    setConfidence([3])
    setTimer(0)
    setTranscript("")
    setFeedback(null)
    setCompleted(false)
  }

  const handleComplete = async () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
    setIsPlaying(false)
    setCompleted(true)

    if (!standalone && lessonId) {
      const pointsEarned = 15 + (confidence[0] * 3)

      // Save to TrainingProgress
      await mockEntityOperations.upsert(
        'TrainingProgress',
        (p) => p.module_type === 'voice_assertiveness' && p.lesson_id === lessonId,
        {
          module_type: 'voice_assertiveness',
          lesson_id: lessonId,
          lesson_title: lessonTitle,
          completion_percentage: Math.round(((currentExercise + 1) / exercises.length) * 100),
          points_earned: pointsEarned,
          confidence_level: confidence[0],
          time_spent: timer,
          last_accessed: new Date().toISOString()
        }
      )
    }
  }

  const handleNextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      handleRestart()
    }
  }

  const handleLessonComplete = async () => {
    if (!standalone && lessonId) {
      const pointsEarned = 25 + (confidence[0] * 5)

      await mockEntityOperations.upsert(
        'TrainingProgress',
        (p) => p.module_type === 'voice_assertiveness' && p.lesson_id === lessonId,
        {
          module_type: 'voice_assertiveness',
          lesson_id: lessonId,
          lesson_title: lessonTitle,
          completion_percentage: 100,
          points_earned: pointsEarned,
          confidence_level: confidence[0],
          time_spent: timer,
          last_accessed: new Date().toISOString()
        }
      )

      await updateUserStats(pointsEarned)
      await logActivity({
        module_type: 'voice_assertiveness',
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
        <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mic className="w-5 h-5 text-purple-600" />
              <span>Daily Voice Practice</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 italic">
              "The most courageous act is still to think for yourself. Aloud."
            </p>
            <Button
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-md transition-all group"
              onClick={() => { }}
            >
              <Volume2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Go to Voice Training
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{lessonTitle}</h2>
          <p className="text-gray-600">Exercise {currentExercise + 1} of {exercises.length}</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className="bg-purple-100 text-purple-800" variant="outline">Voice Training</Badge>
          {timer > 0 && (
            <Badge className="bg-gray-100 text-gray-800" variant="outline">
              <Timer className="w-3 h-3 mr-1" />{formatTime(timer)}
            </Badge>
          )}
        </div>
      </motion.div>

      {/* Exercise Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="border-purple-100 shadow-lg">
          <CardHeader className="bg-white rounded-t-xl border-b border-purple-50">
            <CardTitle className="flex items-center space-x-2">
              <Mic className="w-5 h-5 text-purple-600" />
              <span>{exercise.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">

            {/* Browser Support Warning */}
            {!browserSupported && (
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center space-x-2 text-amber-800 font-medium mb-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>Browser Not Supported</span>
                </div>
                <p className="text-sm text-amber-700">
                  Your browser does not support the Web Speech API. You can still use the timer and self-evaluate, but automatic voice recognition will be disabled. We recommend using Chrome for the full experience.
                </p>
              </div>
            )}

            {/* Scenario */}
            {exercise.scenario && (
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                <div className="text-sm font-medium text-purple-800 mb-1">Scenario:</div>
                <p className="text-gray-700">{exercise.scenario}</p>
              </div>
            )}

            {/* Practice Phrase */}
            {exercise.practicePhrase && (
              <div className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                <div className="text-sm font-medium text-indigo-800 mb-3 uppercase tracking-wider">Say this out loud:</div>
                <p className="text-2xl font-semibold text-gray-900 leading-relaxed tracking-tight">"{exercise.practicePhrase}"</p>
              </div>
            )}

            {/* Live Transcript & Feedback */}
            <AnimatePresence>
              {(transcript || feedback) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
                    <div>
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Your Speech:</div>
                      <p className="text-lg text-gray-800 italic">{transcript || "..."}</p>
                    </div>

                    {feedback && (
                      <div className={`p-3 rounded-lg flex items-start space-x-2 text-sm ${feedback.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
                          feedback.type === 'warning' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                            'bg-red-100 text-red-800 border border-red-200'
                        }`}>
                        {feedback.type === 'success' ? <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" /> : <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />}
                        <span className="font-medium">{feedback.message}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Practice Controls */}
            <div className="flex flex-col items-center justify-center space-y-4 py-4">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="lg" onClick={handleRestart} className="flex items-center space-x-2 border-gray-300">
                  <RotateCcw className="w-5 h-5 text-gray-600" /><span>Reset</span>
                </Button>
                <div className="relative">
                  {isListening && (
                    <div className="absolute inset-0 bg-red-400 rounded-lg animate-ping opacity-20"></div>
                  )}
                  <Button
                    size="lg"
                    onClick={handlePracticeToggle}
                    className={`relative z-10 flex items-center space-x-2 transition-all duration-300 shadow-lg ${isListening ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white hover:shadow-xl hover:-translate-y-0.5'
                      }`}
                  >
                    {isListening ? (
                      <><Mic className="w-5 h-5 animate-pulse" /><span>Stop Listening</span></>
                    ) : (
                      <><Mic className="w-5 h-5" /><span>{transcript ? 'Retry Practice' : 'Start Practice'}</span></>
                    )}
                  </Button>
                </div>
              </div>
              {timer > 0 && <span className="text-sm font-medium text-gray-500 font-mono">Time: {formatTime(timer)}</span>}
            </div>

            {/* Tips */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                <Star className="w-4 h-4 text-amber-500" />
                <span>Pro Tips</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exercise.tips.map((tip, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700 font-medium">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Confidence Rating */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                  How confident did you feel delivering this?
                </label>
                <div className="px-4 max-w-md mx-auto">
                  <Slider value={confidence} onValueChange={setConfidence} max={5} min={1} step={1} className="w-full" />
                  <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium uppercase tracking-wider">
                    <span>Needs Work</span>
                    <span>Very Confident</span>
                  </div>
                </div>
                <div className="flex items-center justify-center mt-4 bg-gray-50 p-3 rounded-lg mx-auto max-w-[200px]">
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-6 h-6 transition-colors ${i < confidence[0] ? 'text-amber-500 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="ml-3 text-lg font-bold text-gray-900">{confidence[0]}<span className="text-gray-400 text-sm">/5</span></span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              <Button variant="ghost" onClick={onBack} className="text-gray-600 hover:text-gray-900">Back to Lessons</Button>
              <div className="flex items-center space-x-3">
                {!completed ? (
                  <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all">
                    <CheckCircle className="w-4 h-4 mr-2" /> Mark as Complete
                  </Button>
                ) : (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-bold">Great Job!</span>
                    </div>
                    {currentExercise < exercises.length - 1 ? (
                      <Button onClick={handleNextExercise} className="bg-purple-600 hover:bg-purple-700 text-white shadow-md">
                        Next Exercise <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button onClick={handleLessonComplete} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md">
                        Finish Lesson <Star className="w-4 h-4 ml-2 fill-current" />
                      </Button>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default VoiceExercise

