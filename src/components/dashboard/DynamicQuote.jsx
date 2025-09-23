import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { mockQuotes } from '../../lib/mockData'

const DynamicQuote = () => {
  const [currentQuote, setCurrentQuote] = useState('')

  useEffect(() => {
    // Get daily quote based on current date
    const today = new Date()
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)
    const quoteIndex = dayOfYear % mockQuotes.length
    setCurrentQuote(mockQuotes[quoteIndex])
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Card className="bg-gradient-to-r from-pink-50 via-rose-50 to-purple-50 border-pink-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Quote className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-lg font-medium text-gray-800 leading-relaxed italic">
                "{currentQuote}"
              </p>
              <p className="text-sm text-gray-600 mt-3">Daily Inspiration</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default DynamicQuote
