import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Phone, Plus, Shield, AlertCircle, Heart, AlertTriangle,
  CheckCircle, X, User, Trash2, Edit3
} from 'lucide-react'
import { mockEntityOperations } from '../lib/utils'

const defaultContacts = [
  { id: 'police', name: 'Police', number: '100', icon: 'shield', gradient: 'from-blue-500 to-cyan-500', desc: 'Emergency police services' },
  { id: 'women', name: "Women's Helpline", number: '181', icon: 'heart', gradient: 'from-rose-500 to-pink-500', desc: '24/7 confidential support' },
  { id: 'emergency', name: 'Emergency', number: '112', icon: 'alert', gradient: 'from-red-500 to-rose-600', desc: 'Unified emergency number' },
  { id: 'dv', name: 'DV Helpline', number: '1091', icon: 'shield', gradient: 'from-purple-500 to-violet-600', desc: 'Domestic violence support' },
  { id: 'cyber', name: 'Cyber Crime', number: '1930', icon: 'alert', gradient: 'from-amber-500 to-orange-500', desc: 'Online harassment & fraud' },
  { id: 'child', name: 'Child Helpline', number: '1098', icon: 'heart', gradient: 'from-emerald-500 to-green-500', desc: 'Child abuse & neglect' },
]

const Emergency = () => {
  const [personalContacts, setPersonalContacts] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState({ name: '', number: '', relationship: '' })

  useEffect(() => {
    const load = async () => {
      const contacts = await mockEntityOperations.list('EmergencyContact')
      setPersonalContacts(contacts)
    }
    load()
  }, [])

  const handleSubmit = async () => {
    if (!form.name || !form.number) return
    if (editId) {
      await mockEntityOperations.update('EmergencyContact', editId, form)
    } else {
      await mockEntityOperations.create('EmergencyContact', form)
    }
    const contacts = await mockEntityOperations.list('EmergencyContact')
    setPersonalContacts(contacts)
    setShowAdd(false)
    setEditId(null)
    setForm({ name: '', number: '', relationship: '' })
  }

  const handleDelete = async (id) => {
    await mockEntityOperations.delete('EmergencyContact', id)
    const contacts = await mockEntityOperations.list('EmergencyContact')
    setPersonalContacts(contacts)
  }

  const handleEdit = (contact) => {
    setForm({ name: contact.name, number: contact.number, relationship: contact.relationship || '' })
    setEditId(contact.id)
    setShowAdd(true)
  }

  const iconMap = { shield: Shield, heart: Heart, alert: AlertCircle }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center space-x-4">
        <Link to="/"><button className="p-2 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 transition-colors"><ArrowLeft className="w-4 h-4" /></button></Link>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/20 animate-pulse-ring">
            <Phone className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-white">Emergency</h1>
            <p className="text-slate-400">Quick access to help when you need it</p>
          </div>
        </div>
      </motion.div>

      {/* SOS Banner */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
        <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r from-red-600/20 via-rose-600/15 to-red-600/20 border border-red-500/20">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl animate-glow-pulse" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-8 h-8 text-red-400" />
              <div>
                <h3 className="font-display font-bold text-white text-lg">In immediate danger?</h3>
                <p className="text-sm text-red-200/70">Call emergency services immediately — your safety comes first.</p>
              </div>
            </div>
            <a href="tel:112" className="flex items-center space-x-2 bg-red-500 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-0.5">
              <Phone className="w-4 h-4" />
              <span>Call 112 Now</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Emergency Contacts Grid */}
      <div>
        <h3 className="text-lg font-display font-bold text-white mb-4">Emergency Helplines</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {defaultContacts.map((contact, i) => {
            const Icon = iconMap[contact.icon] || Phone
            return (
              <motion.div key={contact.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
                <a href={`tel:${contact.number}`} className="block glass-card p-4 glass-hover group cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${contact.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white">{contact.name}</div>
                      <div className="text-xs text-slate-400">{contact.desc}</div>
                    </div>
                    <div className="text-lg font-display font-bold text-white">{contact.number}</div>
                  </div>
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Personal Contacts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-display font-bold text-white">Personal Contacts</h3>
          <button onClick={() => { setShowAdd(true); setEditId(null); setForm({ name: '', number: '', relationship: '' }) }} className="flex items-center space-x-1.5 text-sm font-medium text-rose-400 hover:text-rose-300 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Contact</span>
          </button>
        </div>

        {showAdd && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="glass-card p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-white">{editId ? 'Edit Contact' : 'Add Contact'}</h4>
              <button onClick={() => { setShowAdd(false); setEditId(null) }} className="text-slate-400 hover:text-slate-300"><X className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500/50" />
              <input type="tel" placeholder="Phone number" value={form.number} onChange={e => setForm({ ...form, number: e.target.value })} className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500/50" />
              <input type="text" placeholder="Relationship" value={form.relationship} onChange={e => setForm({ ...form, relationship: e.target.value })} className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500/50" />
            </div>
            <button onClick={handleSubmit} disabled={!form.name || !form.number} className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:shadow-lg hover:shadow-rose-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
              {editId ? 'Update' : 'Save Contact'}
            </button>
          </motion.div>
        )}

        {personalContacts.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <User className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-400 mb-1">No personal contacts yet</p>
            <p className="text-xs text-slate-500">Add trusted contacts for quick access during emergencies</p>
          </div>
        ) : (
          <div className="space-y-2">
            {personalContacts.map((contact, i) => (
              <motion.div key={contact.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="glass-card p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                      <User className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{contact.name}</div>
                      <div className="text-xs text-slate-400">{contact.relationship || 'Contact'} · {contact.number}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <a href={`tel:${contact.number}`} className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"><Phone className="w-4 h-4" /></a>
                    <button onClick={() => handleEdit(contact)} className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(contact.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Safety Tips */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="glass-card p-5">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-display font-bold text-white text-sm">Emergency Preparedness</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Keep emergency numbers memorized, not just saved',
              'Share your live location with a trusted contact',
              'Have a code word that means "call for help"',
              'Keep important documents at a trusted person\'s home',
              'Know the nearest police station and hospital',
              'Keep your phone charged at all times'
            ].map((tip, i) => (
              <div key={i} className="flex items-start space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Emergency
