import React from 'react'
import { motion } from 'framer-motion'
import { Flame, Calendar } from 'lucide-react'

const StreakCounter = ({ currentStreak, longestStreak }) => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <div className="glass-card p-5 h-full relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-gradient-to-br from-orange-500/15 to-red-500/10 rounded-full blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Flame className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-display font-bold text-white text-sm">Streak</h3>
            </div>
            <div className="flex items-center space-x-1 text-xs text-slate-400">
              <Calendar className="w-3 h-3" />
              <span>Best: {longestStreak}d</span>
            </div>
          </div>

          <div className="text-center mb-4">
            <div className="text-4xl font-display font-extrabold text-white">
              {currentStreak}
            </div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">day streak</div>
          </div>

          <div className="flex justify-between gap-1.5">
            {days.map((day, i) => {
              const isActive = i < currentStreak % 7 || currentStreak >= 7
              return (
                <div key={i} className="flex-1 text-center">
                  <div className={`w-full aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${isActive
                    ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-md shadow-orange-500/20'
                    : 'bg-slate-800/50 text-slate-500 border border-slate-700/50'
                    }`}>
                    {day}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default StreakCounter
