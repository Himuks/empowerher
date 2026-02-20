import React from 'react'
import { motion } from 'framer-motion'
import { Star, Sparkles } from 'lucide-react'

const LevelProgress = ({ level, currentXP, nextLevelXP }) => {
  const percentage = Math.round((currentXP / nextLevelXP) * 100)
  const circumference = 2 * Math.PI * 42

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
      <div className="glass-card p-5 h-full relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-gradient-to-br from-violet-500/15 to-purple-500/10 rounded-full blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-display font-bold text-white text-sm">Level Progress</h3>
          </div>

          <div className="flex items-center justify-center mb-3">
            <div className="relative w-28 h-28">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth="6" />
                <motion.circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke="url(#levelGradient)" strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: circumference * (1 - percentage / 100) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="levelGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-400 mb-0.5" />
                <div className="text-2xl font-display font-extrabold text-white">{level}</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-xs text-slate-400">
              <span className="text-violet-400 font-bold">{currentXP}</span> / {nextLevelXP} XP
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default LevelProgress
