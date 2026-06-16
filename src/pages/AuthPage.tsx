import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  User as UserIcon,
  Mail,
  Lock,
  EyeOff,
  Eye,
  Check,
  ArrowRight,
  AlertCircle,
  KeyRound,
  RefreshCw,
} from "lucide-react";
import { User as UserType } from "../types";
import { authService, authStorage } from "../services/authService";
import { AuthError } from "../services/authClient";
import { mapAuthUserToUser } from "../utils/mapUser";

interface AuthPageProps {
  onAuthSuccess: (u: UserType) => void;
  onBack: () => void;
  key?: React.Key;
}

type ForgotStep = "idle" | "send_otp" | "verify_otp" | "new_password";

const AuthPage = ({ onAuthSuccess, onBack }: AuthPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Forgot password state
  const [forgotStep, setForgotStep] = useState<ForgotStep>("idle");
  const [forgotIdentifier, setForgotIdentifier] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const [forgotNewPassword, setForgotNewPassword] = useState("");
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const startResendCooldown = () => {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // ── Main login/register ──────────────────────────────────────────────────
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isLogin) {
        const res = await authService.login({ login: identifier, password });
        authStorage.set(res.authorisation.token);
        onAuthSuccess(mapAuthUserToUser(res.user));
      } else {
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          setLoading(false);
          return;
        }
        const res = await authService.register({
          name,
          email: identifier,
          password,
          password_confirmation: confirmPassword,
        });
        authStorage.set(res.authorisation.token);
        onAuthSuccess(mapAuthUserToUser(res.user));
      }
    } catch (err) {
      if (err instanceof AuthError) setError(err.message);
      else setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Forgot: Step 1 — send OTP ────────────────────────────────────────────
  const handleForgotSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await authService.forgetPasswordSendOtp(forgotIdentifier);
      setForgotStep("verify_otp");
      startResendCooldown();
    } catch (err) {
      if (err instanceof AuthError) setError(err.message);
      else setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Forgot: Step 2 — just move to step 3 (no API call, OTP used once in step 3) ──
  const handleForgotVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (forgotOtp.length < 4) {
      setError("Please enter the OTP code.");
      return;
    }
    setForgotStep("new_password");
  };

  // ── Forgot: Step 3 — send OTP + new password together in ONE call ────────
  const handleForgotNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (forgotNewPassword !== forgotConfirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await authService.forgetPasswordVerifyOtp(
        forgotIdentifier,
        forgotOtp,
        forgotNewPassword,
      );
      // Reset everything and go back to login
      setForgotStep("idle");
      setForgotIdentifier("");
      setForgotOtp("");
      setForgotNewPassword("");
      setForgotConfirmPassword("");
      setIsLogin(true);
      setError(null);
    } catch (err) {
      if (err instanceof AuthError) setError(err.message);
      else setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setError(null);
    try {
      await authService.forgetPasswordSendOtp(forgotIdentifier);
      startResendCooldown();
    } catch (err) {
      if (err instanceof AuthError) setError(err.message);
      else setError("Failed to resend OTP.");
    }
  };

  const exitForgotFlow = () => {
    setForgotStep("idle");
    setForgotIdentifier("");
    setForgotOtp("");
    setForgotNewPassword("");
    setForgotConfirmPassword("");
    setError(null);
  };

  const isForgotFlow = forgotStep !== "idle";

  // ── Forgot step label ────────────────────────────────────────────────────
  const forgotStepLabel = {
    send_otp: {
      title: "Forgot Password",
      sub: "Enter your email or phone to receive an OTP.",
    },
    verify_otp: {
      title: "Enter OTP",
      sub: `We sent a code to ${forgotIdentifier}`,
    },
    new_password: {
      title: "New Password",
      sub: "Choose a strong new password.",
    },
  }[forgotStep as Exclude<ForgotStep, "idle">];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white flex flex-col md:flex-row relative z-[60]"
    >
      {/* Back Button */}
      <button
        onClick={isForgotFlow ? exitForgotFlow : onBack}
        className="absolute top-8 left-8 z-[70] p-3 bg-white/10 hover:bg-white text-white hover:text-brand-dark rounded-2xl transition-all border border-white/20 shadow-xl backdrop-blur-lg"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Left Branding Column */}
      <div className="hidden md:flex md:w-5/12 lg:w-1/2 bg-gradient-to-br from-[#0B2149] via-[#103067] to-[#01112D] text-white p-20 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] font-black text-[25rem] pointer-events-none select-none tracking-tighter">
          EBUY
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 rounded-full border border-white/20 mb-12 backdrop-blur-md">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest">
              The Flagship Experience
            </span>
          </div>
          <h1 className="text-8xl font-black tracking-tighter leading-[0.85] mb-8">
            E.buy
            <br />
            <span className="text-blue-400/90 italic">Ecosystem.</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-lg leading-relaxed font-light">
            Where high-performance shopping meets editorial elegance. Access
            your curated digital catalog today.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 relative z-10">
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem] hover:bg-white/15 transition-colors cursor-default">
            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
              <ShieldCheck size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-bold mb-1">Secure Sync</h3>
            <p className="text-sm text-gray-400">Military-grade protection</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem] hover:bg-white/15 transition-colors cursor-default">
            <div className="w-12 h-12 bg-blue-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-400/20">
              <Sparkles size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-bold mb-1">Curated Picks</h3>
            <p className="text-sm text-gray-400">Tailored to your taste</p>
          </div>
        </div>
      </div>

      {/* Right Form Column */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 sm:px-12 py-24 bg-white">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {/* ═══════════════════════════════════════════════════════════════
                FORGOT PASSWORD FLOW
            ════════════════════════════════════════════════════════════════ */}
            {isForgotFlow && (
              <motion.div
                key={forgotStep}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.2 }}
              >
                {/* Step indicator */}
                <div className="flex items-center gap-2 mb-10">
                  {(["send_otp", "verify_otp", "new_password"] as const).map(
                    (s, i) => (
                      <React.Fragment key={s}>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all
                        ${
                          forgotStep === s
                            ? "bg-brand-blue text-white scale-110 shadow-lg shadow-blue-200"
                            : [
                                  "send_otp",
                                  "verify_otp",
                                  "new_password",
                                ].indexOf(forgotStep) > i
                              ? "bg-green-500 text-white"
                              : "bg-gray-100 text-gray-400"
                        }`}
                        >
                          {["send_otp", "verify_otp", "new_password"].indexOf(
                            forgotStep,
                          ) > i ? (
                            <Check size={14} />
                          ) : (
                            i + 1
                          )}
                        </div>
                        {i < 2 && (
                          <div
                            className={`flex-1 h-0.5 rounded-full transition-all ${
                              [
                                "send_otp",
                                "verify_otp",
                                "new_password",
                              ].indexOf(forgotStep) > i
                                ? "bg-green-400"
                                : "bg-gray-100"
                            }`}
                          />
                        )}
                      </React.Fragment>
                    ),
                  )}
                </div>

                <div className="mb-10">
                  <h2 className="text-4xl font-bold tracking-tight mb-3 text-brand-dark">
                    {forgotStepLabel?.title}
                  </h2>
                  <p className="text-gray-400 font-medium">
                    {forgotStepLabel?.sub}
                  </p>
                </div>

                {error && (
                  <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-100 text-red-600 rounded-2xl px-5 py-4 text-sm font-semibold">
                    <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Step 1 — Send OTP */}
                {forgotStep === "send_otp" && (
                  <form onSubmit={handleForgotSendOtp} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">
                        Email or Phone
                      </label>
                      <div className="relative">
                        <Mail
                          className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300"
                          size={18}
                        />
                        <input
                          type="text"
                          placeholder="alex@example.com or phone number"
                          value={forgotIdentifier}
                          onChange={(e) => setForgotIdentifier(e.target.value)}
                          required
                          className="w-full bg-gray-50/80 border border-gray-100 rounded-2xl px-14 py-4 focus:outline-none focus:border-brand-blue focus:bg-white transition-all font-medium text-sm text-brand-dark"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-brand-blue hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-5 rounded-[1.25rem] transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 group"
                    >
                      <span>{loading ? "Sending..." : "Send OTP"}</span>
                      {!loading && (
                        <ArrowRight
                          size={20}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      )}
                    </button>
                  </form>
                )}

                {/* Step 2 — Verify OTP */}
                {forgotStep === "verify_otp" && (
                  <form onSubmit={handleForgotVerifyOtp} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">
                        OTP Code
                      </label>
                      <div className="relative">
                        <KeyRound
                          className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300"
                          size={18}
                        />
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          placeholder="123456"
                          value={forgotOtp}
                          onChange={(e) =>
                            setForgotOtp(e.target.value.replace(/\D/g, ""))
                          }
                          required
                          className="w-full bg-gray-50/80 border border-gray-100 rounded-2xl px-14 py-4 focus:outline-none focus:border-brand-blue focus:bg-white transition-all font-bold text-xl text-brand-dark tracking-[0.5em]"
                        />
                      </div>
                    </div>

                    {/* Resend */}
                    <div className="flex items-center justify-end">
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={resendCooldown > 0}
                        className="flex items-center gap-1.5 text-xs font-bold text-brand-blue disabled:text-gray-300 hover:underline disabled:no-underline transition-colors"
                      >
                        <RefreshCw size={13} />
                        {resendCooldown > 0
                          ? `Resend in ${resendCooldown}s`
                          : "Resend OTP"}
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || forgotOtp.length < 4}
                      className="w-full bg-brand-blue hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-5 rounded-[1.25rem] transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 group"
                    >
                      <span>{loading ? "Verifying..." : "Verify OTP"}</span>
                      {!loading && (
                        <ArrowRight
                          size={20}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      )}
                    </button>
                  </form>
                )}

                {/* Step 3 — New Password */}
                {forgotStep === "new_password" && (
                  <form
                    onSubmit={handleForgotNewPassword}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock
                          className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300"
                          size={18}
                        />
                        <input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="••••••••••••"
                          value={forgotNewPassword}
                          onChange={(e) => setForgotNewPassword(e.target.value)}
                          required
                          minLength={8}
                          className="w-full bg-gray-50/80 border border-gray-100 rounded-2xl px-14 py-4 focus:outline-none focus:border-brand-blue focus:bg-white transition-all font-medium text-sm text-brand-dark tracking-widest"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-brand-blue transition-colors px-1"
                        >
                          {showNewPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock
                          className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300"
                          size={18}
                        />
                        <input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="••••••••••••"
                          value={forgotConfirmPassword}
                          onChange={(e) =>
                            setForgotConfirmPassword(e.target.value)
                          }
                          required
                          className="w-full bg-gray-50/80 border border-gray-100 rounded-2xl px-14 py-4 focus:outline-none focus:border-brand-blue focus:bg-white transition-all font-medium text-sm text-brand-dark tracking-widest"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-brand-blue hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-5 rounded-[1.25rem] transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 group"
                    >
                      <span>{loading ? "Saving..." : "Reset Password"}</span>
                      {!loading && (
                        <ArrowRight
                          size={20}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      )}
                    </button>
                  </form>
                )}

                <div className="mt-8 text-center">
                  <button
                    onClick={exitForgotFlow}
                    className="text-sm font-semibold text-gray-400 hover:text-brand-blue transition-colors"
                  >
                    ← Back to Login
                  </button>
                </div>
              </motion.div>
            )}

            {/* ═══════════════════════════════════════════════════════════════
                NORMAL LOGIN / REGISTER FLOW
            ════════════════════════════════════════════════════════════════ */}
            {!isForgotFlow && (
              <motion.div
                key="auth"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-12">
                  <h2 className="text-4xl font-bold tracking-tight mb-3 text-brand-dark">
                    {isLogin ? "Welcome Back" : "Get Started"}
                  </h2>
                  <p className="text-gray-400 font-medium">
                    Enter your credentials to access your account.
                  </p>
                </div>

                {/* Login/Register Tabs */}
                <div className="bg-gray-100 p-1.5 rounded-3xl mb-10 flex border border-gray-100/50 shadow-inner">
                  <button
                    onClick={() => {
                      setIsLogin(true);
                      setError(null);
                    }}
                    className={`flex-1 py-3.5 rounded-2xl text-sm font-bold transition-all ${isLogin ? "bg-white text-brand-blue shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setIsLogin(false);
                      setError(null);
                    }}
                    className={`flex-1 py-3.5 rounded-2xl text-sm font-bold transition-all ${!isLogin ? "bg-white text-brand-blue shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
                  >
                    Register
                  </button>
                </div>

                {error && (
                  <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-100 text-red-600 rounded-2xl px-5 py-4 text-sm font-semibold">
                    <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="button"
                  className="w-full bg-white border-2 border-gray-100 hover:border-brand-blue/30 py-4 px-6 rounded-2xl flex items-center justify-center gap-4 transition-all group mb-10"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="text-sm font-bold text-gray-700">
                    Continue with Google
                  </span>
                </button>

                <div className="relative mb-10 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-100"></div>
                  </div>
                  <span className="relative px-6 bg-white text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">
                    Or Email
                  </span>
                </div>

                <form onSubmit={handleAuth} className="space-y-6">
                  {!isLogin && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <UserIcon
                          className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300"
                          size={18}
                        />
                        <input
                          type="text"
                          placeholder="Alex Smith"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full bg-gray-50/80 border border-gray-100 rounded-2xl px-14 py-4 focus:outline-none focus:border-brand-blue focus:bg-white transition-all font-medium text-sm text-brand-dark"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">
                      {isLogin ? "Email or Phone" : "Email Address"}
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300"
                        size={18}
                      />
                      <input
                        type={isLogin ? "text" : "email"}
                        placeholder={
                          isLogin
                            ? "alex@example.com or phone number"
                            : "alex@example.com"
                        }
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                        className="w-full bg-gray-50/80 border border-gray-100 rounded-2xl px-14 py-4 focus:outline-none focus:border-brand-blue focus:bg-white transition-all font-medium text-sm text-brand-dark"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between pl-1 pr-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Password
                      </label>
                      {isLogin && (
                        <button
                          type="button"
                          onClick={() => {
                            setForgotIdentifier(identifier);
                            setForgotStep("send_otp");
                            setError(null);
                          }}
                          className="text-[10px] font-bold text-brand-blue hover:underline"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock
                        className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300"
                        size={18}
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full bg-gray-50/80 border border-gray-100 rounded-2xl px-14 py-4 focus:outline-none focus:border-brand-blue focus:bg-white transition-all font-medium text-sm text-brand-dark tracking-widest"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-brand-blue transition-colors px-1"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock
                          className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300"
                          size={18}
                        />
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className="w-full bg-gray-50/80 border border-gray-100 rounded-2xl px-14 py-4 focus:outline-none focus:border-brand-blue focus:bg-white transition-all font-medium text-sm text-brand-dark tracking-widest"
                        />
                      </div>
                    </div>
                  )}

                  {isLogin && (
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setStayLoggedIn(!stayLoggedIn)}
                        className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${stayLoggedIn ? "bg-brand-blue border-brand-blue" : "border-gray-200 bg-white"}`}
                      >
                        {stayLoggedIn && (
                          <Check size={12} className="text-white" />
                        )}
                      </button>
                      <span
                        className="text-xs font-semibold text-gray-500 select-none cursor-pointer"
                        onClick={() => setStayLoggedIn(!stayLoggedIn)}
                      >
                        Keep me logged in for 30 days
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-blue hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-5 rounded-[1.25rem] transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 group"
                  >
                    <span>
                      {loading
                        ? "Please wait..."
                        : isLogin
                          ? "Sign In"
                          : "Create Account"}
                    </span>
                    {!loading && (
                      <ArrowRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    )}
                  </button>
                </form>

                <div className="mt-12 text-center">
                  <p className="text-sm font-semibold text-gray-500">
                    {isLogin
                      ? "Don't have an account?"
                      : "Already have an account?"}{" "}
                    <button
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setError(null);
                      }}
                      className="text-brand-blue hover:underline ml-1"
                    >
                      {isLogin ? "Create an account" : "Sign In instead"}
                    </button>
                  </p>
                </div>

                <div className="mt-24 text-center">
                  <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.25em]">
                    © 2024 E.BUY • PRIVACY • TERMS
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthPage;
