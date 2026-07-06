import React, { useRef } from 'react';
import { ShoppingCart, Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface DealProduct {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  img: string;
  badge: string;
}

const DEALS_PRODUCTS: DealProduct[] = [
  { id: 1, name: 'Sony WH-1000XM5 Headphones', price: 279.99, oldPrice: 399.99, rating: 4.8, reviews: 3240, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300', badge: 'خصم 30%' },
  { id: 2, name: 'Apple Watch Series 9 GPS', price: 329.00, oldPrice: 399.00, rating: 4.7, reviews: 1892, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300', badge: 'خصم 17%' },
  { id: 3, name: 'Logitech MX Keys Keyboard', price: 99.99, oldPrice: 119.99, rating: 4.9, reviews: 4300, img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=300', badge: 'خصم 16%' },
  { id: 4, name: 'Ring Video Doorbell Wired', price: 49.99, oldPrice: 64.99, rating: 4.5, reviews: 12410, img: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=300', badge: 'خصم 23%' },
  { id: 5, name: 'Kindle Paperwhite (16 GB)', price: 109.99, oldPrice: 139.99, rating: 4.7, reviews: 8760, img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=300', badge: 'خصم 21%' },
  { id: 6, name: 'Samsung T7 Shield Portable SSD 1TB', price: 89.99, oldPrice: 109.99, rating: 4.8, reviews: 3120, img: 'https://images.unsplash.com/photo-1609592424109-dd9892f1b17c?q=80&w=300', badge: 'خصم 18%' },
  { id: 7, name: 'Logitech G502 HERO Mouse', price: 39.99, oldPrice: 79.99, rating: 4.6, reviews: 25410, img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=300', badge: 'خصم 50%' },
];

interface AmazonDealsRowProps {
  sectionTitle?: string;
  viewAllText?: string;
  viewAllLink?: string;
  bgColor?: string;
  cardBg?: string;
  textColor?: string;
  accentColor?: string;
  onProductClick?: (p: any) => void;
}

export default function AmazonDealsRow({
  sectionTitle = 'عروض اليوم الحصرية (Today\'s Deals)',
  viewAllText = 'تصفح كل العروض',
  viewAllLink = '#',
  bgColor = '#ffffff',
  cardBg = '#ffffff',
  textColor = '#1e293b',
  accentColor = '#FF9900',
  onProductClick
}: AmazonDealsRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = 300;
      rowRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section style={{ backgroundColor: bgColor }} className="w-full py-10 px-6 transition-colors duration-300 relative group/section">
      {/* Backend Products Link Info */}
      <div className="mb-6 flex items-start gap-3 bg-amber-50/80 border border-amber-100/50 rounded-2xl p-4 shadow-sm backdrop-blur-sm max-w-7xl mx-auto text-right" dir="rtl">
        <span className="text-lg">⚡</span>
        <div>
          <p className="text-xs font-black text-amber-900 leading-none">هذا القسم مرتبط بعروض اليوم في لوحة التحكم</p>
          <p className="text-[10px] text-amber-700/80 font-bold mt-1">تتم مزامنة المنتجات والخصومات مباشرة. يمكنك إدارة الخصومات من لوحة تحكم المنتجات.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <h2 style={{ color: textColor }} className="text-xl md:text-2xl font-black">{sectionTitle}</h2>
          </div>
          <a 
            href={viewAllLink} 
            style={{ color: accentColor }} 
            className="text-xs font-black flex items-center gap-1 hover:underline"
          >
            {viewAllText} <ChevronLeft size={14} />
          </a>
        </div>

        {/* Scroll Buttons */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-[-16px] top-[50%] -translate-y-1/2 z-20 w-10 h-10 bg-white hover:bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center shadow-lg cursor-pointer opacity-0 group-hover/section:opacity-100 transition-opacity duration-300"
        >
          <ChevronLeft size={20} className="text-slate-600" />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-[-16px] top-[50%] -translate-y-1/2 z-20 w-10 h-10 bg-white hover:bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center shadow-lg cursor-pointer opacity-0 group-hover/section:opacity-100 transition-opacity duration-300"
        >
          <ChevronRight size={20} className="text-slate-600" />
        </button>

        {/* Products Row */}
        <div 
          ref={rowRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-none pb-4 px-1"
          dir="ltr"
        >
          {DEALS_PRODUCTS.map((product) => {
            const discountPercent = Math.round((1 - product.price / product.oldPrice) * 100);
            return (
              <div 
                key={product.id}
                style={{ backgroundColor: cardBg }}
                className="w-[200px] flex-shrink-0 rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group/card cursor-pointer"
                onClick={() => onProductClick && onProductClick({ id: String(product.id) })}
              >
                {/* Image */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 mb-3 shrink-0">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" />
                  <span className="absolute top-2 left-2 bg-rose-500 text-white text-[9px] font-black px-2.5 py-0.5 rounded-lg shadow-sm">
                    {product.badge}
                  </span>
                </div>
                
                {/* Details */}
                <div className="flex flex-col flex-1">
                  <p className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug mb-1.5 min-h-[32px] text-left">{product.name}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2.5">
                    <Star size={10} className="fill-amber-400 text-amber-400" />
                    <span className="text-[10px] text-slate-400 font-semibold">{product.rating} ({product.reviews.toLocaleString()})</span>
                  </div>

                  {/* Prices & CTA */}
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col text-left">
                      <span className="text-base font-extrabold text-slate-900">${product.price.toFixed(2)}</span>
                      <span className="text-[10px] text-slate-400 line-through leading-none">${product.oldPrice.toFixed(2)}</span>
                    </div>
                    <button 
                      style={{ backgroundColor: accentColor }}
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all"
                    >
                      <ShoppingCart size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
