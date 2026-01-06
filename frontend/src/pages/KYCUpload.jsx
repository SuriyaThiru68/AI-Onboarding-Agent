import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileCheck, AlertCircle, ArrowLeft, CheckCircle, Loader2, ShieldCheck, User, CreditCard, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KYCUpload = () => {
    const navigate = useNavigate();
    const [aadhaar, setAadhaar] = useState(null);
    const [pan, setPan] = useState(null);
    const [previews, setPreviews] = useState({ aadhaar: null, pan: null });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, uploading, success, error
    const [result, setResult] = useState(null);

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            if (type === 'aadhaar') {
                setAadhaar(file);
                setPreviews(prev => ({ ...prev, aadhaar: URL.createObjectURL(file) }));
            } else {
                setPan(file);
                setPreviews(prev => ({ ...prev, pan: URL.createObjectURL(file) }));
            }
        }
    };

    const handleUpload = async () => {
        if (!aadhaar || !pan) return;

        setLoading(true);
        setStatus('uploading');

        const formData = new FormData();
        formData.append('username', 'raj_distributor'); // In real app, get from auth context
        formData.append('aadhaar', aadhaar);
        formData.append('pan', pan);

        try {
            const response = await axios.post('http://localhost:8000/api/kyc', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.kyc_status === 'verified') {
                setStatus('success');
                setResult(response.data);
            } else {
                setStatus('error');
                setResult({ message: response.data.message || "Verification failed" });
            }
        } catch (error) {
            setStatus('error');
            setResult({ message: "Server error. Please ensure Tesseract OCR is installed on the host." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <button
                onClick={() => navigate('/distributor')}
                className="flex items-center gap-2 text-white/40 hover:text-white transition-all mb-12 text-[10px] font-black tracking-widest uppercase group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                BACK TO DASHBOARD
            </button>

            <div className="mb-12">
                <h1 className="text-5xl font-black text-white uppercase tracking-tighter">Identity Verification</h1>
                <p className="text-white/40 font-bold mt-2 uppercase tracking-widest text-xs">AI-Powered OCR Verification • Secure 256-bit Encryption</p>
            </div>

            {status === 'success' ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="card border-primary/20 bg-primary/5 text-center py-20"
                >
                    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(177,255,51,0.3)]">
                        <CheckCircle size={48} className="text-black" />
                    </div>
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">KYC VERIFIED!</h2>
                    <p className="text-white/60 font-bold max-w-sm mx-auto mb-12 uppercase tracking-widest text-sm">
                        OCR successfully extracted your data. You are now cleared for the next onboarding step.
                    </p>

                    <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto mb-12">
                        <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
                            <p className="text-[10px] font-black text-white/20 uppercase mb-1">Aadhaar Found</p>
                            <p className="text-primary font-black tracking-widest">{result?.aadhaar_found}</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
                            <p className="text-[10px] font-black text-white/20 uppercase mb-1">PAN Found</p>
                            <p className="text-primary font-black tracking-widest">{result?.pan_found}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/distributor')}
                        className="btn-accent px-12"
                    >
                        CONTINUE TO DASHBOARD
                    </button>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Aadhaar Upload */}
                    <div className={`card group relative overflow-hidden transition-all duration-500 ${aadhaar ? 'border-primary/30' : 'hover:border-white/20'}`}>
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <User size={120} className="text-white" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${aadhaar ? 'bg-primary text-black' : 'bg-white/5 text-white/40'}`}>
                                    <CreditCard size={24} />
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">Aadhaar Card</h3>
                            </div>

                            {previews.aadhaar ? (
                                <div className="aspect-[1.6/1] rounded-[2rem] overflow-hidden border border-white/10 mb-6 bg-black">
                                    <img src={previews.aadhaar} alt="Aadhaar" className="w-full h-full object-cover opacity-70" />
                                </div>
                            ) : (
                                <div className="aspect-[1.6/1] rounded-[2rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center mb-6 group-hover:border-primary/30 transition-colors">
                                    <Upload size={32} className="text-white/20 mb-4 group-hover:text-primary/50 transition-colors" />
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Upload Front Image</p>
                                </div>
                            )}

                            <input
                                type="file"
                                id="aadhaar-input"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'aadhaar')}
                            />
                            <label
                                htmlFor="aadhaar-input"
                                className={`btn-pill w-full cursor-pointer ${aadhaar ? 'bg-white/5 text-white' : 'bg-primary text-black'}`}
                            >
                                {aadhaar ? 'CHANGE IMAGE' : 'SELECT FILE'}
                            </label>
                        </div>
                    </div>

                    {/* PAN Upload */}
                    <div className={`card group relative overflow-hidden transition-all duration-500 ${pan ? 'border-primary/30' : 'hover:border-white/20'}`}>
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <ShieldCheck size={120} className="text-white" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${pan ? 'bg-primary text-black' : 'bg-white/5 text-white/40'}`}>
                                    <FileCheck size={24} />
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">PAN Card</h3>
                            </div>

                            {previews.pan ? (
                                <div className="aspect-[1.6/1] rounded-[2rem] overflow-hidden border border-white/10 mb-6 bg-black">
                                    <img src={previews.pan} alt="PAN" className="w-full h-full object-cover opacity-70" />
                                </div>
                            ) : (
                                <div className="aspect-[1.6/1] rounded-[2rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center mb-6 group-hover:border-primary/30 transition-colors">
                                    <Upload size={32} className="text-white/20 mb-4 group-hover:text-primary/50 transition-colors" />
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Upload Card Image</p>
                                </div>
                            )}

                            <input
                                type="file"
                                id="pan-input"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'pan')}
                            />
                            <label
                                htmlFor="pan-input"
                                className={`btn-pill w-full cursor-pointer ${pan ? 'bg-white/5 text-white' : 'bg-primary text-black'}`}
                            >
                                {pan ? 'CHANGE IMAGE' : 'SELECT FILE'}
                            </label>
                        </div>
                    </div>

                    <div className="md:col-span-2 mt-8">
                        <AnimatePresence>
                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="bg-red-500/10 border border-red-500/20 p-6 rounded-[2rem] flex items-center gap-4 mb-8"
                                >
                                    <AlertCircle className="text-red-400" />
                                    <p className="text-red-400 text-xs font-black uppercase tracking-widest leading-relaxed">
                                        {result?.message}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            disabled={!aadhaar || !pan || loading}
                            onClick={handleUpload}
                            className="btn-accent w-full py-6 disabled:opacity-20 disabled:scale-100"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    ANALYZING DOCUMENTS...
                                </>
                            ) : (
                                <>
                                    START AI VERIFICATION
                                    <ArrowUpRight size={24} />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KYCUpload;
