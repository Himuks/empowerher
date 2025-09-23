import React from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Eye, 
  AlertTriangle, 
  CheckCircle,
  Phone,
  Home,
  Car,
  Users
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const SafetyTips = () => {
  const safetyCategories = [
    {
      title: "Situational Awareness",
      icon: Eye,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      tips: [
        "Trust your instincts - if something feels wrong, it probably is",
        "Stay alert and avoid distractions like phones when walking alone",
        "Be aware of your surroundings and potential escape routes",
        "Make eye contact with people around you to show confidence"
      ]
    },
    {
      title: "Personal Safety",
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      tips: [
        "Walk confidently with purpose and good posture",
        "Keep your hands free and avoid carrying too many items",
        "Vary your routes and schedules when possible",
        "Let someone know where you're going and when to expect you"
      ]
    },
    {
      title: "Home Security",
      icon: Home,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      tips: [
        "Always lock doors and windows, even when home",
        "Don't open the door to strangers - verify identity first",
        "Install good lighting around entrances",
        "Have a safety plan and emergency contacts readily available"
      ]
    },
    {
      title: "Transportation Safety",
      icon: Car,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      tips: [
        "Check your vehicle before getting in",
        "Keep doors locked while driving",
        "Park in well-lit, busy areas when possible",
        "Have your keys ready before approaching your vehicle"
      ]
    }
  ]

  const emergencyPrep = [
    "Keep emergency contacts easily accessible",
    "Learn basic self-defense techniques",
    "Trust your instincts and act on them",
    "Have a safety plan for different scenarios",
    "Stay connected with friends and family"
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span>Essential Safety Tips</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Safety Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {safetyCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`p-4 ${category.bgColor} rounded-lg ${category.borderColor} border`}
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon className={`w-5 h-5 ${category.color}`} />
                    <h4 className="font-medium text-gray-900">{category.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {category.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start space-x-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>

          {/* Emergency Preparedness */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="p-4 bg-red-50 rounded-lg border border-red-200"
          >
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h4 className="font-medium text-gray-900">Emergency Preparedness</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {emergencyPrep.map((tip, index) => (
                <div key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Reference */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="p-4 bg-yellow-50 rounded-lg border border-yellow-200"
          >
            <div className="flex items-center space-x-2 mb-3">
              <Phone className="w-5 h-5 text-yellow-600" />
              <h4 className="font-medium text-gray-900">Remember</h4>
            </div>
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                <strong>Prevention is always better than confrontation.</strong> 
                The best self-defense is avoiding dangerous situations altogether.
              </p>
              <p>
                <strong>Trust your instincts.</strong> 
                If a situation doesn't feel right, remove yourself from it immediately.
              </p>
              <p>
                <strong>Emergency contacts should be easily accessible.</strong> 
                Know how to quickly call for help in your area.
              </p>
            </div>
          </motion.div>

          {/* Interactive Elements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="flex items-center justify-center space-x-2 text-sm text-gray-600"
          >
            <Users className="w-4 h-4" />
            <span>Share these tips with friends and family</span>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default SafetyTips
