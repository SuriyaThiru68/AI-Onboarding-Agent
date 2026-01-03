import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, Target, BarChart } from 'lucide-react';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isVendor = location.pathname.includes('vendor');
    const role = isVendor ? 'vendor' : 'distributor';

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
            setError('Invalid credentials. Try raj_distributor / password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex">
            {/* Left Side - Decorative */}
            <div className="hidden lg:flex lg:w-1/2 bg-surface p-12 flex-col justify-between relative overflow-hidden">
                <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-10 w-48 h-48 bg-primary/20 rounded-full blur-2xl"></div>

                <div>
                    <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12">
                        <ArrowLeft size={20} /> Back to Home
                    </button>

                    <h1 className="text-5xl font-black text-white leading-tight">
                        {isVendor ? (
                            <>Welcome to<br /><span className="text-primary">Vendor Portal</span></>
                        ) : (
                            <>Start Your<br /><span className="text-primary">Journey Today</span></>
                        )}
                    </h1>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="card-tilted p-4">
                        <Target size={32} className="text-secondary mb-2" />
                        <p className="text-white/60 text-sm">AI-Powered Onboarding</p>
                    </div>
                    <div className="card p-4" style={{ transform: 'rotate(2deg)' }}>
                        <BarChart size={32} className="text-primary mb-2" />
                        <p className="text-white/60 text-sm">Track Progress</p>
                    </div>
                </div>

                <div className="text-white/40 text-sm">
                    <p>India's Premier Distributor Management</p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-2xl font-bold text-white">
                                <span className="text-primary">N</span>exus
                            </span>
                            <span className="badge">{isVendor ? 'Admin' : 'Distributor'}</span>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-2">
                            {isVendor ? 'Vendor Login' : 'Distributor Login'}
                        </h2>
                        <p className="text-white/60">Enter your credentials to continue</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/20 text-red-300 p-4 rounded-2xl mb-6 border border-red-500/30 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-white/60 text-sm mb-2 font-medium">Username</label>
                            <input
                                type="text"
                                className="input-field"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                            />
                        </div>

                        <div>
                            <label className="block text-white/60 text-sm mb-2 font-medium">Password</label>
                            <input
                                type="password"
                                className="input-field"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-accent py-4 text-lg justify-center disabled:opacity-50"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                            {!loading && <ArrowUpRight size={20} />}
                        </button>
                    </form>

                    <div className="mt-8 p-4 bg-surface rounded-2xl border border-white/10">
                        <p className="text-white/40 text-xs mb-2">Demo Credentials:</p>
                        <p className="text-white/60 text-sm">
                            {isVendor ? 'admin_vendor' : 'raj_distributor'} / password
                        </p>
                    </div>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => navigate(isVendor ? '/distributor/login' : '/vendor/login')}
                            className="text-white/40 hover:text-primary transition-colors text-sm"
                        >
                            Switch to {isVendor ? 'Distributor' : 'Vendor'} Login →
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
