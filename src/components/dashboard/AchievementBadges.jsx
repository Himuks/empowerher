import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Award, Lock, Star, Zap, Shield, Target, Crown } from 'lucide-react'
import { mockBadges } from '../../lib/mockData'
import { mockEntityOperations } from '../../lib/utils'

const iconMap = { star: Star, zap: Zap, crown: Crown, award: Award, shield: Shield, target: Target }
const rarityConfig = {
  common: { label: 'Common', border: 'border-slate-600/30', bg: 'bg-slate-700/30', text: 'text-slate-300', glow: '' },
  uncommon: { label: 'Uncommon', border: 'border-blue-500/30', bg: 'bg-blue-500/10', text: 'text-blue-400', glow: 'glow-blue' },
  rare: { label: 'Rare', border: 'border-purple-500/30', bg: 'bg-purple-500/10', text: 'text-purple-400', glow: 'glow-purple' },
  legendary: { label: 'Legendary', border: 'border-amber-500/30', bg: 'bg-amber-500/10', text: 'text-amber-400', glow: 'glow-amber' },
}

const AchievementBadges = () => {
  const [earnedBadges, setEarnedBadges] = useState([])

  useEffect(() => {
    const load = async () => {
      const stats = await mockEntityOperations.list('UserStats')
      if (stats[0]?.badges_earned) setEarnedBadges(stats[0].badges_earned)
    }
    load()
  }, [])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
      <div className="glass-card p-5">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <Award className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-display font-bold text-white text-sm">Achievements</h3>
          <span className="text-xs text-slate-400 ml-auto">{earnedBadges.length}/{mockBadges.length}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {mockBadges.slice(0, 6).map((badge) => {
            const earned = earnedBadges.includes(badge.id)
            const rarity = rarityConfig[badge.rarity] || rarityConfig.common
            const Icon = iconMap[badge.icon] || Star
            return (
              <div
                key={badge.id}
                className={`p-3 rounded-xl border transition-all duration-300 ${earned
                    ? `${rarity.border} ${rarity.bg} ${rarity.glow}`
                    : 'border-slate-800/50 bg-slate-800/20 opacity-40'
                  }`}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${earned ? rarity.bg : 'bg-slate-800/50'
                    }`}>
                    {earned ? <Icon className={`w-3.5 h-3.5 ${rarity.text}`} /> : <Lock className="w-3 h-3 text-slate-600" />}
                  </div>
                  <div className="min-w-0">
                    <div className={`text-xs font-semibold truncate ${earned ? 'text-white' : 'text-slate-500'}`}>{badge.name}</div>
                    <div className={`text-[10px] ${earned ? rarity.text : 'text-slate-600'}`}>{rarity.label}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default AchievementBadges
