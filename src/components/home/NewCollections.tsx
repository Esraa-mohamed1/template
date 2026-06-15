import React from 'react';
import { motion } from 'motion/react';

const NewCollections = () => {
  const items = [
    { title: "Men's favorite for winter collection", desc: "A variety of collections for men are more trendy for men now.", img: "https://images.unsplash.com/photo-1520975916090-310595b439bf?q=80&w=400&auto=format&fit=crop" },
    { title: "Women's favorite for winter collection", desc: "A variety of collections for women are more trendy for women now.", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400&auto=format&fit=crop" },
    { title: "Latest couple trendy collection for your partner.", desc: "Couple collection are more popular for husband and wife.", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop" },
  ];

  return (
    <section className="px-6 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">New collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className="group">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-brand-blue transition-colors">{item.title}</h3>
              <p className="text-xs text-gray-500 mb-4">{item.desc}</p>
              <button className="text-xs font-bold underline hover:no-underline">See All</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewCollections;
