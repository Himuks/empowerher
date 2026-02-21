import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Scale, MessageCircle, Shield, BookOpen, Phone, ArrowRight, Zap } from 'lucide-react'

const modules = [
  { name: 'Legal Rights', href: '/legal-rights', icon: Scale, gradient: 'from-blue-500 to-cyan-500', desc: 'Know your rights' },
  { name: 'Voice Training', href: '/voice-training', icon: MessageCircle, gradient: 'from-violet-500 to-purple-600', desc: 'Speak confidently' },
  { name: 'Self Defense', href: '/self-defense', icon: Shield, gradient: 'from-emerald-500 to-green-600', desc: 'Learn techniques' },
]

const quickActions = [
  { name: 'Resources', href: '/resources', icon: BookOpen, gradient: 'from-amber-500 to-orange-500', desc: 'Guides & support' },
  { name: 'Emergency', href: '/emergency', icon: Phone, gradient: 'from-red-500 to-rose-600', desc: 'Quick contacts' },
]

const ActionCard = ({ item, index }) => {
  const Icon = item.icon
  return (
    <Link to={item.href}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 + index * 0.05 }}
        className="glass-card p-4 glass-hover group cursor-pointer text-center h-full flex flex-col justify-center"
      >
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="text-sm font-semibold text-white mb-0.5">{item.name}</div>
        <div className="text-[11px] text-slate-400">{item.desc}</div>
      </motion.div>
    </Link>
  )
}

const QuickActions = () => (
  <div className="space-y-6">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <div className="flex items-center space-x-2 mb-4">
        <h3 className="text-lg font-display font-bold text-white">Training Modules</h3>
        <ArrowRight className="w-4 h-4 text-slate-500" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {modules.map((module, i) => (
          <ActionCard key={module.name} item={module} index={i} />
        ))}
      </div>
    </motion.div>

    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
      <div className="flex items-center space-x-2 mb-4">
        <h3 className="text-lg font-display font-bold text-white">Quick Actions</h3>
        <Zap className="w-4 h-4 text-amber-500" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action, i) => (
          <ActionCard key={action.name} item={action} index={i + modules.length} />
        ))}
      </div>
    </motion.div>
  </div>
)

export default QuickActions
