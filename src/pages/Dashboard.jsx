import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Heart,
  Zap,
  Target,
  Trophy,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react'
import { Progress } from '../components/ui/progress'
import StreakCounter from '../components/dashboard/StreakCounter'
import LevelProgress from '../components/dashboard/LevelProgress'
import DailyChallenge from '../components/dashboard/DailyChallenge'
import QuickActions from '../components/dashboard/QuickActions'
import AchievementBadges from '../components/dashboard/AchievementBadges'
import RecentActivity from '../components/dashboard/RecentActivity'
import KnowledgeQuiz from '../components/dashboard/KnowledgeQuiz'
import { mockEntityOperations, User, getOverallProgress } from '../lib/utils'

const StatCard = ({ label, value, icon: Icon, gradient, glowClass, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="group"
  >
    <div className={`glass-card p-5 glass-hover relative overflow-hidden ${glowClass}`}>
      <div className={`absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br ${gradient} rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-700`} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <TrendingUp className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="text-2xl font-display font-bold text-white tracking-tight">{value}</div>
        <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-1">{label}</div>
      </div>
    </div>
  </motion.div>
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
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-rose-500/20 border-t-rose-500 animate-spin" />
          <Heart className="w-5 h-5 text-rose-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
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
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl p-8 md:p-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-rose-600/20 via-purple-600/10 to-cyan-500/10 rounded-3xl" />
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-rose-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute inset-0 glass-card" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight"
            >
              Welcome back, {user?.firstName || 'Warrior'}! <span className="inline-block animate-float">💪</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-300 mt-2 text-lg font-medium"
            >
              {overallProgress === 0
                ? "Start your empowerment journey today!"
                : `You're ${overallProgress}% through your journey. Keep going!`}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="flex items-center space-x-3 bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] rounded-2xl px-5 py-3 self-start"
          >
            <Award className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Level</div>
              <div className="text-xl font-display font-bold text-white">{level}</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Points" value={totalPoints} gradient="from-rose-500 to-pink-600" glowClass="glow-pink" icon={Zap} delay={0.1} />
        <StatCard label="Progress" value={`${overallProgress}%`} gradient="from-blue-500 to-cyan-500" glowClass="glow-blue" icon={Target} delay={0.15} />
        <StatCard label="Completed" value={lessonsCompleted} gradient="from-emerald-500 to-teal-500" glowClass="glow-green" icon={Trophy} delay={0.2} />
        <StatCard label="Streak" value={`${currentStreak}d`} gradient="from-amber-500 to-orange-500" glowClass="glow-amber" icon={Heart} delay={0.25} />
      </div>

      {/* Level + Streak + Challenge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <LevelProgress level={level} currentXP={currentXP} nextLevelXP={nextLevelXP} />
        <StreakCounter currentStreak={currentStreak} longestStreak={longestStreak} />
        <DailyChallenge />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Quiz + Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <KnowledgeQuiz />
        <AchievementBadges />
      </div>

      {/* Recent Activity */}
      <RecentActivity />

      {/* CTA Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="relative overflow-hidden rounded-3xl group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-purple-600 to-cyan-500 opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10 p-8 md:p-12 text-center flex flex-col items-center">
            <Sparkles className="w-8 h-8 text-white/80 mb-4 animate-float" />
            <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white mb-3">
              Ready to continue your journey?
            </h3>
            <p className="text-white/70 mb-8 max-w-lg mx-auto text-lg">
              Every step you take makes you stronger, safer, and more empowered.
            </p>
            <Link to="/legal-rights">
              <button className="bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl inline-flex items-center space-x-3 text-lg group/btn">
                <span>Resume Training</span>
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard
