import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SubItem {
  label: string;
  img: string;
}

interface AmazonCardProps {
  title: string;
  linkText: string;
  linkUrl: string;
  items: SubItem[];
  textColor: string;
  accentColor: string;
  cardBg: string;
}

function AmazonCard({
  title,
  linkText,
  linkUrl,
  items,
  textColor,
  accentColor,
  cardBg
}: AmazonCardProps) {
  return (
    <div 
      style={{ backgroundColor: cardBg }} 
      className="rounded-2xl p-5 shadow-lg border border-slate-100 flex flex-col hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
    >
      <h3 style={{ color: textColor }} className="text-base font-bold mb-4">{title}</h3>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-1 cursor-pointer" key={idx}>
            <div className="aspect-square rounded-xl overflow-hidden bg-slate-50 relative">
              <img 
                src={item.img} 
                alt={item.label} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <span style={{ color: textColor }} className="text-[10px] sm:text-xs font-semibold leading-tight truncate">{item.label}</span>
          </div>
        ))}
      </div>
      <a 
        href={linkUrl} 
        style={{ color: accentColor }} 
        className="text-xs font-black mt-auto inline-flex items-center gap-1 hover:underline"
      >
        {linkText} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
}

interface AmazonMultiCardGridProps {
  sectionTitle?: string;
  card1_title?: string;
  card1_linkText?: string;
  card1_linkUrl?: string;
  card2_title?: string;
  card2_linkText?: string;
  card2_linkUrl?: string;
  card3_title?: string;
  card3_linkText?: string;
  card3_linkUrl?: string;
  card4_title?: string;
  card4_linkText?: string;
  card4_linkUrl?: string;
  bgColor?: string;
  cardBg?: string;
  textColor?: string;
  accentColor?: string;
}

export default function AmazonMultiCardGrid({
  sectionTitle = '',
  card1_title = 'أحدث صيحات الموضة',
  card1_linkText = 'تسوّق الأزياء',
  card1_linkUrl = '#',
  card2_title = 'الأجهزة والأدوات الذكية',
  card2_linkText = 'تصفح التقنية',
  card2_linkUrl = '#',
  card3_title = 'تصفح الفئات الأكثر شعبية',
  card3_linkText = 'عرض كل الفئات',
  card3_linkUrl = '#',
  card4_title = 'عرض محدود اليوم',
  card4_linkText = 'احصل على العرض',
  card4_linkUrl = '#',
  bgColor = '#FFF8F0',
  cardBg = '#ffffff',
  textColor = '#1e293b',
  accentColor = '#FF9900'
}: AmazonMultiCardGridProps) {

  // Curated premium images for 2x2 grids
  const card1_items = [
    { label: 'أزياء نسائية', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=200' },
    { label: 'ملابس رجالية', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=200' },
    { label: 'أحذية الرياضة', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200' },
    { label: 'حقائب وإكسسوارات', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=200' }
  ];

  const card2_items = [
    { label: 'سماعات الرأس', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200' },
    { label: 'ساعات ذكية', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200' },
    { label: 'صوتيات بلوتوث', img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=200' },
    { label: 'هواتف وأجهزة لوحية', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=200' }
  ];

  const card3_items = [
    { label: 'ديكور المنزل', img: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=200' },
    { label: 'مستلزمات المطبخ', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=200' },
    { label: 'العناية والجمال', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=200' },
    { label: 'كتب وألعاب ورقية', img: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=200' }
  ];

  const card4_items = [
    { label: 'سماعات داخل الأذن', img: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?q=80&w=200' },
    { label: 'أدوات الكتابة والقراءة', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=200' },
    { label: 'شواحن وبطاريات', img: 'https://images.unsplash.com/photo-1609592424109-dd9892f1b17c?q=80&w=200' },
    { label: 'ماوس لاسلكي مريح', img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=200' }
  ];

  return (
    <section style={{ backgroundColor: bgColor }} className="w-full py-12 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {sectionTitle && (
          <h2 style={{ color: textColor }} className="text-2xl font-black mb-8 text-right">{sectionTitle}</h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          <AmazonCard 
            title={card1_title} 
            linkText={card1_linkText} 
            linkUrl={card1_linkUrl} 
            items={card1_items} 
            textColor={textColor}
            accentColor={accentColor}
            cardBg={cardBg}
          />
          <AmazonCard 
            title={card2_title} 
            linkText={card2_linkText} 
            linkUrl={card2_linkUrl} 
            items={card2_items} 
            textColor={textColor}
            accentColor={accentColor}
            cardBg={cardBg}
          />
          <AmazonCard 
            title={card3_title} 
            linkText={card3_linkText} 
            linkUrl={card3_linkUrl} 
            items={card3_items} 
            textColor={textColor}
            accentColor={accentColor}
            cardBg={cardBg}
          />
          <AmazonCard 
            title={card4_title} 
            linkText={card4_linkText} 
            linkUrl={card4_linkUrl} 
            items={card4_items} 
            textColor={textColor}
            accentColor={accentColor}
            cardBg={cardBg}
          />
        </div>
      </div>
    </section>
  );
}
