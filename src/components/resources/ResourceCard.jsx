import React from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  FileText, 
  BookOpen, 
  CheckSquare,
  ExternalLink,
  Star
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

const ResourceCard = ({ resource, index = 0 }) => {
  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf guide': return FileText
      case 'checklist': return CheckSquare
      case 'workbook': return BookOpen
      default: return FileText
    }
  }

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf guide': return 'bg-red-100 text-red-800'
      case 'checklist': return 'bg-green-100 text-green-800'
      case 'workbook': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const Icon = getTypeIcon(resource.type)

  const handleDownload = () => {
    // In a real app, this would trigger actual download
    console.log('Downloading:', resource.title)
    // For demo purposes, we'll just show an alert
    alert(`Downloaded: ${resource.title}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Card className="hover:shadow-lg transition-all duration-200 group">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg group-hover:text-orange-600 transition-colors">
                  {resource.title}
                </CardTitle>
                <Badge 
                  className={`mt-1 ${getTypeColor(resource.type)}`}
                  variant="outline"
                >
                  {resource.type}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-yellow-500 fill-current"
                />
              ))}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            {resource.description}
          </p>
          
          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-gray-500">
              Free download • High quality
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="group-hover:border-orange-300"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Preview
              </Button>
              <Button
                onClick={handleDownload}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                size="sm"
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ResourceCard
