import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Scale, MessageCircle, Shield, BookOpen, Phone, ArrowRight } from 'lucide-react'

const actions = [
  { name: 'Legal Rights', href: '/legal-rights', icon: Scale, gradient: 'from-blue-500 to-cyan-500', desc: 'Know your rights' },
  { name: 'Voice Training', href: '/voice-training', icon: MessageCircle, gradient: 'from-violet-500 to-purple-600', desc: 'Speak with confidence' },
  { name: 'Self Defense', href: '/self-defense', icon: Shield, gradient: 'from-emerald-500 to-green-600', desc: 'Learn techniques' },
  { name: 'Resources', href: '/resources', icon: BookOpen, gradient: 'from-amber-500 to-orange-500', desc: 'Guides & support' },
  { name: 'Emergency', href: '/emergency', icon: Phone, gradient: 'from-red-500 to-rose-600', desc: 'Quick contacts' },
]

const QuickActions = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
    <div className="flex items-center space-x-2 mb-4">
      <h3 className="text-lg font-display font-bold text-white">Quick Actions</h3>
      <ArrowRight className="w-4 h-4 text-slate-500" />
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {actions.map((action, i) => {
        const Icon = action.icon
        return (
          <Link key={action.name} to={action.href}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.05 }}
              className="glass-card p-4 glass-hover group cursor-pointer text-center"
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-sm font-semibold text-white mb-0.5">{action.name}</div>
              <div className="text-[11px] text-slate-400">{action.desc}</div>
            </motion.div>
          </Link>
        )
      })}
    </div>
  </motion.div>
)

export default QuickActions
