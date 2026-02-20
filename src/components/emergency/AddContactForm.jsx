import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, X, Phone, User, FileText, Clock, Save, Edit3 } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const AddContactForm = ({ onSave, onCancel, existingContact = null }) => {
  const [formData, setFormData] = useState({ name: '', phone_number: '', category: '', description: '', availability: '' })
  const [errors, setErrors] = useState({})
  const isEditing = !!existingContact

  useEffect(() => {
    if (existingContact) setFormData({ name: existingContact.name || '', phone_number: existingContact.phone_number || '', category: existingContact.category || '', description: existingContact.description || '', availability: existingContact.availability || '' })
  }, [existingContact])

  const categories = [
    { value: 'personal', label: 'Personal Contact' },
    { value: 'police', label: 'Police' },
    { value: 'legal_aid', label: 'Legal Aid' },
    { value: 'counseling', label: 'Counseling' },
    { value: 'medical', label: 'Medical' },
    { value: 'helpline', label: 'Helpline' }
  ]

  const handleChange = (field, value) => { setFormData(prev => ({ ...prev, [field]: value })); if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' })) }

  const validateForm = () => {
    const e = {}
    if (!formData.name.trim()) e.name = 'Name is required'
    if (!formData.phone_number.trim()) e.phone_number = 'Phone number is required'
    if (!formData.category) e.category = 'Category is required'
    if (!formData.description.trim()) e.description = 'Description is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => { e.preventDefault(); if (validateForm()) onSave({ ...formData, is_active: true }) }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
      <div className="glass-card overflow-hidden">
        <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isEditing ? <Edit3 className="w-5 h-5 text-red-400" /> : <Plus className="w-5 h-5 text-red-400" />}
            <h3 className="font-display font-bold text-white">{isEditing ? 'Edit Contact' : 'Add Emergency Contact'}</h3>
          </div>
          <button onClick={onCancel} className="p-1.5 rounded-lg border border-slate-700 hover:bg-slate-800/50 text-slate-400"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="flex items-center space-x-1.5 text-slate-300"><User className="w-3.5 h-3.5" /><span>Name *</span></Label>
              <Input id="name" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="Enter contact name" className={`bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 ${errors.name ? 'border-red-500' : ''}`} />
              {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="flex items-center space-x-1.5 text-slate-300"><Phone className="w-3.5 h-3.5" /><span>Phone *</span></Label>
              <Input id="phone" type="tel" value={formData.phone_number} onChange={(e) => handleChange('phone_number', e.target.value)} placeholder="Enter phone number" className={`bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 ${errors.phone_number ? 'border-red-500' : ''}`} />
              {errors.phone_number && <p className="text-xs text-red-400">{errors.phone_number}</p>}
            </div>
            <div className="space-y-1.5">
              <Label className="flex items-center space-x-1.5 text-slate-300"><FileText className="w-3.5 h-3.5" /><span>Category *</span></Label>
              <Select value={formData.category} onValueChange={(v) => handleChange('category', v)}>
                <SelectTrigger className={`bg-slate-800/50 border-slate-700 text-white ${errors.category ? 'border-red-500' : ''}`}><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {categories.map((c) => <SelectItem key={c.value} value={c.value} className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-xs text-red-400">{errors.category}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="desc" className="flex items-center space-x-1.5 text-slate-300"><FileText className="w-3.5 h-3.5" /><span>Description *</span></Label>
              <Input id="desc" value={formData.description} onChange={(e) => handleChange('description', e.target.value)} placeholder="Brief description" className={`bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 ${errors.description ? 'border-red-500' : ''}`} />
              {errors.description && <p className="text-xs text-red-400">{errors.description}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="avail" className="flex items-center space-x-1.5 text-slate-300"><Clock className="w-3.5 h-3.5" /><span>Availability</span></Label>
              <Input id="avail" value={formData.availability} onChange={(e) => handleChange('availability', e.target.value)} placeholder="e.g., 24/7, Mon-Fri 9AM-5PM" className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500" />
            </div>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button type="button" onClick={onCancel} className="text-sm text-slate-400 hover:text-white px-4 py-2 rounded-lg border border-slate-700 hover:bg-slate-800/50">Cancel</button>
              <button type="submit" className="text-sm font-semibold bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"><Save className="w-4 h-4 mr-1.5 inline" />{isEditing ? 'Update' : 'Add Contact'}</button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  )
}

export default AddContactForm
