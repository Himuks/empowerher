import React from 'react'
import { motion } from 'framer-motion'

const ProgressCard = ({ title, value, subtitle, icon: Icon, gradient, delay = 0 }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5 }}>
      <div className="glass-card p-5 glass-hover relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-[0.06]`} />
        <div className="relative flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
            <p className="text-2xl font-display font-bold text-white">{value}</p>
            {subtitle && <p className="text-[10px] text-slate-500">{subtitle}</p>}
          </div>
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProgressCard
