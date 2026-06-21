import React from 'react';
import { ShoppingCart, Star, Heart, Eye, ExternalLink } from 'lucide-react';

interface EcommerceProductGridProps {
  layoutFrame?: string; // '3-col' | '4-col' | '2-col' | 'list'
  sectionTitle?: string;
  sectionSubtitle?: string;
  accentColor?: string;
  cardBg?: string;
  showQuickView?: boolean;
  showWishlist?: boolean;
  showRating?: boolean;
}

const DEMO_PRODUCTS = [
  { id: 1, name: 'Premium Wireless Headphones', price: 129.99, oldPrice: 199.99, rating: 4.7, reviews: 2341, badge: 'Best Seller', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop' },
  { id: 2, name: 'Smart Watch Series X', price: 249.00, oldPrice: 329.00, rating: 4.5, reviews: 1892, badge: 'New', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop' },
  { id: 3, name: 'Minimalist Leather Wallet', price: 45.99, oldPrice: null, rating: 4.9, reviews: 847, badge: null, img: 'https://images.unsplash.com/photo-1627123424574-724758594913?q=80&w=400&auto=format&fit=crop' },
  { id: 4, name: 'Portable Bluetooth Speaker', price: 79.95, oldPrice: 99.95, rating: 4.3, reviews: 3204, badge: 'Sale', img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=400&auto=format&fit=crop' },
  { id: 5, name: 'Ergonomic Office Chair', price: 389.00, oldPrice: 499.00, rating: 4.6, reviews: 612, badge: '22% Off', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400&auto=format&fit=crop' },
  { id: 6, name: 'Ultra HD Webcam 4K', price: 89.99, oldPrice: 119.99, rating: 4.4, reviews: 1150, badge: 'Limited', img: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70a3?q=80&w=400&auto=format&fit=crop' },
  { id: 7, name: 'Stainless Steel Water Bottle', price: 34.95, oldPrice: null, rating: 4.8, reviews: 4320, badge: null, img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=400&auto=format&fit=crop' },
  { id: 8, name: 'Mechanical Keyboard RGB', price: 155.00, oldPrice: 199.00, rating: 4.7, reviews: 987, badge: 'Top Rated', img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=400&auto=format&fit=crop' },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={11}
          className={s <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-200'}
        />
      ))}
    </div>
  );
}

function ProductCard({
  product,
  accentColor,
  cardBg,
  showQuickView,
  showWishlist,
  showRating,
}: {
  product: typeof DEMO_PRODUCTS[0];
  accentColor: string;
  cardBg: string;
  showQuickView: boolean;
  showWishlist: boolean;
  showRating: boolean;
}) {
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  return (
    <div
      className="group relative rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
      style={{ backgroundColor: cardBg }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badge */}
        {product.badge && (
          <span
            className="absolute top-3 left-3 text-[10px] font-black px-2.5 py-1 rounded-lg text-white shadow-md"
            style={{ backgroundColor: accentColor }}
          >
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute top-3 right-3 text-[10px] font-black px-2.5 py-1 rounded-lg bg-rose-500 text-white shadow-md">
            -{discount}%
          </span>
        )}
        {/* Hover actions */}
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          {showQuickView && (
            <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <Eye size={14} className="text-slate-600" />
            </button>
          )}
          {showWishlist && (
            <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <Heart size={14} className="text-rose-500" />
            </button>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-slate-800 mb-1 line-clamp-2 leading-tight">{product.name}</h3>
        {showRating && (
          <div className="flex items-center gap-1.5 mb-2">
            <StarRating rating={product.rating} />
            <span className="text-[11px] text-slate-400 font-semibold">({product.reviews.toLocaleString()})</span>
          </div>
        )}
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-black text-slate-900">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-sm text-slate-400 line-through">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-xs font-black transition-all hover:opacity-90 hover:shadow-lg"
            style={{ backgroundColor: accentColor }}
          >
            <ShoppingCart size={13} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function ListProductCard({
  product,
  accentColor,
  cardBg,
  showRating,
}: {
  product: typeof DEMO_PRODUCTS[0];
  accentColor: string;
  cardBg: string;
  showRating: boolean;
}) {
  return (
    <div
      className="flex gap-4 p-4 rounded-2xl border border-slate-100 hover:shadow-md transition-all duration-200"
      style={{ backgroundColor: cardBg }}
    >
      <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-50 shrink-0">
        <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-slate-800 mb-1 truncate">{product.name}</h3>
        {showRating && (
          <div className="flex items-center gap-1 mb-1">
            <StarRating rating={product.rating} />
            <span className="text-[10px] text-slate-400">({product.reviews})</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-base font-black text-slate-900">${product.price}</span>
          {product.oldPrice && <span className="text-xs text-slate-400 line-through">${product.oldPrice}</span>}
        </div>
      </div>
      <div className="flex flex-col justify-end shrink-0">
        <button
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-black"
          style={{ backgroundColor: accentColor }}
        >
          <ShoppingCart size={12} /> Add
        </button>
      </div>
    </div>
  );
}

export default function EcommerceProductGrid({
  layoutFrame = '3-col',
  sectionTitle = 'Featured Products',
  sectionSubtitle = 'Handpicked deals just for you',
  accentColor = '#f97316',
  cardBg = '#ffffff',
  showQuickView = true,
  showWishlist = true,
  showRating = true,
}: EcommerceProductGridProps) {

  const colClass = layoutFrame === '4-col'
    ? 'grid-cols-2 md:grid-cols-4'
    : layoutFrame === '2-col'
    ? 'grid-cols-1 md:grid-cols-2'
    : 'grid-cols-2 md:grid-cols-3';

  const visibleCount = layoutFrame === '4-col' ? 8 : layoutFrame === '2-col' ? 4 : 6;
  const products = DEMO_PRODUCTS.slice(0, visibleCount);

  return (
    <section className="w-full py-10 px-6 bg-white">
      {/* ⚠️ Backend Data Note */}
      <div className="mb-5 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <span className="text-lg">🔗</span>
        <div>
          <p className="text-xs font-black text-amber-800">هذا القسم يعرض بيانات المنتجات من الخادم (Backend)</p>
          <p className="text-[11px] text-amber-600 mt-0.5">لتعديل المنتجات أو إضافة عروض جديدة، يُرجى الذهاب إلى صفحة إدارة المنتجات.</p>
          <a href="/admin/products" className="inline-flex items-center gap-1 text-[11px] font-black text-orange-600 hover:text-orange-700 mt-1">
            <ExternalLink size={10} /> فتح صفحة المنتجات
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-800">{sectionTitle}</h2>
            {sectionSubtitle && <p className="text-sm text-slate-500 mt-1">{sectionSubtitle}</p>}
          </div>
          <a href="#" className="text-xs font-black flex items-center gap-1 hover:underline" style={{ color: accentColor }}>
            View All <ExternalLink size={11} />
          </a>
        </div>

        {/* Products */}
        {layoutFrame === 'list' ? (
          <div className="space-y-3">
            {products.map((p) => (
              <ListProductCard key={p.id} product={p} accentColor={accentColor} cardBg={cardBg} showRating={showRating} />
            ))}
          </div>
        ) : (
          <div className={`grid ${colClass} gap-4`}>
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                accentColor={accentColor}
                cardBg={cardBg}
                showQuickView={showQuickView}
                showWishlist={showWishlist}
                showRating={showRating}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
