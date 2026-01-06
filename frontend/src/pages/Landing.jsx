import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Landing.css';

import { motion } from 'framer-motion';
import { ArrowUpRight, Users, BookOpen, Award, Target, Bot, ScrollText, BarChart, Rocket, MessageSquare } from 'lucide-react';


const Landing = () => {
    const navigate = useNavigate();
    const homeRef = useRef(null);
    const featureRef = useRef(null);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black Landing overflow-x-hidden">
            {/* Navigation */}
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full px-8 py-4 flex items-center justify-between shadow-2xl">
                    <div className="flex items-center gap-12">
                        <div className="text-2xl font-black text-white flex items-center gap-1">
                            NEXUS<span className="text-primary italic">AI</span>
                        </div>
                        <div className="hidden lg:flex items-center gap-2">
                            <button className="nav-link active">Home</button>
                            <button className="nav-link">Features</button>
                            <button className="nav-link">About</button>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/vendor/login')} className="text-sm font-bold text-white/60 hover:text-white transition-colors">
                            VENDORS
                        </button>
                        <button onClick={() => navigate('/distributor/login')} className="bg-primary text-black px-6 py-2 rounded-full font-black text-sm hover:scale-105 transition-transform">
                            GET STARTED
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section ref={homeRef} className="pt-48 pb-24 px-8 max-w-7xl mx-auto relative cursor-default">
                {/* Decorative Blobs from Image */}
                <div className="absolute top-40 right-[10%] w-24 h-24 bg-secondary rounded-full overflow-hidden animate-float">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2">
                        <div className="w-3 h-3 bg-black rounded-full"></div>
                        <div className="w-3 h-3 bg-black rounded-full"></div>
                    </div>
                </div>

                <div className="absolute bottom-20 left-[5%] w-32 h-24 bg-accent rounded-[3rem] animate-float" style={{ animationDelay: '1s' }}>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-3">
                        <div className="w-4 h-4 bg-black rounded-full"></div>
                        <div className="w-4 h-4 bg-black rounded-full"></div>
                    </div>
                </div>

                <div className="absolute top-60 left-1/3 text-primary animate-pulse opacity-50">✦</div>
                <div className="absolute top-40 right-1/4 text-secondary animate-pulse">✦</div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center z-10 relative"
                >
                    <div className="inline-block px-4 py-1 bg-primary text-black text-[10px] font-black rounded-md mb-8 uppercase tracking-[0.2em]">
                        AI-Powered Network
                    </div>

                    <h1 className="text-6xl md:text-[9rem] font-black leading-[0.85] tracking-tight mb-12">
                        THE FUTURE<br />
                        <span className="text-primary italic">OF DISTRIBUTION</span><br />
                        IN INDIA!
                    </h1>

                    <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
                        Nexus AI streamlines your distributor onboarding with automated KYC, digital contracts, and personalized growth paths. Faster, smarter, and 100% digital.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <button onClick={() => navigate('/distributor/login')} className="btn-accent">
                            START ONBOARDING <ArrowUpRight size={24} />
                        </button>
                    </div>


                </motion.div>
            </section>

            {/* Lime Green Curved Section (Mimicking the image) */}
            <section className="bg-primary pt-32 pb-48 px-8 -mt-20 rounded-t-[5rem] md:rounded-t-[10rem] text-black relative">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div>
                        <div className="flex gap-1 mb-8">
                            <div className="w-2 h-2 rounded-full bg-black/20"></div>
                            <div className="w-2 h-2 rounded-full bg-black"></div>
                            <div className="w-2 h-2 rounded-full bg-black/20"></div>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black leading-[0.9] mb-8">
                            BUILD<br />
                            STARKER<br />
                            NETWORKS
                        </h2>
                        <p className="text-black/70 text-xl font-bold max-w-md">
                            Revolutionizing how Indian brands connect with their distributors through AI.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black text-white p-8 rounded-[3rem] aspect-square flex flex-col justify-between hover:scale-105 transition-transform">
                            <Bot size={48} className="text-primary" />
                            <div>
                                <h3 className="text-2xl font-black mb-2">AI MENTOR</h3>
                                <p className="text-white/50 text-sm">24/7 dedicated support for every distributor.</p>
                            </div>
                        </div>
                        <div className="bg-secondary text-black p-8 rounded-[3rem] aspect-square flex flex-col justify-between hover:scale-105 transition-transform" style={{ transform: 'translateY(40px)' }}>
                            <ScrollText size={48} className="text-black" />
                            <div>
                                <h3 className="text-2xl font-black mb-2">AUTO KYC</h3>
                                <p className="text-black/50 text-sm">Aadhaar & PAN verification in seconds.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave-like background dots from image */}
                <div className="absolute bottom-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
                    <div className="grid grid-cols-12 gap-12 rotate-12 scale-150">
                        {Array.from({ length: 144 }).map((_, i) => (
                            <div key={i} className="w-8 h-8 rounded-full bg-black"></div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Integration Section */}
            <section className="py-32 px-8 bg-black">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-black mb-20">POWERED BY <span className="text-secondary italic">MODERN TECH</span></h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 opacity-40">
                        <div className="flex flex-col items-center gap-4">
                            <Rocket size={40} />
                            <span className="font-black text-xs tracking-widest">GEMINI AI</span>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <Award size={40} />
                            <span className="font-black text-xs tracking-widest">DIGILOCKER</span>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <Target size={40} />
                            <span className="font-black text-xs tracking-widest">UPTIME 99.9%</span>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <MessageSquare size={40} />
                            <span className="font-black text-xs tracking-widest">24/7 SUPPORT</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Bar Footer (from image) */}
            <footer className="bg-[#111] rounded-t-[3rem] px-8 py-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-8 text-xs font-black tracking-widest text-white/40">
                        <span className="hover:text-primary cursor-pointer transition-colors">UI UX DESIGN</span>
                        <span className="hover:text-primary cursor-pointer transition-colors">30+ SCREENS</span>
                        <span className="hover:text-primary cursor-pointer transition-colors">MOBILE TABLET DESKTOP</span>
                    </div>

                    <div className="text-white/60 font-black italic text-xl">
                        NEXUS<span className="text-primary italic">AI</span>
                    </div>

                    <div className="flex items-center gap-8 text-xs font-black tracking-widest text-white/40 uppercase">
                        <span>© 2025</span>
                        <span className="text-white/20">|</span>
                        <span>MADE FOR BHARAT</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};


export default Landing;
