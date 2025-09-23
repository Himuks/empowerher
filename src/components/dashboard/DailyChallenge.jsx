import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, CheckCircle, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

const DailyChallenge = () => {
  const [completed, setCompleted] = useState(false)
  
  // Get daily challenge based on current date
  const challenges = [
    {
      title: "Practice Assertive Communication",
      description: "Say 'no' to one request today while being respectful and clear about your boundaries.",
      points: 15,
      category: "Voice Training"
    },
    {
      title: "Learn a Safety Technique",
      description: "Review and practice one self-defense move from the basic techniques module.",
      points: 20,
      category: "Self Defense"
    },
    {
      title: "Know Your Rights",
      description: "Read about workplace harassment laws and share one fact with a friend.",
      points: 10,
      category: "Legal Knowledge"
    },
    {
      title: "Emergency Preparedness",
      description: "Update your emergency contacts and share them with a trusted person.",
      points: 15,
      category: "Safety"
    },
    {
      title: "Confidence Building",
      description: "Practice speaking clearly and confidently in front of a mirror for 5 minutes.",
      points: 12,
      category: "Voice Training"
    }
  ]
  
  const today = new Date()
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)
  const todayChallenge = challenges[dayOfYear % challenges.length]

  const handleComplete = () => {
    setCompleted(true)
    // In real app, this would update user stats and add points
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Voice Training': return 'bg-purple-100 text-purple-800'
      case 'Self Defense': return 'bg-green-100 text-green-800'
      case 'Legal Knowledge': return 'bg-blue-100 text-blue-800'
      case 'Safety': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-orange-600" />
              <span>Daily Challenge</span>
            </div>
            <Badge 
              className={`${getCategoryColor(todayChallenge.category)} border-0`}
              variant="outline"
            >
              {todayChallenge.category}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {todayChallenge.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {todayChallenge.description}
              </p>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-700">
                  +{todayChallenge.points} points
                </span>
              </div>
              
              {!completed ? (
                <Button 
                  onClick={handleComplete}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                >
                  Complete Challenge
                </Button>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center space-x-2 text-green-600"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Completed!</span>
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default DailyChallenge
