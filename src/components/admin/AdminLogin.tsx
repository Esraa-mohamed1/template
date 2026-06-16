import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Mail, Lock, LogIn, Sparkles, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { authService, authStorage } from '../../services/authService';
import { AuthError } from '../../services/authClient';
import { mapAuthUserToUser } from '../../utils/mapUser';
import { User } from '../../types';

interface AdminLoginProps {
  onLoginSuccess: (user: User) => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await authService.login({ login: identifier, password });
      
      // Check if user is admin
      if (res.user.role !== 'admin') {
        setError('عذراً، هذا الحساب لا يملك صلاحيات المشرف.');
        setLoading(false);
        return;
      }
      
      authStorage.set(res.authorisation.token);
      onLoginSuccess(mapAuthUserToUser(res.user));
    } catch (err) {
      if (err instanceof AuthError) {
        setError(err.message);
      } else {
        setError('فشل تسجيل الدخول. يرجى التحقق من الاتصال بالخادم.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setLoading(true);
    // Simulate a brief premium loading transition
    setTimeout(() => {
      const mockAdminUser: User = {
        id: 'admin-demo',
        name: 'مدير النظام (تجريبي)',
        email: 'admin@darab.academy',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        joinedAt: new Date().getFullYear().toString(),
        phone: '+966500000000',
        role: 'admin',
        isVerified: true
      };
      
      authStorage.set('mock-admin-token-12345');
      onLoginSuccess(mockAdminUser);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#070b19] flex items-center justify-center p-6 relative overflow-hidden font-['IBM_Plex_Sans_Arabic']" dir="rtl">
      
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }}></div>

      {/* Futuristic Mesh Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-lg bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-[2.5rem] p-8 md:p-12 shadow-[0_24px_80px_rgba(0,0,0,0.4)] relative z-10"
      >
        
        {/* Header Indicator */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <ShieldAlert className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 mb-3 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            بوابة الإدارة والأكاديمية
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
            تسجيل دخول المسؤول
          </h1>
          <p className="text-xs text-slate-400 font-bold mt-2">
            قم بالولوج إلى لوحة باني الصفحات للتحكم في أنماط المكونات
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 flex items-start gap-3 bg-red-500/10 border border-red-500/20 text-red-200 rounded-2xl px-5 py-4 text-xs font-bold"
          >
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pr-1 block">
              البريد الإلكتروني أو اسم المستخدم
            </label>
            <div className="relative">
              <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                placeholder="admin@darab.academy"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full bg-slate-950/60 border border-slate-800/80 rounded-2xl pr-12 pl-6 py-4 focus:outline-none focus:border-blue-500 focus:bg-slate-950 transition-all font-bold text-xs text-white placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pr-1 block">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-950/60 border border-slate-800/80 rounded-2xl pr-12 pl-12 py-4 focus:outline-none focus:border-blue-500 focus:bg-slate-950 transition-all font-bold text-xs text-white placeholder:text-slate-600 tracking-widest"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-400 transition-colors px-1"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black py-4.5 rounded-2xl transition-all shadow-xl shadow-blue-900/30 flex items-center justify-center gap-2 text-xs cursor-pointer"
          >
            <span>{loading ? 'جاري التحقق...' : 'تسجيل الدخول'}</span>
            {!loading && <LogIn size={16} />}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800"></div>
          </div>
          <span className="relative px-4 bg-[#0c1226] text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
            أو للتطوير والاختبار السريع
          </span>
        </div>

        {/* Demo login bypass */}
        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={loading}
          className="w-full bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 text-blue-400 hover:text-blue-300 font-black py-4.5 rounded-2xl transition-all flex items-center justify-center gap-2 text-xs cursor-pointer shadow-inner"
        >
          <Sparkles size={16} className="text-blue-400" />
          <span>الدخول كمسؤول تجريبي (Demo Admin)</span>
        </button>

      </motion.div>
    </div>
  );
}
