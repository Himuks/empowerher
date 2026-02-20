import React from 'react'
import { motion } from 'framer-motion'
import { Star, Trophy, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Progress } from '../ui/progress'

const LevelProgress = ({ level, currentXP, nextLevelXP }) => {
  const progressPercentage = (currentXP / nextLevelXP) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className="h-full bg-white/70 backdrop-blur-lg border-purple-200/50 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-lg">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-purple-600" />
              <span className="font-bold text-gray-900">Level Progress</span>
            </div>
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 flex flex-col justify-between h-[calc(100%-4rem)]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-all duration-300">
                <span className="text-white font-black text-2xl">{level}</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 tracking-tight text-lg">Level {level}</div>
                <div className="text-xs font-medium text-purple-600 uppercase tracking-wider">Empowerment Journey</div>
              </div>
            </div>
          </div>

          <div className="space-y-3 mt-auto">
            <div className="flex justify-between items-end text-sm">
              <span className="text-gray-500 font-medium">Progress</span>
              <div className="text-right">
                <span className="text-purple-600 font-bold text-lg">{currentXP}</span>
                <span className="text-gray-400 text-xs font-semibold ml-1">/ {nextLevelXP} XP</span>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-2.5 bg-purple-100" />
          </div>

          <div className="mt-5 flex items-center justify-center space-x-1.5 p-3 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 rounded-xl border border-purple-100/50">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 transition-all duration-300 ${i < level ? 'text-amber-400 fill-amber-400 drop-shadow-sm' : 'text-gray-200'
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
