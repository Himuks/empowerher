import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, BookOpen, Download, Phone, AlertCircle, Shield, FileText, Users,
  Heart, MessageCircle, ThumbsUp, Send, Clock, Star, MapPin, Globe, Calendar,
  CheckCircle, X, ChevronDown, ChevronUp, Briefcase, User, Sparkles
} from 'lucide-react'
import ResourceCard from '../components/resources/ResourceCard'
import HelplineCard from '../components/resources/HelplineCard'
import {
  mockResources, mockHelplines, mockCommunityPosts, mockArticles, mockCounselors
} from '../lib/mockData'
import { mockEntityOperations } from '../lib/utils'

// ─── Community Forum Modal ────────────────────────────────────────────────────
const CommunityModal = ({ onClose }) => {
  const [posts, setPosts] = useState(mockCommunityPosts)
  const [expandedPost, setExpandedPost] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [newPostOpen, setNewPostOpen] = useState(false)
  const [newPost, setNewPost] = useState({ title: '', content: '', topic: 'General' })
  const [likedPosts, setLikedPosts] = useState([])

  const handleLike = (postId) => {
    if (likedPosts.includes(postId)) return
    setLikedPosts([...likedPosts, postId])
    setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p))
  }

  const handleReply = (postId) => {
    if (!replyText.trim()) return
    setPosts(posts.map(p => p.id === postId ? { ...p, replies: [{ author: 'You', avatar: 'YO', content: replyText, time: 'Just now' }, ...p.replies] } : p))
    setReplyText('')
  }

  const handleNewPost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return
    setPosts([{ id: 'post_' + Date.now(), author: 'You', avatar: 'YO', topic: newPost.topic, title: newPost.title, content: newPost.content, likes: 0, replies: [], time: 'Just now', tag: 'New' }, ...posts])
    setNewPost({ title: '', content: '', topic: 'General' })
    setNewPostOpen(false)
  }

  const tagColors = {
    'Success Story': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    'Inspiration': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    'Legal': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    'Growth': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    'Safety Tips': 'text-red-400 bg-red-500/10 border-red-500/20',
    'Support': 'text-pink-400 bg-pink-500/10 border-pink-500/20',
    'New': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass-card max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center"><Users className="w-5 h-5 text-white" /></div>
            <div><h3 className="font-display font-bold text-white text-lg">Community Forum</h3><p className="text-xs text-slate-400">{posts.length} discussions</p></div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => setNewPostOpen(!newPostOpen)} className="text-xs font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg"><Send className="w-3 h-3 mr-1.5 inline" />New Post</button>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/[0.06] text-slate-400"><X className="w-4 h-4" /></button>
          </div>
        </div>
        <AnimatePresence>
          {newPostOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-b border-white/[0.06]">
              <div className="p-4 space-y-3 bg-slate-800/30">
                <input placeholder="Post title..." value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
                <textarea className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 resize-none focus:outline-none focus:border-blue-500/50" rows={3} placeholder="Share your experience..." value={newPost.content} onChange={e => setNewPost({ ...newPost, content: e.target.value })} />
                <div className="flex items-center justify-between">
                  <select className="text-sm bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-300" value={newPost.topic} onChange={e => setNewPost({ ...newPost, topic: e.target.value })}>
                    <option>General</option><option>Workplace Rights</option><option>Self Defense</option><option>Legal Knowledge</option><option>Voice Training</option><option>Safety</option><option>Support</option>
                  </select>
                  <button onClick={handleNewPost} className="text-xs font-semibold bg-blue-600 text-white px-4 py-1.5 rounded-lg">Post</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {posts.map(post => (
            <div key={post.id} className="glass-card p-4">
              <div className="flex items-start space-x-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{post.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 flex-wrap">
                    <span className="font-medium text-white text-sm">{post.author}</span>
                    <span className="text-[10px] text-slate-500">{post.time}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tagColors[post.tag] || 'text-slate-400 bg-slate-500/10 border-slate-500/20'}`}>{post.tag}</span>
                  </div>
                  <h4 className="font-semibold text-white text-sm mt-1">{post.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{post.content.slice(0, 200)}{post.content.length > 200 ? '...' : ''}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <button onClick={() => handleLike(post.id)} className={`flex items-center space-x-1 text-xs ${likedPosts.includes(post.id) ? 'text-pink-400' : 'text-slate-500 hover:text-pink-400'}`}><ThumbsUp className="w-3 h-3" /><span>{post.likes}</span></button>
                    <button onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)} className="flex items-center space-x-1 text-xs text-slate-500 hover:text-blue-400"><MessageCircle className="w-3 h-3" /><span>{post.replies.length}</span>{expandedPost === post.id ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}</button>
                  </div>
                </div>
              </div>
              <AnimatePresence>
                {expandedPost === post.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="mt-3 pt-3 border-t border-white/[0.06] space-y-2">
                      {post.replies.map((reply, idx) => (
                        <div key={idx} className="flex items-start space-x-2 ml-4">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0">{reply.avatar}</div>
                          <div className="flex-1 bg-slate-800/30 p-2 rounded-lg border border-white/[0.04]">
                            <div className="flex items-center space-x-2"><span className="text-[10px] font-medium text-white">{reply.author}</span><span className="text-[10px] text-slate-500">{reply.time}</span></div>
                            <p className="text-xs text-slate-300 mt-0.5">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center space-x-2 ml-4">
                        <input placeholder="Reply..." value={replyText} onChange={e => setReplyText(e.target.value)} className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50" onKeyDown={e => e.key === 'Enter' && handleReply(post.id)} />
                        <button onClick={() => handleReply(post.id)} className="p-1.5 bg-blue-600 text-white rounded-lg"><Send className="w-3 h-3" /></button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Articles Modal ───────────────────────────────────────────────────────────
const ArticlesModal = ({ onClose }) => {
  const [selectedArticle, setSelectedArticle] = useState(null)
  const catColors = {
    'Legal Rights': 'text-blue-400 bg-blue-500/10', 'Voice Training': 'text-purple-400 bg-purple-500/10',
    'Safety': 'text-red-400 bg-red-500/10', 'Self Defense': 'text-emerald-400 bg-emerald-500/10', 'Mental Health': 'text-amber-400 bg-amber-500/10'
  }
  const catGradient = {
    'Legal Rights': 'from-blue-500 to-cyan-500', 'Voice Training': 'from-violet-500 to-purple-600',
    'Safety': 'from-red-500 to-rose-600', 'Self Defense': 'from-emerald-500 to-green-600', 'Mental Health': 'from-amber-500 to-orange-600'
  }
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass-card max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center"><BookOpen className="w-5 h-5 text-white" /></div>
            <div><h3 className="font-display font-bold text-white text-lg">Expert Articles</h3><p className="text-xs text-slate-400">Insights from verified experts</p></div>
          </div>
          <button onClick={selectedArticle ? () => setSelectedArticle(null) : onClose} className="p-2 rounded-lg hover:bg-white/[0.06] text-slate-400">{selectedArticle ? <ArrowLeft className="w-4 h-4" /> : <X className="w-4 h-4" />}</button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {selectedArticle ? (
            <div className="p-6 space-y-4">
              <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full ${catColors[selectedArticle.category] || catColors['Safety']}`}>{selectedArticle.category}</span>
              <h2 className="text-xl font-display font-bold text-white">{selectedArticle.title}</h2>
              <div className="flex items-center space-x-3 text-xs text-slate-400">
                <span className="flex items-center space-x-1"><User className="w-3 h-3" /><span>{selectedArticle.author}</span></span><span>·</span><span>{selectedArticle.authorRole}</span><span>·</span><span className="flex items-center space-x-1"><Clock className="w-3 h-3" /><span>{selectedArticle.readTime}</span></span>
              </div>
              <div className="p-3 bg-slate-800/30 rounded-lg border border-white/[0.06]"><p className="text-sm text-slate-300 italic">{selectedArticle.summary}</p></div>
              <div className="prose prose-invert prose-sm max-w-none">
                {selectedArticle.content.split('\n').map((line, idx) => {
                  if (!line.trim()) return <br key={idx} />
                  if (line.match(/^[A-Z][A-Z\s&':]+:$/)) return <h3 key={idx} className="text-base font-display font-bold text-white mt-5 mb-2">{line.replace(':', '')}</h3>
                  if (line.startsWith('•')) return <div key={idx} className="flex items-start space-x-2 ml-2 my-1"><span className="text-rose-400 mt-0.5">•</span><span className="text-slate-300 text-sm">{line.slice(2)}</span></div>
                  if (line.match(/^\d+\./)) return <div key={idx} className="flex items-start space-x-2 ml-2 my-1"><span className="font-bold text-rose-400 text-sm">{line.match(/^\d+/)[0]}.</span><span className="text-slate-300 text-sm">{line.replace(/^\d+\.\s*/, '')}</span></div>
                  if (line.startsWith('□')) return <div key={idx} className="flex items-start space-x-2 ml-4 my-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" /><span className="text-slate-300 text-sm">{line.slice(2)}</span></div>
                  return <p key={idx} className="text-slate-300 text-sm leading-relaxed my-1">{line}</p>
                })}
              </div>
            </div>
          ) : (
            <div className="p-5 space-y-3">
              {mockArticles.map((article, i) => (
                <motion.div key={article.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-4 glass-hover cursor-pointer" onClick={() => setSelectedArticle(article)}>
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${catGradient[article.category] || 'from-amber-500 to-orange-600'} flex items-center justify-center flex-shrink-0`}><BookOpen className="w-5 h-5 text-white" /></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${catColors[article.category] || catColors['Safety']}`}>{article.category}</span><span className="text-[10px] text-slate-500">{article.readTime}</span></div>
                      <h4 className="font-semibold text-white text-sm">{article.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">{article.summary}</p>
                      <div className="text-[10px] text-slate-500 mt-1">{article.author} — {article.date}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Counselor Modal ──────────────────────────────────────────────────────────
const CounselorModal = ({ onClose }) => {
  const [bookedCounselors, setBookedCounselors] = useState([])
  const handleBook = async (counselorId) => {
    setBookedCounselors([...bookedCounselors, counselorId])
    await mockEntityOperations.create('CounselorBooking', { counselor_id: counselorId, counselor_name: mockCounselors.find(c => c.id === counselorId)?.name, status: 'pending', booked_at: new Date().toISOString() })
  }
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass-card max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center"><Heart className="w-5 h-5 text-white" /></div>
            <div><h3 className="font-display font-bold text-white text-lg">Professional Counselors</h3><p className="text-xs text-slate-400">Qualified specialists</p></div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/[0.06] text-slate-400"><X className="w-4 h-4" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {mockCounselors.map((counselor, i) => {
            const isBooked = bookedCounselors.includes(counselor.id)
            return (
              <motion.div key={counselor.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{counselor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div><h4 className="font-bold text-white text-sm">{counselor.name}</h4><p className="text-xs text-purple-400 font-medium">{counselor.specialization}</p></div>
                      <div className="flex items-center space-x-1 bg-amber-500/10 px-2 py-0.5 rounded-full"><Star className="w-3 h-3 text-amber-400 fill-current" /><span className="text-xs font-medium text-amber-400">{counselor.rating}</span></div>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{counselor.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <span className="text-[10px] text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded-full flex items-center space-x-0.5"><Briefcase className="w-2.5 h-2.5" /><span>{counselor.experience}</span></span>
                      <span className="text-[10px] text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded-full flex items-center space-x-0.5"><MapPin className="w-2.5 h-2.5" /><span>{counselor.location}</span></span>
                      <span className="text-[10px] text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded-full flex items-center space-x-0.5"><Globe className="w-2.5 h-2.5" /><span>{counselor.mode}</span></span>
                    </div>
                    <div className="mt-2">
                      {isBooked ? (
                        <div className="flex items-center space-x-1.5 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 text-xs"><CheckCircle className="w-3.5 h-3.5" /><span>Session Requested!</span></div>
                      ) : (
                        <button onClick={() => handleBook(counselor.id)} className="text-xs font-semibold bg-gradient-to-r from-purple-500 to-violet-600 text-white px-4 py-1.5 rounded-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all"><Calendar className="w-3 h-3 mr-1 inline" />Book Session</button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Request Modal ────────────────────────────────────────────────────────────
const RequestModal = ({ onClose }) => {
  const [formData, setFormData] = useState({ topic: '', description: '', email: '' })
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.topic.trim() || !formData.description.trim()) return
    await mockEntityOperations.create('ResourceRequest', { ...formData, status: 'pending', requested_at: new Date().toISOString() })
    setSubmitted(true)
  }
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass-card max-w-lg w-full overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"><Sparkles className="w-5 h-5 text-white" /></div>
            <h3 className="font-display font-bold text-white text-lg">Request Resources</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/[0.06] text-slate-400"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-5">
          {submitted ? (
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3"><CheckCircle className="w-7 h-7 text-emerald-400" /></div>
              <h3 className="text-lg font-display font-bold text-white mb-1">Submitted! 🎉</h3>
              <p className="text-sm text-slate-400 mb-4">We'll review and add resources soon.</p>
              <button onClick={onClose} className="text-sm font-semibold bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-2 rounded-lg">Close</button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-400">What resources would help your journey?</p>
              <div>
                <label className="text-xs font-medium text-slate-300 mb-1 block">Topic *</label>
                <select className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50" value={formData.topic} onChange={e => setFormData({ ...formData, topic: e.target.value })} required>
                  <option value="">Select...</option><option>Legal Rights</option><option>Workplace Safety</option><option>Self Defense</option><option>Mental Health</option><option>Financial Independence</option><option>Digital Safety</option><option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-300 mb-1 block">Description *</label>
                <textarea className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 resize-none focus:outline-none focus:border-violet-500/50" rows={3} placeholder="What would help?" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-300 mb-1 block">Email (optional)</label>
                <input type="email" placeholder="your@email.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50" />
              </div>
              <button type="submit" className="w-full text-sm font-semibold bg-gradient-to-r from-violet-500 to-purple-600 text-white py-2.5 rounded-lg hover:shadow-lg hover:shadow-violet-500/20 transition-all"><Send className="w-3.5 h-3.5 mr-1.5 inline" />Submit Request</button>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Main Resources Page ──────────────────────────────────────────────────────
const Resources = () => {
  const [showCommunity, setShowCommunity] = useState(false)
  const [showArticles, setShowArticles] = useState(false)
  const [showCounselor, setShowCounselor] = useState(false)
  const [showRequest, setShowRequest] = useState(false)

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center space-x-4">
        <Link to="/"><button className="p-2 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 transition-colors"><ArrowLeft className="w-4 h-4" /></button></Link>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-white">Resources & Support</h1>
            <p className="text-slate-400">Guides, materials, and community support</p>
          </div>
        </div>
      </motion.div>

      {/* Emergency Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="glass-card p-5 border-red-500/20">
          <div className="flex items-center space-x-2 mb-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <h3 className="font-display font-bold text-red-300">In an Emergency</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              {['Call 100/112 if in immediate danger', 'Get to a safe location', 'Contact trusted support person', 'Document evidence if safe'].map((step, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs"><div className="w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center mt-0.5 flex-shrink-0">{i + 1}</div><span className="text-slate-300">{step}</span></div>
              ))}
            </div>
            <div className="space-y-2">
              {['Keep emergency contacts accessible', 'Have a safety plan', 'Trust your instincts', 'Know your legal rights'].map((tip, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs"><Shield className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" /><span className="text-slate-300">{tip}</span></div>
              ))}
            </div>
          </div>
          <Link to="/emergency" className="mt-4 inline-flex items-center space-x-1.5 text-xs font-semibold bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"><Phone className="w-3 h-3" /><span>Emergency Contacts</span></Link>
        </div>
      </motion.div>

      {/* Resources */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="flex items-center space-x-2 mb-4">
          <FileText className="w-5 h-5 text-amber-400" />
          <h3 className="font-display font-bold text-white">Educational Resources</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {mockResources.map((resource, i) => <ResourceCard key={resource.id} resource={resource} index={i} />)}
        </div>
      </motion.div>

      {/* Helplines */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center space-x-2 mb-4">
          <Heart className="w-5 h-5 text-amber-400" />
          <h3 className="font-display font-bold text-white">Support Helplines</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {mockHelplines.map((helpline, i) => <HelplineCard key={helpline.id} helpline={helpline} index={i} />)}
        </div>
      </motion.div>

      {/* Community & Additional */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <div className="flex items-center space-x-2 mb-4">
          <Users className="w-5 h-5 text-amber-400" />
          <h3 className="font-display font-bold text-white">Community & Support</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Community Forum', desc: 'Connect with other women on empowerment journeys', icon: Users, gradient: 'from-blue-500 to-indigo-600', stat: `${mockCommunityPosts.length} discussions`, onClick: () => setShowCommunity(true), btn: 'Join Community' },
            { title: 'Expert Articles', desc: 'Read insights from verified professionals', icon: BookOpen, gradient: 'from-emerald-500 to-green-600', stat: `${mockArticles.length} articles`, onClick: () => setShowArticles(true), btn: 'Read Articles' },
            { title: 'Professional Counseling', desc: 'Find qualified therapists for women\'s issues', icon: Heart, gradient: 'from-purple-500 to-violet-600', stat: `${mockCounselors.length} counselors`, onClick: () => setShowCounselor(true), btn: 'Find Counselor' },
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ y: -4 }} className="glass-card p-5 glass-hover group cursor-pointer" onClick={item.onClick}>
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-display font-bold text-white text-sm mb-1">{item.title}</h4>
              <p className="text-xs text-slate-400 mb-2">{item.desc}</p>
              <p className="text-[10px] text-amber-400 font-medium mb-3">{item.stat}</p>
              <button className="w-full text-xs font-medium text-slate-300 bg-white/[0.04] border border-white/[0.08] py-2 rounded-lg hover:bg-white/[0.08] transition-all">{item.btn}</button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Request CTA */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <div className="relative overflow-hidden rounded-3xl p-8 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-purple-600/15 to-violet-600/20 rounded-3xl" />
          <div className="absolute inset-0 glass-card" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/20">
              <Download className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-2">Need More Resources?</h3>
            <p className="text-sm text-slate-400 mb-6 max-w-lg mx-auto">Let us know what topics would help your empowerment journey.</p>
            <button onClick={() => setShowRequest(true)} className="text-sm font-semibold bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:shadow-lg hover:shadow-violet-500/20 hover:-translate-y-0.5 transition-all"><Send className="w-3.5 h-3.5 mr-1.5 inline" />Request Resources</button>
          </div>
        </div>
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {showCommunity && <CommunityModal onClose={() => setShowCommunity(false)} />}
        {showArticles && <ArticlesModal onClose={() => setShowArticles(false)} />}
        {showCounselor && <CounselorModal onClose={() => setShowCounselor(false)} />}
        {showRequest && <RequestModal onClose={() => setShowRequest(false)} />}
      </AnimatePresence>
    </div>
  )
}

export default Resources
