import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Scale, MessageCircle, Shield, Trophy, Zap, Target, BookOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { mockEntityOperations, getRelativeTime } from '../../lib/utils'

const RecentActivity = () => {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    const loadActivities = async () => {
      const logs = await mockEntityOperations.list('ActivityLog')
      // Sort by most recent first, limit to 6
      const sorted = logs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6)
      setActivities(sorted)
    }
    loadActivities()
  }, [])

  const getModuleIcon = (moduleType) => {
    switch (moduleType) {
      case 'legal_rights': return Scale
      case 'voice_assertiveness': return MessageCircle
      case 'self_defense': return Shield
      case 'daily_challenge': return Target
      default: return BookOpen
    }
  }

  const getModuleColor = (moduleType) => {
    switch (moduleType) {
      case 'legal_rights': return { bg: 'bg-blue-50/50', border: 'border-blue-100', text: 'text-blue-600', gradient: 'from-blue-500 to-cyan-500' }
      case 'voice_assertiveness': return { bg: 'bg-purple-50/50', border: 'border-purple-100', text: 'text-purple-600', gradient: 'from-purple-500 to-indigo-500' }
      case 'self_defense': return { bg: 'bg-green-50/50', border: 'border-green-100', text: 'text-green-600', gradient: 'from-emerald-500 to-teal-500' }
      case 'daily_challenge': return { bg: 'bg-amber-50/50', border: 'border-amber-100', text: 'text-amber-600', gradient: 'from-orange-500 to-amber-500' }
      default: return { bg: 'bg-gray-50/50', border: 'border-gray-100', text: 'text-gray-600', gradient: 'from-gray-500 to-slate-500' }
    }
  }

  const formatModuleName = (moduleType) => {
    switch (moduleType) {
      case 'legal_rights': return 'Legal Rights'
      case 'voice_assertiveness': return 'Voice Training'
      case 'self_defense': return 'Self Defense'
      case 'daily_challenge': return 'Daily Challenge'
      default: return 'Activity'
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="h-full">
      <Card className="h-full bg-white/70 backdrop-blur-lg border-gray-200/50 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-40 h-40 bg-pink-400/5 rounded-full blur-3xl transition-transform group-hover:scale-110 duration-700"></div>
        <CardHeader className="border-b border-gray-100/50 bg-white/40 pb-4">
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-700" />
            <span className="font-bold text-gray-900">Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {activities.length > 0 ? (
            <div className="divide-y divide-gray-100/50">
              <AnimatePresence>
                {activities.map((activity, index) => {
                  const Icon = getModuleIcon(activity.module_type)
                  const colors = getModuleColor(activity.module_type)
                  return (
                    <motion.div
                      key={activity.id || index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={`flex items-center justify-between p-4 ${colors.bg} hover:bg-white transition-all duration-300 group/item cursor-default border-l-4 border-transparent hover:${colors.border.replace('border-', 'border-l-')} hover:shadow-sm`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-sm transform group-hover/item:scale-110 group-hover/item:rotate-3 transition-all duration-300`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm group-hover/item:text-gray-900 transition-colors">{activity.title}</div>
                          <div className="text-xs text-gray-500 font-medium mt-0.5 flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                            <span className={colors.text}>{formatModuleName(activity.module_type)}</span>
                            <span className="hidden sm:inline text-gray-300">•</span>
                            <span>{getRelativeTime(activity.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        {activity.points > 0 && (
                          <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 shadow-sm px-2 py-0.5 text-xs font-bold">
                            <Zap className="w-3 h-3 mr-1 fill-current" />+{activity.points}
                          </Badge>
                        )}
                        <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider flex items-center">
                          <Trophy className="w-3 h-3 mr-1 text-gray-300" />
                          {activity.status || 'completed'}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-12 px-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                <Clock className="w-8 h-8 text-gray-300" />
              </div>
              <h4 className="text-gray-900 font-medium mb-1">No Activity Yet</h4>
              <p className="text-gray-500 text-sm max-w-[200px] mx-auto">Start exploring modules and completing challenges to build your history!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default RecentActivity
