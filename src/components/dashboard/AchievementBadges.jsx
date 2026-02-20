import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star,
  Award,
  Crown,
  Shield,
  Zap,
  Target,
  Lock,
  Medal
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { mockEntityOperations } from '../../lib/utils'
import { mockBadges } from '../../lib/mockData'

const AchievementBadges = () => {
  const [earnedBadges, setEarnedBadges] = useState([])

  useEffect(() => {
    const loadBadges = async () => {
      const statsList = await mockEntityOperations.list('UserStats')
      const stats = statsList[0]
      if (stats?.badges_earned) {
        setEarnedBadges(stats.badges_earned)
      }
    }
    loadBadges()
  }, [])

  const iconMap = {
    star: Star,
    award: Award,
    crown: Crown,
    shield: Shield,
    zap: Zap,
    target: Target
  }

  const rarityColors = {
    common: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', gradient: 'from-gray-400 to-slate-500', shadow: 'shadow-gray-200/50' },
    uncommon: { bg: 'bg-blue-50/50', text: 'text-blue-700', border: 'border-blue-200', gradient: 'from-blue-400 to-cyan-500', shadow: 'shadow-blue-300/50' },
    rare: { bg: 'bg-purple-50/50', text: 'text-purple-700', border: 'border-purple-200', gradient: 'from-purple-400 to-indigo-500', shadow: 'shadow-purple-300/50' },
    legendary: { bg: 'bg-amber-50/50', text: 'text-amber-800', border: 'border-amber-200', gradient: 'from-amber-400 to-orange-500', shadow: 'shadow-amber-300/50' }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="h-full">
      <Card className="h-full bg-white/70 backdrop-blur-lg border-gray-200/50 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/5 rounded-full blur-3xl pointer-events-none"></div>
        <CardHeader className="border-b border-gray-100/50 bg-white/40 pb-4">
          <CardTitle className="flex items-center space-x-2">
            <Medal className="w-5 h-5 text-amber-500" />
            <span className="font-bold text-gray-900">Achievement Badges</span>
            <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white ml-auto border-0 shadow-sm shadow-amber-500/20" variant="outline">
              {earnedBadges.length}/{mockBadges.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {mockBadges.map((badge, index) => {
                const isUnlocked = earnedBadges.includes(badge.id)
                const Icon = iconMap[badge.icon] || Star
                const colors = rarityColors[badge.rarity] || rarityColors.common

                return (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={isUnlocked ? { y: -4, scale: 1.02 } : {}}
                    className={`relative p-4 rounded-2xl border flex flex-col items-center justify-between text-center transition-all duration-300 group ${isUnlocked
                      ? `${colors.bg} ${colors.border} hover:shadow-lg ${colors.shadow} cursor-pointer`
                      : 'bg-gray-50/50 border-dashed border-gray-200 opacity-60 grayscale-[50%]'
                      }`}
                  >
                    <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3 transition-transform duration-300 ${isUnlocked ? `bg-gradient-to-br ${colors.gradient} shadow-md group-hover:scale-110 group-hover:rotate-3` : 'bg-gray-200'
                      }`}>
                      {isUnlocked ? (
                        <Icon className="w-6 h-6 text-white" />
                      ) : (
                        <Lock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className={`text-sm font-bold leading-tight mb-1 ${isUnlocked ? colors.text : 'text-gray-500'}`}>
                      {badge.name}
                    </div>
                    <div className="text-xs font-medium text-gray-500 leading-snug mb-3">
                      {badge.description}
                    </div>
                    <div className="mt-auto">
                      <Badge className={`text-[10px] uppercase tracking-wider font-bold ${isUnlocked ? `bg-white/60 ${colors.text} border-${colors.text.split('-')[1]}-200` : 'bg-gray-100 text-gray-400 border-gray-200'}`} variant="outline">
                        {badge.rarity}
                      </Badge>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default AchievementBadges
