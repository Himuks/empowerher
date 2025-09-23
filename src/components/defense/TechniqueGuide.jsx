import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Target, 
  AlertTriangle, 
  CheckCircle,
  Star,
  ArrowRight,
  Hand,
  Eye
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Slider } from '../ui/slider'
import { Badge } from '../ui/badge'

const TechniqueGuide = ({ 
  standalone = false, 
  lessonTitle = "", 
  onComplete = () => {},
  onBack = () => {} 
}) => {
  const [currentTechnique, setCurrentTechnique] = useState(0)
  const [confidence, setConfidence] = useState([3])
  const [completed, setCompleted] = useState(false)

  const techniques = [
    {
      name: "Palm Strike",
      description: "A powerful strike using the heel of your palm, targeting the attacker's nose or chin.",
      steps: [
        "Keep your fingers bent back and palm flat",
        "Aim for the base of the attacker's nose",
        "Strike upward with force using your body weight",
        "Follow through and create distance immediately"
      ],
      tips: [
        "Use your whole body, not just your arm",
        "Keep your wrist straight and strong",
        "Practice the motion slowly first"
      ],
      whenToUse: "When someone is directly in front of you and within arm's reach",
      safetyNote: "Only use when you feel genuinely threatened"
    },
    {
      name: "Knee Kick",
      description: "Drive your knee upward into an attacker's groin or stomach area.",
      steps: [
        "Grab the attacker's shoulders or clothing for balance",
        "Drive your knee up sharply and forcefully",
        "Aim for the groin, stomach, or thigh",
        "Use the momentum to push away and escape"
      ],
      tips: [
        "Pull the attacker toward you as you knee up",
        "Keep your balance with your hands",
        "Practice the motion for muscle memory"
      ],
      whenToUse: "When grabbed or when someone is very close to you",
      safetyNote: "Create distance immediately after the technique"
    },
    {
      name: "Wrist Escape",
      description: "Break free when someone grabs your wrist by leveraging their thumb weakness.",
      steps: [
        "Identify where their thumb is positioned",
        "Rotate your wrist toward their thumb",
        "Pull sharply in the direction of their thumb",
        "Step back and create distance"
      ],
      tips: [
        "The thumb is the weakest part of their grip",
        "Move quickly and decisively",
        "Practice with different grip positions"
      ],
      whenToUse: "When someone grabs your wrist or arm",
      safetyNote: "Be prepared to use additional techniques if needed"
    },
    {
      name: "Creating Distance",
      description: "Techniques to create space between you and a potential threat.",
      steps: [
        "Keep your hands up in a defensive position",
        "Take a step back while maintaining eye contact",
        "Use verbal de-escalation if possible",
        "Be ready to defend or escape"
      ],
      tips: [
        "Trust your instincts about dangerous situations",
        "Don't turn your back unless you're sure you can escape",
        "Keep your voice calm but firm"
      ],
      whenToUse: "When you sense potential danger but haven't been touched",
      safetyNote: "Prevention and avoidance are always the best options"
    }
  ]

  const handleComplete = () => {
    setCompleted(true)
    onComplete({
      confidence: confidence[0],
      technique: techniques[currentTechnique].name,
      timeSpent: 10 // Mock time
    })
  }

  const handleNextTechnique = () => {
    if (currentTechnique < techniques.length - 1) {
      setCurrentTechnique(currentTechnique + 1)
      setConfidence([3])
      setCompleted(false)
    }
  }

  if (standalone) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span>Quick Defense Reference</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Essential self-defense techniques for emergency situations.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {techniques.slice(0, 4).map((technique, index) => (
                <div key={index} className="p-3 bg-white rounded-lg border border-green-100">
                  <div className="font-medium text-sm text-gray-900">{technique.name}</div>
                  <div className="text-xs text-gray-600 mt-1">{technique.whenToUse}</div>
                </div>
              ))}
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              onClick={() => setCurrentTechnique(0)}
            >
              <Target className="w-4 h-4 mr-2" />
              View Detailed Guide
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  const technique = techniques[currentTechnique]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{lessonTitle}</h2>
          <p className="text-gray-600">Technique {currentTechnique + 1} of {techniques.length}</p>
        </div>
        <Badge className="bg-green-100 text-green-800" variant="outline">
          Self Defense
        </Badge>
      </motion.div>

      {/* Technique Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Hand className="w-5 h-5 text-green-600" />
              <span>{technique.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Description */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-gray-700 leading-relaxed">
                {technique.description}
              </p>
            </div>

            {/* Safety Warning */}
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-red-800 mb-1">Safety Note</div>
                  <div className="text-red-700 text-sm">{technique.safetyNote}</div>
                </div>
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
                <Target className="w-4 h-4 text-green-600" />
                <span>Step-by-Step Instructions</span>
              </h4>
              <div className="space-y-3">
                {technique.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Practice Tips */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Practice Tips:</h4>
              <div className="space-y-2">
                {technique.tips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* When to Use */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-3">
                <Eye className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-blue-800 mb-1">When to Use</div>
                  <div className="text-blue-700 text-sm">{technique.whenToUse}</div>
                </div>
              </div>
            </div>

            {/* Confidence Rating */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How confident do you feel with this technique?
                </label>
                <div className="px-3">
                  <Slider
                    value={confidence}
                    onValueChange={setConfidence}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Not confident</span>
                    <span>Very confident</span>
                  </div>
                </div>
                <div className="flex items-center justify-center mt-2">
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < confidence[0] ? 'text-yellow-500 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {confidence[0]}/5
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4">
              <Button variant="outline" onClick={onBack}>
                Back to Lessons
              </Button>
              
              <div className="flex items-center space-x-3">
                {!completed ? (
                  <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Technique
                  </Button>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Technique Learned!</span>
                    </div>
                    
                    {currentTechnique < techniques.length - 1 ? (
                      <Button onClick={handleNextTechnique}>
                        Next Technique
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => onComplete({ lessonComplete: true })}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Complete Lesson
                      </Button>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default TechniqueGuide
