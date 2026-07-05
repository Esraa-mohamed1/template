// components/sections/BestOffers.tsx

import React from "react";
import ProductCard from "../ProductCard";
import { HomeSection } from "../../types/api";

interface SectionBlockProps {
  section: HomeSection;
  textColor?: string;
  bgColor?: string;
  accentColor?: string;
  cardBg?: string;
  onProductClick: (id: number) => void;
}

const SectionBlock = ({ 
  section, 
  textColor = '#1e293b', 
  bgColor = '#ffffff', 
  accentColor = '#f97316', 
  cardBg = '#ffffff', 
  onProductClick 
}: SectionBlockProps) => {
  return (
    <>
      <section
        className="px-6 py-16 transition-colors duration-300"
        style={{ backgroundColor: bgColor }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Custom pretty header */}
          <div className="flex items-center justify-between mb-8" style={{ color: textColor }}>
            <h2 className="text-3xl font-bold tracking-tight">{section.title}</h2>
            <button 
              style={{ backgroundColor: accentColor }}
              className="px-4 py-1.5 text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-all shadow-sm"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {section.products.map((product) => (
              <ProductCard
                key={product.id}
                textColor={textColor}
                accentColor={accentColor}
                cardBg={cardBg}
                product={{
                  id: String(product.id),
                  name: product.name,
                  price: parseFloat(product.price),
                  oldPrice: parseFloat(product.compare_price),
                  rating: parseFloat(product.average_rating),
                  img: product.thumbnail?.image ?? "/placeholder.png",
                }}
                onProductClick={() => onProductClick(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* فاصل بين السيكشنات */}
      <div className="max-w-7xl mx-auto px-6">
        <hr className="border-t border-gray-200" />
      </div>
    </>
  );
};

export default SectionBlock;
