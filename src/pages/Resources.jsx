import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  BookOpen,
  Download,
  Phone,
  AlertCircle,
  Shield,
  FileText,
  Users,
  Heart,
  MessageCircle,
  ThumbsUp,
  Send,
  Clock,
  Star,
  MapPin,
  Globe,
  Calendar,
  CheckCircle,
  X,
  ChevronDown,
  ChevronUp,
  Briefcase,
  User,
  Sparkles
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import ResourceCard from '../components/resources/ResourceCard'
import HelplineCard from '../components/resources/HelplineCard'
import {
  mockResources,
  mockHelplines,
  mockCommunityPosts,
  mockArticles,
  mockCounselors
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
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          replies: [{ author: 'You', avatar: 'YO', content: replyText, time: 'Just now' }, ...p.replies]
        }
      }
      return p
    }))
    setReplyText('')
  }

  const handleNewPost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return
    const post = {
      id: 'post_' + Date.now(),
      author: 'You',
      avatar: 'YO',
      topic: newPost.topic,
      title: newPost.title,
      content: newPost.content,
      likes: 0,
      replies: [],
      time: 'Just now',
      tag: 'New'
    }
    setPosts([post, ...posts])
    setNewPost({ title: '', content: '', topic: 'General' })
    setNewPostOpen(false)
  }

  const tagColors = {
    'Success Story': 'bg-green-100 text-green-800',
    'Inspiration': 'bg-purple-100 text-purple-800',
    'Legal': 'bg-blue-100 text-blue-800',
    'Growth': 'bg-amber-100 text-amber-800',
    'Safety Tips': 'bg-red-100 text-red-800',
    'Support': 'bg-pink-100 text-pink-800',
    'New': 'bg-sky-100 text-sky-800'
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Community Forum</h3>
              <p className="text-sm text-gray-600">{posts.length} discussions • {posts.reduce((s, p) => s + p.replies.length, 0)} replies</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={() => setNewPostOpen(!newPostOpen)} size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Send className="w-4 h-4 mr-1" /> New Post
            </Button>
            <Button variant="outline" size="icon" onClick={onClose}><X className="w-4 h-4" /></Button>
          </div>
        </div>

        {/* New Post Form */}
        <AnimatePresence>
          {newPostOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-b">
              <div className="p-4 bg-blue-50 space-y-3">
                <Input placeholder="Post title..." value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} />
                <textarea className="w-full p-3 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Share your experience, ask a question, or offer support..." value={newPost.content} onChange={e => setNewPost({ ...newPost, content: e.target.value })} />
                <div className="flex items-center justify-between">
                  <select className="text-sm border rounded-lg px-3 py-1.5 bg-white" value={newPost.topic} onChange={e => setNewPost({ ...newPost, topic: e.target.value })}>
                    <option>General</option>
                    <option>Workplace Rights</option>
                    <option>Self Defense</option>
                    <option>Legal Knowledge</option>
                    <option>Voice Training</option>
                    <option>Safety</option>
                    <option>Support</option>
                  </select>
                  <Button onClick={handleNewPost} size="sm" className="bg-blue-600">Post</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Posts */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {posts.map(post => (
            <motion.div key={post.id} layout className="border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {post.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 flex-wrap">
                      <span className="font-medium text-gray-900 text-sm">{post.author}</span>
                      <span className="text-xs text-gray-500">{post.time}</span>
                      <Badge className={tagColors[post.tag] || 'bg-gray-100 text-gray-800'} variant="outline">{post.tag}</Badge>
                    </div>
                    <h4 className="font-semibold text-gray-900 mt-1">{post.title}</h4>
                    <p className="text-sm text-gray-700 mt-1 leading-relaxed">{post.content}</p>
                    <div className="flex items-center space-x-4 mt-3">
                      <button onClick={() => handleLike(post.id)} className={"flex items-center space-x-1 text-sm transition-colors " + (likedPosts.includes(post.id) ? 'text-pink-600' : 'text-gray-500 hover:text-pink-600')}>
                        <ThumbsUp className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </button>
                      <button onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)} className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.replies.length} replies</span>
                        {expandedPost === post.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Replies */}
              <AnimatePresence>
                {expandedPost === post.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="bg-gray-50 border-t p-4 space-y-3">
                      {post.replies.map((reply, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {reply.avatar}
                          </div>
                          <div className="flex-1 bg-white p-2.5 rounded-lg border">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-medium text-gray-900">{reply.author}</span>
                              <span className="text-xs text-gray-500">{reply.time}</span>
                            </div>
                            <p className="text-sm text-gray-700 mt-0.5">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center space-x-2">
                        <Input placeholder="Write a reply..." value={replyText} onChange={e => setReplyText(e.target.value)} className="flex-1 text-sm" onKeyDown={e => e.key === 'Enter' && handleReply(post.id)} />
                        <Button onClick={() => handleReply(post.id)} size="sm" className="bg-blue-600"><Send className="w-3 h-3" /></Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Articles Reader Modal ────────────────────────────────────────────────────
const ArticlesModal = ({ onClose }) => {
  const [selectedArticle, setSelectedArticle] = useState(null)

  const categoryColors = {
    'Legal Rights': { bg: 'bg-blue-100', text: 'text-blue-800', gradient: 'from-blue-500 to-sky-600' },
    'Voice Training': { bg: 'bg-purple-100', text: 'text-purple-800', gradient: 'from-purple-500 to-violet-600' },
    'Safety': { bg: 'bg-red-100', text: 'text-red-800', gradient: 'from-red-500 to-rose-600' },
    'Self Defense': { bg: 'bg-green-100', text: 'text-green-800', gradient: 'from-green-500 to-emerald-600' },
    'Mental Health': { bg: 'bg-amber-100', text: 'text-amber-800', gradient: 'from-amber-500 to-orange-600' }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Expert Articles</h3>
              <p className="text-sm text-gray-600">Insights from legal experts, counselors, and safety trainers</p>
            </div>
          </div>
          <Button variant="outline" size="icon" onClick={selectedArticle ? () => setSelectedArticle(null) : onClose}>
            {selectedArticle ? <ArrowLeft className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {selectedArticle ? (
            /* Article Detail View */
            <div className="p-6 space-y-6">
              <div>
                <Badge className={categoryColors[selectedArticle.category]?.bg + ' ' + categoryColors[selectedArticle.category]?.text} variant="outline">{selectedArticle.category}</Badge>
                <h2 className="text-2xl font-bold text-gray-900 mt-2">{selectedArticle.title}</h2>
                <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-1"><User className="w-4 h-4" /><span>{selectedArticle.author}</span></div>
                  <span>•</span>
                  <span>{selectedArticle.authorRole}</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1"><Clock className="w-4 h-4" /><span>{selectedArticle.readTime}</span></div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border">
                <p className="text-gray-700 italic">{selectedArticle.summary}</p>
              </div>
              <div className="prose prose-sm max-w-none">
                {selectedArticle.content.split('\n').map((line, idx) => {
                  if (!line.trim()) return <br key={idx} />
                  if (line.match(/^[A-Z][A-Z\s&':]+:$/)) return <h3 key={idx} className="text-lg font-bold text-gray-900 mt-6 mb-2">{line.replace(':', '')}</h3>
                  if (line.startsWith('•')) return <div key={idx} className="flex items-start space-x-2 ml-2 my-1"><span className="text-pink-500 mt-0.5">•</span><span className="text-gray-700">{line.slice(2)}</span></div>
                  if (line.match(/^\d+\./)) return <div key={idx} className="flex items-start space-x-2 ml-2 my-1"><span className="font-bold text-pink-600">{line.match(/^\d+/)[0]}.</span><span className="text-gray-700">{line.replace(/^\d+\.\s*/, '')}</span></div>
                  if (line.startsWith('□')) return <div key={idx} className="flex items-start space-x-2 ml-4 my-1"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /><span className="text-gray-700">{line.slice(2)}</span></div>
                  return <p key={idx} className="text-gray-700 leading-relaxed my-1">{line}</p>
                })}
              </div>
            </div>
          ) : (
            /* Articles List */
            <div className="p-5 space-y-4">
              {mockArticles.map((article, index) => {
                const colors = categoryColors[article.category] || categoryColors['Safety']
                return (
                  <motion.div key={article.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="border rounded-xl p-4 hover:shadow-md transition-all cursor-pointer group" onClick={() => setSelectedArticle(article)}>
                    <div className="flex items-start space-x-4">
                      <div className={"w-12 h-12 rounded-lg bg-gradient-to-r " + colors.gradient + " flex items-center justify-center flex-shrink-0"}>
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge className={colors.bg + ' ' + colors.text} variant="outline">{article.category}</Badge>
                          <span className="text-xs text-gray-500">{article.readTime}</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">{article.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{article.summary}</p>
                        <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                          <span>{article.author} — {article.authorRole}</span>
                          <span>•</span>
                          <span>{article.date}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Counselor Directory Modal ────────────────────────────────────────────────
const CounselorModal = ({ onClose }) => {
  const [bookedCounselors, setBookedCounselors] = useState([])
  const [selectedCounselor, setSelectedCounselor] = useState(null)

  const handleBook = async (counselorId) => {
    setBookedCounselors([...bookedCounselors, counselorId])
    await mockEntityOperations.create('CounselorBooking', {
      counselor_id: counselorId,
      counselor_name: mockCounselors.find(c => c.id === counselorId)?.name,
      status: 'pending',
      booked_at: new Date().toISOString()
    })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b bg-gradient-to-r from-purple-50 to-violet-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Professional Counselors</h3>
              <p className="text-sm text-gray-600">Qualified specialists for women's issues</p>
            </div>
          </div>
          <Button variant="outline" size="icon" onClick={onClose}><X className="w-4 h-4" /></Button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {mockCounselors.map((counselor, index) => {
            const isBooked = bookedCounselors.includes(counselor.id)
            return (
              <motion.div key={counselor.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="border rounded-xl p-5 hover:shadow-md transition-all">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                    {counselor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">{counselor.name}</h4>
                        <p className="text-sm text-purple-700 font-medium">{counselor.specialization}</p>
                      </div>
                      <div className="flex items-center space-x-1 bg-amber-50 px-2 py-1 rounded-full">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                        <span className="text-sm font-medium text-amber-700">{counselor.rating}</span>
                        <span className="text-xs text-gray-500">({counselor.reviews})</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{counselor.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <div className="flex items-center space-x-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                        <Briefcase className="w-3 h-3" /><span>{counselor.experience}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                        <MapPin className="w-3 h-3" /><span>{counselor.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                        <Globe className="w-3 h-3" /><span>{counselor.mode}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                        <Calendar className="w-3 h-3" /><span>{counselor.availability}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs text-gray-500">Languages:</span>
                      {counselor.languages.map(lang => (
                        <Badge key={lang} className="bg-purple-50 text-purple-700 text-xs" variant="outline">{lang}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      {isBooked ? (
                        <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Session Requested! We'll contact you soon.</span>
                        </div>
                      ) : (
                        <Button onClick={() => handleBook(counselor.id)} className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700" size="sm">
                          <Calendar className="w-4 h-4 mr-1" /> Book Session
                        </Button>
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

// ─── Resource Request Modal ───────────────────────────────────────────────────
const RequestModal = ({ onClose }) => {
  const [formData, setFormData] = useState({ topic: '', description: '', email: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.topic.trim() || !formData.description.trim()) return
    await mockEntityOperations.create('ResourceRequest', {
      ...formData,
      status: 'pending',
      requested_at: new Date().toISOString()
    })
    setSubmitted(true)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b bg-gradient-to-r from-violet-50 to-purple-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Request Resources</h3>
          </div>
          <Button variant="outline" size="icon" onClick={onClose}><X className="w-4 h-4" /></Button>
        </div>

        <div className="p-5">
          {submitted ? (
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Request Submitted! 🎉</h3>
              <p className="text-gray-600">Thank you for your suggestion. We'll review it and add relevant resources.</p>
              <Button onClick={onClose} className="bg-gradient-to-r from-violet-500 to-purple-600">Close</Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-gray-600">Tell us what topics or guides would be most helpful for your empowerment journey.</p>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Topic *</label>
                <select className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none" value={formData.topic} onChange={e => setFormData({ ...formData, topic: e.target.value })} required>
                  <option value="">Select a topic...</option>
                  <option>Legal Rights & Procedures</option>
                  <option>Workplace Safety</option>
                  <option>Self Defense Techniques</option>
                  <option>Mental Health & Wellness</option>
                  <option>Financial Independence</option>
                  <option>Digital Safety</option>
                  <option>Parenting & Custody</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Describe what you need *</label>
                <textarea className="w-full p-3 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500" rows={4} placeholder="What specific information, guide, or resource would help you?" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email (optional)</label>
                <Input type="email" placeholder="your@email.com — we'll notify you when it's ready" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
                <Send className="w-4 h-4 mr-2" /> Submit Request
              </Button>
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
        <Link to="/"><Button variant="outline" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link>
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
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
                  {['Call emergency services (100/112) if you\'re in immediate danger',
                    'Get to a safe location away from the threat',
                    'Contact trusted friends, family, or support services',
                    'Document any evidence if it\'s safe to do so'].map((step, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <div className="w-5 h-5 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center mt-0.5 flex-shrink-0">{i + 1}</div>
                        <span>{step}</span>
                      </li>
                    ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-red-800 mb-3">Safety Preparation:</h4>
                <ul className="space-y-2 text-sm text-red-700">
                  {['Keep emergency contacts easily accessible',
                    'Have a safety plan for different scenarios',
                    'Trust your instincts - if something feels wrong, act',
                    'Know your legal rights and available resources'].map((tip, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Shield className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <Link to="/emergency">
                <Button className="bg-red-600 hover:bg-red-700"><Phone className="w-4 h-4 mr-2" /> View Emergency Contacts</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Educational Resources */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
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
                <ResourceCard key={resource.id} resource={resource} index={index} />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Helplines Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
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
                <HelplineCard key={helpline.id} helpline={helpline} index={index} />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Community & Additional Support */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-orange-600" />
              <span>Community & Additional Support</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Online Communities */}
              <motion.div whileHover={{ y: -4 }} className="p-5 bg-white rounded-xl border border-orange-100 shadow-sm hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Online Communities</h4>
                <p className="text-sm text-gray-600 mb-1">Connect with other women on similar empowerment journeys for support and encouragement.</p>
                <p className="text-xs text-blue-600 font-medium mb-3">{mockCommunityPosts.length} active discussions • {mockCommunityPosts.reduce((s, p) => s + p.replies.length, 0)}+ replies</p>
                <Button variant="outline" size="sm" className="w-full border-blue-300 text-blue-700 hover:bg-blue-50" onClick={() => setShowCommunity(true)}>
                  <MessageCircle className="w-4 h-4 mr-2" /> Join Community
                </Button>
              </motion.div>

              {/* Expert Articles */}
              <motion.div whileHover={{ y: -4 }} className="p-5 bg-white rounded-xl border border-orange-100 shadow-sm hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mb-3">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Expert Articles</h4>
                <p className="text-sm text-gray-600 mb-1">Read insights from legal experts, counselors, and self-defense instructors.</p>
                <p className="text-xs text-green-600 font-medium mb-3">{mockArticles.length} articles by verified experts</p>
                <Button variant="outline" size="sm" className="w-full border-green-300 text-green-700 hover:bg-green-50" onClick={() => setShowArticles(true)}>
                  <BookOpen className="w-4 h-4 mr-2" /> Read Articles
                </Button>
              </motion.div>

              {/* Professional Counseling */}
              <motion.div whileHover={{ y: -4 }} className="p-5 bg-white rounded-xl border border-orange-100 shadow-sm hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center mb-3">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Professional Counseling</h4>
                <p className="text-sm text-gray-600 mb-1">Find qualified counselors and therapists who specialize in women's issues.</p>
                <p className="text-xs text-purple-600 font-medium mb-3">{mockCounselors.length} verified counselors available</p>
                <Button variant="outline" size="sm" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50" onClick={() => setShowCounselor(true)}>
                  <User className="w-4 h-4 mr-2" /> Find Counselor
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Resource Request */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
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
            <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700" onClick={() => setShowRequest(true)}>
              <Send className="w-4 h-4 mr-2" /> Request Resources
            </Button>
          </CardContent>
        </Card>
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
