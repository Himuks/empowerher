import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  X, 
  Phone, 
  User,
  FileText,
  Clock,
  Save
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

const AddContactForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    category: '',
    description: '',
    availability: ''
  })

  const [errors, setErrors] = useState({})

  const categories = [
    { value: 'personal', label: 'Personal Contact' },
    { value: 'police', label: 'Police' },
    { value: 'legal_aid', label: 'Legal Aid' },
    { value: 'counseling', label: 'Counseling' },
    { value: 'medical', label: 'Medical' },
    { value: 'helpline', label: 'Helpline' }
  ]

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = 'Phone number is required'
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSave({
        ...formData,
        is_active: true
      })
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'police': return 'text-blue-600'
      case 'legal_aid': return 'text-purple-600'
      case 'counseling': return 'text-green-600'
      case 'medical': return 'text-red-600'
      case 'helpline': return 'text-orange-600'
      case 'personal': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-red-200 bg-gradient-to-br from-red-50 to-rose-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5 text-red-600" />
              <span>Add Emergency Contact</span>
            </CardTitle>
            <Button variant="outline" size="icon" onClick={onCancel}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Name *</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter contact name"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Phone Number *</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone_number}
                onChange={(e) => handleChange('phone_number', e.target.value)}
                placeholder="Enter phone number"
                className={errors.phone_number ? 'border-red-500' : ''}
              />
              {errors.phone_number && (
                <p className="text-sm text-red-600">{errors.phone_number}</p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Category *</span>
              </Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => handleChange('category', value)}
              >
                <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <span className={getCategoryColor(category.value)}>
                        {category.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-600">{errors.category}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Description *</span>
              </Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Brief description of this contact"
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && (
                <p className="text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            {/* Availability */}
            <div className="space-y-2">
              <Label htmlFor="availability" className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Availability</span>
              </Label>
              <Input
                id="availability"
                value={formData.availability}
                onChange={(e) => handleChange('availability', e.target.value)}
                placeholder="e.g., 24/7, Mon-Fri 9AM-5PM"
              />
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default AddContactForm
