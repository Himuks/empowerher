import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Download, FileText, BookOpen, CheckSquare, ExternalLink, Star, X, CheckCircle
} from 'lucide-react'
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
      case 'pdf guide': return 'text-red-400 bg-red-500/10 border-red-500/20'
      case 'checklist': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
      case 'workbook': return 'text-blue-400 bg-blue-500/10 border-blue-500/20'
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20'
    }
  }

  const Icon = getTypeIcon(resource.type)

  const handleDownload = () => {
    downloadResource(resource.id, resource.title)
    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 3000)
  }

  const previewContent = showPreview ? generateResourceContent(resource.id) : ''

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
        <div className="glass-card p-5 glass-hover group">
          <div className="flex items-start space-x-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-display font-bold text-white text-sm group-hover:text-amber-300 transition-colors">{resource.title}</h4>
              <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${getTypeColor(resource.type)}`}>{resource.type}</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">{resource.description}</p>
          <div className="flex items-center space-x-2">
            <button onClick={() => setShowPreview(true)} className="flex-1 text-xs font-medium text-slate-300 bg-white/[0.04] border border-white/[0.08] py-2 rounded-lg hover:bg-white/[0.08] transition-all flex items-center justify-center space-x-1">
              <ExternalLink className="w-3 h-3" /><span>Preview</span>
            </button>
            <button onClick={handleDownload} className={`flex-1 text-xs font-semibold py-2 rounded-lg flex items-center justify-center space-x-1 transition-all ${downloaded ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:shadow-amber-500/20'}`}>
              {downloaded ? <><CheckCircle className="w-3 h-3" /><span>Done!</span></> : <><Download className="w-3 h-3" /><span>Download</span></>}
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showPreview && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowPreview(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass-card max-w-3xl w-full max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
                <div className="flex items-center space-x-2"><Icon className="w-5 h-5 text-amber-400" /><h3 className="font-display font-bold text-white">{resource.title}</h3></div>
                <div className="flex items-center space-x-2">
                  <button onClick={handleDownload} className="text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1.5 rounded-lg"><Download className="w-3 h-3 mr-1 inline" />Download</button>
                  <button onClick={() => setShowPreview(false)} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-slate-400"><X className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto max-h-[65vh]"><pre className="whitespace-pre-wrap font-mono text-sm text-slate-300 leading-relaxed">{previewContent}</pre></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ResourceCard
