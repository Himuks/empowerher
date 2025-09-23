import React from 'react'
import { motion } from 'framer-motion'
import { 
  Phone, 
  Clock, 
  Edit3,
  Trash2,
  Shield,
  Heart,
  Scale,
  UserCheck,
  Stethoscope,
  HelpCircle
} from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

const EmergencyContactCard = ({ 
  contact, 
  index = 0, 
  onEdit = () => {}, 
  onDelete = () => {} 
}) => {
  const handleCall = () => {
    if (typeof window !== 'undefined') {
      window.location.href = `tel:${contact.phone_number}`
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'police': return Shield
      case 'legal_aid': return Scale
      case 'counseling': return Heart
      case 'medical': return Stethoscope
      case 'personal': return UserCheck
      case 'helpline': return HelpCircle
      default: return Phone
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'police': return {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        icon: 'text-blue-600',
        gradient: 'from-blue-500 to-blue-600'
      }
      case 'legal_aid': return {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        icon: 'text-purple-600',
        gradient: 'from-purple-500 to-purple-600'
      }
      case 'counseling': return {
        bg: 'bg-green-100',
        text: 'text-green-800',
        icon: 'text-green-600',
        gradient: 'from-green-500 to-green-600'
      }
      case 'medical': return {
        bg: 'bg-red-100',
        text: 'text-red-800',
        icon: 'text-red-600',
        gradient: 'from-red-500 to-red-600'
      }
      case 'helpline': return {
        bg: 'bg-orange-100',
        text: 'text-orange-800',
        icon: 'text-orange-600',
        gradient: 'from-orange-500 to-orange-600'
      }
      case 'personal': return {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        icon: 'text-gray-600',
        gradient: 'from-gray-500 to-gray-600'
      }
      default: return {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        icon: 'text-gray-600',
        gradient: 'from-gray-500 to-gray-600'
      }
    }
  }

  const formatCategory = (category) => {
    return category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const isEmergencyNumber = () => {
    const emergencyNumbers = ['100', '112', '181', '1091', '15100']
    return emergencyNumbers.includes(contact.phone_number)
  }

  const Icon = getCategoryIcon(contact.category)
  const colors = getCategoryColor(contact.category)
  const isEmergency = isEmergencyNumber()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Card className={`hover:shadow-lg transition-all duration-200 group ${
        isEmergency ? 'border-red-200 bg-gradient-to-br from-red-50 to-rose-50' : ''
      }`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${colors.gradient} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium text-gray-900 truncate">
                    {contact.name}
                  </h3>
                  <Badge 
                    className={`${colors.bg} ${colors.text} text-xs`}
                    variant="outline"
                  >
                    {formatCategory(contact.category)}
                  </Badge>
                </div>
                
                <div className="text-lg font-bold text-gray-900 mb-1">
                  {contact.phone_number}
                </div>
                
                <p className="text-sm text-gray-600 mb-2">
                  {contact.description}
                </p>
                
                {contact.availability && (
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{contact.availability}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col space-y-2 ml-3">
              <Button
                onClick={handleCall}
                className={`${
                  isEmergency 
                    ? 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700' 
                    : `bg-gradient-to-r ${colors.gradient} hover:opacity-90`
                }`}
                size="sm"
              >
                <Phone className="w-4 h-4 mr-1" />
                Call
              </Button>
              
              {!isEmergency && (
                <div className="flex space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(contact)}
                    className="px-2"
                  >
                    <Edit3 className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(contact.id)}
                    className="px-2 hover:bg-red-50 hover:border-red-200"
                  >
                    <Trash2 className="w-3 h-3 text-red-600" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {isEmergency && (
            <div className="mt-3 p-2 bg-red-100 rounded-lg border border-red-200">
              <div className="text-xs font-medium text-red-800">
                🚨 Emergency Number - Call immediately in urgent situations
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default EmergencyContactCard
