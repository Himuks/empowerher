import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '../ui/card'

const ProgressCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  gradient, 
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <Card className="relative overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-5`} />
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              {subtitle && (
                <p className="text-xs text-gray-500">{subtitle}</p>
              )}
            </div>
            <div className={`p-3 rounded-full bg-gradient-to-r ${gradient}`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ProgressCard
