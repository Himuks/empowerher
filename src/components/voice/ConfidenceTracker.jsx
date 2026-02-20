import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, TrendingUp, MessageCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Progress } from '../ui/progress'
import { mockEntityOperations, getRelativeTime } from '../../lib/utils'

const ConfidenceTracker = () => {
  const [averageConfidence, setAverageConfidence] = useState(0)
  const [recentProgress, setRecentProgress] = useState([])

  useEffect(() => {
    const loadConfidenceData = async () => {
      const progress = await mockEntityOperations.list('TrainingProgress')
      const voiceProgress = progress.filter(p => p.module_type === 'voice_assertiveness' && p.confidence_level)

      if (voiceProgress.length > 0) {
        const avg = voiceProgress.reduce((sum, p) => sum + p.confidence_level, 0) / voiceProgress.length
        setAverageConfidence(avg)
        setRecentProgress(voiceProgress.map(p => ({
          lesson: p.lesson_title || p.lesson_id,
          confidence: p.confidence_level,
          date: getRelativeTime(p.updatedAt || p.createdAt)
        })))
      } else {
        // Defaults for first-time users
        setAverageConfidence(0)
        setRecentProgress([])
      }
    }
    loadConfidenceData()
  }, [])

  const confidencePercentage = (averageConfidence / 5) * 100

  const getConfidenceColor = (confidence) => {
    if (confidence >= 4) return 'text-green-600'
    if (confidence >= 3) return 'text-yellow-600'
    return 'text-orange-600'
  }

  const getConfidenceLabel = (confidence) => {
    if (confidence >= 4.5) return 'Excellent'
    if (confidence >= 4) return 'Very Good'
    if (confidence >= 3) return 'Good'
    if (confidence >= 2) return 'Improving'
    if (confidence > 0) return 'Getting Started'
    return 'No data yet'
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
      <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-purple-600" />
            <span>Confidence Tracker</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Average Confidence */}
          <div className="text-center space-y-3">
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {averageConfidence > 0 ? averageConfidence.toFixed(1) : '—'}/5
              </div>
              <div className="text-sm text-gray-600">Average Confidence Level</div>
              <div className="text-sm font-medium text-purple-700">
                {getConfidenceLabel(averageConfidence)}
              </div>
            </div>

            {/* Visual Stars */}
            <div className="flex items-center justify-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${i < Math.floor(averageConfidence)
                      ? 'text-yellow-500 fill-current'
                      : i < averageConfidence
                        ? 'text-yellow-500 fill-current opacity-50'
                        : 'text-gray-300'
                    }`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progress to Excellence</span>
                <span className="text-purple-600 font-medium">{Math.round(confidencePercentage)}%</span>
              </div>
              <Progress value={confidencePercentage} className="h-3" />
            </div>
          </div>

          {/* Recent Progress */}
          {recentProgress.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span className="font-medium text-gray-900">Recent Progress</span>
              </div>
              <div className="space-y-3">
                {recentProgress.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-purple-100"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">{item.lesson}</div>
                      <div className="text-xs text-gray-500">{item.date}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < item.confidence ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className={`text-sm font-medium ${getConfidenceColor(item.confidence)}`}>
                        {item.confidence}/5
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500">Complete voice exercises to track your confidence growth!</p>
            </div>
          )}

          {/* Motivational Message */}
          <div className="text-center p-4 bg-gradient-to-r from-purple-100 to-violet-100 rounded-lg">
            <div className="text-sm text-purple-800">
              {averageConfidence >= 4
                ? "🎉 You're building excellent confidence! Keep practicing to maintain this momentum."
                : averageConfidence >= 3
                  ? "📈 You're making great progress! Regular practice will boost your confidence even more."
                  : averageConfidence > 0
                    ? "🌱 Every practice session builds your confidence. You're on the right path!"
                    : "🎯 Start your first voice exercise to begin tracking your confidence journey!"}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ConfidenceTracker
