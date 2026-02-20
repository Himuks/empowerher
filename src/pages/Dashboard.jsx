import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Heart,
  Zap,
  Target,
  Trophy,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { Card, CardContent } from '../components/ui/card'
import { Progress } from '../components/ui/progress'
import { Badge } from '../components/ui/badge'
import StreakCounter from '../components/dashboard/StreakCounter'
import LevelProgress from '../components/dashboard/LevelProgress'
import DailyChallenge from '../components/dashboard/DailyChallenge'
import QuickActions from '../components/dashboard/QuickActions'
import AchievementBadges from '../components/dashboard/AchievementBadges'
import RecentActivity from '../components/dashboard/RecentActivity'
import { mockEntityOperations, User, getOverallProgress } from '../lib/utils'

const ProgressCard = ({ label, value, total, color, icon: Icon }) => (
  <Card className="hover:-translate-y-1 hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-lg border border-white/50 overflow-hidden relative group">
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
    <CardContent className="p-6 relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className="text-3xl font-black text-gray-900 tracking-tight">{value}</span>
      </div>
      <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{label}</div>
      {total && (
        <div className="mt-4">
          <Progress value={(value / total) * 100} className="h-1.5 bg-gray-200/50" />
        </div>
      )}
    </CardContent>
  </Card>
)

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [userStats, setUserStats] = useState(null)
  const [overallProgress, setOverallProgress] = useState(0)
  const [lessonsCompleted, setLessonsCompleted] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const currentUser = await User.me()
        setUser(currentUser)

        const statsData = await mockEntityOperations.list('UserStats')
        let stats = statsData[0]
        if (!stats) {
          stats = await mockEntityOperations.create('UserStats', {
            total_points: 0, current_streak: 0, longest_streak: 0,
            level: 1, badges_earned: [], modules_completed: 0, last_activity: ''
          })
        }
        setUserStats(stats)

        // Calculate real-time stats
        const progress = await getOverallProgress()
        setOverallProgress(progress)

        const trainingProgress = await mockEntityOperations.list('TrainingProgress')
        const completed = trainingProgress.filter(p => p.completion_percentage === 100).length
        setLessonsCompleted(completed)

      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
          <Heart className="w-8 h-8 text-pink-500" />
        </motion.div>
      </div>
    )
  }

  const totalPoints = userStats?.total_points || 0
  const level = userStats?.level || 1
  const currentStreak = userStats?.current_streak || 0
  const longestStreak = userStats?.longest_streak || 0
  const currentXP = totalPoints % 200
  const nextLevelXP = 200

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      {/* Welcome Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100/50 via-purple-100/50 to-transparent blur-3xl -z-10 rounded-full"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">
              Welcome back, {user?.firstName || 'Warrior'}! 💪
            </h1>
            <p className="text-gray-600 mt-2 text-lg font-medium">
              {overallProgress === 0
                ? "Start your empowerment journey today!"
                : `You're ${overallProgress}% through your journey. Keep going!`}
            </p>
          </div>
          <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2.5 text-sm shadow-xl shadow-pink-500/20 self-start md:self-auto uppercase tracking-widest font-bold">
            <Sparkles className="w-4 h-4 mr-2" />
            Level {level}
          </Badge>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <ProgressCard label="Total Points" value={totalPoints} color="from-pink-500 to-rose-600" icon={Zap} />
          <ProgressCard label="Overall Progress" value={`${overallProgress}%`} total={null} color="from-blue-600 to-indigo-600" icon={Target} />
          <ProgressCard label="Lessons Completed" value={lessonsCompleted} total={6} color="from-emerald-500 to-teal-600" icon={Trophy} />
          <ProgressCard label="Current Streak" value={`${currentStreak} day${currentStreak !== 1 ? 's' : ''}`} color="from-amber-500 to-orange-600" icon={Heart} />
        </div>
      </motion.div>

      {/* Middle Row: Level + Streak + Daily Challenge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <LevelProgress level={level} currentXP={currentXP} nextLevelXP={nextLevelXP} />
        <StreakCounter currentStreak={currentStreak} longestStreak={longestStreak} />
        <DailyChallenge />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Achievements & Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AchievementBadges />
        <RecentActivity />
      </div>

      {/* CTA */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 border-0 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700"></div>
          <CardContent className="p-8 md:p-12 text-center relative z-10 flex flex-col items-center">
            <h3 className="text-3xl font-extrabold text-white mb-3">Ready to continue your journey?</h3>
            <p className="text-pink-100 mb-8 max-w-lg mx-auto text-lg">Every step you take makes you stronger, safer, and more empowered.</p>
            <Link to="/legal-rights">
              <button className="bg-white text-purple-700 font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center space-x-3 text-lg">
                <span>Resume Training</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Dashboard
