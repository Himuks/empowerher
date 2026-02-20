import React from 'react'
import { motion } from 'framer-motion'
import { Flame, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const StreakCounter = ({ currentStreak, longestStreak }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className="h-full bg-white/70 backdrop-blur-lg border-red-200/50 shadow-lg relative overflow-hidden group">
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-400/10 rounded-full blur-2xl transition-transform group-hover:scale-150 duration-500"></div>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-lg">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-red-500" />
              <span className="font-bold text-gray-900">Learning Streak</span>
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
            </motion.div>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 flex flex-col justify-between h-[calc(100%-4rem)]">
          <div className="grid grid-cols-2 gap-4 mb-6 relative">
            <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-red-200 to-transparent"></div>
            <div className="text-center group/item hover:-translate-y-1 transition-transform">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-rose-600 mb-1 drop-shadow-sm">
                {currentStreak}
              </div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Current</div>
            </div>
            <div className="text-center group/item hover:-translate-y-1 transition-transform">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-amber-600 mb-1 drop-shadow-sm">
                {longestStreak}
              </div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Best</div>
            </div>
          </div>
          <div className="mt-auto flex items-center justify-center space-x-1.5 p-3 bg-gradient-to-r from-red-50/50 to-orange-50/50 rounded-xl border border-red-100/50">
            {Array.from({ length: Math.min(Math.max(currentStreak, 3), 7) }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className={`relative ${i >= currentStreak ? 'opacity-30 grayscale' : ''}`}
              >
                {i < currentStreak && (
                  <div className="absolute inset-0 bg-red-400 blur-sm rounded-full opacity-50 animate-pulse"></div>
                )}
                <Flame className={`w-5 h-5 relative z-10 ${i < currentStreak ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
              </motion.div>
            ))}
            {currentStreak > 7 && (
              <span className="text-sm font-bold text-red-600 ml-2 bg-red-100 px-2 py-0.5 rounded-full">
                +{currentStreak - 7}
              </span>
            )}
            {currentStreak === 0 && (
              <span className="text-sm font-medium text-gray-500 ml-2">Start today!</span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default StreakCounter
