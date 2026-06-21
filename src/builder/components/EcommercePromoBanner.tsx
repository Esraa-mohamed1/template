import React from 'react';
import { Tag, ArrowRight } from 'lucide-react';

interface EcommercePromoBannerProps {
  layoutFrame?: string; // 'fullwidth' | 'half-left' | 'half-right' | 'split-2'
  headline?: string;
  subtext?: string;
  ctaText?: string;
  ctaLink?: string;
  bgColor?: string;
  accentColor?: string;
  textColor?: string;
  bannerImage?: string;
  badgeText?: string;
  showBadge?: boolean;
  overlayOpacity?: number;
}

export default function EcommercePromoBanner({
  layoutFrame = 'fullwidth',
  headline = 'Summer Sale — Up to 60% Off',
  subtext = 'Shop exclusive deals across fashion, electronics, and home. Limited time only.',
  ctaText = 'Shop the Sale',
  ctaLink = '#',
  bgColor = '#1e293b',
  accentColor = '#f97316',
  textColor = '#ffffff',
  bannerImage = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1200&auto=format&fit=crop',
  badgeText = '🏷️ Limited Offer',
  showBadge = true,
  overlayOpacity = 55,
}: EcommercePromoBannerProps) {

  // ── FRAME: half-left ──────────────────────────────────────────────────────────
  if (layoutFrame === 'half-left') {
    return (
      <section className="w-full py-10 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl overflow-hidden flex flex-col md:flex-row" style={{ backgroundColor: bgColor, minHeight: '240px' }}>
            <div className="flex-1 p-10 flex flex-col justify-center">
              {showBadge && (
                <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full mb-4 self-start" style={{ backgroundColor: `${accentColor}30`, color: accentColor }}>
                  <Tag size={10} /> {badgeText}
                </span>
              )}
              <h2 className="text-3xl font-black mb-3 leading-tight" style={{ color: textColor }}>{headline}</h2>
              <p className="text-sm mb-6 opacity-70" style={{ color: textColor }}>{subtext}</p>
              <a href={ctaLink} className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all hover:opacity-90" style={{ backgroundColor: accentColor, color: '#fff' }}>
                {ctaText} <ArrowRight size={14} />
              </a>
            </div>
            <div className="md:w-64 relative overflow-hidden">
              <img src={bannerImage} alt="Promo" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── FRAME: half-right ─────────────────────────────────────────────────────────
  if (layoutFrame === 'half-right') {
    return (
      <section className="w-full py-10 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl overflow-hidden flex flex-col md:flex-row-reverse" style={{ backgroundColor: bgColor, minHeight: '240px' }}>
            <div className="flex-1 p-10 flex flex-col justify-center">
              {showBadge && (
                <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full mb-4 self-start" style={{ backgroundColor: `${accentColor}30`, color: accentColor }}>
                  <Tag size={10} /> {badgeText}
                </span>
              )}
              <h2 className="text-3xl font-black mb-3 leading-tight" style={{ color: textColor }}>{headline}</h2>
              <p className="text-sm mb-6 opacity-70" style={{ color: textColor }}>{subtext}</p>
              <a href={ctaLink} className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all hover:opacity-90" style={{ backgroundColor: accentColor, color: '#fff' }}>
                {ctaText} <ArrowRight size={14} />
              </a>
            </div>
            <div className="md:w-64 relative overflow-hidden">
              <img src={bannerImage} alt="Promo" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── FRAME: split-2 (two banners side by side) ──────────────────────────────
  if (layoutFrame === 'split-2') {
    const banners = [
      { headline: headline, subtext: 'Shop now and save big!', color: bgColor, accent: accentColor, img: bannerImage },
      { headline: 'New Arrivals', subtext: 'Fresh styles added daily.', color: '#0f172a', accent: '#6366f1', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop' },
    ];
    return (
      <section className="w-full py-10 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {banners.map((b, i) => (
            <div key={i} className="relative rounded-3xl overflow-hidden" style={{ minHeight: '200px' }}>
              <img src={b.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ backgroundColor: `${b.color}${Math.round(overlayOpacity * 2.55).toString(16).padStart(2, '0')}` }} />
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <h3 className="text-2xl font-black text-white mb-2">{b.headline}</h3>
                <p className="text-sm text-white/70 mb-4">{b.subtext}</p>
                <a href={ctaLink} className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black" style={{ backgroundColor: b.accent, color: '#fff' }}>
                  {ctaText} <ArrowRight size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ── FRAME: fullwidth (default) ────────────────────────────────────────────────
  return (
    <section className="w-full relative overflow-hidden" style={{ minHeight: '260px' }}>
      <img src={bannerImage} alt="Promo Banner" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ backgroundColor: bgColor, opacity: overlayOpacity / 100 }} />
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          {showBadge && (
            <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full mb-4 self-start" style={{ backgroundColor: `${accentColor}40`, color: accentColor }}>
              <Tag size={10} /> {badgeText}
            </span>
          )}
          <h2 className="text-4xl font-black leading-tight" style={{ color: textColor }}>{headline}</h2>
          <p className="text-sm mt-3 opacity-70 max-w-lg" style={{ color: textColor }}>{subtext}</p>
        </div>
        <a href={ctaLink} className="shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-black shadow-2xl transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: '#fff' }}>
          {ctaText} <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}
