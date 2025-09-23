import React from 'react'
import { motion } from 'framer-motion'
import { 
  Award, 
  Crown, 
  Star, 
  Shield, 
  Zap, 
  Lock 
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { mockBadges } from '../../lib/mockData'

const AchievementBadges = ({ userBadges = [] }) => {
  const getBadgeIcon = (badgeId) => {
    switch (badgeId) {
      case 'first_lesson': return Star
      case 'streak_3': return Zap
      case 'streak_7': return Crown
      case 'legal_expert': return Award
      case 'confident_voice': return Shield
      case 'safety_champion': return Crown
      default: return Award
    }
  }

  const getRarityColor = (rarity, unlocked) => {
    if (!unlocked) return 'bg-gray-100 text-gray-400'
    
    switch (rarity) {
      case 'common': return 'bg-blue-100 text-blue-800'
      case 'uncommon': return 'bg-purple-100 text-purple-800'
      case 'rare': return 'bg-orange-100 text-orange-800'
      case 'legendary': return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-yellow-600" />
            <span>Achievement Badges</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mockBadges.map((badge, index) => {
              const Icon = getBadgeIcon(badge.id)
              const isUnlocked = badge.unlocked || userBadges.includes(badge.id)
              
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="group relative"
                >
                  <div className={`
                    relative p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer
                    ${isUnlocked 
                      ? 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 hover:shadow-md' 
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                    }
                  `}>
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center
                        ${isUnlocked 
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                          : 'bg-gray-300'
                        }
                      `}>
                        {isUnlocked ? (
                          <Icon className="w-6 h-6 text-white" />
                        ) : (
                          <Lock className="w-6 h-6 text-gray-500" />
                        )}
                      </div>
                      
                      <div className="text-center">
                        <div className={`
                          text-xs font-medium 
                          ${isUnlocked ? 'text-gray-900' : 'text-gray-500'}
                        `}>
                          {badge.name}
                        </div>
                        <Badge 
                          className={`mt-1 text-xs ${getRarityColor(badge.rarity, isUnlocked)}`}
                          variant="outline"
                        >
                          {badge.rarity}
                        </Badge>
                      </div>
                    </div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                        {badge.description}
                        <div className="w-2 h-2 bg-gray-900 transform rotate-45 absolute top-full left-1/2 -translate-x-1/2 -mt-1"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {mockBadges.filter(b => b.unlocked).length} of {mockBadges.length} badges earned
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default AchievementBadges
