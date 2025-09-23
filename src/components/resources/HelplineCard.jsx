import React from 'react'
import { motion } from 'framer-motion'
import { 
  Phone, 
  Clock, 
  Heart,
  AlertCircle,
  ExternalLink
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

const HelplineCard = ({ helpline, index = 0 }) => {
  const getAvailabilityColor = (availability) => {
    if (availability.includes('24/7')) {
      return 'bg-green-100 text-green-800'
    }
    return 'bg-blue-100 text-blue-800'
  }

  const handleCall = () => {
    if (typeof window !== 'undefined') {
      window.location.href = `tel:${helpline.number}`
    }
  }

  const isEmergency = helpline.number === '100' || helpline.number === '112'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Card className={`hover:shadow-lg transition-all duration-200 group ${
        isEmergency ? 'border-red-200 bg-gradient-to-br from-red-50 to-rose-50' : ''
      }`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isEmergency 
                  ? 'bg-gradient-to-r from-red-500 to-rose-600' 
                  : 'bg-gradient-to-r from-orange-500 to-amber-500'
              }`}>
                {isEmergency ? (
                  <AlertCircle className="w-6 h-6 text-white" />
                ) : (
                  <Heart className="w-6 h-6 text-white" />
                )}
              </div>
              <div className="flex-1">
                <CardTitle className={`text-lg group-hover:transition-colors ${
                  isEmergency ? 'group-hover:text-red-600' : 'group-hover:text-orange-600'
                }`}>
                  {helpline.name}
                </CardTitle>
                <Badge 
                  className={`mt-1 ${getAvailabilityColor(helpline.availability)}`}
                  variant="outline"
                >
                  <Clock className="w-3 h-3 mr-1" />
                  {helpline.availability}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            {helpline.description}
          </p>
          
          <div className="flex items-center justify-between pt-2">
            <div className="text-lg font-bold text-gray-900">
              {helpline.number}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="group-hover:border-orange-300"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                More Info
              </Button>
              <Button
                onClick={handleCall}
                className={`${
                  isEmergency 
                    ? 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700' 
                    : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600'
                }`}
                size="sm"
              >
                <Phone className="w-4 h-4 mr-1" />
                Call Now
              </Button>
            </div>
          </div>
          
          {isEmergency && (
            <div className="p-3 bg-red-100 rounded-lg border border-red-200">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-800">
                  Emergency Number - Available 24/7
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default HelplineCard
