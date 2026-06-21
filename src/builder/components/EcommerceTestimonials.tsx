import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface EcommerceTestimonialsProps {
  layoutFrame?: string; // 'cards-row' | 'featured-large' | 'masonry'
  sectionTitle?: string;
  sectionSubtitle?: string;
  accentColor?: string;
  bgColor?: string;
}

const TESTIMONIALS = [
  { id: 1, name: 'Sarah Johnson', location: 'New York, US', rating: 5, text: 'Absolutely love shopping here! The quality of products exceeded my expectations and delivery was lightning fast. Will definitely be ordering again!', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop', product: 'Sony WH-1000XM5', verified: true },
  { id: 2, name: 'Ahmed Al-Rashidi', location: 'Dubai, UAE', rating: 5, text: 'Best online shopping experience I have had. The customer support team was incredibly helpful and resolved my query within minutes.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop', product: 'Smart Watch Series X', verified: true },
  { id: 3, name: 'Emma Thompson', location: 'London, UK', rating: 4, text: 'Great product selection and competitive prices. Packaging was excellent — everything arrived perfectly. One of my go-to stores now.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop', product: 'Kindle Paperwhite', verified: true },
  { id: 4, name: 'Carlos Martinez', location: 'Madrid, ES', rating: 5, text: 'Incredible value for money! I was hesitant at first, but the reviews were right — this platform delivers on every promise.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop', product: 'Logitech MX Master 3', verified: false },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={12} className={s <= rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'} />
      ))}
    </div>
  );
}

export default function EcommerceTestimonials({
  layoutFrame = 'cards-row',
  sectionTitle = 'What Our Customers Say',
  sectionSubtitle = 'Real reviews from verified shoppers worldwide.',
  accentColor = '#f97316',
  bgColor = '#f8fafc',
}: EcommerceTestimonialsProps) {
  const [active, setActive] = useState(0);

  // ── FRAME: featured-large (carousel) ─────────────────────────────────────────
  if (layoutFrame === 'featured-large') {
    const t = TESTIMONIALS[active];
    return (
      <section style={{ backgroundColor: bgColor }} className="w-full py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-black text-slate-800 mb-2">{sectionTitle}</h2>
          <p className="text-sm text-slate-500 mb-10">{sectionSubtitle}</p>
          <div className="relative bg-white rounded-3xl p-10 shadow-xl border border-slate-100">
            <Quote size={40} className="absolute top-6 left-8 opacity-10" style={{ color: accentColor }} />
            <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full border-4 border-white shadow-lg mx-auto mb-5" />
            <StarRow rating={t.rating} />
            <p className="text-base text-slate-600 leading-relaxed my-5 italic">"{t.text}"</p>
            <p className="font-black text-slate-800">{t.name}</p>
            <p className="text-xs text-slate-400">{t.location} · Verified purchase of <span className="font-bold" style={{ color: accentColor }}>{t.product}</span></p>
          </div>
          {/* Nav */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={() => setActive((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="w-9 h-9 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:border-orange-400 transition-colors">
              <ChevronLeft size={16} className="text-slate-500" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} className="w-2.5 h-2.5 rounded-full transition-all" style={{ backgroundColor: i === active ? accentColor : '#e2e8f0', transform: i === active ? 'scale(1.3)' : 'scale(1)' }} />
              ))}
            </div>
            <button onClick={() => setActive((active + 1) % TESTIMONIALS.length)} className="w-9 h-9 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:border-orange-400 transition-colors">
              <ChevronRight size={16} className="text-slate-500" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ── FRAME: masonry ─────────────────────────────────────────────────────────────
  if (layoutFrame === 'masonry') {
    return (
      <section style={{ backgroundColor: bgColor }} className="w-full py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-800">{sectionTitle}</h2>
            <p className="text-sm text-slate-500 mt-1">{sectionSubtitle}</p>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm break-inside-avoid hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-slate-100 shrink-0" />
                  <div>
                    <p className="text-sm font-black text-slate-800">{t.name}</p>
                    <p className="text-[10px] text-slate-400">{t.location}</p>
                  </div>
                </div>
                <StarRow rating={t.rating} />
                <p className="text-sm text-slate-600 leading-relaxed mt-3">"{t.text}"</p>
                {t.verified && (
                  <div className="mt-3 text-[10px] font-bold flex items-center gap-1" style={{ color: accentColor }}>
                    ✓ Verified purchase · {t.product}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── FRAME: cards-row (default) ────────────────────────────────────────────────
  return (
    <section style={{ backgroundColor: bgColor }} className="w-full py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-slate-800">{sectionTitle}</h2>
          <p className="text-sm text-slate-500 mt-1">{sectionSubtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md" />
                <div>
                  <p className="text-xs font-black text-slate-800">{t.name}</p>
                  <p className="text-[10px] text-slate-400">{t.location}</p>
                </div>
              </div>
              <StarRow rating={t.rating} />
              <p className="text-xs text-slate-600 leading-relaxed mt-3 line-clamp-4">"{t.text}"</p>
              {t.verified && (
                <div className="mt-3 text-[9px] font-bold" style={{ color: accentColor }}>
                  ✓ {t.product}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
