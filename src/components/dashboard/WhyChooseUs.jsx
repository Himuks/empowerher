import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Users, BookOpen, Star, Sparkles } from 'lucide-react'

const features = [
    {
        icon: Shield,
        title: 'Safety First',
        description: 'Expert-backed self-defense techniques and situational awareness strategies.',
        gradient: 'from-emerald-500 to-teal-500',
        delay: 0.1
    },
    {
        icon: BookOpen,
        title: 'Legal Knowledge',
        description: 'Understand your rights with clear, accessible legal guidance and procedures.',
        gradient: 'from-blue-500 to-cyan-500',
        delay: 0.2
    },
    {
        icon: Users,
        title: 'Community Support',
        description: 'Connect with a supportive network and access professional resources.',
        gradient: 'from-violet-500 to-purple-600',
        delay: 0.3
    },
    {
        icon: Star,
        title: 'Confidence Building',
        description: 'Develop assertiveness and communication skills through interactive exercises.',
        gradient: 'from-amber-500 to-orange-500',
        delay: 0.4
    }
]

const WhyChooseUs = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-900/40 p-8 md:p-12 shadow-2xl"
        >
            {/* Abstract Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:items-center">

                {/* Left Column: Heading & Mission */}
                <div className="lg:w-1/3">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Our Mission</span>
                    </motion.div>

                    <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl md:text-4xl font-display font-extrabold text-white mb-6 leading-tight"
                    >
                        More than just <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-400">training.</span>
                    </motion.h3>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-400 text-base leading-relaxed"
                    >
                        EmpowerHer is your dedicated companion for safety, knowledge, and confidence. We bring together expert-backed resources and a supportive community to help you navigate the world fearlessly.
                    </motion.p>
                </div>

                {/* Right Column: Features Grid */}
                <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:pl-8">
                    {features.map((feature, i) => {
                        const Icon = feature.icon
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + feature.delay }}
                                className="relative group"
                            >
                                <div className={`absolute -inset-4 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.05] rounded-3xl transition-opacity duration-500`} />

                                <div className="relative flex items-start space-x-4">
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-2 text-lg">{feature.title}</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

            </div>
        </motion.div>
    )
}

export default WhyChooseUs
