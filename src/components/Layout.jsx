import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  Home,
  Scale,
  MessageCircle,
  Shield,
  BookOpen,
  Phone,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  LogIn,
  LogOut
} from 'lucide-react'
import { cn, getOverallProgress } from '../lib/utils'
import { useAuth } from './AuthContext'
import AuthModal from './AuthModal'

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [journeyProgress, setJourneyProgress] = useState(0)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const location = useLocation()
  const { user, isLoggedIn, logout } = useAuth()

  useEffect(() => {
    const loadProgress = async () => {
      const progress = await getOverallProgress()
      setJourneyProgress(progress)
    }
    loadProgress()
  }, [location.pathname])

  // Close user menu on outside click
  useEffect(() => {
    const handleClick = () => setUserMenuOpen(false)
    if (userMenuOpen) document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [userMenuOpen])

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home, gradient: 'from-rose-500 to-pink-600' },
    { name: 'Legal Rights', href: '/legal-rights', icon: Scale, gradient: 'from-blue-500 to-cyan-500' },
    { name: 'Voice Training', href: '/voice-training', icon: MessageCircle, gradient: 'from-violet-500 to-purple-600' },
    { name: 'Self Defense', href: '/self-defense', icon: Shield, gradient: 'from-emerald-500 to-green-600' },
    { name: 'Resources', href: '/resources', icon: BookOpen, gradient: 'from-amber-500 to-orange-500' },
    { name: 'Emergency', href: '/emergency', icon: Phone, gradient: 'from-red-500 to-rose-600' },
  ]

  const UserButton = () => {
    if (isLoggedIn) {
      const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U'
      return (
        <div className="relative">
          <button
            onClick={(e) => { e.stopPropagation(); setUserMenuOpen(!userMenuOpen) }}
            className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-white/[0.06] transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-rose-500/20">
              {initials}
            </div>
            <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors hidden md:block">{user.name?.split(' ')[0]}</span>
          </button>
          <AnimatePresence>
            {userMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-56 rounded-2xl overflow-hidden border border-white/[0.08] bg-slate-900/95 backdrop-blur-2xl shadow-2xl z-50"
              >
                <div className="p-4 border-b border-white/[0.06]">
                  <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                  <p className="text-xs text-slate-400 truncate">{user.email}</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => { logout(); setUserMenuOpen(false) }}
                    className="w-full flex items-center space-x-2 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
    }

    return (
      <button
        onClick={() => setAuthModalOpen(true)}
        className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500/10 to-purple-600/10 border border-rose-500/20 hover:border-rose-500/40 hover:bg-rose-500/15 transition-all duration-300 group"
      >
        <LogIn className="w-4 h-4 text-rose-400 group-hover:text-rose-300 transition-colors" />
        <span className="text-sm font-semibold text-rose-300 group-hover:text-rose-200 transition-colors">Login</span>
      </button>
    )
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-purple-600 rounded-xl blur opacity-20 animate-glow-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-display font-bold text-white tracking-tight">EmpowerHer</h1>
            <p className="text-xs text-slate-400 font-medium">Training Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.15em] px-3 mb-4">
          Modules
        </div>
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 relative",
                isActive
                  ? "text-white"
                  : "text-slate-400 hover:text-slate-200"
              )}
              onClick={() => setSidebarOpen(false)}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item.gradient} opacity-[0.12]`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-gradient-to-b ${item.gradient}`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <div className="flex items-center space-x-3 relative z-10">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
                  isActive
                    ? `bg-gradient-to-br ${item.gradient} shadow-lg`
                    : "bg-slate-800/50 group-hover:bg-slate-700/50"
                )}>
                  <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-300")} />
                </div>
                <span>{item.name}</span>
              </div>
              {isActive && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 relative z-10" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Progress Card */}
      <div className="p-3">
        <div className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/[0.06]">
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-rose-500/20 to-purple-500/20 rounded-full blur-xl" />
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Your Journey</span>
            </div>
            <div className="text-2xl font-display font-bold text-white mb-2">{journeyProgress}%</div>
            <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: `${journeyProgress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-2 font-medium">
              {journeyProgress === 0 ? "Start your journey!" :
                journeyProgress < 50 ? "Keep going! 💪" :
                  journeyProgress < 100 ? "Almost there! 🔥" : "Champion! 🎉"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen aurora-bg">
      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-72 glass-sidebar shadow-2xl"
            >
              <div className="flex items-center justify-end p-3 border-b border-white/[0.06]">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/[0.06] text-slate-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <SidebarContent />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:block lg:z-40">
        <div className="glass-sidebar h-full">
          <SidebarContent />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between p-4 glass border-b border-white/[0.06] sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-white/[0.06] text-slate-300 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-white">EmpowerHer</span>
          </div>
          <UserButton />
        </div>

        {/* Desktop top-right user area */}
        <div className="hidden lg:flex items-center justify-end p-4 sticky top-0 z-30">
          <UserButton />
        </div>

        <main className="p-4 lg:p-8 lg:pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default Layout
