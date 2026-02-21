import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { GoogleGenAI } from '@google/genai';

const AIChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    // Initialize with a welcome message
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const { user } = useAuth();

    // Auto-scroll to bottom of messages
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        const trimmedMessage = newMessage.trim();
        if (!trimmedMessage) return;

        // Add user message to UI immediately
        const userMsg = { role: 'user', content: trimmedMessage, timestamp: Date.now() };
        setMessages(prev => [...prev, userMsg]);
        setNewMessage('');
        setIsLoading(true);

        try {
            // Check if API key exists
            if (!process.env.REACT_APP_GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
                throw new Error("Missing Gemini API Key. Please add REACT_APP_GEMINI_API_KEY to your .env.local file.");
            }

            const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GEMINI_API_KEY });

            // Generate the response
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: [
                    {
                        role: 'user',
                        parts: [
                            { text: "You are an empathetic, knowledgeable assistant for an app called EmpowerHer, helping women with safety, self-defense, resources, and legal rights. Keep your answers concise, formatted well, and supportive." },
                            { text: trimmedMessage }
                        ]
                    }
                ]
            });

            // Add AI response to UI
            const aiMsg = {
                role: 'bot',
                content: response.text,
                timestamp: Date.now()
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMsg = {
                role: 'bot',
                content: `Sorry, I encountered an error: ${error.message}`,
                timestamp: Date.now(),
                isError: true
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 p-4 rounded-full bg-gradient-to-r from-purple-600 to-rose-500 text-white shadow-lg shadow-purple-500/30 transition-all ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
                <MessageSquare className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900" />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] h-[600px] max-h-[80vh] sm:max-h-[85vh] bg-slate-900/95 backdrop-blur-2xl border border-white/[0.08] rounded-3xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/[0.06] bg-slate-800/50 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-gradient-to-br from-purple-500/20 to-rose-500/20 rounded-xl">
                                    <Sparkles className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white leading-tight">EmpowerHer AI</h3>
                                    <p className="text-xs text-slate-400 leading-tight">Powered by Gemini Cloud</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-xl hover:bg-white/[0.06] text-slate-400 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                            {messages.length === 0 && !isLoading && (
                                <div className="text-center text-slate-400 mt-10">
                                    <Sparkles className="w-8 h-8 mx-auto mb-3 text-slate-500 opacity-50" />
                                    <p className="text-sm">Hello{user?.name ? ` ${user.name.split(' ')[0]}` : ''}! I'm the EmpowerHer AI.</p>
                                    <p className="text-xs mt-1">Ask me anything about safety, resources, or advice.</p>
                                </div>
                            )}

                            {messages.map((msg, idx) => (
                                <div key={idx} className="space-y-4">
                                    {/* User message */}
                                    {msg.role === 'user' && (
                                        <div className="flex justify-end items-start gap-2">
                                            <div className="bg-gradient-to-r from-purple-600 to-rose-600 px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm text-white max-w-[80%] shadow-md break-words whitespace-pre-wrap">
                                                {msg.content}
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/[0.06] flex-shrink-0">
                                                <User className="w-4 h-4 text-slate-300" />
                                            </div>
                                        </div>
                                    )}

                                    {/* AI message */}
                                    {msg.role === 'bot' && (
                                        <div className="flex justify-start items-start gap-2">
                                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/[0.06] flex-shrink-0">
                                                <Bot className="w-4 h-4 text-purple-400" />
                                            </div>
                                            <div className={`bg-slate-800/80 border border-white/[0.04] px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm max-w-[80%] shadow-md break-words whitespace-pre-wrap ${msg.isError ? 'text-rose-400' : 'text-slate-200'}`}>
                                                {msg.content}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Thinking/Loading indicator */}
                            {isLoading && (
                                <div className="flex justify-start items-start gap-2 opacity-50">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/[0.06]">
                                        <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                                    </div>
                                    <div className="bg-slate-800/80 border border-white/[0.04] px-4 py-3 rounded-2xl rounded-tl-sm flex items-center space-x-2">
                                        <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-slate-800/80 border-t border-white/[0.06]">
                            <form
                                onSubmit={handleSendMessage}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Ask for advice, resources, safety tips..."
                                    className="flex-1 bg-slate-900 border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={!newMessage.trim() || isLoading}
                                    className="p-2.5 bg-gradient-to-r from-purple-600 to-rose-500 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/20 transition-all flex-shrink-0"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChat;
