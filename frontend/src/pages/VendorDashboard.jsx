import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import '../styles/Vendor.css';

import { LayoutDashboard, Users, FileText, Bell, LogOut, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

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

const VendorDashboard = () => {
    const location = useLocation();

    return (
        <div className="flex h-screen bg-black overflow-hidden font-body">
            {/* Sidebar */}
            <aside className="w-80 border-r border-white/5 p-8 flex flex-col bg-[#050505] z-20">
                <div className="flex items-center gap-3 mb-12">
                    <span className="text-2xl font-black text-white italic tracking-tighter">
                        NEXUS<span className="text-primary">AI</span>
                    </span>
                    <span className="badge-outline">ADMIN</span>
                </div>

                <nav className="flex-1 space-y-3">
                    <SidebarItem
                        icon={LayoutDashboard}
                        label="Overview"
                        path="/vendor"
                        active={location.pathname === '/vendor'}
                    />
                    <SidebarItem
                        icon={Users}
                        label="Partners"
                        path="/vendor/distributors"
                        active={location.pathname.includes('distributors')}
                    />
                    <SidebarItem
                        icon={FileText}
                        label="Documents"
                        path="/vendor/documents"
                        active={location.pathname.includes('documents')}
                    />
                    <SidebarItem
                        icon={Bell}
                        label="Alerts"
                        path="/vendor/alerts"
                        active={location.pathname.includes('alerts')}
                    />
                </nav>

                <div className="mt-auto pt-8">
                    <button
                        onClick={() => { localStorage.clear(); window.location.href = '/'; }}
                        className="w-full flex items-center justify-center gap-3 py-4 text-accent hover:bg-accent/10 rounded-full font-black text-xs uppercase tracking-widest transition-all"
                    >
                        <LogOut size={18} />
                        EXIT SESSION
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-black relative">
                {/* Subtle Glows */}
                <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-secondary/5 rounded-full blur-[150px] -z-10"></div>
                <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-[120px] -z-10"></div>

                {/* Header */}
                <header className="flex justify-between items-center p-12 border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-10 transition-all">
                    <div>
                        <h1 className="text-5xl font-black text-white uppercase tracking-tighter">Admin Console</h1>
                        <p className="text-white/40 font-bold mt-2 uppercase tracking-widest text-xs italic">Operational Review • Live Updates</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end mr-2">
                            <span className="text-white font-black text-sm uppercase tracking-widest">Admin User</span>
                            <span className="text-primary text-[10px] font-black uppercase">Main HQ</span>
                        </div>
                        <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-white font-black text-2xl group hover:border-primary transition-colors cursor-pointer">
                            <img src="https://i.pravatar.cc/150?u=admin" className="w-full h-full object-cover rounded-[1.5rem] opacity-80 group-hover:opacity-100 transition-opacity" alt="admin" />
                        </div>
                    </div>
                </header>

                <div className="p-12 max-w-[1400px] mx-auto relative z-10">
                    <Routes>
                        <Route path="/" element={<OverviewStats />} />
                        <Route path="/distributors" element={<DistributorsList />} />
                        <Route path="/documents" element={<div className="text-white/60">Documents Management</div>} />
                        <Route path="/alerts" element={<div className="text-white/60">Alerts Overview</div>} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

const OverviewStats = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
    >
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="stat-card">
                <span className="text-white/60 text-sm">Total Distributors</span>
                <span className="text-4xl font-bold text-white">1,240</span>
                <span className="text-primary text-sm">↑ 12% this month</span>
            </div>

            <div className="stat-card" style={{ borderLeftColor: '#ffc857' }}>
                <span className="text-white/60 text-sm">Pending KYC</span>
                <span className="text-4xl font-bold text-white">45</span>
                <span className="text-yellow-400 text-sm">Action needed</span>
            </div>

            <div className="stat-card" style={{ borderLeftColor: '#22c55e' }}>
                <span className="text-white/60 text-sm">Contracts Signed</span>
                <span className="text-4xl font-bold text-white">890</span>
                <span className="text-green-400 text-sm">72% completion</span>
            </div>

            <div className="stat-card" style={{ borderLeftColor: '#8b5cf6' }}>
                <span className="text-white/60 text-sm">This Week</span>
                <span className="text-4xl font-bold text-white">28</span>
                <span className="text-purple-400 text-sm">New signups</span>
            </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
            <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
                {[
                    { name: 'Raj Kumar', action: 'Completed KYC', time: '2 mins ago', status: 'success' },
                    { name: 'Priya Singh', action: 'Signed Contract', time: '15 mins ago', status: 'success' },
                    { name: 'Amit Patel', action: 'Pending Verification', time: '1 hour ago', status: 'warning' },
                    { name: 'Sneha Gupta', action: 'Started Training', time: '2 hours ago', status: 'info' },
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                {item.name.charAt(0)}
                            </div>
                            <div>
                                <p className="text-white font-medium">{item.name}</p>
                                <p className="text-white/60 text-sm">{item.action}</p>
                            </div>
                        </div>
                        <span className="text-white/40 text-sm">{item.time}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-primary hover:bg-orange-600 cursor-pointer group">
                <h3 className="text-white font-bold text-lg mb-2">Create Invite</h3>
                <p className="text-white/70 text-sm mb-4">Send onboarding invites to new distributors</p>
                <ArrowUpRight className="text-white/50 group-hover:text-white transition-colors" />
            </div>

            <div className="card group cursor-pointer">
                <h3 className="text-white font-bold text-lg mb-2">Send Announcement</h3>
                <p className="text-white/60 text-sm mb-4">Broadcast messages to all distributors</p>
                <ArrowUpRight className="text-white/30 group-hover:text-primary transition-colors" />
            </div>

            <div className="card group cursor-pointer">
                <h3 className="text-white font-bold text-lg mb-2">View Reports</h3>
                <p className="text-white/60 text-sm mb-4">Analytics and performance metrics</p>
                <ArrowUpRight className="text-white/30 group-hover:text-primary transition-colors" />
            </div>
        </div>
    </motion.div>
);

const DistributorsList = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
    >
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">All Distributors</h3>
            <input
                type="text"
                placeholder="Search..."
                className="input-field w-64"
            />
        </div>

        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="text-left text-white/60 text-sm border-b border-white/10">
                        <th className="pb-4">Name</th>
                        <th className="pb-4">Region</th>
                        <th className="pb-4">KYC Status</th>
                        <th className="pb-4">Contract</th>
                        <th className="pb-4">Progress</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        { name: 'Raj Kumar', region: 'Delhi', kyc: 'Verified', contract: 'Signed', progress: 80 },
                        { name: 'Priya Singh', region: 'Mumbai', kyc: 'Verified', contract: 'Pending', progress: 45 },
                        { name: 'Amit Patel', region: 'Bangalore', kyc: 'Pending', contract: 'Not Started', progress: 20 },
                    ].map((item, idx) => (
                        <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                            <td className="py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                                        {item.name.charAt(0)}
                                    </div>
                                    <span className="text-white">{item.name}</span>
                                </div>
                            </td>
                            <td className="py-4 text-white/60">{item.region}</td>
                            <td className="py-4">
                                <span className={`badge ${item.kyc === 'Verified' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                    {item.kyc}
                                </span>
                            </td>
                            <td className="py-4 text-white/60">{item.contract}</td>
                            <td className="py-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-24 h-2 bg-surface rounded-full overflow-hidden">
                                        <div className="h-full bg-primary rounded-full" style={{ width: `${item.progress}%` }}></div>
                                    </div>
                                    <span className="text-white/60 text-sm">{item.progress}%</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </motion.div>
);

export default VendorDashboard;
