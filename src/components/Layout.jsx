import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Home, 
  Scale, 
  MessageCircle, 
  Shield, 
  BookOpen, 
  Phone,
  Menu,
  X
} from 'lucide-react'
import { cn } from '../lib/utils'
import { Card, CardContent } from './ui/card'
import { Progress } from './ui/progress'
import { Button } from './ui/button'

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home, color: 'text-pink-600' },
    { name: 'Legal Rights', href: '/legal-rights', icon: Scale, color: 'text-blue-600' },
    { name: 'Voice Training', href: '/voice-training', icon: MessageCircle, color: 'text-purple-600' },
    { name: 'Self Defense', href: '/self-defense', icon: Shield, color: 'text-green-600' },
    { name: 'Resources', href: '/resources', icon: BookOpen, color: 'text-orange-600' },
    { name: 'Emergency', href: '/emergency', icon: Phone, color: 'text-red-600' },
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center space-x-3 p-6 border-b border-pink-200">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
          <Heart className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900">EmpowerHer</h1>
          <p className="text-sm text-gray-600">Women's Training Platform</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Training Modules
        </div>
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-pink-100 shadow-sm text-pink-700" 
                  : "text-gray-700 hover:bg-gray-100"
              )}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-pink-600" : item.color)} />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Your Journey Progress Card */}
      <div className="p-4">
        <Card className="bg-gradient-to-r from-rose-50 to-pink-50 border-pink-200">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-700 mb-2">Your Journey</div>
            <div className="text-2xl font-bold text-pink-600 mb-2">23% Complete</div>
            <Progress value={23} className="h-2" />
            <div className="text-xs text-gray-600 mt-2">Keep going! You're doing great!</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed inset-y-0 left-0 w-64 bg-white/80 backdrop-blur-sm border-r border-pink-200"
          >
            <div className="flex items-center justify-between p-4 border-b border-pink-200">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <SidebarContent />
          </motion.div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:block">
        <div className="bg-white/80 backdrop-blur-sm border-r border-pink-200 h-full">
          <SidebarContent />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b border-pink-200">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">EmpowerHer</span>
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
