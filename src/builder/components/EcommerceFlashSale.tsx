import React from 'react';
import { Clock, ShoppingCart, Zap, Star, ExternalLink, TrendingDown } from 'lucide-react';

interface EcommerceFlashSaleProps {
  layoutFrame?: string; // 'dark-scroll' | 'light-banner' | 'minimal'
  sectionTitle?: string;
  badgeText?: string;
  bgColor?: string;
  accentColor?: string;
  showTimer?: boolean;
  timerLabel?: string;
}

const FLASH_PRODUCTS = [
  { id: 1, name: 'Sony WH-1000XM5', price: 279.99, oldPrice: 399.99, rating: 4.9, reviews: 3241, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&auto=format&fit=crop', sold: 78 },
  { id: 2, name: 'Apple AirPods Pro', price: 199.00, oldPrice: 249.00, rating: 4.8, reviews: 8920, img: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?q=80&w=300&auto=format&fit=crop', sold: 91 },
  { id: 3, name: 'Kindle Paperwhite', price: 99.99, oldPrice: 139.99, rating: 4.7, reviews: 15203, img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=300&auto=format&fit=crop', sold: 65 },
  { id: 4, name: 'Samsung 27" 4K Monitor', price: 349.00, oldPrice: 499.00, rating: 4.6, reviews: 1102, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=300&auto=format&fit=crop', sold: 43 },
  { id: 5, name: 'Logitech MX Master 3', price: 79.95, oldPrice: 99.95, rating: 4.9, reviews: 5670, img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=300&auto=format&fit=crop', sold: 87 },
];

function CountdownBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="bg-slate-900 text-white text-lg font-black w-12 h-12 flex items-center justify-center rounded-xl tabular-nums">{value}</span>
      <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-wide">{label}</span>
    </div>
  );
}

function FlashCard({ product, accentColor }: { product: typeof FLASH_PRODUCTS[0]; accentColor: string }) {
  const discount = Math.round((1 - product.price / product.oldPrice) * 100);
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-w-[180px] max-w-[200px] flex-shrink-0 flex flex-col">
      <div className="relative aspect-square bg-slate-50">
        <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
        <span className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-lg">-{discount}%</span>
      </div>
      <div className="p-3 flex flex-col flex-1">
        <p className="text-xs font-bold text-slate-800 line-clamp-2 mb-1">{product.name}</p>
        <div className="flex items-center gap-1 mb-1">
          <Star size={10} className="fill-amber-400 text-amber-400" />
          <span className="text-[10px] text-slate-500">{product.rating} ({product.reviews.toLocaleString()})</span>
        </div>
        {/* Sold progress */}
        <div className="mb-2">
          <div className="flex justify-between text-[9px] font-bold text-slate-400 mb-0.5">
            <span>Sold: {product.sold}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${product.sold}%`, backgroundColor: accentColor }} />
          </div>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-sm font-black text-slate-900">${product.price}</span>
            <span className="text-[10px] text-slate-400 line-through ml-1">${product.oldPrice}</span>
          </div>
          <button className="w-7 h-7 flex items-center justify-center rounded-lg text-white text-xs" style={{ backgroundColor: accentColor }}>
            <ShoppingCart size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EcommerceFlashSale({
  layoutFrame = 'dark-scroll',
  sectionTitle = '⚡ Flash Sale',
  badgeText = 'Today Only',
  bgColor = '#0f172a',
  accentColor = '#f97316',
  showTimer = true,
  timerLabel = 'Ends in:',
}: EcommerceFlashSaleProps) {

  // ── FRAME: minimal ────────────────────────────────────────────────────────────
  if (layoutFrame === 'minimal') {
    return (
      <section className="w-full py-10 px-6 bg-white">
        {/* Backend note */}
        <div className="mb-5 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <span className="text-lg">🔗</span>
          <div>
            <p className="text-xs font-black text-amber-800">هذا القسم يعرض بيانات العروض من الخادم (Backend)</p>
            <p className="text-[11px] text-amber-600 mt-0.5">لتعديل عروض Flash Sale اذهب إلى صفحة إدارة العروض.</p>
            <a href="/admin/offers" className="inline-flex items-center gap-1 text-[11px] font-black text-orange-600 mt-1">
              <ExternalLink size={10} /> فتح صفحة العروض
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <Zap size={20} className="text-orange-500" />
              <h2 className="text-xl font-black text-slate-800">{sectionTitle}</h2>
              <span className="text-xs bg-rose-100 text-rose-600 font-black px-3 py-1 rounded-full">{badgeText}</span>
            </div>
            {showTimer && (
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <Clock size={13} /> {timerLabel}
                <span className="bg-slate-100 text-slate-800 font-black px-3 py-1 rounded-lg">08:32:41</span>
              </div>
            )}
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {FLASH_PRODUCTS.map(p => <FlashCard key={p.id} product={p} accentColor={accentColor} />)}
          </div>
        </div>
      </section>
    );
  }

  // ── FRAME: light-banner ───────────────────────────────────────────────────────
  if (layoutFrame === 'light-banner') {
    return (
      <section className="w-full py-10 px-6" style={{ background: `linear-gradient(135deg, ${accentColor}10, ${accentColor}05)` }}>
        {/* Backend note */}
        <div className="mb-5 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <span className="text-lg">🔗</span>
          <div>
            <p className="text-xs font-black text-amber-800">هذا القسم يعرض بيانات العروض من الخادم (Backend)</p>
            <a href="/admin/offers" className="inline-flex items-center gap-1 text-[11px] font-black text-orange-600 mt-0.5">
              <ExternalLink size={10} /> فتح صفحة العروض
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Zap size={18} style={{ color: accentColor }} />
                <span className="text-2xl font-black text-slate-800">{sectionTitle}</span>
              </div>
              <p className="text-sm text-slate-500">Grab these incredible deals before they're gone!</p>
            </div>
            {showTimer && (
              <div className="flex flex-col items-center gap-1 bg-white rounded-2xl border border-slate-100 px-5 py-3 shadow-sm">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wide mb-1">{timerLabel}</p>
                <div className="flex items-center gap-1.5">
                  <CountdownBox label="Hours" value="08" />
                  <span className="text-xl font-black text-slate-300 mb-4">:</span>
                  <CountdownBox label="Min" value="32" />
                  <span className="text-xl font-black text-slate-300 mb-4">:</span>
                  <CountdownBox label="Sec" value="41" />
                </div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {FLASH_PRODUCTS.map(p => <FlashCard key={p.id} product={p} accentColor={accentColor} />)}
          </div>
        </div>
      </section>
    );
  }

  // ── FRAME: dark-scroll (default) ──────────────────────────────────────────────
  return (
    <section className="w-full py-10 px-6" style={{ backgroundColor: bgColor }}>
      {/* Backend note */}
      <div className="mb-5 flex items-start gap-3 bg-amber-900/30 border border-amber-600/40 rounded-2xl p-4">
        <span className="text-lg">🔗</span>
        <div>
          <p className="text-xs font-black text-amber-300">هذا القسم يعرض بيانات العروض من الخادم (Backend)</p>
          <a href="/admin/offers" className="inline-flex items-center gap-1 text-[11px] font-black text-amber-400 mt-0.5">
            <ExternalLink size={10} /> فتح صفحة العروض
          </a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accentColor}20` }}>
              <Zap size={20} style={{ color: accentColor }} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">{sectionTitle}</h2>
              <span className="text-xs font-bold text-slate-400">{badgeText} <TrendingDown size={11} className="inline text-green-400" /></span>
            </div>
          </div>
          {showTimer && (
            <div className="flex items-center gap-3 bg-slate-800 rounded-2xl px-5 py-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                <Clock size={13} style={{ color: accentColor }} /> {timerLabel}
              </div>
              <div className="flex items-center gap-1.5">
                <CountdownBox label="Hrs" value="08" />
                <span className="text-xl font-black text-slate-600 mb-4">:</span>
                <CountdownBox label="Min" value="32" />
                <span className="text-xl font-black text-slate-600 mb-4">:</span>
                <CountdownBox label="Sec" value="41" />
              </div>
            </div>
          )}
        </div>
        {/* Horizontal scroll products */}
        <div className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1">
          {FLASH_PRODUCTS.map(p => <FlashCard key={p.id} product={p} accentColor={accentColor} />)}
        </div>
      </div>
    </section>
  );
}
