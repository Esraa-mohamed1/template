import React, { useState } from 'react';
import { Mail, ArrowRight, Gift, Bell } from 'lucide-react';

interface EcommerceNewsletterCTAProps {
  layoutFrame?: string; // 'centered' | 'split' | 'inline'
  headline?: string;
  subtext?: string;
  placeholder?: string;
  ctaText?: string;
  bgColor?: string;
  accentColor?: string;
  showIcon?: boolean;
  badgeText?: string;
}

export default function EcommerceNewsletterCTA({
  layoutFrame = 'centered',
  headline = 'Stay in the Loop — Exclusive Deals Await!',
  subtext = 'Subscribe to our newsletter and be the first to know about flash sales, new arrivals, and member-only discounts.',
  placeholder = 'Enter your email address...',
  ctaText = 'Subscribe',
  bgColor = '#0f172a',
  accentColor = '#f97316',
  showIcon = true,
  badgeText = '🎁 Get 15% off your first order',
}: EcommerceNewsletterCTAProps) {
  const [email, setEmail] = useState('');

  // ── FRAME: split ──────────────────────────────────────────────────────────────
  if (layoutFrame === 'split') {
    return (
      <section className="w-full py-12 px-6" style={{ backgroundColor: bgColor }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Left */}
          <div className="flex-1">
            {showIcon && (
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: `${accentColor}20` }}>
                <Bell size={22} style={{ color: accentColor }} />
              </div>
            )}
            <h2 className="text-3xl font-black text-white leading-tight mb-3">{headline}</h2>
            <p className="text-sm text-slate-400 leading-relaxed">{subtext}</p>
          </div>
          {/* Right */}
          <div className="flex-1 w-full">
            {badgeText && (
              <span className="inline-flex items-center gap-1.5 text-xs font-black px-4 py-1.5 rounded-full mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                {badgeText}
              </span>
            )}
            <div className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                className="w-full px-5 py-3.5 rounded-2xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm font-medium focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-white text-sm font-black transition-all hover:opacity-90 shadow-lg" style={{ backgroundColor: accentColor }}>
                <Mail size={16} /> {ctaText}
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-3">No spam, ever. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    );
  }

  // ── FRAME: inline ─────────────────────────────────────────────────────────────
  if (layoutFrame === 'inline') {
    return (
      <section className="w-full py-10 px-6" style={{ background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}05)` }}>
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {showIcon && (
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${accentColor}15` }}>
                  <Gift size={26} style={{ color: accentColor }} />
                </div>
              )}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl font-black text-slate-800">{headline}</h2>
                <p className="text-sm text-slate-500 mt-1">{subtext}</p>
              </div>
              <div className="flex gap-2 shrink-0 w-full md:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  className="flex-1 md:w-56 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-400 transition-colors"
                />
                <button className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-white text-sm font-black shrink-0 transition-all hover:opacity-90" style={{ backgroundColor: accentColor }}>
                  {ctaText} <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── FRAME: centered (default) ─────────────────────────────────────────────────
  return (
    <section className="w-full py-16 px-6 text-center relative overflow-hidden" style={{ backgroundColor: bgColor }}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10" style={{ background: `radial-gradient(ellipse, ${accentColor}, transparent 70%)` }} />
      </div>
      <div className="relative z-10 max-w-xl mx-auto">
        {showIcon && (
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: `${accentColor}20` }}>
            <Mail size={26} style={{ color: accentColor }} />
          </div>
        )}
        {badgeText && (
          <span className="inline-flex items-center gap-1.5 text-xs font-black px-4 py-1.5 rounded-full mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
            {badgeText}
          </span>
        )}
        <h2 className="text-3xl font-black text-white leading-tight mb-3">{headline}</h2>
        <p className="text-sm text-slate-400 leading-relaxed mb-8">{subtext}</p>
        <div className="flex gap-2 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-5 py-3.5 rounded-2xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm font-medium focus:outline-none focus:border-orange-500 transition-colors"
          />
          <button className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-white text-sm font-black transition-all hover:opacity-90 shadow-lg shrink-0" style={{ backgroundColor: accentColor }}>
            <Mail size={14} /> {ctaText}
          </button>
        </div>
        <p className="text-[10px] text-slate-600 mt-4">No spam, ever. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
