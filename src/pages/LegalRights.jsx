import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Scale, 
  Star, 
  Lock, 
  Play,
  CheckCircle,
  Book
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Progress } from '../components/ui/progress'
import { Badge } from '../components/ui/badge'
import { mockLessons } from '../lib/mockData'

const LegalRights = () => {
  const [lessons] = useState(mockLessons.legal_rights || [])
  const [moduleProgress, setModuleProgress] = useState(0)

  useEffect(() => {
    // Calculate overall module progress
    if (lessons.length > 0) {
      const totalProgress = lessons.reduce((sum, lesson) => sum + (lesson.progress || 0), 0)
      setModuleProgress(Math.round(totalProgress / lessons.length))
    }
  }, [lessons])

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'basic': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-orange-100 text-orange-800'
      case 'expert': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
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
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Legal Rights & Procedures</h1>
            <p className="text-gray-600">Know your rights and how to exercise them</p>
          </div>
        </div>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-blue-50 to-sky-50 border-blue-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{moduleProgress}%</div>
                <div className="text-sm text-gray-600">Module Progress</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {lessons.filter(l => l.progress === 100).length}
                </div>
                <div className="text-sm text-gray-600">Lessons Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600 mb-2">125</div>
                <div className="text-sm text-gray-600">Points Earned</div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Overall Progress</span>
                <span className="text-blue-600 font-medium">{moduleProgress}%</span>
              </div>
              <Progress value={moduleProgress} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Lessons Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {lessons.map((lesson, index) => {
            const isLocked = index > 0 && lessons[index - 1].progress < 100
            const completedChapters = lesson.chapters?.filter(c => c.completed).length || 0
            const totalChapters = lesson.chapters?.length || 0
            
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className={`hover:shadow-lg transition-all duration-200 ${
                  isLocked ? 'opacity-60' : ''
                }`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center space-x-2 mb-2">
                          {isLocked ? (
                            <Lock className="w-5 h-5 text-gray-400" />
                          ) : lesson.progress === 100 ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <Book className="w-5 h-5 text-blue-600" />
                          )}
                          <span className={isLocked ? 'text-gray-400' : ''}>{lesson.title}</span>
                        </CardTitle>
                        <p className={`text-sm leading-relaxed ${
                          isLocked ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {lesson.description}
                        </p>
                      </div>
                      <Badge 
                        className={getDifficultyColor(lesson.difficulty)}
                        variant="outline"
                      >
                        {lesson.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className={`font-medium ${
                          isLocked ? 'text-gray-400' : 'text-blue-600'
                        }`}>
                          {lesson.progress || 0}%
                        </span>
                      </div>
                      <Progress value={lesson.progress || 0} className="h-2" />
                    </div>

                    {/* Chapters Preview */}
                    {lesson.chapters && (
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">
                          Chapters ({completedChapters}/{totalChapters})
                        </div>
                        <div className="space-y-1">
                          {lesson.chapters.slice(0, 3).map((chapter, chapterIndex) => (
                            <div key={chapter.id} className="flex items-center space-x-2 text-sm">
                              {chapter.completed ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                              )}
                              <span className={chapter.completed ? 'text-gray-900' : 'text-gray-600'}>
                                {chapter.title}
                              </span>
                              <span className="text-xs text-gray-500">
                                ({chapter.scenarios} scenarios)
                              </span>
                            </div>
                          ))}
                          {lesson.chapters.length > 3 && (
                            <div className="text-xs text-gray-500 pl-6">
                              +{lesson.chapters.length - 3} more chapters
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="pt-2">
                      <Button 
                        className={`w-full ${
                          isLocked 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700'
                        }`}
                        disabled={isLocked}
                      >
                        {isLocked ? (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Complete Previous Lesson
                          </>
                        ) : lesson.progress === 100 ? (
                          <>
                            <Star className="w-4 h-4 mr-2" />
                            Review Lesson
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
            )
          })}
        </div>
      </motion.div>

      {/* Coming Soon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center mx-auto mb-4">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">More Lessons Coming Soon</h3>
            <p className="text-gray-600 mb-4">
              We're continuously adding new content to help you understand your legal rights better.
            </p>
            <div className="text-sm text-gray-500">
              Next update: Advanced Legal Procedures & Court Navigation
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default LegalRights
