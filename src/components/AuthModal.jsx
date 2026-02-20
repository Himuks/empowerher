import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, User, Eye, EyeOff, Sparkles, ArrowRight, Heart } from 'lucide-react'
import { useAuth } from './AuthContext'

const AuthModal = ({ isOpen, onClose }) => {
    const [mode, setMode] = useState('login') // login | signup
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login, signup } = useAuth()

    const reset = () => {
        setName(''); setEmail(''); setPassword(''); setError(''); setShowPassword(false)
    }

    const switchMode = (m) => {
        setMode(m); reset()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        setTimeout(() => {
            if (mode === 'signup') {
                if (!name.trim() || !email.trim() || !password.trim()) {
                    setError('All fields are required.'); setLoading(false); return
                }
                if (password.length < 6) {
                    setError('Password must be at least 6 characters.'); setLoading(false); return
                }
                const result = signup(name.trim(), email.trim(), password)
                if (!result.success) {
                    setError(result.error); setLoading(false); return
                }
            } else {
                if (!email.trim() || !password.trim()) {
                    setError('Email and password are required.'); setLoading(false); return
                }
                const result = login(email.trim(), password)
                if (!result.success) {
                    setError(result.error); setLoading(false); return
                }
            }
            setLoading(false)
            reset()
            onClose()
        }, 400)
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/70 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="relative w-full max-w-md"
                    >
                        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-900/95 backdrop-blur-2xl shadow-2xl">
                            {/* Background decoration */}
                            <div className="absolute -top-20 -right-20 w-56 h-56 bg-gradient-to-br from-rose-500/15 to-purple-600/10 rounded-full blur-3xl" />
                            <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl" />

                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-20 p-2 rounded-xl hover:bg-white/[0.06] text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="relative z-10 p-8">
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-purple-600 shadow-lg shadow-rose-500/25 mb-4">
                                        <Heart className="w-7 h-7 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-display font-bold text-white tracking-tight">
                                        {mode === 'login' ? 'Welcome Back' : 'Join EmpowerHer'}
                                    </h2>
                                    <p className="text-sm text-slate-400 mt-1">
                                        {mode === 'login' ? 'Sign in to continue your journey' : 'Create your account to get started'}
                                    </p>
                                </div>

                                {/* Tabs */}
                                <div className="flex bg-slate-800/60 rounded-2xl p-1 mb-6 border border-white/[0.04]">
                                    <button
                                        onClick={() => switchMode('login')}
                                        className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${mode === 'login'
                                                ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg'
                                                : 'text-slate-400 hover:text-slate-200'
                                            }`}
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => switchMode('signup')}
                                        className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${mode === 'signup'
                                                ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg'
                                                : 'text-slate-400 hover:text-slate-200'
                                            }`}
                                    >
                                        Sign Up
                                    </button>
                                </div>

                                {/* Error */}
                                <AnimatePresence>
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mb-4"
                                        >
                                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
                                                {error}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <AnimatePresence mode="wait">
                                        {mode === 'signup' && (
                                            <motion.div
                                                key="name"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
                                                    Full Name
                                                </label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                    <input
                                                        type="text"
                                                        value={name}
                                                        onChange={e => setName(e.target.value)}
                                                        placeholder="Enter your name"
                                                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-800/60 border border-white/[0.06] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-rose-500/40 focus:ring-1 focus:ring-rose-500/20 transition-all"
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div>
                                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
                                            Email
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                placeholder="you@example.com"
                                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-800/60 border border-white/[0.06] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-rose-500/40 focus:ring-1 focus:ring-rose-500/20 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="w-full pl-11 pr-12 py-3 rounded-xl bg-slate-800/60 border border-white/[0.06] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-rose-500/40 focus:ring-1 focus:ring-rose-500/20 transition-all"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-rose-500/20 hover:shadow-xl hover:shadow-rose-500/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {loading ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </form>

                                {/* Footer note */}
                                <div className="flex items-center justify-center space-x-1.5 mt-6">
                                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                    <span className="text-xs text-slate-500">
                                        {mode === 'login' ? 'Login is optional — explore freely as a guest' : 'Your data stays on this device'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default AuthModal
