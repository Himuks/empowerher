import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Phone, 
  FileText, 
  MessageCircle, 
  Shield,
  ArrowRight 
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'

const QuickActions = () => {
  const actions = [
    {
      title: "Emergency Help",
      description: "Quick access to emergency contacts",
      icon: Phone,
      href: "/emergency",
      color: "bg-red-500",
      hoverColor: "hover:bg-red-600"
    },
    {
      title: "FIR Guide",
      description: "Learn how to file a complaint",
      icon: FileText,
      href: "/legal-rights",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600"
    },
    {
      title: "Practice Voice",
      description: "Quick assertiveness exercise",
      icon: MessageCircle,
      href: "/voice-training",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600"
    },
    {
      title: "Safety Tips",
      description: "View defense techniques",
      icon: Shield,
      href: "/self-defense",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ArrowRight className="w-5 h-5 text-pink-600" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {actions.map((action, index) => {
              const Icon = action.icon
              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <Link to={action.href}>
                    <Button
                      variant="outline"
                      className={`w-full h-auto p-4 flex flex-col items-center space-y-2 ${action.hoverColor} hover:text-white transition-all duration-200 group border-gray-200`}
                    >
                      <div className={`w-10 h-10 rounded-full ${action.color} flex items-center justify-center group-hover:bg-white/20 transition-colors`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-sm">{action.title}</div>
                        <div className="text-xs text-gray-500 group-hover:text-white/80">
                          {action.description}
                        </div>
                      </div>
                    </Button>
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
