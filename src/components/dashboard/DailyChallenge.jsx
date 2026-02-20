import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Target, CheckCircle, Zap, Gift } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { mockEntityOperations, updateUserStats, logActivity } from '../../lib/utils'
import { mockChallenges } from '../../lib/mockData'

const DailyChallenge = () => {
  const [challenge, setChallenge] = useState(null)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const loadChallenge = async () => {
      // Pick challenge based on day of year
      const today = new Date()
      const dayIndex = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
      const todayChallenge = mockChallenges[dayIndex % mockChallenges.length]
      setChallenge(todayChallenge)

      // Check if already completed today
      const todayStr = today.toISOString().split('T')[0]
      const logs = await mockEntityOperations.list('DailyChallengeLog')
      const alreadyDone = logs.find(l => l.date === todayStr)
      if (alreadyDone) {
        setCompleted(true)
      }
    }
    loadChallenge()
  }, [])

  const handleComplete = async () => {
    if (!challenge || completed) return
    setCompleted(true)

    const todayStr = new Date().toISOString().split('T')[0]

    // Log the challenge
    await mockEntityOperations.create('DailyChallengeLog', {
      date: todayStr,
      title: challenge.title,
      points: challenge.points
    })

    // Update user stats
    await updateUserStats(challenge.points)

    // Log activity
    await logActivity({
      module_type: 'daily_challenge',
      title: challenge.title,
      type: 'challenge',
      points: challenge.points,
      status: 'completed'
    })
  }

  if (!challenge) return null

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
      <Card className={`${completed ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' : 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200'}`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-lg">
              {completed ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <Target className="w-5 h-5 text-amber-600" />
              )}
              <span>Daily Challenge</span>
            </div>
            <Badge className={`${completed ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`} variant="outline">
              <Zap className="w-3 h-3 mr-1" />
              {challenge.points} pts
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-1">{challenge.title}</h4>
            <p className="text-sm text-gray-600">{challenge.description}</p>
          </div>

          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <Gift className="w-3 h-3" />
            <span>{challenge.category}</span>
          </div>

          {completed ? (
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex items-center justify-center space-x-2 p-3 bg-green-100 rounded-lg border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-medium">Challenge Completed! +{challenge.points} pts 🎉</span>
            </motion.div>
          ) : (
            <Button onClick={handleComplete} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark as Completed
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default DailyChallenge
