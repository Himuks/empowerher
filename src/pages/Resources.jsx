import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  BookOpen, 
  Download,
  Phone,
  AlertCircle,
  Shield,
  FileText,
  Users,
  Heart
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import ResourceCard from '../components/resources/ResourceCard'
import HelplineCard from '../components/resources/HelplineCard'
import { mockResources, mockHelplines } from '../lib/mockData'

const Resources = () => {
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
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resources & Support</h1>
            <p className="text-gray-600">Educational materials, guides, and helplines for your empowerment journey</p>
          </div>
        </div>
      </motion.div>

      {/* Emergency Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-red-50 to-rose-50 border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-800">
              <AlertCircle className="w-5 h-5" />
              <span>In an Emergency</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-red-800 mb-3">Immediate Action Steps:</h4>
                <ul className="space-y-2 text-sm text-red-700">
                  <li className="flex items-start space-x-2">
                    <div className="w-5 h-5 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center mt-0.5 flex-shrink-0">1</div>
                    <span>Call emergency services (100/112) if you're in immediate danger</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-5 h-5 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center mt-0.5 flex-shrink-0">2</div>
                    <span>Get to a safe location away from the threat</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-5 h-5 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center mt-0.5 flex-shrink-0">3</div>
                    <span>Contact trusted friends, family, or support services</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-5 h-5 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center mt-0.5 flex-shrink-0">4</div>
                    <span>Document any evidence if it's safe to do so</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-red-800 mb-3">Safety Preparation:</h4>
                <ul className="space-y-2 text-sm text-red-700">
                  <li className="flex items-start space-x-2">
                    <Shield className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Keep emergency contacts easily accessible</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Shield className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Have a safety plan for different scenarios</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Shield className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Trust your instincts - if something feels wrong, act</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Shield className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Know your legal rights and available resources</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <Link to="/emergency">
                <Button className="bg-red-600 hover:bg-red-700">
                  <Phone className="w-4 h-4 mr-2" />
                  View Emergency Contacts
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Educational Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-orange-600" />
              <span>Educational Resources</span>
            </CardTitle>
            <p className="text-gray-600">Download comprehensive guides and materials to support your learning</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockResources.map((resource, index) => (
                <ResourceCard 
                  key={resource.id} 
                  resource={resource} 
                  index={index}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Helplines Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-orange-600" />
              <span>Support Helplines</span>
            </CardTitle>
            <p className="text-gray-600">Professional support services available when you need help</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockHelplines.map((helpline, index) => (
                <HelplineCard 
                  key={helpline.id} 
                  helpline={helpline} 
                  index={index}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Additional Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-orange-600" />
              <span>Community & Additional Support</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-white rounded-lg border border-orange-100">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Online Communities</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Connect with other women on similar empowerment journeys for support and encouragement.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Join Community
                </Button>
              </div>
              
              <div className="p-4 bg-white rounded-lg border border-orange-100">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mb-3">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Expert Articles</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Read insights from legal experts, counselors, and self-defense instructors.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Read Articles
                </Button>
              </div>
              
              <div className="p-4 bg-white rounded-lg border border-orange-100">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mb-3">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Professional Counseling</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Find qualified counselors and therapists who specialize in women's issues.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Find Counselor
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Resource Request */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Need More Resources?</h3>
            <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
              We're constantly adding new educational materials and resources. 
              Let us know what specific topics or guides would be most helpful for your empowerment journey.
            </p>
            <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
              Request Resources
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Resources
