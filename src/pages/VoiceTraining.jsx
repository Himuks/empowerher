import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  MessageCircle,
  Play,
  Clock,
  Star,
  CheckCircle,
  Mic,
  Volume2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Progress } from '../components/ui/progress'
import { Badge } from '../components/ui/badge'
import VoiceExercise from '../components/voice/VoiceExercise'
import ConfidenceTracker from '../components/voice/ConfidenceTracker'
import { mockLessons } from '../lib/mockData'
import { mockEntityOperations, getModulePoints } from '../lib/utils'

const VoiceTraining = () => {
  const [lessons, setLessons] = useState([])
  const [moduleProgress, setModuleProgress] = useState(0)
  const [modulePoints, setModulePoints] = useState(0)
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [showExercise, setShowExercise] = useState(false)

  const loadProgress = useCallback(async () => {
    const baseLessons = mockLessons.voice_assertiveness || []
    const trainingProgress = await mockEntityOperations.list('TrainingProgress')

    const enriched = baseLessons.map(lesson => {
      const saved = trainingProgress.find(
        p => p.module_type === 'voice_assertiveness' && p.lesson_id === lesson.id
      )
      return { ...lesson, progress: saved?.completion_percentage || 0 }
    })

    setLessons(enriched)
    if (enriched.length > 0) {
      const totalProgress = enriched.reduce((sum, l) => sum + (l.progress || 0), 0)
      setModuleProgress(Math.round(totalProgress / enriched.length))
    }
    const points = await getModulePoints('voice_assertiveness')
    setModulePoints(points)
  }, [])

  useEffect(() => { loadProgress() }, [loadProgress])

  const handleStartLesson = (lesson) => {
    setSelectedLesson(lesson)
    setShowExercise(true)
  }

  const handleExerciseComplete = () => {
    setShowExercise(false)
    setSelectedLesson(null)
    loadProgress()
  }

  const handleBackToLessons = () => {
    setShowExercise(false)
    setSelectedLesson(null)
    loadProgress()
  }

  if (showExercise && selectedLesson) {
    return (
      <VoiceExercise
        lessonId={selectedLesson.id}
        lessonTitle={selectedLesson.title}
        onComplete={handleExerciseComplete}
        onBack={handleBackToLessons}
      />
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center space-x-4">
        <Link to="/"><Button variant="outline" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Voice Assertiveness Training</h1>
            <p className="text-gray-600">Build confidence in speaking up and setting boundaries</p>
          </div>
        </div>
      </motion.div>

      {/* Progress Overview */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{moduleProgress}%</div>
                <div className="text-sm text-gray-600">Module Progress</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {lessons.filter(l => l.progress === 100).length}
                </div>
                <div className="text-sm text-gray-600">Lessons Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600 mb-2">{modulePoints}</div>
                <div className="text-sm text-gray-600">Points Earned</div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Overall Progress</span>
                <span className="text-purple-600 font-medium">{moduleProgress}%</span>
              </div>
              <Progress value={moduleProgress} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Daily Voice Practice and Confidence Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VoiceExercise standalone={true} />
        <ConfidenceTracker />
      </div>

      {/* Lessons Grid */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5 text-purple-600" />
              <span>Voice Training Lessons</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {lessons.map((lesson, index) => (
                <motion.div key={lesson.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.1 }}>
                  <Card className="hover:shadow-lg transition-all duration-200">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="flex items-center space-x-2 mb-2">
                            {lesson.progress === 100 ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : lesson.progress > 0 ? (
                              <Play className="w-5 h-5 text-purple-600" />
                            ) : (
                              <Mic className="w-5 h-5 text-gray-400" />
                            )}
                            <span>{lesson.title}</span>
                          </CardTitle>
                          <p className="text-sm text-gray-600 leading-relaxed">{lesson.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1"><Clock className="w-4 h-4" /><span>{lesson.duration}</span></div>
                        <div className="flex items-center space-x-1"><Star className="w-4 h-4" /><span>{lesson.topics?.length || 0} topics</span></div>
                      </div>
                      {lesson.topics && (
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-gray-700">Topics covered:</div>
                          <div className="flex flex-wrap gap-2">
                            {lesson.topics.map((topic, topicIndex) => (
                              <Badge key={topicIndex} className="bg-purple-100 text-purple-800 text-xs" variant="outline">{topic}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="text-purple-600 font-medium">{lesson.progress || 0}%</span>
                        </div>
                        <Progress value={lesson.progress || 0} className="h-2" />
                      </div>
                      <div className="pt-2">
                        <Button
                          className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                          onClick={() => handleStartLesson(lesson)}
                        >
                          {lesson.progress === 100 ? (<><Star className="w-4 h-4 mr-2" />Review Lesson</>) :
                            lesson.progress > 0 ? (<><Play className="w-4 h-4 mr-2" />Continue Lesson</>) :
                              (<><Play className="w-4 h-4 mr-2" />Start Lesson</>)}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tips Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-violet-600" />
              <span>Voice Training Tips</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Building Confidence</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2"><CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" /><span>Practice in front of a mirror to build comfort</span></li>
                  <li className="flex items-start space-x-2"><CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" /><span>Start with low-stakes situations</span></li>
                  <li className="flex items-start space-x-2"><CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" /><span>Focus on your breathing and posture</span></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Effective Communication</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2"><CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" /><span>Use "I" statements to express your needs</span></li>
                  <li className="flex items-start space-x-2"><CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" /><span>Maintain steady eye contact</span></li>
                  <li className="flex items-start space-x-2"><CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" /><span>Speak slowly and clearly</span></li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default VoiceTraining
