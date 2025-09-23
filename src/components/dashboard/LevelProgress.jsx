import React from 'react'
import { motion } from 'framer-motion'
import { Star, Trophy } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Progress } from '../ui/progress'

const LevelProgress = ({ level, currentXP, nextLevelXP }) => {
  const progressPercentage = (currentXP / nextLevelXP) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <Card className="bg-gradient-to-r from-violet-50 to-purple-50 border-purple-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Trophy className="w-5 h-5 text-purple-600" />
            <span>Level Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">{level}</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900">Level {level}</div>
                <div className="text-sm text-gray-600">Empowerment Journey</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">XP</div>
              <div className="font-semibold">{currentXP}/{nextLevelXP}</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progress to Level {level + 1}</span>
              <span className="text-purple-600 font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>

          <div className="mt-4 flex items-center justify-center space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < level ? 'text-yellow-500 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default LevelProgress
