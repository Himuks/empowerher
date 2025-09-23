import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Mic, 
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Slider } from '../ui/slider'
import { Badge } from '../ui/badge'

const VoiceExercise = ({ 
  standalone = false, 
  lessonTitle = "", 
  onComplete = () => {},
  onBack = () => {} 
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [confidence, setConfidence] = useState([3])
  const [completed, setCompleted] = useState(false)

  const exercises = [
    {
      title: "Practice saying 'No' clearly",
      description: "Practice saying 'No, I can't do that' with a firm, confident voice. Focus on speaking clearly and maintaining steady eye contact with yourself in the mirror.",
      tips: ["Keep your voice steady", "Maintain eye contact", "Stand tall", "Speak slowly and clearly"]
    },
    {
      title: "Express your opinion confidently",
      description: "Practice saying 'I disagree with that approach' or 'I have a different perspective'. Focus on being respectful but firm.",
      tips: ["Use confident body language", "Keep voice calm", "Be respectful but firm", "Don't apologize for your opinion"]
    },
    {
      title: "Request what you need",
      description: "Practice asking for something directly: 'I need you to stop interrupting me' or 'I would like to finish my point.'",
      tips: ["Be direct and specific", "Use 'I' statements", "Keep tone professional", "Don't over-explain"]
    }
  ]

  const handlePractice = () => {
    setIsPlaying(!isPlaying)
    // In a real app, this might start a timer or recording
  }

  const handleRestart = () => {
    setIsPlaying(false)
    setConfidence([3])
  }

  const handleComplete = () => {
    setCompleted(true)
    onComplete({
      confidence: confidence[0],
      exercise: exercises[currentExercise].title,
      timeSpent: 5 // Mock time
    })
  }

  const handleNextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      setIsPlaying(false)
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
        <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mic className="w-5 h-5 text-purple-600" />
              <span>Daily Voice Practice</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              "The most courageous act is still to think for yourself. Aloud."
            </p>
            <Button 
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
              onClick={() => setCurrentExercise(0)}
            >
              <Play className="w-4 h-4 mr-2" />
              Start Practice Session
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  const exercise = exercises[currentExercise]

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
          <p className="text-gray-600">Voice Exercise {currentExercise + 1} of {exercises.length}</p>
        </div>
        <Badge className="bg-purple-100 text-purple-800" variant="outline">
          Voice Training
        </Badge>
      </motion.div>

      {/* Exercise Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mic className="w-5 h-5 text-purple-600" />
              <span>{exercise.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Description */}
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-gray-700 leading-relaxed">
                {exercise.description}
              </p>
            </div>

            {/* Tips */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Practice Tips:</h4>
              <div className="grid grid-cols-2 gap-2">
                {exercise.tips.map((tip, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Practice Controls */}
            <div className="flex items-center justify-center space-x-4 py-6">
              <Button
                variant="outline"
                size="lg"
                onClick={handleRestart}
                className="flex items-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Restart</span>
              </Button>
              
              <Button
                size="lg"
                onClick={handlePractice}
                className={`flex items-center space-x-2 ${
                  isPlaying 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
                }`}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span>{isPlaying ? 'Pause Practice' : 'Start Practice'}</span>
              </Button>
            </div>

            {/* Confidence Rating */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How confident do you feel with this exercise?
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
                    Complete Exercise
                  </Button>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Exercise Complete!</span>
                    </div>
                    
                    {currentExercise < exercises.length - 1 ? (
                      <Button onClick={handleNextExercise}>
                        Next Exercise
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => onComplete({ lessonComplete: true })}
                        className="bg-purple-600 hover:bg-purple-700"
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

export default VoiceExercise
