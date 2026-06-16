import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onProductClick?: (p: Product) => void;
  key?: React.Key;
}

const ProductCard = ({ product, onProductClick }: ProductCardProps) => (
  <motion.div 
    id={product.id}
    whileHover={{ y: -5 }}
    onClick={() => onProductClick?.(product)}
    className="bg-white rounded-3xl p-4 group cursor-pointer"
    style={{ boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)' }}
  >
    <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-gray-50 relative">
      <img 
        src={product.img} 
        alt={product.name} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        referrerPolicy="no-referrer" 
      />
      {product.discount && (
        <span className="absolute top-4 left-4 bg-orange-400 text-white text-[10px] font-bold px-2 py-1 rounded-full">
          -{product.discount}%
        </span>
      )}
    </div>
    <div className="px-2">
      <h3 className="font-bold text-sm mb-1 line-clamp-2 leading-snug">{product.name}</h3>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-brand-blue font-bold">${product.price.toFixed(2)}</span>
        {product.oldPrice && (
          <span className="text-gray-300 text-xs line-through">${product.oldPrice.toFixed(2)}</span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button className="text-[10px] font-bold text-gray-500 group-hover:text-brand-blue items-center flex gap-1 border border-gray-100 px-3 py-1 rounded-lg transition-colors">
          Shop Now
        </button>
        {product.rating && (
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={10} 
                fill={i < Math.floor(product.rating || 0) ? "#fbbf24" : "none"} 
                className={i < Math.floor(product.rating || 0) ? "text-amber-400" : "text-gray-200"} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

export default ProductCard;
