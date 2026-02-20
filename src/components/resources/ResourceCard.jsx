import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Download,
  FileText,
  BookOpen,
  CheckSquare,
  ExternalLink,
  Star,
  X,
  CheckCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { downloadResource, generateResourceContent } from '../../lib/utils'

const ResourceCard = ({ resource, index = 0 }) => {
  const [showPreview, setShowPreview] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

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
    downloadResource(resource.id, resource.title)
    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 3000)
  }

  const handlePreview = () => {
    setShowPreview(true)
  }

  const previewContent = showPreview ? generateResourceContent(resource.id) : ''

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }}>
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
                  <Badge className={`mt-1 ${getTypeColor(resource.type)}`} variant="outline">{resource.type}</Badge>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 leading-relaxed">{resource.description}</p>
            <div className="flex items-center justify-between pt-2">
              <div className="text-sm text-gray-500">Free download • High quality</div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="group-hover:border-orange-300" onClick={handlePreview}>
                  <ExternalLink className="w-4 h-4 mr-1" /> Preview
                </Button>
                <Button onClick={handleDownload} className={`${downloaded ? 'bg-green-600 hover:bg-green-700' : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600'}`} size="sm">
                  {downloaded ? <><CheckCircle className="w-4 h-4 mr-1" /> Downloaded!</> : <><Download className="w-4 h-4 mr-1" /> Download</>}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-2">
                  <Icon className="w-5 h-5 text-orange-600" />
                  <h3 className="font-bold text-gray-900">{resource.title}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Button onClick={handleDownload} size="sm" className="bg-gradient-to-r from-orange-500 to-amber-500">
                    <Download className="w-4 h-4 mr-1" /> Download
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setShowPreview(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto max-h-[65vh]">
                <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 leading-relaxed">
                  {previewContent}
                </pre>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ResourceCard
