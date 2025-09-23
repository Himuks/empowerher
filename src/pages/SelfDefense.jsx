import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Shield, 
  Play, 
  Clock, 
  Star,
  CheckCircle,
  Target,
  AlertTriangle,
  Book
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Progress } from '../components/ui/progress'
import { Badge } from '../components/ui/badge'
import TechniqueGuide from '../components/defense/TechniqueGuide'
import SafetyTips from '../components/defense/SafetyTips'
import { mockLessons } from '../lib/mockData'

const SelfDefense = () => {
  const [lessons] = useState(mockLessons.self_defense || [])
  const [moduleProgress, setModuleProgress] = useState(0)
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [showTechnique, setShowTechnique] = useState(false)

  useEffect(() => {
    // Calculate overall module progress
    if (lessons.length > 0) {
      const totalProgress = lessons.reduce((sum, lesson) => sum + (lesson.progress || 0), 0)
      setModuleProgress(Math.round(totalProgress / lessons.length))
    }
  }, [lessons])

  const handleStartLesson = (lesson) => {
    setSelectedLesson(lesson)
    setShowTechnique(true)
  }

  const handleTechniqueComplete = (data) => {
    if (data.lessonComplete) {
      setShowTechnique(false)
      setSelectedLesson(null)
      // In real app, update lesson progress
    }
  }

  const handleBackToLessons = () => {
    setShowTechnique(false)
    setSelectedLesson(null)
  }

  if (showTechnique && selectedLesson) {
    return (
      <TechniqueGuide
        lessonTitle={selectedLesson.title}
        onComplete={handleTechniqueComplete}
        onBack={handleBackToLessons}
      />
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4"
      >
        <Link to="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Self Defense Training</h1>
            <p className="text-gray-600">Learn essential techniques for personal safety and protection</p>
          </div>
        </div>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{moduleProgress}%</div>
                <div className="text-sm text-gray-600">Module Progress</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {lessons.filter(l => l.progress === 100).length}
                </div>
                <div className="text-sm text-gray-600">Lessons Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600 mb-2">60</div>
                <div className="text-sm text-gray-600">Points Earned</div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Overall Progress</span>
                <span className="text-green-600 font-medium">{moduleProgress}%</span>
              </div>
              <Progress value={moduleProgress} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Reference and Safety Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TechniqueGuide standalone={true} />
        <SafetyTips />
      </div>

      {/* Important Safety Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-to-r from-red-50 to-rose-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-red-800 mb-2">Important Safety Disclaimer</h3>
                <div className="text-red-700 text-sm space-y-2">
                  <p>
                    Self-defense techniques should only be used when you genuinely feel threatened and have no other options for escape or de-escalation.
                  </p>
                  <p>
                    <strong>Remember:</strong> The goal is always to create an opportunity to escape safely, not to engage in prolonged confrontation.
                  </p>
                  <p>
                    These techniques require practice to be effective. Consider taking in-person self-defense classes for hands-on training.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Lessons Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-600" />
              <span>Self Defense Lessons</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {lessons.map((lesson, index) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-200">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="flex items-center space-x-2 mb-2">
                            {lesson.progress === 100 ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : lesson.progress > 0 ? (
                              <Play className="w-5 h-5 text-green-600" />
                            ) : (
                              <Book className="w-5 h-5 text-gray-400" />
                            )}
                            <span>{lesson.title}</span>
                          </CardTitle>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {lesson.description}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Lesson Details */}
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{lesson.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="w-4 h-4" />
                          <span>{lesson.topics?.length || 0} techniques</span>
                        </div>
                      </div>

                      {/* Topics/Techniques */}
                      {lesson.topics && (
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-gray-700">Techniques covered:</div>
                          <div className="flex flex-wrap gap-2">
                            {lesson.topics.map((topic, topicIndex) => (
                              <Badge 
                                key={topicIndex}
                                className="bg-green-100 text-green-800 text-xs"
                                variant="outline"
                              >
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="text-green-600 font-medium">
                            {lesson.progress || 0}%
                          </span>
                        </div>
                        <Progress value={lesson.progress || 0} className="h-2" />
                      </div>

                      {/* Action Button */}
                      <div className="pt-2">
                        <Button 
                          className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
                          onClick={() => handleStartLesson(lesson)}
                        >
                          {lesson.progress === 100 ? (
                            <>
                              <Star className="w-4 h-4 mr-2" />
                              Review Techniques
                            </>
                          ) : lesson.progress > 0 ? (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Continue Lesson
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Start Lesson
                            </>
                          )}
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

      {/* Additional Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              <span>Additional Training Resources</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border border-emerald-100">
                <h4 className="font-medium text-gray-900 mb-2">Local Classes</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Find in-person self-defense classes in your area for hands-on practice.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Find Classes
                </Button>
              </div>
              
              <div className="p-4 bg-white rounded-lg border border-emerald-100">
                <h4 className="font-medium text-gray-900 mb-2">Video Tutorials</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Watch detailed video demonstrations of each technique.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Watch Videos
                </Button>
              </div>
              
              <div className="p-4 bg-white rounded-lg border border-emerald-100">
                <h4 className="font-medium text-gray-900 mb-2">Practice Partner</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Learn how to practice safely with a trusted friend or family member.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Learn More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default SelfDefense
