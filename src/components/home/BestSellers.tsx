import React from 'react';
import SectionHeader from '../common/SectionHeader';
import ProductCard from '../ProductCard';
import { Product } from '../../types';

interface BestSellersProps {
  onProductClick: (p: Product) => void;
}

const BestSellers = ({ onProductClick }: BestSellersProps) => {
  const products: Product[] = [
    { 
      id: 'best-1', 
      name: 'Legendary Whitetails Women\'s Outfitter Hoodie', 
      price: 32.00, 
      img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&auto=format&fit=crop',
      description: 'The Legendary Whitetails Women\'s Outfitter Hoodie is built for comfort and style. Featuring a soft blend of materials, this hoodie is perfect for crisp autumn mornings or layering during winter.',
      gallery: [
        'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800',
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800',
        'https://images.unsplash.com/photo-1556821840-4b360ab43505?q=80&w=800'
      ],
      category: 'Women'
    },
    { 
      id: 'best-2', 
      name: 'Autumn Harajuku Print Hoodies Women Sailor...', 
      price: 40.00, 
      img: 'https://images.unsplash.com/photo-1578939608332-5842854df112?q=80&w=400&auto=format&fit=crop',
      description: 'Embrace the Harajuku style with this unique sailor-inspired hoodie.',
      gallery: [
        'https://images.unsplash.com/photo-1578939608332-5842854df112?q=80&w=800',
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800'
      ],
      category: 'Women'
    },
    { 
      id: 'best-3', 
      name: 'Womens Pullover Long Sleeve Plaid Hoodie...', 
      price: 13.99, 
      img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop',
      description: 'Classic plaid design meets modern street style.',
      category: 'Women'
    },
    { 
      id: 'best-4', 
      name: 'Casual V-Neck Floral Print Chiffon Blouse', 
      price: 15.00, 
      img: 'https://images.unsplash.com/photo-1539109132314-3477524c8830?q=80&w=400&auto=format&fit=crop',
      description: 'Elegant chiffon blouse with a vibrant floral pattern.',
      category: 'Women'
    }
  ];

  return (
    <section className="px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Best sellers" showButton id="best-sellers-nav" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onProductClick={onProductClick} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
