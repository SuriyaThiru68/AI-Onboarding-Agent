import React from 'react';
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
    const currentStep = 2;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            {/* Progress Card */}
            <div className="card">
                <h2 className="text-2xl font-bold text-white mb-8">Onboarding Progress</h2>

                <div className="flex items-center justify-between relative mb-8">
                    {/* Progress Bar Background */}
                    <div className="absolute top-6 left-0 w-full h-1 bg-surface -z-0 rounded-full"></div>
                    {/* Progress Bar Fill */}
                    <div
                        className="absolute top-6 left-0 h-1 bg-primary -z-0 rounded-full transition-all duration-500"
                        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    ></div>

                    {steps.map((step) => (
                        <div key={step.id} className="progress-step z-10">
                            <div className={`progress-dot ${step.id < currentStep ? 'completed' :
                                step.id === currentStep ? 'active' :
                                    'pending'
                                }`}>
                                {step.id < currentStep ? (
                                    <CheckCircle size={24} />
                                ) : (
                                    <step.icon size={24} />
                                )}
                            </div>
                            <span className={`text-xs font-medium mt-2 ${step.id <= currentStep ? 'text-white' : 'text-white/40'
                                }`}>
                                {step.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Current Step Action */}
            <div className="card bg-primary/10 border-primary/30">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                            <FileText size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">KYC Verification</h3>
                            <p className="text-white/60">Upload your Aadhaar and PAN card copies to proceed to the next step.</p>
                        </div>
                    </div>
                    <button className="btn-accent whitespace-nowrap">
                        Start Verification <ArrowUpRight size={18} />
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl">
                            <Target size={24} className="text-primary" />
                        </div>
                        <div>
                            <p className="text-white/60 text-sm">Tasks Completed</p>
                            <p className="text-2xl font-bold text-white">1 / 5</p>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 flex items-center justify-center text-2xl">
                            <Star size={24} className="text-yellow-400" />
                        </div>
                        <div>
                            <p className="text-white/60 text-sm">XP Earned</p>
                            <p className="text-2xl font-bold text-white">720</p>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-2xl">
                            <Medal size={24} className="text-purple-400" />
                        </div>
                        <div>
                            <p className="text-white/60 text-sm">Leaderboard Rank</p>
                            <p className="text-2xl font-bold text-white">#42</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Onboarding Plan */}
            <div className="card">
                <div className="flex items-center gap-3 mb-6">
                    <Bot size={28} className="text-primary" />
                    <h3 className="text-xl font-bold text-white">AI Onboarding Plan</h3>
                    <span className="badge">Gemini Powered</span>
                </div>

                <div className="space-y-4">
                    {[
                        { day: 'Day 1', task: 'Complete KYC Verification', status: 'pending' },
                        { day: 'Day 2', task: 'Sign Distributor Agreement', status: 'locked' },
                        { day: 'Day 3-4', task: 'Complete Product Training', status: 'locked' },
                        { day: 'Day 5', task: 'Place First Order', status: 'locked' },
                    ].map((item, idx) => (
                        <div key={idx} className={`flex items-center gap-4 p-4 rounded-2xl bg-surface/50 ${item.status === 'locked' ? 'opacity-50' : ''}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.status === 'completed' ? 'bg-green-500' :
                                item.status === 'pending' ? 'bg-primary' : 'bg-muted'
                                }`}>
                                {item.status === 'completed' ? <CheckCircle size={20} className="text-white" /> :
                                    item.status === 'pending' ? <span className="text-white text-sm font-bold">{idx + 1}</span> :
                                        <Circle size={20} className="text-white/50" />}
                            </div>
                            <div className="flex-1">
                                <p className="text-white font-medium">{item.task}</p>
                                <p className="text-white/40 text-sm">{item.day}</p>
                            </div>
                            {item.status === 'pending' && (
                                <button className="btn-primary py-2 text-sm">
                                    Start
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
