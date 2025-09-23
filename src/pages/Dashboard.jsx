import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Zap, 
  Award, 
  Flame, 
  Star,
  Scale,
  MessageCircle,
  Shield,
  ArrowRight,
  Play
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Progress } from '../components/ui/progress'
import { Badge } from '../components/ui/badge'
import ProgressCard from '../components/dashboard/ProgressCard'
import StreakCounter from '../components/dashboard/StreakCounter'
import LevelProgress from '../components/dashboard/LevelProgress'
import DynamicQuote from '../components/dashboard/DynamicQuote'
import DailyChallenge from '../components/dashboard/DailyChallenge'
import QuickActions from '../components/dashboard/QuickActions'
import AchievementBadges from '../components/dashboard/AchievementBadges'
import RecentActivity from '../components/dashboard/RecentActivity'
import { User, mockEntityOperations } from '../lib/utils'
import { mockLessons } from '../lib/mockData'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [userStats, setUserStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [realTimeStats, setRealTimeStats] = useState({
    overallProgress: 0,
    totalPoints: 0,
    lessonsCompleted: 0,
    currentStreak: 0,
    averageConfidence: 0
  })

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Get current user
        const currentUser = await User.me()
        setUser(currentUser)

        // Get or create user stats
        const statsData = await mockEntityOperations.list('UserStats')
        let stats = statsData[0]
        
        if (!stats) {
          stats = await mockEntityOperations.create('UserStats', {
            total_points: 150,
            current_streak: 3,
            longest_streak: 7,
            level: 2,
            badges_earned: ['first_lesson', 'streak_3'],
            modules_completed: 1,
            last_activity: new Date().toISOString().split('T')[0]
          })
        }
        setUserStats(stats)

        // Calculate real-time stats
        const trainingProgress = await mockEntityOperations.list('TrainingProgress')
        const chapterProgress = await mockEntityOperations.list('ChapterProgress')
        
        const totalPoints = trainingProgress.reduce((sum, progress) => sum + (progress.points_earned || 0), 0)
        const lessonsCompleted = trainingProgress.filter(p => p.completion_percentage === 100).length
        const overallProgress = calculateOverallProgress(trainingProgress, chapterProgress)
        const averageConfidence = calculateAverageConfidence(trainingProgress)

        setRealTimeStats({
          overallProgress,
          totalPoints,
          lessonsCompleted,
          currentStreak: stats.current_streak,
          averageConfidence
        })

      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  const calculateOverallProgress = (trainingProgress, chapterProgress) => {
    // Calculate based on completed lessons and chapters
    const totalPossibleLessons = Object.values(mockLessons).flat().length
    const completedLessons = trainingProgress.filter(p => p.completion_percentage === 100).length
    return Math.round((completedLessons / totalPossibleLessons) * 100)
  }

  const calculateAverageConfidence = (trainingProgress) => {
    if (trainingProgress.length === 0) return 0
    const totalConfidence = trainingProgress.reduce((sum, p) => sum + (p.confidence_level || 0), 0)
    return Math.round((totalConfidence / trainingProgress.length) * 10) / 10
  }

  const getModuleProgress = (moduleType) => {
    const lessons = mockLessons[moduleType] || []
    if (lessons.length === 0) return 0
    const avgProgress = lessons.reduce((sum, lesson) => sum + (lesson.progress || 0), 0) / lessons.length
    return Math.round(avgProgress)
  }

  const modules = [
    {
      id: 'legal_rights',
      title: 'Legal Rights',
      description: 'Learn about your legal rights and how to exercise them effectively',
      icon: Scale,
      color: 'from-sky-500 to-blue-600',
      bgColor: 'from-blue-50 to-sky-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      progress: getModuleProgress('legal_rights'),
      lessons: mockLessons.legal_rights?.length || 0,
      maxPoints: 150,
      href: '/legal-rights'
    },
    {
      id: 'voice_assertiveness',
      title: 'Voice Training',
      description: 'Build confidence in assertive communication and speaking up',
      icon: MessageCircle,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-violet-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      progress: getModuleProgress('voice_assertiveness'),
      lessons: mockLessons.voice_assertiveness?.length || 0,
      maxPoints: 120,
      href: '/voice-training'
    },
    {
      id: 'self_defense',
      title: 'Self Defense',
      description: 'Master essential self-defense techniques and safety awareness',
      icon: Shield,
      color: 'from-emerald-500 to-green-600',
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      progress: getModuleProgress('self_defense'),
      lessons: mockLessons.self_defense?.length || 0,
      maxPoints: 180,
      href: '/self-defense'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome back, {user?.firstName || 'Sarah'}! 👋
        </h1>
        <p className="text-xl text-gray-600">
          Ready to continue your empowerment journey?
        </p>
      </motion.div>

      {/* Dynamic Quote */}
      <DynamicQuote />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <ProgressCard
          title="Overall Progress"
          value={`${realTimeStats.overallProgress}%`}
          subtitle="Modules completed"
          icon={TrendingUp}
          gradient="from-rose-400 to-pink-500"
          delay={0}
        />
        <ProgressCard
          title="Points Earned"
          value={realTimeStats.totalPoints}
          subtitle="Total achievements"
          icon={Zap}
          gradient="from-amber-400 to-orange-500"
          delay={0.1}
        />
        <ProgressCard
          title="Lessons Done"
          value={realTimeStats.lessonsCompleted}
          subtitle="Knowledge gained"
          icon={Award}
          gradient="from-emerald-400 to-green-500"
          delay={0.2}
        />
        <ProgressCard
          title="Current Streak"
          value={`${realTimeStats.currentStreak} days`}
          subtitle="Keep it up!"
          icon={Flame}
          gradient="from-red-500 to-rose-500"
          delay={0.3}
        />
        <ProgressCard
          title="Confidence"
          value={`${realTimeStats.averageConfidence}/5`}
          subtitle="Self-assessment"
          icon={Star}
          gradient="from-violet-500 to-purple-500"
          delay={0.4}
        />
      </div>

      {/* Streak and Level Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StreakCounter 
          currentStreak={userStats?.current_streak || 0}
          longestStreak={userStats?.longest_streak || 0}
        />
        <LevelProgress 
          level={userStats?.level || 1}
          currentXP={realTimeStats.totalPoints}
          nextLevelXP={userStats?.level ? userStats.level * 200 : 200}
        />
      </div>

      {/* Daily Challenge */}
      <DailyChallenge />

      {/* Training Modules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ArrowRight className="w-5 h-5 text-pink-600" />
              <span>Training Modules</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module, index) => {
                const Icon = module.icon
                return (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <Card className={`bg-gradient-to-br ${module.bgColor} ${module.borderColor} hover:shadow-lg transition-all duration-200`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${module.color} flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <Badge className={`${module.textColor} bg-white/80`} variant="outline">
                            {module.lessons} lessons
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{module.title}</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {module.description}
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className={`font-medium ${module.textColor}`}>{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} className="h-2" />
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-sm text-gray-600">
                            Max {module.maxPoints} points
                          </span>
                          <Link to={module.href}>
                            <Button 
                              size="sm"
                              className={`bg-gradient-to-r ${module.color} hover:opacity-90`}
                            >
                              <Play className="w-4 h-4 mr-1" />
                              {module.progress > 0 ? 'Continue' : 'Start Module'}
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions and Achievement Badges */}
        <div className="space-y-8">
          <QuickActions />
          <AchievementBadges userBadges={userStats?.badges_earned || []} />
        </div>
        
        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </div>
  )
}

export default Dashboard
