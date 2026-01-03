import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Users, BookOpen, Award, Target, Bot, ScrollText, BarChart, Rocket, MessageSquare } from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-8">
                    <div className="text-2xl font-bold text-white">
                        <span className="text-primary">N</span>exus
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                        <a href="#" className="nav-link active">Home</a>
                        <a href="#" className="nav-link">Features</a>
                        <a href="#" className="nav-link">About Us</a>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/vendor/login')} className="nav-link">
                        Vendor Login
                    </button>
                    <button onClick={() => navigate('/distributor/login')} className="btn-primary">
                        Get Started <ArrowUpRight size={18} />
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="px-8 py-16 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
                        <span className="doodle-underline">#LEVEL UP</span> YOUR<br />
                        DISTRIBUTION WITH<br />
                        <span className="text-primary">AI ONBOARDING</span>
                    </h1>

                    <div className="flex items-center justify-center gap-8 mt-8 text-white/60">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-white">2K+</span>
                            <span>Distributors</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-white">500+</span>
                            <span>Vendors</span>
                        </div>
                        <button onClick={() => navigate('/distributor/login')} className="btn-primary ml-4">
                            Join Us <ArrowUpRight size={18} />
                        </button>
                    </div>
                </motion.div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="card-tilted"
                    >
                        <div className="w-full h-48 bg-surface rounded-2xl mb-4 flex items-center justify-center overflow-hidden">
                            <Target size={64} className="text-secondary" />
                        </div>
                        <span className="badge mb-2">
                            <Users size={14} /> Onboarding
                        </span>
                        <p className="text-white/60 text-sm">Complete KYC verification with Aadhaar & PAN integration</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="card"
                    >
                        <div className="w-full h-48 bg-primary/20 rounded-2xl mb-4 flex items-center justify-center">
                            <Bot size={64} className="text-primary" />
                        </div>
                        <span className="badge mb-2" style={{ background: 'rgba(255,107,53,0.3)' }}>
                            <BookOpen size={14} /> AI Powered
                        </span>
                        <p className="text-white/60 text-sm">Get personalized onboarding plans with Gemini AI</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="card-tilted"
                        style={{ transform: 'rotate(2deg)' }}
                    >
                        <div className="w-full h-48 bg-surface rounded-2xl mb-4 flex items-center justify-center">
                            <ScrollText size={64} className="text-accent" />
                        </div>
                        <span className="badge mb-2">
                            <Award size={14} /> Contracts
                        </span>
                        <p className="text-white/60 text-sm">Digital contract signing with eSign integration</p>
                    </motion.div>
                </div>
            </section>

            {/* Classes Section */}
            <section className="px-8 py-16 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                    <h2 className="text-3xl font-bold text-white">Our Services</h2>
                    <p className="text-white/60 max-w-md">Complete distributor management platform with AI-powered onboarding for India</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card group">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-primary font-bold text-lg">Vendor</h3>
                                <h4 className="text-white font-bold text-xl">Portal</h4>
                            </div>
                            <button onClick={() => navigate('/vendor/login')} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                                <ArrowUpRight size={18} className="text-white" />
                            </button>
                        </div>
                        <p className="text-white/50 text-sm mb-4">Manage distributors, track progress, send announcements</p>
                        <div className="w-full h-32 bg-surface rounded-xl flex items-center justify-center">
                            <BarChart size={48} className="text-primary" />
                        </div>
                    </div>

                    <div className="card bg-primary group">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-white/80 font-bold text-lg">Distributor</h3>
                                <h4 className="text-white font-bold text-xl">Portal</h4>
                            </div>
                            <button onClick={() => navigate('/distributor/login')} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white transition-colors">
                                <ArrowUpRight size={18} className="text-white group-hover:text-primary" />
                            </button>
                        </div>
                        <p className="text-white/70 text-sm mb-4">Complete onboarding, training, and get certified</p>
                        <div className="w-full h-32 bg-white/10 rounded-xl flex items-center justify-center">
                            <Rocket size={48} className="text-white" />
                        </div>
                    </div>

                    <div className="card group">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-primary font-bold text-lg">AI</h3>
                                <h4 className="text-white font-bold text-xl">Assistant</h4>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                <ArrowUpRight size={18} className="text-white" />
                            </div>
                        </div>
                        <p className="text-white/50 text-sm mb-4">24/7 AI support powered by Google Gemini</p>
                        <div className="w-full h-32 bg-surface rounded-xl flex items-center justify-center">
                            <MessageSquare size={48} className="text-primary" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-8 py-16 max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
                    KEEP <span className="text-primary highlight">GROWING</span> UNTIL YOU
                </h2>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
                    FIND YOUR OWN <span className="text-primary">NETWORK</span>
                </h2>
                <p className="text-white/60 mb-2">Powered by Nexus Onboarding</p>
                <p className="text-white/40 text-sm">India's Premier Distributor Management Platform</p>
            </section>

            {/* Footer */}
            <footer className="px-8 py-6 border-t border-white/10">
                <div className="max-w-7xl mx-auto flex justify-between items-center text-white/40 text-sm">
                    <span>Copyright © Nexus Onboarding</span>
                    <span>Made for India 🇮🇳 2024</span>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
