import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Eye, AlertTriangle, CheckCircle, Phone, Home, Car, Users } from 'lucide-react'

const SafetyTips = () => {
  const cats = [
    { title: "Situational Awareness", icon: Eye, color: "text-blue-400", border: "border-blue-500/20", tips: ["Trust your instincts - if something feels wrong, it probably is", "Stay alert and avoid distractions like phones when walking alone", "Be aware of surroundings and potential escape routes", "Make eye contact to show confidence"] },
    { title: "Personal Safety", icon: Shield, color: "text-emerald-400", border: "border-emerald-500/20", tips: ["Walk confidently with purpose and good posture", "Keep your hands free and avoid carrying too many items", "Vary your routes and schedules when possible", "Let someone know where you're going"] },
    { title: "Home Security", icon: Home, color: "text-violet-400", border: "border-violet-500/20", tips: ["Always lock doors and windows, even when home", "Don't open the door to strangers", "Install good lighting around entrances", "Have a safety plan and emergency contacts ready"] },
    { title: "Transportation", icon: Car, color: "text-amber-400", border: "border-amber-500/20", tips: ["Check your vehicle before getting in", "Keep doors locked while driving", "Park in well-lit, busy areas", "Have keys ready before approaching your vehicle"] }
  ]

  const emergencyPrep = ["Keep emergency contacts accessible", "Learn basic self-defense", "Trust your instincts and act", "Have safety plans for different scenarios", "Stay connected with friends and family"]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <div className="glass-card p-5 space-y-5">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center"><Shield className="w-4 h-4 text-white" /></div>
          <h3 className="font-display font-bold text-white text-sm">Essential Safety Tips</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cats.map((cat, i) => {
            const Icon = cat.icon
            return (
              <motion.div key={cat.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className={`p-4 bg-slate-800/30 rounded-xl border ${cat.border}`}>
                <div className="flex items-center space-x-2 mb-2"><Icon className={`w-4 h-4 ${cat.color}`} /><h4 className="font-semibold text-white text-xs">{cat.title}</h4></div>
                <ul className="space-y-1.5">
                  {cat.tips.map((tip, j) => <li key={j} className="flex items-start space-x-2 text-xs text-slate-300"><CheckCircle className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" /><span>{tip}</span></li>)}
                </ul>
              </motion.div>
            )
          })}
        </div>

        <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
          <div className="flex items-center space-x-2 mb-2"><AlertTriangle className="w-4 h-4 text-red-400" /><h4 className="font-semibold text-red-300 text-xs">Emergency Preparedness</h4></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            {emergencyPrep.map((tip, i) => <div key={i} className="flex items-start space-x-2 text-xs text-slate-300"><CheckCircle className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" /><span>{tip}</span></div>)}
          </div>
        </div>

        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
          <p className="text-xs text-amber-300"><strong>Prevention is always better than confrontation.</strong> Trust your instincts. Keep emergency contacts accessible.</p>
        </div>

        <div className="text-center text-[10px] text-slate-500 flex items-center justify-center space-x-1"><Users className="w-3 h-3" /><span>Share these tips with friends and family</span></div>
      </div>
    </motion.div>
  )
}

export default SafetyTips
