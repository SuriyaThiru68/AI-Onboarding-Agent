import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Distributor.css';

import { Home, CheckSquare, MessageSquare, GraduationCap, Award, LogOut, ArrowUpRight, Trophy, Package, Briefcase, Target, BarChart, FileText, Hand } from 'lucide-react';
import { motion } from 'framer-motion';
import AIChat from '../components/AIChat';
import ProgressTracker from '../components/ProgressTracker';
import KYCUpload from './KYCUpload';

const SidebarItem = ({ icon: Icon, label, path, active }) => (
    <Link
        to={path}
        className={`flex items-center gap-4 px-6 py-4 rounded-[2rem] transition-all group ${active
            ? 'bg-primary text-black font-black'
            : 'text-white/40 hover:text-white hover:bg-white/5'
            }`}
    >
        <Icon size={22} className={active ? 'text-black' : 'group-hover:text-primary transition-colors'} />
        <span className="text-sm font-black uppercase tracking-widest">{label}</span>
    </Link>
);

const DistributorDashboard = () => {
    const location = useLocation();

    return (
        <div className="flex h-screen bg-black overflow-hidden font-body">
            {/* Sidebar */}
            <aside className="w-80 border-r border-white/5 p-8 flex flex-col bg-[#050505]">
                <div className="flex items-center gap-3 mb-12">
                    <span className="text-2xl font-black text-white italic tracking-tighter">
                        NEXUS<span className="text-primary">AI</span>
                    </span>
                    <span className="badge-outline">PARTNER</span>
                </div>

                <nav className="flex-1 space-y-3">
                    <SidebarItem
                        icon={Home}
                        label="Progress"
                        path="/distributor"
                        active={location.pathname === '/distributor'}
                    />
                    <SidebarItem
                        icon={CheckSquare}
                        label="Tasks"
                        path="/distributor/tasks"
                        active={location.pathname.includes('tasks')}
                    />
                    <SidebarItem
                        icon={GraduationCap}
                        label="Training"
                        path="/distributor/training"
                        active={location.pathname.includes('training')}
                    />
                    <SidebarItem
                        icon={MessageSquare}
                        label="Mentor"
                        path="/distributor/chat"
                        active={location.pathname.includes('chat')}
                    />
                    <SidebarItem
                        icon={Award}
                        label="Awards"
                        path="/distributor/certificate"
                        active={location.pathname.includes('certificate')}
                    />
                </nav>

                <div className="mt-auto pt-8">
                    <button
                        onClick={() => { localStorage.clear(); window.location.href = '/'; }}
                        className="w-full flex items-center justify-center gap-3 py-4 text-accent hover:bg-accent/10 rounded-full font-black text-xs uppercase tracking-widest transition-all"
                    >
                        <LogOut size={18} />
                        EXIT WORKSPACE
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-black relative">
                {/* Subtle Glows */}
                <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[120px] -z-10"></div>

                {/* Header */}
                <header className="flex justify-between items-center p-12 border-b border-white/5">
                    <div>
                        <h1 className="text-5xl font-black text-white uppercase tracking-tighter">Welcome back, Raj!</h1>
                        <p className="text-white/40 font-bold mt-2 uppercase tracking-widest text-xs">Partner Level 02 • 720 XP Earned</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-primary font-black text-2xl group hover:border-primary transition-colors cursor-pointer">
                            R
                        </div>
                    </div>
                </header>

                <div className="p-12 max-w-6xl mx-auto">
                    <Routes>
                        <Route path="/" element={<ProgressTracker />} />
                        <Route path="/chat" element={<AIChat />} />
                        <Route path="/tasks" element={<TasksList />} />
                        <Route path="/kyc" element={<KYCUpload />} />
                        <Route path="/training" element={<TrainingModules />} />
                        <Route path="/certificate" element={<CertificateSection />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};


const TasksList = () => {
    const navigate = useNavigate();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <h2 className="text-2xl font-bold text-white">Your Tasks</h2>

            <div className="grid gap-4">
                {[
                    { title: 'Complete KYC Verification', desc: 'Upload Aadhaar and PAN documents', status: 'pending', priority: 'high' },
                    { title: 'Sign Distributor Agreement', desc: 'Review and digitally sign the contract', status: 'locked', priority: 'high' },
                    { title: 'Complete Product Training', desc: 'Watch all training videos', status: 'locked', priority: 'medium' },
                    { title: 'First Order Placement', desc: 'Place your initial stock order', status: 'locked', priority: 'low' },
                ].map((task, idx) => (
                    <div key={idx} className={`card flex items-center justify-between ${task.status === 'locked' ? 'opacity-50' : ''}`}>
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${task.status === 'completed' ? 'bg-green-500' :
                                task.status === 'pending' ? 'bg-primary' : 'bg-surface'
                                }`}>
                                <CheckSquare size={20} className="text-white" />
                            </div>
                            <div>
                                <h4 className="text-white font-medium">{task.title}</h4>
                                <p className="text-white/60 text-sm">{task.desc}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className={`badge ${task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                                task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-blue-500/20 text-blue-400'
                                }`}>
                                {task.priority}
                            </span>
                            {task.status === 'pending' && (
                                <button
                                    onClick={() => navigate('/distributor/kyc')}
                                    className="btn-accent py-2"
                                >
                                    Start <ArrowUpRight size={16} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

const TrainingModules = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
    >
        <h2 className="text-2xl font-bold text-white">Training Modules</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
                { title: 'Introduction', duration: '10 min', progress: 100, icon: Hand },
                { title: 'Product Knowledge', duration: '25 min', progress: 60, icon: Package },
                { title: 'Sales Techniques', duration: '20 min', progress: 0, icon: Briefcase },
                { title: 'Customer Service', duration: '15 min', progress: 0, icon: Target },
                { title: 'Inventory Management', duration: '20 min', progress: 0, icon: BarChart },
                { title: 'Final Assessment', duration: '30 min', progress: 0, icon: FileText },
            ].map((module, idx) => (
                <div key={idx} className="card group cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <div className="text-4xl">
                            <module.icon size={40} className="text-primary" />
                        </div>
                        {module.progress === 100 && (
                            <span className="badge bg-green-500/20 text-green-400">Completed</span>
                        )}
                    </div>
                    <h4 className="text-white font-bold text-lg mb-1">{module.title}</h4>
                    <p className="text-white/60 text-sm mb-4">{module.duration}</p>

                    <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${module.progress}%` }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    </motion.div>
);

const CertificateSection = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16"
    >
        <div className="card text-center max-w-md">
            <div className="mb-6 flex justify-center">
                <Trophy size={80} className="text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Certificate of Completion</h2>
            <p className="text-white/60 mb-6">Complete all training modules to unlock your certificate</p>

            <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-full h-3 bg-surface rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '35%' }}></div>
                </div>
                <span className="text-white/60 text-sm">35%</span>
            </div>

            <button className="btn-outline opacity-50 cursor-not-allowed">
                Download Certificate
            </button>
        </div>
    </motion.div>
);

export default DistributorDashboard;
