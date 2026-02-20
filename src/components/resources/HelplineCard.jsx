import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Clock, Heart, AlertCircle } from 'lucide-react'

const HelplineCard = ({ helpline, index = 0 }) => {
  const handleCall = () => {
    if (typeof window !== 'undefined') {
      window.location.href = `tel:${helpline.number}`
    }
  }

  const isEmergency = helpline.number === '100' || helpline.number === '112'
  const is247 = helpline.availability.includes('24/7')

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
      <div className={`glass-card p-4 glass-hover group ${isEmergency ? 'border-red-500/20' : ''}`}>
        <div className="flex items-center space-x-3 mb-2">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isEmergency ? 'bg-gradient-to-br from-red-500 to-rose-600' : 'bg-gradient-to-br from-amber-500 to-orange-500'}`}>
            {isEmergency ? <AlertCircle className="w-5 h-5 text-white" /> : <Heart className="w-5 h-5 text-white" />}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-white text-sm">{helpline.name}</h4>
            <span className={`inline-flex items-center text-[10px] font-medium ${is247 ? 'text-emerald-400' : 'text-blue-400'}`}>
              <Clock className="w-2.5 h-2.5 mr-0.5" />{helpline.availability}
            </span>
          </div>
          <div className="text-lg font-display font-bold text-white">{helpline.number}</div>
        </div>
        <p className="text-xs text-slate-400 mb-3">{helpline.description}</p>
        <button onClick={handleCall} className={`w-full text-xs font-semibold py-2 rounded-lg flex items-center justify-center space-x-1 transition-all hover:-translate-y-0.5 ${isEmergency ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:shadow-lg hover:shadow-red-500/20' : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:shadow-amber-500/20'}`}>
          <Phone className="w-3 h-3" /><span>Call Now</span>
        </button>
      </div>
    </motion.div>
  )
}

export default HelplineCard
