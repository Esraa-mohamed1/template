import React from 'react';
import { motion } from 'motion/react';

interface HomeHeroProps {
  avatarUrl?: string;
  avatarText?: string;
  titlePart1?: string;
  titlePart2?: string;
  titlePart3?: string;
  buttonText?: string;
  secondButtonText?: string;
  img1?: string;
  img2?: string;
  img3?: string;
  textColor?: string;
  accentColor?: string;
  bgColor?: string;
  imageSize?: 'small' | 'medium' | 'large';
  align?: 'right' | 'center' | 'left';
  onCategoryClick?: (c: string) => void;
}

export default function HomeHero({
  avatarUrl = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
  avatarText = 'E.buy is the right place for you to buy your fashion clothes with a reasonable price and trust.',
  titlePart1 = 'You can feel',
  titlePart2 = 'fashion',
  titlePart3 = 'sense.',
  buttonText = 'Shop Now',
  secondButtonText = 'Learn More',
  img1 = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
  img2 = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop',
  img3 = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop',
  textColor = '#1e293b',
  accentColor = '#f97316',
  bgColor = '#ffffff',
  imageSize = 'medium',
  align = 'right',
  onCategoryClick
}: HomeHeroProps) {

  // Map alignment prop to CSS classes
  const isCenter = align === 'center';
  const isLeft = align === 'left';
  
  const textAlignmentClass = isCenter ? 'text-center' : isLeft ? 'text-left' : 'text-right';
  const flexAlignmentClass = isCenter ? 'items-center justify-center' : isLeft ? 'items-start justify-start' : 'items-end justify-end';
  const justifyClass = isCenter ? 'justify-center' : isLeft ? 'justify-start' : 'justify-end';

  // Map gallery height to image size
  const heightMap: Record<string, string> = {
    small: 'h-[380px]',
    medium: 'h-[480px]',
    large: 'h-[580px]',
  };
  const galleryHeightClass = heightMap[imageSize] || 'h-[480px]';

  return (
    <section id="hero-section" style={{ backgroundColor: bgColor }} className="relative px-6 py-16 overflow-hidden rounded-[inherit] transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          id="hero-content"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`flex flex-col ${isCenter ? 'items-center text-center' : isLeft ? 'items-start text-left' : 'items-start lg:items-start text-left'}`}
        >
          <div className={`mb-6 flex ${isCenter ? 'flex-col items-center text-center' : 'items-center gap-4 text-left'}`}>
            {avatarUrl && (
              <div id="hero-avatar" className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                <img src={avatarUrl} alt="Avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
            )}
            {avatarText && (
              <p style={{ color: `${textColor}99` }} className="text-sm max-w-[280px] leading-relaxed font-medium">
                {avatarText}
              </p>
            )}
          </div>
          <h1 style={{ color: textColor }} className="text-6xl md:text-7xl font-bold mb-8 leading-[0.9] tracking-tighter">
            {titlePart1} <br />
            {titlePart2 && <span style={{ color: accentColor }}>{titlePart2}</span>} {titlePart3}
          </h1>
          <div id="hero-ctas" className="flex items-center gap-4 justify-start">
            {buttonText && (
              <button 
                id="cta-shop-now" 
                onClick={() => onCategoryClick && onCategoryClick('All')}
                style={{ backgroundColor: accentColor }}
                className="px-8 py-3 text-white rounded-full font-medium hover:opacity-90 transition-all shadow-lg shadow-orange-200 active:scale-95"
              >
                {buttonText}
              </button>
            )}
            {secondButtonText && (
              <button 
                id="cta-learn-more" 
                style={{ borderColor: `${textColor}22`, color: textColor }}
                className="px-8 py-3 border bg-white/40 hover:bg-white/70 rounded-full font-medium transition-all active:scale-95"
              >
                {secondButtonText}
              </button>
            )}
          </div>
        </motion.div>

        <motion.div 
          id="hero-gallery"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={`relative grid grid-cols-4 gap-4 ${galleryHeightClass} w-full`}
        >
          {img1 && (
            <div className="col-span-2 row-span-2 rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-900/5">
              <img src={img1} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Luxury Fashion" referrerPolicy="no-referrer" />
            </div>
          )}
          {img2 && (
            <div className="col-span-1 bg-brand-light rounded-[2.5rem] overflow-hidden mt-12 shadow-xl">
               <img src={img2} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="Boutique Experience" referrerPolicy="no-referrer" />
            </div>
          )}
          {img3 && (
            <div className="col-span-1 bg-brand-light rounded-[2.5rem] overflow-hidden mb-12 shadow-xl">
               <img src={img3} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="High-End Retail" referrerPolicy="no-referrer" />
            </div>
          )}
          {/* Background decorative path */}
          <div className="absolute -z-10 -top-20 -right-20 w-[500px] h-[500px] opacity-10 pointer-events-none text-brand-blue/20">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current">
              <path d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.6,-31.3,86.9,-15.6,85.6,-0.7C84.3,14.2,78.5,28.3,70.3,40.7C62.1,53.1,51.5,63.7,38.8,70.9C26.1,78.1,13,81.9,-0.8,83.2C-14.6,84.5,-29.1,83.2,-41.8,76.3C-54.5,69.4,-65.3,56.8,-73.2,42.8C-81.1,28.8,-86,13.4,-86.3,-2.1C-86.6,-17.6,-82.3,-33.1,-73.4,-45.5C-64.5,-57.9,-51,-67.2,-36.8,-74.1C-22.6,-81,-7.7,-85.5,7.7,-84.9C23.1,-84.3,31.3,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
