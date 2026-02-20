import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Phone,
  FileText,
  MessageCircle,
  Shield,
  ArrowRight,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const QuickActions = () => {
  const actions = [
    {
      title: "Emergency Help",
      description: "Quick access to emergency contacts",
      icon: Phone,
      href: "/emergency",
      color: "from-red-500 to-rose-600",
      shadow: "shadow-red-500/20",
      border: "border-red-100",
      bgHover: "hover:bg-red-50"
    },
    {
      title: "FIR Guide",
      description: "Learn how to file a complaint",
      icon: FileText,
      href: "/legal-rights",
      color: "from-blue-500 to-sky-600",
      shadow: "shadow-blue-500/20",
      border: "border-blue-100",
      bgHover: "hover:bg-blue-50"
    },
    {
      title: "Practice Voice",
      description: "Quick assertiveness exercise",
      icon: MessageCircle,
      href: "/voice-training",
      color: "from-purple-500 to-violet-600",
      shadow: "shadow-purple-500/20",
      border: "border-purple-100",
      bgHover: "hover:bg-purple-50"
    },
    {
      title: "Safety Tips",
      description: "View defense techniques",
      icon: Shield,
      href: "/self-defense",
      color: "from-emerald-500 to-teal-600",
      shadow: "shadow-emerald-500/20",
      border: "border-emerald-100",
      bgHover: "hover:bg-emerald-50"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
    >
      <Card className="bg-white/70 backdrop-blur-lg border-gray-200/50 shadow-lg overflow-hidden">
        <CardHeader className="border-b border-gray-100/50 bg-white/40 pb-4">
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span className="font-bold text-gray-900">Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {actions.map((action, index) => {
              const Icon = action.icon
              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <Link to={action.href} className="block h-full">
                    <div
                      className={`h-full p-5 flex flex-col items-center justify-center space-y-3 bg-white border ${action.border} rounded-2xl ${action.bgHover} transition-all duration-300 group shadow-sm hover:shadow-md cursor-pointer relative overflow-hidden`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none ${action.color.replace('from-', 'from-').replace('to-', 'to-')}`}></div>
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} shadow-lg ${action.shadow} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-center relative z-10 w-full mt-2">
                        <div className="font-bold text-gray-900 mb-1 group-hover:text-gray-900 transition-colors">{action.title}</div>
                        <div className="text-xs font-medium text-gray-500 line-clamp-2">
                          {action.description}
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default QuickActions
