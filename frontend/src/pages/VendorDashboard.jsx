import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Bell, LogOut, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SidebarItem = ({ icon: Icon, label, path, active }) => (
    <Link
        to={path}
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${active
                ? 'bg-primary text-white font-semibold'
                : 'text-white/60 hover:bg-surface hover:text-white'
            }`}
    >
        <Icon size={20} />
        <span>{label}</span>
    </Link>
);

const VendorDashboard = () => {
    const location = useLocation();

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <aside className="w-72 border-r border-white/10 p-6 flex flex-col bg-surface/50">
                <div className="flex items-center gap-2 mb-10">
                    <span className="text-2xl font-bold text-white">
                        <span className="text-primary">N</span>exus
                    </span>
                    <span className="badge">Admin</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <SidebarItem
                        icon={LayoutDashboard}
                        label="Dashboard"
                        path="/vendor"
                        active={location.pathname === '/vendor'}
                    />
                    <SidebarItem
                        icon={Users}
                        label="Distributors"
                        path="/vendor/distributors"
                        active={location.pathname.includes('distributors')}
                    />
                    <SidebarItem
                        icon={FileText}
                        label="Contracts"
                        path="/vendor/contracts"
                        active={location.pathname.includes('contracts')}
                    />
                    <SidebarItem
                        icon={Bell}
                        label="Announcements"
                        path="/vendor/announcements"
                        active={location.pathname.includes('announcements')}
                    />
                </nav>

                <button
                    onClick={() => { localStorage.clear(); window.location.href = '/'; }}
                    className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-2xl transition-colors"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Header */}
                <header className="flex justify-between items-center p-8 border-b border-white/10">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
                        <p className="text-white/60 text-sm">Welcome back, Admin</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="btn-primary">
                            Create Invite <ArrowUpRight size={18} />
                        </button>
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                            A
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    <Routes>
                        <Route path="/" element={<OverviewStats />} />
                        <Route path="/distributors" element={<DistributorsList />} />
                        <Route path="/contracts" element={<div className="text-white/60">Contracts Management</div>} />
                        <Route path="/announcements" element={<div className="text-white/60">Announcements</div>} />
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
