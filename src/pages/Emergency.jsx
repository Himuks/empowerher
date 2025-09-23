import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  Phone, 
  Plus,
  AlertCircle,
  Shield,
  Heart,
  Stethoscope,
  Scale,
  Users,
  Clock
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import AddContactForm from '../components/emergency/AddContactForm'
import EmergencyContactCard from '../components/emergency/EmergencyContactCard'
import { mockEntityOperations } from '../lib/utils'

const Emergency = () => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [userContacts, setUserContacts] = useState([])
  const [loading, setLoading] = useState(true)

  // Default emergency contacts
  const defaultContacts = [
    {
      id: 'police',
      name: 'Police Emergency',
      phone_number: '100',
      category: 'police',
      description: 'Emergency police services',
      availability: '24/7',
      is_active: true
    },
    {
      id: 'womens_helpline',
      name: 'Women\'s Helpline',
      phone_number: '181',
      category: 'helpline',
      description: 'National helpline for women in distress',
      availability: '24/7',
      is_active: true
    },
    {
      id: 'medical',
      name: 'Medical Emergency',
      phone_number: '112',
      category: 'medical',
      description: 'Emergency medical services',
      availability: '24/7',
      is_active: true
    },
    {
      id: 'legal_aid',
      name: 'Legal Aid Helpline',
      phone_number: '15100',
      category: 'legal_aid',
      description: 'Free legal advice and assistance',
      availability: 'Mon-Fri 9AM-6PM',
      is_active: true
    }
  ]

  useEffect(() => {
    loadContacts()
  }, [])

  const loadContacts = async () => {
    try {
      const contacts = await mockEntityOperations.list('EmergencyContact')
      setUserContacts(contacts)
    } catch (error) {
      console.error('Error loading contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddContact = async (contactData) => {
    try {
      const newContact = await mockEntityOperations.create('EmergencyContact', contactData)
      setUserContacts(prev => [...prev, newContact])
      setShowAddForm(false)
    } catch (error) {
      console.error('Error adding contact:', error)
    }
  }

  const handleDeleteContact = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await mockEntityOperations.delete('EmergencyContact', contactId)
        setUserContacts(prev => prev.filter(contact => contact.id !== contactId))
      } catch (error) {
        console.error('Error deleting contact:', error)
      }
    }
  }

  const handleEditContact = (contact) => {
    // For demo purposes, we'll just show an alert
    alert(`Edit functionality would open a form for: ${contact.name}`)
  }

  const groupContactsByCategory = (contacts) => {
    return contacts.reduce((groups, contact) => {
      const category = contact.category
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(contact)
      return groups
    }, {})
  }

  const getCategoryTitle = (category) => {
    const titles = {
      'personal': 'Personal Contacts',
      'police': 'Police & Security',
      'legal_aid': 'Legal Aid',
      'counseling': 'Counseling & Support',
      'medical': 'Medical Services',
      'helpline': 'Helplines'
    }
    return titles[category] || category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'personal': return Users
      case 'police': return Shield
      case 'legal_aid': return Scale
      case 'counseling': return Heart
      case 'medical': return Stethoscope
      case 'helpline': return Phone
      default: return Phone
    }
  }

  const groupedUserContacts = groupContactsByCategory(userContacts)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4"
      >
        <Link to="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
            <Phone className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Emergency Contacts</h1>
            <p className="text-gray-600">Quick access to essential support and emergency services</p>
          </div>
        </div>
      </motion.div>

      {/* Emergency Alert */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-red-50 to-rose-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-red-800 mb-2">🚨 In Case of Emergency</h3>
                <div className="text-red-700 text-sm space-y-2">
                  <p>
                    <strong>If you are in immediate danger:</strong> Call 100 (Police) or 112 (Emergency Services) right away.
                  </p>
                  <p>
                    <strong>For women in distress:</strong> Call 181 for specialized support and guidance.
                  </p>
                  <p>
                    <strong>Remember:</strong> Your safety is the top priority. Don't hesitate to ask for help.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Emergency Numbers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-red-600" />
              <span>Quick Emergency Numbers</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {defaultContacts.map((contact, index) => (
                <EmergencyContactCard
                  key={contact.id}
                  contact={contact}
                  index={index}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Your Emergency Contacts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-red-600" />
                <span>Your Emergency Contacts</span>
              </CardTitle>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-red-600 hover:bg-red-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <AnimatePresence>
              {showAddForm && (
                <AddContactForm
                  onSave={handleAddContact}
                  onCancel={() => setShowAddForm(false)}
                />
              )}
            </AnimatePresence>

            {userContacts.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No personal contacts yet</h3>
                <p className="text-gray-600 mb-4">
                  Add your trusted contacts for quick access during emergencies
                </p>
                <Button
                  onClick={() => setShowAddForm(true)}
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Contact
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(groupedUserContacts).map(([category, contacts]) => {
                  const Icon = getCategoryIcon(category)
                  return (
                    <div key={category}>
                      <div className="flex items-center space-x-2 mb-4">
                        <Icon className="w-5 h-5 text-gray-600" />
                        <h3 className="text-lg font-medium text-gray-900">
                          {getCategoryTitle(category)}
                        </h3>
                        <div className="h-px bg-gray-200 flex-1" />
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {contacts.map((contact, index) => (
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
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Emergency Preparedness Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <span>Emergency Preparedness Tips</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-orange-800 mb-3">Before an Emergency</h4>
                <ul className="space-y-2 text-sm text-orange-700">
                  <li className="flex items-start space-x-2">
                    <div className="w-5 h-5 rounded-full bg-orange-600 text-white text-xs font-bold flex items-center justify-center mt-0.5 flex-shrink-0">1</div>
                    <span>Keep this contact list easily accessible on your phone</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-5 h-5 rounded-full bg-orange-600 text-white text-xs font-bold flex items-center justify-center mt-0.5 flex-shrink-0">2</div>
                    <span>Share your location with trusted contacts</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-5 h-5 rounded-full bg-orange-600 text-white text-xs font-bold flex items-center justify-center mt-0.5 flex-shrink-0">3</div>
                    <span>Have a safety plan for different scenarios</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-5 h-5 rounded-full bg-orange-600 text-white text-xs font-bold flex items-center justify-center mt-0.5 flex-shrink-0">4</div>
                    <span>Keep important documents easily accessible</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-orange-800 mb-3">During an Emergency</h4>
                <ul className="space-y-2 text-sm text-orange-700">
                  <li className="flex items-start space-x-2">
                    <div className="w-5 h-5 rounded-full bg-orange-600 text-white text-xs font-bold flex items-center justify-center mt-0.5 flex-shrink-0">1</div>
                    <span>Stay calm and assess the situation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-5 h-5 rounded-full bg-orange-600 text-white text-xs font-bold flex items-center justify-center mt-0.5 flex-shrink-0">2</div>
                    <span>Call emergency services if in immediate danger</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-5 h-5 rounded-full bg-orange-600 text-white text-xs font-bold flex items-center justify-center mt-0.5 flex-shrink-0">3</div>
                    <span>Contact trusted people to inform them of your situation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-5 h-5 rounded-full bg-orange-600 text-white text-xs font-bold flex items-center justify-center mt-0.5 flex-shrink-0">4</div>
                    <span>Follow the safety plans you've prepared</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Emergency
