import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, CheckCircle, Zap, BookOpen } from 'lucide-react'
import { mockEntityOperations } from '../../lib/utils'

const typeConfig = {
  lesson: { icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  challenge: { icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  quiz: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
}

const RecentActivity = () => {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    const load = async () => {
      const data = await mockEntityOperations.list('ActivityLog')
      setActivities(data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 5))
    }
    load()
  }, [])

  const timeAgo = (timestamp) => {
    const diff = Date.now() - new Date(timestamp).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
      <div className="glass-card p-5">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
            <Clock className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-display font-bold text-white text-sm">Recent Activity</h3>
        </div>

        {activities.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-3">
              <Clock className="w-5 h-5 text-slate-500" />
            </div>
            <p className="text-sm text-slate-400">No activity yet. Start a lesson!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {activities.map((activity, i) => {
              const config = typeConfig[activity.type] || typeConfig.lesson
              const Icon = config.icon
              return (
                <motion.div
                  key={activity.id || i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className={`flex items-center space-x-3 p-3 rounded-xl border ${config.border} ${config.bg}`}
                >
                  <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">{activity.title}</div>
                    <div className="text-[11px] text-slate-400">+{activity.points} pts</div>
                  </div>
                  <span className="text-[11px] text-slate-500 flex-shrink-0">{timeAgo(activity.timestamp)}</span>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default RecentActivity
