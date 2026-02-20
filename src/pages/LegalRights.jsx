import React, { useState, useEffect, useCallback } from 'react'
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

    // Enrich lessons with real progress from localStorage
    const enriched = baseLessons.map(lesson => {
      const lessonTraining = trainingProgress.find(
        p => p.module_type === 'legal_rights' && p.lesson_id === lesson.id
      )
      const chapters = (lesson.chapters || []).map(ch => {
        const chProgress = chapterProgress.find(
          p => p.chapter_id === ch.id && p.lesson_id === lesson.id
        )
        return {
          ...ch,
          completed: chProgress?.completion_percentage === 100
        }
      })
      const completedChapters = chapters.filter(c => c.completed).length
      const totalChapters = chapters.length
      const progress = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0
      return {
        ...lesson,
        chapters,
        progress: lessonTraining?.completion_percentage || progress
      }
    })

    setLessons(enriched)

    // Calculate overall module progress
    if (enriched.length > 0) {
      const totalProgress = enriched.reduce((sum, l) => sum + (l.progress || 0), 0)
      setModuleProgress(Math.round(totalProgress / enriched.length))
    }

    // Get real points
    const points = await getModulePoints('legal_rights')
    setModulePoints(points)
  }, [])

  useEffect(() => {
    loadProgress()
  }, [loadProgress])

  const handleStartChapter = (lesson, chapter) => {
    setActiveLesson(lesson)
    setActiveChapter(chapter)
  }

  const handleBackFromStory = () => {
    setActiveChapter(null)
    setActiveLesson(null)
    loadProgress()
  }

  const handleChapterComplete = () => {
    setActiveChapter(null)
    setActiveLesson(null)
    loadProgress()
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'basic': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-orange-100 text-orange-800'
      case 'expert': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // If a chapter is active, show the StoryPlayer
  if (activeChapter && activeLesson) {
    return (
      <StoryPlayer
        lessonId={activeLesson.id}
        chapterId={activeChapter.id}
        chapterTitle={activeChapter.title}
        onBack={handleBackFromStory}
        onComplete={handleChapterComplete}
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
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
                <div className="text-3xl font-bold text-amber-600 mb-2">{modulePoints}</div>
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
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
                <Card className={`hover:shadow-lg transition-all duration-200 ${isLocked ? 'opacity-60' : ''}`}>
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
                        <p className={`text-sm leading-relaxed ${isLocked ? 'text-gray-400' : 'text-gray-600'}`}>
                          {lesson.description}
                        </p>
                      </div>
                      <Badge className={getDifficultyColor(lesson.difficulty)} variant="outline">
                        {lesson.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className={`font-medium ${isLocked ? 'text-gray-400' : 'text-blue-600'}`}>
                          {lesson.progress || 0}%
                        </span>
                      </div>
                      <Progress value={lesson.progress || 0} className="h-2" />
                    </div>

                    {/* Chapters */}
                    {lesson.chapters && (
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">
                          Chapters ({completedChapters}/{totalChapters})
                        </div>
                        <div className="space-y-1">
                          {lesson.chapters.map((chapter) => (
                            <div
                              key={chapter.id}
                              className={`flex items-center justify-between text-sm p-2 rounded-lg ${!isLocked ? 'hover:bg-blue-50 cursor-pointer' : ''
                                }`}
                              onClick={() => !isLocked && handleStartChapter(lesson, chapter)}
                            >
                              <div className="flex items-center space-x-2">
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
                              {!isLocked && !chapter.completed && (
                                <Play className="w-3 h-3 text-blue-500" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="pt-2">
                      <Button
                        className={`w-full ${isLocked
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700'
                          }`}
                        disabled={isLocked}
                        onClick={() => {
                          if (!isLocked && lesson.chapters?.length > 0) {
                            const nextChapter = lesson.chapters.find(c => !c.completed) || lesson.chapters[0]
                            handleStartChapter(lesson, nextChapter)
                          }
                        }}
                      >
                        {isLocked ? (
                          <><Lock className="w-4 h-4 mr-2" /> Complete Previous Lesson</>
                        ) : lesson.progress === 100 ? (
                          <><Star className="w-4 h-4 mr-2" /> Review Lesson</>
                        ) : lesson.progress > 0 ? (
                          <><Play className="w-4 h-4 mr-2" /> Continue Lesson</>
                        ) : (
                          <><Play className="w-4 h-4 mr-2" /> Start Lesson</>
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
    </div>
  )
}

export default LegalRights
