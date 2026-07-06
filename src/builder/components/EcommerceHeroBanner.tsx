import React from 'react';
import { ShoppingCart, ArrowRight, Tag, Clock, Star } from 'lucide-react';

interface EcommerceHeroBannerProps {
  layoutFrame?: string; // 'split-right' | 'split-left' | 'centered' | 'fullwidth-overlay' | 'amazon-style'
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
  imageSize?: 'small' | 'medium' | 'large';
  cardBg?: string;
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
  productImage = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1600',
  showBadge = true,
  showRating = true,
  showCountdown = true,
  countdownLabel = 'Deal ends in:',
  imageSize = 'medium',
  cardBg = '#ffffff'
}: EcommerceHeroBannerProps) {

  // Map image width and height classes
  const sizeMap: Record<string, string> = {
    small: 'max-w-[320px] aspect-[4/3] mx-auto',
    medium: 'max-w-[480px] aspect-[4/3] mx-auto',
    large: 'max-w-[640px] aspect-[4/3] mx-auto',
  };
  const imageSizeClass = sizeMap[imageSize] || 'max-w-[480px] aspect-[4/3] mx-auto';

  // ── FRAME: amazon-style ──────────────────────────────────────────────────────
  if (layoutFrame === 'amazon-style') {
    return (
      <section style={{ backgroundColor: bgColor }} className="w-full relative pb-16 transition-colors duration-300">
        {/* Full-width Wide Banner Image */}
        <div className="relative w-full h-[320px] md:h-[400px] lg:h-[500px] overflow-hidden">
          <img 
            src={productImage || 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1600'} 
            alt="Amazon Wide Banner" 
            className="w-full h-full object-cover object-top"
          />
          {/* Top text content over banner */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/10 to-black/35 flex flex-col justify-start p-8 md:p-12 text-white">
            <div className="max-w-xl text-left" dir="ltr">
              {showBadge && badge && (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black px-2.5 py-1 rounded bg-rose-600 text-white uppercase tracking-wider mb-3 shadow-sm">
                  {badge}
                </span>
              )}
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-3 leading-tight tracking-tight drop-shadow-md">
                {headline}
              </h1>
              <p className="text-xs md:text-sm text-slate-100 opacity-90 mb-4 font-medium drop-shadow-sm max-w-lg leading-relaxed">
                {subheadline}
              </p>
            </div>
          </div>
          {/* Bottom fade to match background */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t pointer-events-none" 
            style={{ 
              backgroundImage: `linear-gradient(to top, ${bgColor} 0%, rgba(255, 248, 240, 0.4) 60%, transparent 100%)` 
            }}
          />
        </div>

        {/* Overlapping Cards Container */}
        <div className="max-w-7xl mx-auto px-6 relative z-20 -mt-20 md:-mt-28 lg:-mt-40">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Shop Fashion Trends */}
            <div 
              style={{ backgroundColor: cardBg }} 
              className="rounded-2xl p-5 shadow-lg border border-slate-100 flex flex-col hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <h3 style={{ color: textColor }} className="text-base font-bold mb-3">أحدث صيحات الموضة</h3>
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-slate-50">
                <img 
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400" 
                  alt="Fashion" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <a 
                href={ctaLink} 
                style={{ color: accentColor }} 
                className="text-xs font-black mt-auto inline-flex items-center gap-1 hover:underline"
              >
                تسوّق الآن <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Card 2: Smart Electronics */}
            <div 
              style={{ backgroundColor: cardBg }} 
              className="rounded-2xl p-5 shadow-lg border border-slate-100 flex flex-col hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <h3 style={{ color: textColor }} className="text-base font-bold mb-3">الأجهزة والأدوات الذكية</h3>
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-slate-50">
                <img 
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400" 
                  alt="Electronics" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <a 
                href={ctaLink} 
                style={{ color: accentColor }} 
                className="text-xs font-black mt-auto inline-flex items-center gap-1 hover:underline"
              >
                اكتشف المزيد <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Card 3: Top Categories Grid */}
            <div 
              style={{ backgroundColor: cardBg }} 
              className="rounded-2xl p-5 shadow-lg border border-slate-100 flex flex-col hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <h3 style={{ color: textColor }} className="text-base font-bold mb-3">تصفح الفئات الرئيسية</h3>
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                {[
                  { label: 'أحذية الرياضة', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200' },
                  { label: 'ساعات فاخرة', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200' },
                  { label: 'نظارات شمسية', img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=200' },
                  { label: 'صوتيات وبلوتوث', img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=200' }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1 cursor-pointer">
                    <div className="aspect-square rounded-lg overflow-hidden bg-slate-50">
                      <img src={item.img} alt={item.label} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <span style={{ color: textColor }} className="text-[9.5px] font-black leading-none truncate">{item.label}</span>
                  </div>
                ))}
              </div>
              <a 
                href={ctaLink} 
                style={{ color: accentColor }} 
                className="text-xs font-black mt-auto inline-flex items-center gap-1 hover:underline"
              >
                تصفح كل الفئات <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Card 4: Countdown Deal Card */}
            <div 
              style={{ backgroundColor: cardBg }} 
              className="rounded-2xl p-5 shadow-lg border border-slate-100 flex flex-col hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 style={{ color: textColor }} className="text-base font-bold">عرض محدود اليوم</h3>
                <span className="bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded-lg animate-pulse">خصم 20%</span>
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-slate-50">
                <img 
                  src="https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=400" 
                  alt="Deal of Day" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {showCountdown && (
                <div className="mb-4">
                  <CountdownTimer label={countdownLabel || 'ينتهي خلال:'} />
                </div>
              )}
              <button 
                style={{ backgroundColor: accentColor }}
                className="w-full py-2.5 rounded-xl text-white text-xs font-black flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-md"
              >
                <ShoppingCart size={13} /> {ctaText}
              </button>
            </div>

          </div>
        </div>
      </section>
    );
  }

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
            <div className={`rounded-3xl overflow-hidden shadow-2xl ${imageSizeClass}`} style={{ background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}30)` }}>
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
          <div className={`rounded-3xl overflow-hidden shadow-2xl ${imageSizeClass}`} style={{ background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}30)` }}>
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
