import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const AIChat = () => {
    const [messages, setMessages] = useState([
        { role: 'ai', content: "Hello! I'm your AI onboarding assistant powered by Gemini. How can I help you today?" }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/api/chat', {
                message: userMsg,
                context: "Distributor Onboarding India"
            });
            setMessages(prev => [...prev, { role: 'ai', content: response.data.response }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'ai', content: "Sorry, I'm having trouble connecting. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    const quickPrompts = [
        "How do I complete KYC?",
        "Explain contract signing",
        "What training do I need?",
        "Help with first order"
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col h-[calc(100vh-180px)] card overflow-hidden"
        >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center">
                        <Bot className="text-primary" size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-white">AI Mentor</h3>
                        <p className="text-white/40 text-xs flex items-center gap-1">
                            <Sparkles size={12} /> Powered by Gemini
                        </p>
                    </div>
                </div>
                <span className="badge bg-green-500/20 text-green-400">Online</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={idx}
                        className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {msg.role === 'ai' && (
                            <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                                <Bot size={16} className="text-primary" />
                            </div>
                        )}

                        <div className={`max-w-[80%] p-4 rounded-3xl ${msg.role === 'user'
                            ? 'bg-primary text-black rounded-tr-lg'
                            : 'bg-surface text-white rounded-tl-lg'
                            }`}>
                            {msg.content}
                        </div>

                        {msg.role === 'user' && (
                            <div className="w-8 h-8 rounded-xl bg-surface flex items-center justify-center flex-shrink-0">
                                <User size={16} className="text-white/60" />
                            </div>
                        )}
                    </motion.div>
                ))}

                {loading && (
                    <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
                            <Bot size={16} className="text-primary" />
                        </div>
                        <div className="bg-surface p-4 rounded-3xl rounded-tl-lg">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length <= 2 && (
                <div className="px-4 pb-2 flex gap-2 flex-wrap">
                    {quickPrompts.map((prompt, idx) => (
                        <button
                            key={idx}
                            onClick={() => setInput(prompt)}
                            className="px-3 py-1.5 bg-surface hover:bg-primary/20 text-white/60 hover:text-white rounded-full text-sm transition-colors border border-white/10"
                        >
                            {prompt}
                        </button>
                    ))}
                </div>
            )}

            {/* Input */}
            <form onSubmit={sendMessage} className="p-4 border-t border-white/10 flex gap-3">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 input-field"
                    placeholder="Ask about onboarding, KYC, contracts..."
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="btn-accent px-4 disabled:opacity-50"
                >
                    <Send size={20} />
                </button>
            </form>
        </motion.div>
    );
};

export default AIChat;
