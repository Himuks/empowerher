import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Phone,
  Plus,
  Shield,
  AlertCircle,
  Heart,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import EmergencyContactCard from '../components/emergency/EmergencyContactCard'
import AddContactForm from '../components/emergency/AddContactForm'
import { mockEntityOperations } from '../lib/utils'

const Emergency = () => {
  const [userContacts, setUserContacts] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingContact, setEditingContact] = useState(null)
  const [loading, setLoading] = useState(true)

  const defaultEmergencyNumbers = [
    { id: 'default_police', name: 'Police Emergency', phone_number: '100', category: 'police', description: 'For immediate police assistance in emergencies', availability: '24/7' },
    { id: 'default_helpline', name: "Women's Helpline", phone_number: '181', category: 'helpline', description: 'Counseling and support for women in distress', availability: '24/7' },
    { id: 'default_medical', name: 'Emergency Services', phone_number: '112', category: 'medical', description: 'Unified emergency number for police, fire, and ambulance', availability: '24/7' },
    { id: 'default_dv', name: 'Domestic Violence', phone_number: '1091', category: 'helpline', description: 'Domestic violence reporting and support', availability: '24/7' },
    { id: 'default_legal', name: 'Legal Aid (NALSA)', phone_number: '15100', category: 'legal_aid', description: 'Free legal advice and advocate assignment', availability: 'Mon-Fri 9AM-6PM' }
  ]

  const loadContacts = useCallback(async () => {
    try {
      const contacts = await mockEntityOperations.list('EmergencyContact')
      setUserContacts(contacts)
    } catch (error) {
      console.error('Error loading contacts:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadContacts() }, [loadContacts])

  const handleAddContact = async (contactData) => {
    if (editingContact) {
      // Update existing contact
      await mockEntityOperations.update('EmergencyContact', editingContact.id, contactData)
      setEditingContact(null)
    } else {
      // Create new contact
      await mockEntityOperations.create('EmergencyContact', contactData)
    }
    setShowAddForm(false)
    loadContacts()
  }

  const handleEditContact = (contact) => {
    setEditingContact(contact)
    setShowAddForm(true)
  }

  const handleDeleteContact = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this emergency contact?')) {
      await mockEntityOperations.delete('EmergencyContact', contactId)
      loadContacts()
    }
  }

  const handleCancelForm = () => {
    setShowAddForm(false)
    setEditingContact(null)
  }

  // Group user contacts by category
  const _groupedContacts = userContacts.reduce((groups, contact) => {
    const cat = contact.category || 'personal'
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(contact)
    return groups
  }, {})

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
          <Heart className="w-8 h-8 text-pink-500" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/"><Button variant="outline" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-rose-600 flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Emergency Contacts</h1>
              <p className="text-gray-600">Quick access to help when you need it most</p>
            </div>
          </div>
        </div>
        <Button
          onClick={() => { setEditingContact(null); setShowAddForm(true) }}
          className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Contact
        </Button>
      </motion.div>

      {/* Emergency Alert */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Card className="border-red-300 bg-gradient-to-r from-red-50 to-rose-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-bold text-red-800 text-lg mb-1">In Immediate Danger?</div>
                <p className="text-red-700 text-sm">Call <strong>112</strong> (Emergency Services) or <strong>100</strong> (Police). Your safety is the top priority.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Add/Edit Contact Form */}
      <AnimatePresence>
        {showAddForm && (
          <AddContactForm
            onSave={handleAddContact}
            onCancel={handleCancelForm}
            existingContact={editingContact}
          />
        )}
      </AnimatePresence>

      {/* Default Emergency Numbers */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <Shield className="w-5 h-5 text-red-600" />
            <span>Emergency Numbers</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {defaultEmergencyNumbers.map((contact, index) => (
              <EmergencyContactCard key={contact.id} contact={contact} index={index} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* User Added Contacts */}
      {userContacts.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <Heart className="w-5 h-5 text-pink-600" />
              <span>Your Personal Contacts</span>
              <Badge className="bg-pink-100 text-pink-800" variant="outline">{userContacts.length}</Badge>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userContacts.map((contact, index) => (
                <EmergencyContactCard
                  key={contact.id}
                  contact={contact}
                  index={index}
                  onEdit={handleEditContact}
                  onDelete={handleDeleteContact}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Preparedness Tips */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <span>Emergency Preparedness Tips</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Keep your phone charged and emergency numbers saved",
                "Share your location with a trusted contact when going out",
                "Know the location of the nearest police station and hospital",
                "Have an emergency bag ready with documents, cash, and essentials",
                "Create a code word to signal for help without alerting others",
                "Practice your safety plan until it becomes second nature"
              ].map((tip, index) => (
                <div key={index} className="flex items-start space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Emergency
