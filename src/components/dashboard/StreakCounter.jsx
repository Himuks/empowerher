import React from 'react'
import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const StreakCounter = ({ currentStreak, longestStreak }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <Card className="bg-gradient-to-r from-red-50 to-rose-50 border-red-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Flame className="w-5 h-5 text-red-500" />
            <span>Learning Streak</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-1">
                {currentStreak}
              </div>
              <div className="text-sm text-gray-600">Current</div>
            </div>
            <div className="text-center border-l border-red-200 pl-4">
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {longestStreak}
              </div>
              <div className="text-sm text-gray-600">Best</div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center space-x-1">
            {Array.from({ length: Math.min(currentStreak, 7) }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <Flame className="w-4 h-4 text-red-500" />
              </motion.div>
            ))}
            {currentStreak > 7 && (
              <span className="text-sm text-gray-500 ml-2">
                +{currentStreak - 7} more
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default StreakCounter
