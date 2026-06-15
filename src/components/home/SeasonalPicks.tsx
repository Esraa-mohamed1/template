import React from 'react';
import SectionHeader from '../common/SectionHeader';
import ProductCard from '../ProductCard';
import { Product } from '../../types';

interface SeasonalPicksProps {
  onProductClick: (p: Product) => void;
}

const SeasonalPicks = ({ onProductClick }: SeasonalPicksProps) => {
  const products: Product[] = [
    { id: 'season-1', name: 'Legendary Whitetails Women\'s Anchorage...', price: 24.00, img: 'https://images.unsplash.com/photo-1544923246-77307dd654ca?q=80&w=400&auto=format&fit=crop', category: 'Women' },
    { id: 'season-2', name: 'Andongnywell Women\'s Double Breasted Pea...', price: 32.00, img: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=400&auto=format&fit=crop', category: 'Women' },
    { id: 'season-3', name: 'Arctix Boys Ronan Insulated Winter Jacket...', price: 29.00, img: 'https://images.unsplash.com/photo-1545594944-42b8744424dc?q=80&w=400&auto=format&fit=crop', category: 'Children' },
    { id: 'season-4', name: 'Arctix Kids Winter Jacket...', price: 30.00, img: 'https://images.unsplash.com/photo-1510115086551-7f81bc9e4a89?q=80&w=400&auto=format&fit=crop', category: 'Children' },
  ];

  return (
    <section id="seasonal-picks-section" className="px-6 py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Seasonal picks for you" showButton />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onProductClick={onProductClick} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeasonalPicks;
