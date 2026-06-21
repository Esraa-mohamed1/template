import React from 'react';
import { ShoppingCart, ArrowRight, Tag, Clock, Star } from 'lucide-react';

interface EcommerceHeroBannerProps {
  layoutFrame?: string; // 'split-right' | 'split-left' | 'centered' | 'fullwidth-overlay'
  headline?: string;
  subheadline?: string;
  badge?: string;
  ctaText?: string;
  ctaLink?: string;
  secondCtaText?: string;
  bgColor?: string;
  accentColor?: string;
  textColor?: string;
  productImage?: string;
  showBadge?: boolean;
  showRating?: boolean;
  showCountdown?: boolean;
  countdownLabel?: string;
}

function CountdownTimer({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Clock size={14} className="text-orange-500" />
      <span className="text-xs font-bold text-slate-600">{label}</span>
      <div className="flex gap-1">
        {['12', '34', '59'].map((t, i) => (
          <React.Fragment key={i}>
            <span className="bg-slate-800 text-white text-xs font-black px-2 py-1 rounded-md min-w-[28px] text-center">{t}</span>
            {i < 2 && <span className="text-slate-400 font-black text-sm self-center">:</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default function EcommerceHeroBanner({
  layoutFrame = 'split-right',
  headline = 'Discover Amazing Deals',
  subheadline = 'Shop the latest trends with unbeatable prices. Free shipping on orders over $50.',
  badge = '🔥 Limited Time',
  ctaText = 'Shop Now',
  ctaLink = '#',
  secondCtaText = 'View All Deals',
  bgColor = '#fff7ed',
  accentColor = '#f97316',
  textColor = '#1e293b',
  productImage = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop',
  showBadge = true,
  showRating = true,
  showCountdown = true,
  countdownLabel = 'Deal ends in:'
}: EcommerceHeroBannerProps) {

  // ── FRAME: centered ──────────────────────────────────────────────────────────
  if (layoutFrame === 'centered') {
    return (
      <section style={{ backgroundColor: bgColor }} className="w-full py-20 px-6 text-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${accentColor}, transparent 70%)` }} />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          {showBadge && (
            <span className="inline-flex items-center gap-1.5 text-xs font-black px-4 py-1.5 rounded-full mb-5" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
              <Tag size={11} /> {badge}
            </span>
          )}
          <h1 className="text-4xl font-black mb-4 leading-tight" style={{ color: textColor }}>{headline}</h1>
          <p className="text-base text-slate-500 mb-6 leading-relaxed">{subheadline}</p>
          {showCountdown && <div className="flex justify-center mb-6"><CountdownTimer label={countdownLabel || 'Deal ends in:'} /></div>}
          <div className="flex gap-3 justify-center">
            <a href={ctaLink} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-black shadow-lg transition-transform hover:scale-105" style={{ backgroundColor: accentColor }}>
              <ShoppingCart size={16} /> {ctaText}
            </a>
            <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black bg-white border border-slate-200 hover:border-slate-300 transition-colors" style={{ color: textColor }}>
              {secondCtaText} <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>
    );
  }

  // ── FRAME: fullwidth-overlay ─────────────────────────────────────────────────
  if (layoutFrame === 'fullwidth-overlay') {
    return (
      <section className="w-full relative overflow-hidden" style={{ minHeight: '420px' }}>
        <div className="absolute inset-0" style={{ backgroundImage: `url(${productImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />
        <div className="relative z-10 flex items-center min-h-[420px] px-12 py-16">
          <div className="max-w-lg">
            {showBadge && (
              <span className="inline-flex items-center gap-1.5 text-xs font-black px-4 py-1.5 rounded-full mb-5 text-white" style={{ backgroundColor: accentColor }}>
                <Tag size={11} /> {badge}
              </span>
            )}
            <h1 className="text-5xl font-black mb-4 leading-tight text-white">{headline}</h1>
            <p className="text-base text-slate-300 mb-6 leading-relaxed">{subheadline}</p>
            {showCountdown && <div className="mb-6"><CountdownTimer label={countdownLabel || 'Deal ends in:'} /></div>}
            <div className="flex gap-3">
              <a href={ctaLink} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white text-sm font-black shadow-xl transition-transform hover:scale-105" style={{ backgroundColor: accentColor }}>
                <ShoppingCart size={16} /> {ctaText}
              </a>
              <a href="#" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-black bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors">
                {secondCtaText} <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── FRAME: split-left (image left, text right) ───────────────────────────────
  if (layoutFrame === 'split-left') {
    return (
      <section style={{ backgroundColor: bgColor }} className="w-full py-10 px-8">
        <div className="max-w-6xl mx-auto flex items-center gap-12">
          {/* Image */}
          <div className="flex-1 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]" style={{ background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}30)` }}>
              {productImage && <img src={productImage} alt="Hero" className="w-full h-full object-cover" />}
            </div>
            {showRating && (
              <div className="absolute bottom-4 right-4 bg-white rounded-2xl shadow-xl px-4 py-2 flex items-center gap-2">
                <div className="flex">{[1,2,3,4,5].map(s=><Star key={s} size={12} className="fill-amber-400 text-amber-400"/>)}</div>
                <span className="text-xs font-black text-slate-700">4.9 (2.4k)</span>
              </div>
            )}
          </div>
          {/* Content */}
          <div className="flex-1">
            {showBadge && (
              <span className="inline-flex items-center gap-1.5 text-xs font-black px-4 py-1.5 rounded-full mb-5" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                <Tag size={11} /> {badge}
              </span>
            )}
            <h1 className="text-4xl font-black mb-4 leading-tight" style={{ color: textColor }}>{headline}</h1>
            <p className="text-base text-slate-500 mb-6 leading-relaxed">{subheadline}</p>
            {showCountdown && <div className="mb-6"><CountdownTimer label={countdownLabel || 'Deal ends in:'} /></div>}
            <div className="flex gap-3">
              <a href={ctaLink} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-black shadow-lg transition-transform hover:scale-105" style={{ backgroundColor: accentColor }}>
                <ShoppingCart size={16} /> {ctaText}
              </a>
              <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black bg-white border border-slate-200 hover:border-slate-300 transition-colors" style={{ color: textColor }}>
                {secondCtaText}
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── FRAME: split-right (default — text left, image right) ────────────────────
  return (
    <section style={{ backgroundColor: bgColor }} className="w-full py-10 px-8">
      <div className="max-w-6xl mx-auto flex items-center gap-12">
        {/* Content */}
        <div className="flex-1">
          {showBadge && (
            <span className="inline-flex items-center gap-1.5 text-xs font-black px-4 py-1.5 rounded-full mb-5" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
              <Tag size={11} /> {badge}
            </span>
          )}
          <h1 className="text-4xl font-black mb-4 leading-tight" style={{ color: textColor }}>{headline}</h1>
          <p className="text-base text-slate-500 mb-6 leading-relaxed">{subheadline}</p>
          {showCountdown && <div className="mb-6"><CountdownTimer label={countdownLabel || 'Deal ends in:'} /></div>}
          <div className="flex gap-3">
            <a href={ctaLink} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-black shadow-lg transition-transform hover:scale-105" style={{ backgroundColor: accentColor }}>
              <ShoppingCart size={16} /> {ctaText}
            </a>
            <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black bg-white border border-slate-200 hover:border-slate-300 transition-colors" style={{ color: textColor }}>
              {secondCtaText}
            </a>
          </div>
        </div>
        {/* Image */}
        <div className="flex-1 relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]" style={{ background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}30)` }}>
            {productImage && <img src={productImage} alt="Hero" className="w-full h-full object-cover" />}
          </div>
          {showRating && (
            <div className="absolute bottom-4 left-4 bg-white rounded-2xl shadow-xl px-4 py-2 flex items-center gap-2">
              <div className="flex">{[1,2,3,4,5].map(s=><Star key={s} size={12} className="fill-amber-400 text-amber-400"/>)}</div>
              <span className="text-xs font-black text-slate-700">4.9 (2.4k)</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
