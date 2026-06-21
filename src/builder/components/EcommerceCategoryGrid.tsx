import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface EcommerceCategoryGridProps {
  layoutFrame?: string; // '4-col-icon' | '6-col-compact' | '2-col-large'
  sectionTitle?: string;
  accentColor?: string;
  bgColor?: string;
}

const CATEGORIES = [
  { id: 1, label: 'Electronics', icon: '💻', count: '12.4k products', color: '#dbeafe', img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=200&auto=format&fit=crop' },
  { id: 2, label: 'Fashion', icon: '👗', count: '34.1k products', color: '#fce7f3', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=200&auto=format&fit=crop' },
  { id: 3, label: 'Home & Garden', icon: '🏡', count: '8.7k products', color: '#d1fae5', img: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=200&auto=format&fit=crop' },
  { id: 4, label: 'Sports', icon: '⚽', count: '6.2k products', color: '#fef3c7', img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=200&auto=format&fit=crop' },
  { id: 5, label: 'Beauty', icon: '💄', count: '9.5k products', color: '#ede9fe', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=200&auto=format&fit=crop' },
  { id: 6, label: 'Books', icon: '📚', count: '22.3k products', color: '#fef9c3', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' },
  { id: 7, label: 'Toys', icon: '🧸', count: '4.1k products', color: '#ffedd5', img: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=200&auto=format&fit=crop' },
  { id: 8, label: 'Automotive', icon: '🚗', count: '3.8k products', color: '#e0f2fe', img: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=200&auto=format&fit=crop' },
];

export default function EcommerceCategoryGrid({
  layoutFrame = '4-col-icon',
  sectionTitle = 'Shop by Category',
  accentColor = '#f97316',
  bgColor = '#f8fafc',
}: EcommerceCategoryGridProps) {

  // ── FRAME: 6-col-compact ──────────────────────────────────────────────────────
  if (layoutFrame === '6-col-compact') {
    return (
      <section style={{ backgroundColor: bgColor }} className="w-full py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-slate-800">{sectionTitle}</h2>
            <a href="#" className="text-xs font-black flex items-center gap-1" style={{ color: accentColor }}>
              All Categories <ArrowRight size={12} />
            </a>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {CATEGORIES.map(cat => (
              <button key={cat.id} className="flex flex-col items-center gap-2 p-3 rounded-2xl border border-slate-100 bg-white hover:shadow-md hover:-translate-y-0.5 transition-all group cursor-pointer">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: cat.color }}>
                  {cat.icon}
                </div>
                <span className="text-[11px] font-black text-slate-700 group-hover:text-orange-600 transition-colors text-center">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── FRAME: 2-col-large ────────────────────────────────────────────────────────
  if (layoutFrame === '2-col-large') {
    return (
      <section style={{ backgroundColor: bgColor }} className="w-full py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-black text-slate-800 mb-6">{sectionTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CATEGORIES.slice(0, 4).map(cat => (
              <button key={cat.id} className="relative flex items-center gap-4 p-5 rounded-2xl border border-slate-100 bg-white hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden group cursor-pointer text-left">
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-1" style={{ backgroundColor: cat.color }}>
                    {cat.icon}
                  </div>
                </div>
                <div className="relative z-10">
                  <p className="text-base font-black text-slate-800">{cat.label}</p>
                  <p className="text-xs text-slate-400 font-semibold">{cat.count}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-black mt-1" style={{ color: accentColor }}>
                    Shop now <ArrowRight size={10} />
                  </span>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-20 opacity-10 group-hover:opacity-20 transition-opacity">
                  <img src={cat.img} alt={cat.label} className="w-full h-full object-cover" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── FRAME: 4-col-icon (default) ───────────────────────────────────────────────
  return (
    <section style={{ backgroundColor: bgColor }} className="w-full py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-800">{sectionTitle}</h2>
            <p className="text-sm text-slate-500 mt-0.5">Browse products across all categories</p>
          </div>
          <a href="#" className="text-xs font-black flex items-center gap-1 hover:underline" style={{ color: accentColor }}>
            View All <ExternalLink size={11} />
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map(cat => (
            <button key={cat.id} className="relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer text-left">
              <div className="h-28 overflow-hidden">
                <img src={cat.img} alt={cat.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-lg mb-1" style={{ backgroundColor: cat.color }}>
                    {cat.icon}
                  </div>
                  <p className="text-sm font-black text-slate-800">{cat.label}</p>
                  <p className="text-[10px] text-slate-400">{cat.count}</p>
                </div>
                <ArrowRight size={14} className="text-slate-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
