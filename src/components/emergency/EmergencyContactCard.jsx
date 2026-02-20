import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Clock, Edit3, Trash2, Shield, Heart, Scale, UserCheck, Stethoscope, HelpCircle } from 'lucide-react'

const EmergencyContactCard = ({ contact, index = 0, onEdit = () => { }, onDelete = () => { } }) => {
  const handleCall = () => { if (typeof window !== 'undefined') window.location.href = `tel:${contact.phone_number}` }

  const getCategoryIcon = (c) => ({ police: Shield, legal_aid: Scale, counseling: Heart, medical: Stethoscope, personal: UserCheck, helpline: HelpCircle }[c] || Phone)
  const getCategoryColor = (c) => ({
    police: { text: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', gradient: 'from-blue-500 to-blue-600' },
    legal_aid: { text: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20', gradient: 'from-purple-500 to-purple-600' },
    counseling: { text: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', gradient: 'from-emerald-500 to-emerald-600' },
    medical: { text: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', gradient: 'from-red-500 to-red-600' },
    helpline: { text: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20', gradient: 'from-orange-500 to-orange-600' },
    personal: { text: 'text-slate-400', bg: 'bg-slate-500/10 border-slate-500/20', gradient: 'from-slate-500 to-slate-600' },
  }[c] || { text: 'text-slate-400', bg: 'bg-slate-500/10 border-slate-500/20', gradient: 'from-slate-500 to-slate-600' })

  const formatCategory = (c) => c.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
  const isEmergency = ['100', '112', '181', '1091', '15100'].includes(contact.phone_number)
  const Icon = getCategoryIcon(contact.category)
  const colors = getCategoryColor(contact.category)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
      <div className={`glass-card p-4 glass-hover ${isEmergency ? 'border-red-500/20' : ''}`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-0.5">
                <h3 className="font-semibold text-white text-sm truncate">{contact.name}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${colors.bg} ${colors.text}`}>{formatCategory(contact.category)}</span>
              </div>
              <div className="text-lg font-display font-bold text-white">{contact.phone_number}</div>
              <p className="text-xs text-slate-400 mt-0.5">{contact.description}</p>
              {contact.availability && <div className="flex items-center space-x-1 text-[10px] text-slate-500 mt-1"><Clock className="w-2.5 h-2.5" /><span>{contact.availability}</span></div>}
            </div>
          </div>
          <div className="flex flex-col space-y-1.5 ml-2">
            <button onClick={handleCall} className={`text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-all ${isEmergency ? 'bg-gradient-to-r from-red-500 to-rose-600' : `bg-gradient-to-r ${colors.gradient}`}`}>
              <Phone className="w-3 h-3 mr-1 inline" />Call
            </button>
            {!isEmergency && (
              <div className="flex space-x-1">
                <button onClick={() => onEdit(contact)} className="p-1.5 rounded-lg border border-white/[0.08] hover:bg-white/[0.06] text-slate-400"><Edit3 className="w-3 h-3" /></button>
                <button onClick={() => onDelete(contact.id)} className="p-1.5 rounded-lg border border-white/[0.08] hover:bg-red-500/10 text-red-400"><Trash2 className="w-3 h-3" /></button>
              </div>
            )}
          </div>
        </div>
        {isEmergency && <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-[10px] font-medium text-red-400">🚨 Emergency Number — Call immediately in urgent situations</div>}
      </div>
    </motion.div>
  )
}

export default EmergencyContactCard
