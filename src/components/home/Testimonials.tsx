import React from 'react';

const Testimonials = () => {
  const clients = [
    { name: 'Thara Hassan', role: 'Web Designer', img: 'https://picsum.photos/seed/p1/100/100' },
    { name: 'Jane Cooper', role: 'Medical Assistant', img: 'https://picsum.photos/seed/p2/100/100' },
    { name: 'Jeon Se-Ri', role: 'Nursing Assistant', img: 'https://picsum.photos/seed/p3/100/100' },
    { name: 'Sook Soon-Ei', role: 'Marketing Coordinator', img: 'https://picsum.photos/seed/p4/100/100' },
    { name: 'Cody Fisher', role: 'President of Sales', img: 'https://picsum.photos/seed/p5/100/100' },
  ];

  return (
    <section className="px-6 py-24 bg-white text-center">
      <div className="max-w-4xl mx-auto relative">
        <h2 className="text-3xl font-bold mb-12">What our clients say</h2>
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
          {clients.map((c, i) => (
            <div key={i} className={`flex flex-col items-center gap-2 ${i === 2 ? 'scale-110' : 'opacity-60'}`}>
              <div className={`w-14 h-14 rounded-full border-4 ${i === 2 ? 'border-brand-blue' : 'border-white'} overflow-hidden shadow-md`}>
                <img src={c.img} alt={c.name} referrerPolicy="no-referrer" />
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold">{c.name}</p>
                <p className="text-[8px] text-gray-400">{c.role}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-gray-600 text-lg md:text-xl font-medium italic leading-relaxed px-8">
          <span className="text-blue-200 text-6xl absolute -top-10 left-0">“</span>
          "My husband and I went for dinner in restaurant X and really enjoyed the atmosphere. The food was fresh and delicious and the best part was that the chef sent us a dessert they created that day. We were delighted to be the part of their business."
          <span className="text-blue-200 text-6xl absolute -bottom-10 right-0">”</span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
