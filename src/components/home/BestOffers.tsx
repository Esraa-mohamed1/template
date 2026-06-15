// components/sections/BestOffers.tsx

import React from "react";
import SectionHeader from "../common/SectionHeader";
import ProductCard from "../ProductCard";
import { HomeSection } from "../../types/api";

interface SectionBlockProps {
  section: HomeSection;
  onProductClick: (id: number) => void;
}

const SectionBlock = ({ section, onProductClick }: SectionBlockProps) => {
  return (
    <>
      <section
        className="px-6 py-16"
        style={{ backgroundColor: section.color ?? "#ffffff" }}
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader title={section.title} showButton />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {section.products.map((product) => (
              <ProductCard
                key={product.id}
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
