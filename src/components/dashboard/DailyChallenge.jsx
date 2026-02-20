import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, CheckCircle, ArrowRight } from 'lucide-react'
import { mockChallenges } from '../../lib/mockData'
import { mockEntityOperations, updateUserStats, logActivity } from '../../lib/utils'

const DailyChallenge = () => {
  const [challenge, setChallenge] = useState(null)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const loadChallenge = async () => {
      const today = new Date().toDateString()
      const existing = await mockEntityOperations.list('DailyChallenge')
      const todayChallenge = existing.find(c => c.date === today)
      if (todayChallenge) {
        setChallenge(todayChallenge)
        setCompleted(todayChallenge.completed)
      } else {
        const random = mockChallenges[Math.floor(Math.random() * mockChallenges.length)]
        const created = await mockEntityOperations.create('DailyChallenge', { ...random, date: today, completed: false })
        setChallenge(created)
      }
    }
    loadChallenge()
  }, [])

  const handleComplete = async () => {
    if (!challenge || completed) return
    await mockEntityOperations.update('DailyChallenge', challenge.id, { completed: true })
    await updateUserStats(challenge.points)
    await logActivity({ module_type: 'daily_challenge', title: challenge.title, type: 'challenge', points: challenge.points, status: 'completed' })
    setCompleted(true)
  }

  if (!challenge) return null

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
      <div className="glass-card p-5 h-full relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-gradient-to-br from-amber-500/15 to-orange-500/10 rounded-full blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-display font-bold text-white text-sm">Daily Challenge</h3>
            </div>
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full">+{challenge.points} pts</span>
          </div>
          <h4 className="font-semibold text-white text-sm mb-1.5">{challenge.title}</h4>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">{challenge.description}</p>
          {!completed ? (
            <button
              onClick={handleComplete}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold py-2.5 rounded-xl hover:shadow-lg hover:shadow-amber-500/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Complete Challenge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center justify-center space-x-2 bg-emerald-500/10 text-emerald-400 text-sm font-semibold py-2.5 rounded-xl border border-emerald-500/20">
              <CheckCircle className="w-4 h-4" />
              <span>Completed! 🎉</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default DailyChallenge
