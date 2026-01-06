import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Login.css';

import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, Target, BarChart } from 'lucide-react';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isVendor = location.pathname.includes('vendor');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:8000/auth/token', {
                username,
                password
            });

            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('role', response.data.role);

            if (response.data.role === 'vendor') {
                navigate('/vendor');
            } else {
                navigate('/distributor');
            }
        } catch (err) {
            console.error(err);
            setError('Invalid credentials. Try xyz_distributor / password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex overflow-hidden relative font-body selection:bg-primary selection:text-black">
            {/* Background Orbs */}
            <div className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[150px] transition-colors duration-1000 ${isVendor ? 'bg-accent/10' : 'bg-primary/10'}`}></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-[150px] bg-secondary/10"></div>

            {/* Left Column - Hero Branding */}
            <div className="hidden lg:flex lg:w-[45%] p-20 flex-col justify-between relative z-10 border-r border-white/5 bg-black/40 backdrop-blur-3xl">
                <div>
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-4 text-white/30 hover:text-white transition-all mb-20 text-[10px] font-black tracking-[0.3em] uppercase group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        BACK TO HOME
                    </button>

                    <h1 className="text-[8rem] font-black text-white leading-[0.8] tracking-tighter">
                        {isVendor ? (
                            <>ADMIN<br /><span className="text-accent italic">PORTAL</span></>
                        ) : (
                            <>START<br /><span className="text-primary italic">LIFE</span></>
                        )}
                    </h1>
                    <p className="mt-12 text-white/40 max-w-sm text-lg font-bold leading-relaxed">
                        Access the next generation of distribution management. Smart. Fast. Secure.
                    </p>
                </div>

                <div className="flex gap-6">
                    <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-2xl flex-1">
                        <Target size={48} className={isVendor ? 'text-accent' : 'text-primary'} />
                        <h4 className="text-white font-black mt-6 text-sm tracking-widest uppercase">Targeted Growth</h4>
                        <p className="text-white/30 text-xs mt-2 font-bold leading-relaxed">AI-driven insights for your network expansion.</p>
                    </div>
                    <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-2xl flex-1" style={{ transform: 'translateY(-30px)' }}>
                        <BarChart size={48} className={isVendor ? 'text-accent' : 'text-primary'} />
                        <h4 className="text-white font-black mt-6 text-sm tracking-widest uppercase">Live Analytics</h4>
                        <p className="text-white/30 text-xs mt-2 font-bold leading-relaxed">Monitoring every node in real-time.</p>
                    </div>
                </div>
            </div>

            {/* Right Column - Login Interface */}
            <div className="flex-1 flex items-center justify-center p-8 lg:p-24 relative z-10 bg-black">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="w-full max-w-md"
                >
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-10">
                            <span className="text-3xl font-black text-white italic tracking-tighter">
                                NEXUS<span className="text-primary">AI</span>
                            </span>
                            <div className="h-4 w-px bg-white/10 mx-2"></div>
                            <span className="text-[10px] font-black text-white/40 tracking-[0.2em] uppercase">
                                {isVendor ? 'ADMINISTRATION' : 'DISTRIBUTOR NETWORK'}
                            </span>
                        </div>

                        <h2 className="text-5xl font-black text-white mb-4 uppercase tracking-tighter">
                            {isVendor ? 'Secure Login' : 'Partner Access'}
                        </h2>
                        <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">
                            India's #1 AI Distribution Platform
                        </p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-red-500/10 text-red-400 p-5 rounded-3xl mb-10 border border-red-500/20 text-[10px] font-black text-center uppercase tracking-widest leading-relaxed"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-white/40 ml-6 tracking-widest uppercase font-display">Username</label>
                            <input
                                type="text"
                                className="input-field"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="ENTER USERNAME"
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-white/40 ml-6 tracking-widest uppercase font-display">Password</label>
                            <input
                                type="password"
                                className="input-field"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="ENTER PASSWORD"
                                required
                            />
                        </div>


                        <button
                            type="submit"
                            disabled={loading}
                            className={`btn-pill w-full mt-10 py-6 text-black ${isVendor ? 'bg-accent shadow-[0_20px_50px_rgba(255,77,77,0.3)]' : 'bg-primary shadow-[0_20px_50px_rgba(177,255,51,0.3)]'} disabled:opacity-50 disabled:shadow-none`}
                        >
                            {loading ? 'AUTHORIZING ACCESS...' : (
                                <>
                                    {isVendor ? 'ENTER CONSOLE' : 'JOIN NETWORK'}
                                    <ArrowUpRight size={24} strokeWidth={3} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-16 flex flex-col items-center gap-8">
                        <button
                            type="button"
                            onClick={() => navigate(isVendor ? '/distributor/login' : '/vendor/login')}
                            className="text-white/30 hover:text-white transition-all text-[10px] font-black tracking-[0.3em] uppercase border-b border-white/10 pb-1"
                        >
                            SWITCH TO {isVendor ? 'PARTNER' : 'ADMIN'} LOGIN
                        </button>

                        <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] w-full text-center">
                            <p className="text-white/20 text-[10px] font-black uppercase tracking-widest mb-1">Demo Credentials</p>
                            <p className="text-white/40 text-xs font-bold tracking-tight">
                                <span className="text-primary italic">{isVendor ? 'admin_vendor' : 'xyz_distributor'}</span> : password
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};



export default Login;
