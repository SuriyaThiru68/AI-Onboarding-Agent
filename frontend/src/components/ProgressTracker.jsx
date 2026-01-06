import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Circle, ArrowUpRight, FileText, ScrollText, BookOpen, Trophy, Target, Star, Medal, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
    { id: 1, label: 'Invite Accepted', status: 'completed', icon: CheckCircle },
    { id: 2, label: 'KYC Verification', status: 'active', icon: FileText },
    { id: 3, label: 'Contract Signing', status: 'pending', icon: ScrollText },
    { id: 4, label: 'Training', status: 'pending', icon: BookOpen },
    { id: 5, label: 'Certificate', status: 'pending', icon: Trophy },
];

const ProgressTracker = () => {
    const navigate = useNavigate();
    const currentStep = 2;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
        >
            {/* Progress Card */}
            <div className="card">
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Onboarding Roadmap</h2>
                        <p className="text-white/40 font-bold uppercase tracking-widest text-xs mt-2">Active Milestone: KYC Verification</p>
                    </div>
                    <div className="badge">75% COMPLETE</div>
                </div>

                <div className="flex items-center justify-between relative mb-12 px-4">
                    {/* Progress Bar Background */}
                    <div className="absolute top-7 left-0 w-full h-1 bg-white/5 rounded-full"></div>
                    {/* Progress Bar Fill */}
                    <div
                        className="absolute top-7 left-0 h-1 bg-primary rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(177,255,51,0.5)]"
                        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    ></div>

                    {steps.map((step) => (
                        <div key={step.id} className="progress-step z-10">
                            <div className={`progress-dot ${step.id < currentStep ? 'completed' :
                                step.id === currentStep ? 'active' :
                                    'pending'
                                }`}>
                                {step.id < currentStep ? (
                                    <CheckCircle size={28} />
                                ) : (
                                    <step.icon size={28} />
                                )}
                            </div>
                            <span className={`text-[10px] font-black mt-4 uppercase tracking-[0.2em] ${step.id <= currentStep ? 'text-white' : 'text-white/20'
                                }`}>
                                {step.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Current Step Action */}
            <div className="card border-primary/20 bg-primary/5">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="flex items-start gap-6">
                        <div className="w-20 h-20 rounded-[2rem] bg-primary flex items-center justify-center text-black">
                            <FileText size={32} />
                        </div>
                        <div>
                            <span className="badge-outline border-primary/30 text-primary mb-2">ACTION REQUIRED</span>
                            <h3 className="text-3xl font-black text-white uppercase tracking-tighter">KYC Verification</h3>
                            <p className="text-white/50 font-medium">Verify your identity using Aadhaar or PAN. 100% Secure.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/distributor/kyc')}
                        className="btn-accent px-12 py-5"
                    >
                        CONTINUE <ArrowUpRight size={20} />
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="card group">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <Target size={28} />
                        </div>
                        <div>
                            <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Milestones</p>
                            <p className="text-3xl font-black text-white">01 / 05</p>
                        </div>
                    </div>
                </div>

                <div className="card group">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                            <Star size={28} />
                        </div>
                        <div>
                            <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Experience</p>
                            <p className="text-3xl font-black text-white">720 XP</p>
                        </div>
                    </div>
                </div>

                <div className="card group">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                            <Medal size={28} />
                        </div>
                        <div>
                            <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Global Rank</p>
                            <p className="text-3xl font-black text-white">#42</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Onboarding Plan */}
            <div className="card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-0"></div>

                <div className="flex items-center gap-4 mb-10 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                        <Bot size={28} className="text-primary" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">AI Onboarding Plan</h3>
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Powered by Google Gemini</p>
                    </div>
                </div>

                <div className="space-y-4 relative z-10">
                    {[
                        { day: 'Day 1', task: 'KYC Verification', status: 'pending' },
                        { day: 'Day 2', task: 'Sign Distributor Agreement', status: 'locked' },
                        { day: 'Day 3-4', task: 'Complete Product Training', status: 'locked' },
                        { day: 'Day 5', task: 'First Order Placement', status: 'locked' },
                    ].map((item, idx) => (
                        <div key={idx} className={`flex items-center gap-6 p-6 rounded-[2rem] border border-white/5 bg-white/[0.02] ${item.status === 'locked' ? 'opacity-40' : 'hover:border-primary/20 transition-colors'}`}>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${item.status === 'completed' ? 'bg-green-500 border-green-500' :
                                item.status === 'pending' ? 'border-primary text-primary' : 'border-white/10 text-white/20'
                                }`}>
                                {item.status === 'completed' ? <CheckCircle size={24} className="text-black" /> :
                                    item.status === 'pending' ? <span className="text-sm font-black italic">{idx + 1}</span> :
                                        <Circle size={22} />}
                            </div>
                            <div className="flex-1">
                                <p className="text-white font-black uppercase tracking-tight">{item.task}</p>
                                <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mt-1">{item.day}</p>
                            </div>
                            {item.status === 'pending' && (
                                <button className="px-6 py-2 bg-primary text-black text-[10px] font-black rounded-full uppercase tracking-widest hover:scale-105 transition-transform">
                                    RESUME
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};


export default ProgressTracker;
