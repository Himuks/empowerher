import React from 'react'
import { motion } from 'framer-motion'
import { 
  Clock, 
  Scale, 
  MessageCircle, 
  Shield, 
  Zap,
  CheckCircle 
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'

const RecentActivity = ({ activities = [] }) => {
  // Mock recent activities if none provided
  const defaultActivities = [
    {
      id: 1,
      module_type: 'legal_rights',
      title: 'Understanding Workplace Rights',
      type: 'chapter',
      points: 25,
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      module_type: 'voice_assertiveness',
      title: 'Learning to Say No',
      type: 'lesson',
      points: 15,
      time: '1 day ago',
      status: 'in_progress'
    },
    {
      id: 3,
      module_type: 'legal_rights',
      title: 'Filing an FIR',
      type: 'chapter',
      points: 20,
      time: '2 days ago',
      status: 'completed'
    },
    {
      id: 4,
      module_type: 'self_defense',
      title: 'Basic Self-Defense Techniques',
      type: 'lesson',
      points: 30,
      time: '3 days ago',
      status: 'started'
    },
    {
      id: 5,
      module_type: 'voice_assertiveness',
      title: 'Confident Public Speaking',
      type: 'lesson',
      points: 10,
      time: '4 days ago',
      status: 'completed'
    }
  ]

  const displayActivities = activities.length > 0 ? activities : defaultActivities

  const getModuleIcon = (moduleType) => {
    switch (moduleType) {
      case 'legal_rights': return Scale
      case 'voice_assertiveness': return MessageCircle
      case 'self_defense': return Shield
      default: return CheckCircle
    }
  }

  const getModuleColor = (moduleType) => {
    switch (moduleType) {
      case 'legal_rights': return 'text-blue-600 bg-blue-100'
      case 'voice_assertiveness': return 'text-purple-600 bg-purple-100'
      case 'self_defense': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-yellow-100 text-yellow-800'
      case 'started': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-600" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {displayActivities.map((activity, index) => {
              const Icon = getModuleIcon(activity.module_type)
              
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 + index * 0.1 }}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getModuleColor(activity.module_type)}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.title}
                      </p>
                      <Badge 
                        className={`text-xs ${getStatusColor(activity.status)}`}
                        variant="outline"
                      >
                        {activity.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="capitalize">
                        {activity.module_type.replace('_', ' ')} • {activity.type}
                      </span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-amber-600">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm font-medium">+{activity.points}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
          
          {displayActivities.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No recent activity yet</p>
              <p className="text-sm">Start a lesson to see your progress here!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default RecentActivity
