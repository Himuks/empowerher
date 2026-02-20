import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, TrendingUp, MessageCircle } from 'lucide-react'
import { Progress } from '../ui/progress'
import { mockEntityOperations, getRelativeTime } from '../../lib/utils'

const ConfidenceTracker = () => {
  const [averageConfidence, setAverageConfidence] = useState(0)
  const [recentProgress, setRecentProgress] = useState([])

  useEffect(() => {
    const loadConfidenceData = async () => {
      const progress = await mockEntityOperations.list('TrainingProgress')
      const voiceProgress = progress.filter(p => p.module_type === 'voice_assertiveness' && p.confidence_level)
      if (voiceProgress.length > 0) {
        const avg = voiceProgress.reduce((sum, p) => sum + p.confidence_level, 0) / voiceProgress.length
        setAverageConfidence(avg)
        setRecentProgress(voiceProgress.map(p => ({ lesson: p.lesson_title || p.lesson_id, confidence: p.confidence_level, date: getRelativeTime(p.updatedAt || p.createdAt) })))
      }
    }
    loadConfidenceData()
  }, [])

  const confidencePercentage = (averageConfidence / 5) * 100

  const getConfidenceColor = (c) => c >= 4 ? 'text-emerald-400' : c >= 3 ? 'text-amber-400' : 'text-orange-400'
  const getConfidenceLabel = (c) => c >= 4.5 ? 'Excellent' : c >= 4 ? 'Very Good' : c >= 3 ? 'Good' : c >= 2 ? 'Improving' : c > 0 ? 'Getting Started' : 'No data yet'

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <div className="glass-card p-5">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-display font-bold text-white text-sm">Confidence Tracker</h3>
        </div>

        <div className="text-center space-y-3 mb-4">
          <div className="text-3xl font-display font-bold text-white">{averageConfidence > 0 ? averageConfidence.toFixed(1) : '—'}<span className="text-slate-500 text-lg">/5</span></div>
          <div className="text-xs text-slate-400">{getConfidenceLabel(averageConfidence)}</div>
          <div className="flex items-center justify-center space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < Math.floor(averageConfidence) ? 'text-amber-400 fill-current' : i < averageConfidence ? 'text-amber-400 fill-current opacity-50' : 'text-slate-600'}`} />
            ))}
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs"><span className="text-slate-400">Progress</span><span className="text-violet-400 font-medium">{Math.round(confidencePercentage)}%</span></div>
            <Progress value={confidencePercentage} className="h-2" />
          </div>
        </div>

        {recentProgress.length > 0 ? (
          <div className="space-y-2">
            <div className="flex items-center space-x-1.5 text-xs text-slate-400"><TrendingUp className="w-3 h-3" /><span>Recent</span></div>
            {recentProgress.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 bg-slate-800/30 rounded-lg border border-white/[0.04]">
                <div><div className="text-xs font-medium text-white">{item.lesson}</div><div className="text-[10px] text-slate-500">{item.date}</div></div>
                <div className="flex items-center space-x-1.5">
                  <div className="flex">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className={`w-3 h-3 ${j < item.confidence ? 'text-amber-400 fill-current' : 'text-slate-700'}`} />)}</div>
                  <span className={`text-xs font-medium ${getConfidenceColor(item.confidence)}`}>{item.confidence}/5</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-3"><p className="text-xs text-slate-500">Complete voice exercises to track confidence!</p></div>
        )}

        <div className="mt-4 text-center p-3 bg-violet-500/10 border border-violet-500/20 rounded-xl">
          <p className="text-xs text-violet-300">
            {averageConfidence >= 4 ? "🎉 Excellent confidence! Keep it up." : averageConfidence >= 3 ? "📈 Great progress! Continue practicing." : averageConfidence > 0 ? "🌱 Every session builds confidence!" : "🎯 Start your first exercise!"}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default ConfidenceTracker
