import React from 'react';
import { Truck, Headphones, Star, Award } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    { icon: <Truck size={24} className="text-orange-400" />, title: 'First Delivery', desc: 'We take care of the set-up process, aggregating all your existing online.' },
    { icon: <Headphones size={24} className="text-red-400" />, title: '24/7 Online Support', desc: 'Respond and resolve your customer queries instantly by implementing live chat.' },
    { icon: <Star size={24} className="text-amber-400" />, title: '4.9 Ratings', desc: "Here's to the people who leave online reviews! So you can take your decision." },
    { icon: <Award size={24} className="text-orange-300" />, title: '10 Years Services', desc: 'Check out our 10 years of service awards, program tips, and strategies.' },
  ];

  return (
    <section className="px-6 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold">Why choose us</h2>
          <button className="px-6 py-2 bg-brand-blue text-white text-xs font-semibold rounded-lg">Shop Now</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shadow-sm">
                {f.icon}
              </div>
              <h3 className="font-bold text-lg">{f.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
