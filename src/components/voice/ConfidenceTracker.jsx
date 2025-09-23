import React from 'react'
import { motion } from 'framer-motion'
import { Star, TrendingUp, MessageCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Progress } from '../ui/progress'

const ConfidenceTracker = ({ averageConfidence = 3.5, recentProgress = [] }) => {
  const defaultProgress = [
    { lesson: 'Learning to Say No', confidence: 4, date: '2 days ago' },
    { lesson: 'Confident Public Speaking', confidence: 3, date: '5 days ago' },
    { lesson: 'Expressing Opinions', confidence: 4, date: '1 week ago' },
  ]

  const progressData = recentProgress.length > 0 ? recentProgress : defaultProgress
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
    return 'Getting Started'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
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
                {averageConfidence.toFixed(1)}/5
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
                  className={`w-6 h-6 ${
                    i < Math.floor(averageConfidence) 
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
                <span className="text-purple-600 font-medium">
                  {Math.round(confidencePercentage)}%
                </span>
              </div>
              <Progress value={confidencePercentage} className="h-3" />
            </div>
          </div>

          {/* Recent Progress */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="font-medium text-gray-900">Recent Progress</span>
            </div>
            
            <div className="space-y-3">
              {progressData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-purple-100"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">
                      {item.lesson}
                    </div>
                    <div className="text-xs text-gray-500">{item.date}</div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < item.confidence 
                              ? 'text-yellow-500 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
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

          {/* Motivational Message */}
          <div className="text-center p-4 bg-gradient-to-r from-purple-100 to-violet-100 rounded-lg">
            <div className="text-sm text-purple-800">
              {averageConfidence >= 4 
                ? "🎉 You're building excellent confidence! Keep practicing to maintain this momentum."
                : averageConfidence >= 3 
                  ? "📈 You're making great progress! Regular practice will boost your confidence even more."
                  : "🌱 Every practice session builds your confidence. You're on the right path!"
              }
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ConfidenceTracker
