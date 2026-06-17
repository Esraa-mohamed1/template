import React from 'react';
import { Truck, Headphones, Star, Award } from 'lucide-react';

interface HomeWhyChooseUsProps {
  title?: string;
  buttonText?: string;
  feature1_title?: string;
  feature1_desc?: string;
  feature2_title?: string;
  feature2_desc?: string;
  feature3_title?: string;
  feature3_desc?: string;
  feature4_title?: string;
  feature4_desc?: string;
  onCategoryClick?: (c: string) => void;
}

export default function HomeWhyChooseUs({
  title = 'Why choose us',
  buttonText = 'Shop Now',
  feature1_title = 'First Delivery',
  feature1_desc = 'We take care of the set-up process, aggregating all your existing online.',
  feature2_title = '24/7 Online Support',
  feature2_desc = 'Respond and resolve your customer queries instantly by implementing live chat.',
  feature3_title = '4.9 Ratings',
  feature3_desc = "Here's to the people who leave online reviews! So you can take your decision.",
  feature4_title = '10 Years Services',
  feature4_desc = 'Check out our 10 years of service awards, program tips, and strategies.',
  onCategoryClick
}: HomeWhyChooseUsProps) {
  const features = [
    { icon: <Truck size={24} className="text-orange-400" />, title: feature1_title, desc: feature1_desc },
    { icon: <Headphones size={24} className="text-red-400" />, title: feature2_title, desc: feature2_desc },
    { icon: <Star size={24} className="text-amber-400" />, title: feature3_title, desc: feature3_desc },
    { icon: <Award size={24} className="text-orange-300" />, title: feature4_title, desc: feature4_desc },
  ];

  return (
    <section className="px-6 py-16 bg-white rounded-[inherit]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
          {buttonText && (
            <button 
              onClick={() => onCategoryClick && onCategoryClick('All')}
              className="px-6 py-2 bg-brand-blue text-white text-xs font-semibold rounded-lg hover:bg-blue-600 transition-all active:scale-95"
            >
              {buttonText}
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left" dir="ltr">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shadow-sm">
                {f.icon}
              </div>
              <h3 className="font-bold text-lg text-gray-800">{f.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
