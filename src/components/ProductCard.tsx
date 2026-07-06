import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  textColor?: string;
  accentColor?: string;
  cardBg?: string;
  onProductClick?: (p: Product) => void;
  key?: React.Key;
}

const ProductCard = ({ 
  product, 
  textColor = '#1e293b', 
  accentColor = '#f97316', 
  cardBg = '#ffffff', 
  onProductClick 
}: ProductCardProps) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div 
      id={product.id}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onProductClick?.(product)}
      className="rounded-3xl p-4 group cursor-pointer border transition-all duration-300 flex flex-col h-full"
      style={{ 
        backgroundColor: cardBg,
        borderColor: hovered ? `${accentColor}30` : '#f1f5f9',
        boxShadow: hovered 
          ? `0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px ${accentColor}15` 
          : '0 4px 6px -1px rgba(0, 0, 0, 0.01), 0 2px 4px -1px rgba(0, 0, 0, 0.01)'
      }}
    >
      <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-slate-50 relative shrink-0">
        <img 
          src={product.img} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          referrerPolicy="no-referrer" 
        />
        {product.discount && (
          <span 
            style={{ backgroundColor: accentColor }}
            className="absolute top-4 left-4 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-md"
          >
            -{product.discount}%
          </span>
        )}
      </div>
      <div className="px-2 flex flex-col flex-1">
        <h3 style={{ color: textColor }} className="font-bold text-sm mb-1.5 line-clamp-2 leading-snug">{product.name}</h3>
        
        {product.rating && (
          <div className="flex items-center gap-0.5 mb-2.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={10} 
                fill={i < Math.floor(product.rating || 0) ? "#fbbf24" : "none"} 
                className={i < Math.floor(product.rating || 0) ? "text-amber-400" : "text-gray-200"} 
              />
            ))}
            <span className="text-[10px] text-slate-400 font-semibold ml-1">({product.rating})</span>
          </div>
        )}

        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-3">
            <span style={{ color: accentColor }} className="font-extrabold text-base">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-gray-300 text-xs line-through">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button 
              style={{ 
                borderColor: hovered ? accentColor : `${accentColor}33`,
                backgroundColor: hovered ? accentColor : 'transparent',
                color: hovered ? '#ffffff' : accentColor
              }}
              className="text-[10px] font-black px-3.5 py-1.5 rounded-xl border transition-all duration-200 hover:shadow-md"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
