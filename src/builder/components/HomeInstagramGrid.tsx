import React from 'react';
import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';

interface HomeInstagramGridProps {
  title?: string;
  instagramHandle?: string;
  img1?: string;
  img2?: string;
  img3?: string;
  img4?: string;
}

export default function HomeInstagramGrid({
  title = 'Connect with us',
  instagramHandle = '@Instagram',
  img1 = 'https://images.unsplash.com/photo-1529139570274-c3445ff24be9?q=80&w=400&auto=format&fit=crop',
  img2 = 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=400&auto=format&fit=crop',
  img3 = 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=400&auto=format&fit=crop',
  img4 = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=400&auto=format&fit=crop'
}: HomeInstagramGridProps) {
  const imgs = [img1, img2, img3, img4].filter(Boolean) as string[];

  return (
    <section className="px-6 py-16 bg-white rounded-[inherit]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
          {instagramHandle && (
            <div className="flex items-center gap-2 text-red-400 font-semibold bg-red-50 px-4 py-1.5 rounded-full text-xs cursor-pointer">
              <Instagram size={14} />
              {instagramHandle}
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {imgs.map((src, i) => (
            <motion.div key={i} whileHover={{ scale: 1.02 }} className="aspect-square rounded-3xl overflow-hidden relative group">
              <img src={src} className="w-full h-full object-cover" alt="Instagram" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram className="text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
