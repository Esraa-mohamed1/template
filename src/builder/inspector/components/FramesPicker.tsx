import React from 'react';
import { Check } from 'lucide-react';

// ─── Frame Definitions ─────────────────────────────────────────────────────────

export interface FrameOption {
  id: string;
  label: string;
  description?: string;
  svg: React.ReactNode;
}

// SVG wireframes for each layout variant
const heroFrames: FrameOption[] = [
  {
    id: 'split-right',
    label: 'نص يسار / صورة يمين',
    description: 'النص على اليسار والصورة على اليمين',
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect width="80" height="50" rx="4" fill="#f1f5f9" />
        {/* Text side */}
        <rect x="4" y="8" width="32" height="5" rx="1.5" fill="#94a3b8" />
        <rect x="4" y="16" width="24" height="3" rx="1" fill="#cbd5e1" />
        <rect x="4" y="21" width="28" height="3" rx="1" fill="#cbd5e1" />
        <rect x="4" y="29" width="14" height="6" rx="2" fill="#f97316" />
        {/* Image side */}
        <rect x="42" y="6" width="34" height="38" rx="3" fill="#e2e8f0" />
        <circle cx="59" cy="20" r="5" fill="#cbd5e1" />
        <path d="M44 40 L59 25 L74 40 Z" fill="#cbd5e1" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: 'split-left',
    label: 'صورة يسار / نص يمين',
    description: 'الصورة على اليسار والنص على اليمين',
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect width="80" height="50" rx="4" fill="#f1f5f9" />
        {/* Image side */}
        <rect x="4" y="6" width="34" height="38" rx="3" fill="#e2e8f0" />
        <circle cx="21" cy="20" r="5" fill="#cbd5e1" />
        <path d="M6 40 L21 25 L36 40 Z" fill="#cbd5e1" opacity="0.6" />
        {/* Text side */}
        <rect x="44" y="8" width="32" height="5" rx="1.5" fill="#94a3b8" />
        <rect x="44" y="16" width="24" height="3" rx="1" fill="#cbd5e1" />
        <rect x="44" y="21" width="28" height="3" rx="1" fill="#cbd5e1" />
        <rect x="44" y="29" width="14" height="6" rx="2" fill="#f97316" />
      </svg>
    ),
  },
  {
    id: 'centered',
    label: 'مركز الصفحة',
    description: 'النص والعناصر في وسط الصفحة',
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect width="80" height="50" rx="4" fill="#f1f5f9" />
        <rect x="20" y="8" width="40" height="5" rx="1.5" fill="#94a3b8" />
        <rect x="24" y="16" width="32" height="3" rx="1" fill="#cbd5e1" />
        <rect x="28" y="21" width="24" height="3" rx="1" fill="#cbd5e1" />
        <rect x="26" y="30" width="28" height="7" rx="2" fill="#f97316" />
      </svg>
    ),
  },
  {
    id: 'fullwidth-overlay',
    label: 'صورة كاملة مع تغطية',
    description: 'صورة خلفية كاملة مع تغطية ونص فوقها',
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect width="80" height="50" rx="4" fill="#475569" />
        <rect x="4" y="8" width="40" height="5" rx="1.5" fill="white" opacity="0.8" />
        <rect x="4" y="16" width="32" height="3" rx="1" fill="white" opacity="0.5" />
        <rect x="4" y="21" width="28" height="3" rx="1" fill="white" opacity="0.5" />
        <rect x="4" y="30" width="18" height="7" rx="2" fill="#f97316" />
        <circle cx="62" cy="20" r="10" fill="white" opacity="0.1" />
      </svg>
    ),
  },
];

const productGridFrames: FrameOption[] = [
  {
    id: '3-col',
    label: '3 أعمدة',
    description: 'شبكة 3 أعمدة — الأفضل للعروض المتوسطة',
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect width="80" height="50" rx="4" fill="#f1f5f9" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={4 + i * 26} y="6" width="22" height="28" rx="2" fill="#e2e8f0" />
            <rect x={4 + i * 26} y="36" width="14" height="3" rx="1" fill="#cbd5e1" />
            <rect x={4 + i * 26} y="41" width="22" height="5" rx="1.5" fill="#f97316" />
          </g>
        ))}
      </svg>
    ),
  },
  {
    id: '4-col',
    label: '4 أعمدة',
    description: 'شبكة 4 أعمدة — أكثر منتجات في المشهد',
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect width="80" height="50" rx="4" fill="#f1f5f9" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={2 + i * 20} y="6" width="16" height="22" rx="2" fill="#e2e8f0" />
            <rect x={2 + i * 20} y="30" width="11" height="2.5" rx="1" fill="#cbd5e1" />
            <rect x={2 + i * 20} y="34" width="16" height="5" rx="1.5" fill="#f97316" />
          </g>
        ))}
      </svg>
    ),
  },
  {
    id: '2-col',
    label: '2 أعمدة',
    description: 'شبكة عمودين — عرض مريح للعناصر الكبيرة',
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect width="80" height="50" rx="4" fill="#f1f5f9" />
        {[0, 1].map((i) => (
          <g key={i}>
            <rect x={4 + i * 40} y="6" width="34" height="26" rx="2" fill="#e2e8f0" />
            <rect x={4 + i * 40} y="34" width="22" height="3" rx="1" fill="#cbd5e1" />
            <rect x={4 + i * 40} y="40" width="34" height="6" rx="2" fill="#f97316" />
          </g>
        ))}
      </svg>
    ),
  },
  {
    id: 'list',
    label: 'قائمة رأسية',
    description: 'قائمة عمودية — مناسب لعرض تفاصيل المنتجات',
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect width="80" height="50" rx="4" fill="#f1f5f9" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="4" y={4 + i * 15} width="14" height="11" rx="2" fill="#e2e8f0" />
            <rect x="22" y={5 + i * 15} width="28" height="3" rx="1" fill="#94a3b8" />
            <rect x="22" y={10 + i * 15} width="20" height="2" rx="1" fill="#cbd5e1" />
            <rect x="60" y={5 + i * 15} width="16" height="9" rx="1.5" fill="#f97316" />
          </g>
        ))}
      </svg>
    ),
  },
];

const flashSaleFrames: FrameOption[] = [
  {
    id: 'dark-scroll',
    label: 'داكن + تمرير أفقي',
    description: 'خلفية داكنة مع تمرير أفقي للمنتجات',
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect width="80" height="50" rx="4" fill="#0f172a" />
        <rect x="4" y="6" width="24" height="5" rx="1.5" fill="#f97316" />
        <rect x="50" y="7" width="22" height="10" rx="2" fill="#1e293b" />
        <rect x="52" y="8" width="6" height="8" rx="1" fill="#475569" />
        <rect x="60" y="8" width="6" height="8" rx="1" fill="#475569" />
        <rect x="68" y="8" width="6" height="8" rx="1" fill="#475569" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={4 + i * 19} y="22" width="15" height="20" rx="2" fill="#1e293b" />
            <rect x={4 + i * 19} y="34" width="10" height="2" rx="1" fill="#475569" />
            <rect x={4 + i * 19} y="38" width="15" height="3" rx="1" fill="#f97316" />
          </g>
        ))}
      </svg>
    ),
  },
  {
    id: 'light-banner',
    label: 'فاتح مع عداد',
    description: 'خلفية فاتحة مع عداد تنازلي ضخم',
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect width="80" height="50" rx="4" fill="#fff7ed" />
        <rect x="4" y="6" width="24" height="4" rx="1.5" fill="#f97316" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={46 + i * 11} y="5" width="9" height="10" rx="2" fill="#1e293b" />
            <rect x={47 + i * 11} y="8" width="7" height="4" rx="1" fill="#334155" />
          </g>
        ))}
        <div />
        <rect x="4" y="16" width="76" height="0.5" fill="#fed7aa" />
        <div className="grid grid-cols-5" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={4 + i * 15} y="22" width="12" height="16" rx="2" fill="white" />
            <rect x={4 + i * 15} y="30" width="8" height="2" rx="1" fill="#e2e8f0" />
            <rect x={4 + i * 15} y="34" width="12" height="3.5" rx="1" fill="#f97316" />
          </g>
        ))}
      </svg>
    ),
  },
  {
    id: 'minimal',
    label: 'مبسط',
    description: 'تصميم نظيف وبسيط بخلفية بيضاء',
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect width="80" height="50" rx="4" fill="white" />
        <rect x="4" y="6" width="18" height="4" rx="1.5" fill="#94a3b8" />
        <rect x="58" y="6" width="18" height="4" rx="2" fill="#e2e8f0" />
        <rect x="4" y="14" width="76" height="0.5" fill="#f1f5f9" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={4 + i * 19} y="18" width="15" height="20" rx="2" fill="#f8fafc" />
            <rect x={4 + i * 19} y="30" width="10" height="2" rx="1" fill="#e2e8f0" />
            <rect x={4 + i * 19} y="34" width="15" height="3" rx="1" fill="#f97316" />
          </g>
        ))}
      </svg>
    ),
  },
];

const categoryFrames: FrameOption[] = [
  {
    id: '4-col-icon',
    label: '4 أعمدة مع صورة',
    description: 'بطاقات مع صور وأيقونات',
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect width="80" height="50" rx="4" fill="#f8fafc" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={2 + i * 20} y="6" width="16" height="28" rx="2" fill="white" />
            <rect x={4 + i * 20} y="8" width="12" height="16" rx="1.5" fill="#e2e8f0" />
            <rect x={4 + i * 20} y="26" width="10" height="3" rx="1" fill="#cbd5e1" />
            <rect x={4 + i * 20} y="31" width="8" height="2" rx="1" fill="#e2e8f0" />
          </g>
        ))}
      </svg>
    ),
  },
  {
    id: '6-col-compact',
    label: '6 أعمدة مضغوطة',
    description: 'بطاقات صغيرة مع أيقونات فقط',
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect width="80" height="50" rx="4" fill="#f8fafc" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <rect x={2 + i * 13} y="10" width="11" height="18" rx="2" fill="white" />
            <rect x={4 + i * 13} y="12" width="7" height="7" rx="1.5" fill="#e2e8f0" />
            <rect x={4 + i * 13} y="21" width="7" height="2" rx="1" fill="#cbd5e1" />
          </g>
        ))}
      </svg>
    ),
  },
  {
    id: '2-col-large',
    label: 'عمودان كبيران',
    description: 'بطاقات كبيرة بتصميم جذاب',
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect width="80" height="50" rx="4" fill="#f8fafc" />
        {[0, 1].map((i) => (
          <g key={i}>
            <rect x={4 + i * 40} y="6" width="34" height="18" rx="2" fill="white" />
            <rect x={6 + i * 40} y="8" width="10" height="10" rx="2" fill="#e2e8f0" />
            <rect x={20 + i * 40} y="9" width="14" height="3" rx="1" fill="#94a3b8" />
            <rect x={20 + i * 40} y="14" width="10" height="2" rx="1" fill="#cbd5e1" />
            <rect x={4 + i * 40} y="26" width="34" height="18" rx="2" fill="white" />
            <rect x={6 + i * 40} y="28" width="10" height="10" rx="2" fill="#e2e8f0" />
            <rect x={20 + i * 40} y="29" width="14" height="3" rx="1" fill="#94a3b8" />
            <rect x={20 + i * 40} y="34" width="10" height="2" rx="1" fill="#cbd5e1" />
          </g>
        ))}
      </svg>
    ),
  },
];

const promoBannerFrames: FrameOption[] = [
  {
    id: 'fullwidth',
    label: 'عرض كامل مع تغطية',
    description: 'بانر كامل العرض مع صورة خلفية',
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect width="80" height="50" rx="4" fill="#1e293b" />
        <rect x="6" y="12" width="36" height="6" rx="1.5" fill="white" opacity="0.7" />
        <rect x="6" y="21" width="28" height="3" rx="1" fill="white" opacity="0.4" />
        <rect x="6" y="33" width="22" height="10" rx="2" fill="#f97316" />
        <rect x="50" y="0" width="30" height="50" fill="white" opacity="0.05" />
      </svg>
    ),
  },
  {
    id: 'half-left',
    label: 'نص يسار + صورة يمين',
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect width="80" height="50" rx="4" fill="#1e293b" />
        <rect x="4" y="10" width="34" height="5" rx="1.5" fill="white" opacity="0.7" />
        <rect x="4" y="18" width="26" height="3" rx="1" fill="white" opacity="0.4" />
        <rect x="4" y="31" width="18" height="8" rx="2" fill="#f97316" />
        <rect x="44" y="4" width="32" height="42" rx="2" fill="white" opacity="0.1" />
        <circle cx="60" cy="20" r="7" fill="white" opacity="0.15" />
      </svg>
    ),
  },
  {
    id: 'half-right',
    label: 'صورة يسار + نص يمين',
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect width="80" height="50" rx="4" fill="#1e293b" />
        <rect x="4" y="4" width="32" height="42" rx="2" fill="white" opacity="0.1" />
        <circle cx="20" cy="20" r="7" fill="white" opacity="0.15" />
        <rect x="42" y="10" width="34" height="5" rx="1.5" fill="white" opacity="0.7" />
        <rect x="42" y="18" width="26" height="3" rx="1" fill="white" opacity="0.4" />
        <rect x="42" y="31" width="18" height="8" rx="2" fill="#f97316" />
      </svg>
    ),
  },
  {
    id: 'split-2',
    label: 'بانران جانبيان',
    description: 'بانران متجاوران في صف واحد',
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect width="80" height="50" rx="4" fill="#f8fafc" />
        <rect x="2" y="6" width="36" height="38" rx="3" fill="#1e293b" />
        <rect x="5" y="12" width="22" height="4" rx="1" fill="white" opacity="0.7" />
        <rect x="5" y="32" width="16" height="7" rx="2" fill="#f97316" />
        <rect x="42" y="6" width="36" height="38" rx="3" fill="#0f172a" />
        <rect x="45" y="12" width="22" height="4" rx="1" fill="white" opacity="0.7" />
        <rect x="45" y="32" width="16" height="7" rx="2" fill="#6366f1" />
      </svg>
    ),
  },
];

const testimonialsFrames: FrameOption[] = [
  {
    id: 'cards-row',
    label: 'بطاقات في صف',
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect width="80" height="50" rx="4" fill="#f8fafc" />
        <rect x="4" y="6" width="76" height="4" rx="1.5" fill="#94a3b8" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={4 + i * 19} y="14" width="16" height="28" rx="2" fill="white" />
            <circle cx={8 + i * 19} cy="19" r="3" fill="#e2e8f0" />
            <rect x={13 + i * 19} y="17" width="5" height="2" rx="0.5" fill="#cbd5e1" />
            <rect x={6 + i * 19} y="24" width="12" height="2" rx="0.5" fill="#e2e8f0" />
            <rect x={6 + i * 19} y="28" width="10" height="2" rx="0.5" fill="#e2e8f0" />
            <rect x={6 + i * 19} y="33" width="8" height="2" rx="0.5" fill="#f97316" opacity="0.7" />
          </g>
        ))}
      </svg>
    ),
  },
  {
    id: 'featured-large',
    label: 'شهادة مميزة كبيرة',
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect width="80" height="50" rx="4" fill="#f8fafc" />
        <rect x="4" y="5" width="72" height="4" rx="1.5" fill="#94a3b8" />
        <rect x="20" y="13" width="40" height="30" rx="3" fill="white" />
        <circle cx="40" cy="20" r="5" fill="#e2e8f0" />
        <rect x="26" y="27" width="28" height="2" rx="1" fill="#e2e8f0" />
        <rect x="28" y="31" width="24" height="2" rx="1" fill="#e2e8f0" />
        <rect x="32" y="36" width="16" height="3" rx="1" fill="#f97316" opacity="0.7" />
      </svg>
    ),
  },
  {
    id: 'masonry',
    label: 'تخطيط Masonry',
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect width="80" height="50" rx="4" fill="#f8fafc" />
        {/* Col 1 */}
        <rect x="4" y="6" width="22" height="16" rx="2" fill="white" />
        <rect x="4" y="24" width="22" height="22" rx="2" fill="white" />
        {/* Col 2 */}
        <rect x="29" y="6" width="22" height="24" rx="2" fill="white" />
        <rect x="29" y="32" width="22" height="14" rx="2" fill="white" />
        {/* Col 3 */}
        <rect x="54" y="6" width="22" height="12" rx="2" fill="white" />
        <rect x="54" y="20" width="22" height="26" rx="2" fill="white" />
      </svg>
    ),
  },
];

const newsletterFrames: FrameOption[] = [
  {
    id: 'centered',
    label: 'وسط الصفحة',
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect width="80" height="50" rx="4" fill="#0f172a" />
        <rect x="20" y="8" width="40" height="5" rx="1.5" fill="white" opacity="0.6" />
        <rect x="24" y="16" width="32" height="3" rx="1" fill="white" opacity="0.3" />
        <rect x="10" y="26" width="48" height="8" rx="2" fill="#1e293b" />
        <rect x="60" y="26" width="12" height="8" rx="2" fill="#f97316" />
      </svg>
    ),
  },
  {
    id: 'split',
    label: 'نص يسار + نموذج يمين',
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect width="80" height="50" rx="4" fill="#0f172a" />
        <rect x="4" y="10" width="32" height="5" rx="1.5" fill="white" opacity="0.6" />
        <rect x="4" y="18" width="26" height="3" rx="1" fill="white" opacity="0.3" />
        <rect x="44" y="10" width="32" height="8" rx="2" fill="#1e293b" />
        <rect x="44" y="22" width="32" height="8" rx="2" fill="#f97316" />
      </svg>
    ),
  },
  {
    id: 'inline',
    label: 'بطاقة مدمجة',
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full">
        <rect width="80" height="50" rx="4" fill="#fff7ed" />
        <rect x="6" y="12" width="68" height="26" rx="3" fill="white" />
        <rect x="10" y="18" width="28" height="4" rx="1" fill="#94a3b8" />
        <rect x="10" y="24" width="22" height="3" rx="1" fill="#e2e8f0" />
        <rect x="44" y="17" width="22" height="6" rx="1.5" fill="#e2e8f0" />
        <rect x="44" y="25" width="22" height="6" rx="1.5" fill="#f97316" />
      </svg>
    ),
  },
];

// ─── Frame Map ─────────────────────────────────────────────────────────────────

export const FRAMES_BY_TYPE: Record<string, FrameOption[]> = {
  'ecommerce-hero': heroFrames,
  'ecommerce-product-grid': productGridFrames,
  'ecommerce-flash-sale': flashSaleFrames,
  'ecommerce-category-grid': categoryFrames,
  'ecommerce-promo-banner': promoBannerFrames,
  'ecommerce-testimonials': testimonialsFrames,
  'ecommerce-newsletter': newsletterFrames,
  // Legacy section frames
  'home-hero': heroFrames,
  'home-why-choose-us': [
    {
      id: '4-cards-row',
      label: '4 بطاقات في صف',
      svg: (
        <svg viewBox="0 0 80 50" className="w-full h-full">
          <rect width="80" height="50" rx="4" fill="#f8fafc" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={2 + i * 20} y="8" width="16" height="32" rx="2" fill="white" />
              <circle cx={10 + i * 20} cy="16" r="4" fill="#e2e8f0" />
              <rect x={4 + i * 20} y="22" width="12" height="2" rx="1" fill="#94a3b8" />
              <rect x={4 + i * 20} y="26" width="10" height="2" rx="1" fill="#e2e8f0" />
              <rect x={4 + i * 20} y="30" width="8" height="2" rx="1" fill="#e2e8f0" />
            </g>
          ))}
        </svg>
      ),
    },
    {
      id: '2-col-list',
      label: 'قائمة عمودين',
      svg: (
        <svg viewBox="0 0 80 50" className="w-full h-full">
          <rect width="80" height="50" rx="4" fill="#f8fafc" />
          {[0, 1].map((ci) => (
            <g key={ci}>
              {[0, 1].map((ri) => (
                <g key={ri}>
                  <circle cx={10 + ci * 40} cy={10 + ri * 18} r="4" fill="#e2e8f0" />
                  <rect x={18 + ci * 40} y={7 + ri * 18} width="18" height="3" rx="1" fill="#94a3b8" />
                  <rect x={18 + ci * 40} y={12 + ri * 18} width="14" height="2" rx="1" fill="#e2e8f0" />
                </g>
              ))}
            </g>
          ))}
        </svg>
      ),
    },
  ],
};

// ─── FramesPicker Component ────────────────────────────────────────────────────

interface FramesPickerProps {
  nodeType: string;
  currentFrame: string;
  onFrameChange: (frameId: string) => void;
}

export default function FramesPicker({ nodeType, currentFrame, onFrameChange }: FramesPickerProps) {
  const frames = FRAMES_BY_TYPE[nodeType];

  if (!frames || frames.length === 0) {
    return (
      <div className="py-8 text-center">
        <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-xl">🖼️</div>
        <p className="text-xs font-black text-slate-500">لا توجد إطارات متاحة لهذا المكون</p>
        <p className="text-[10px] text-slate-400 mt-1">يمكنك استخدام إعدادات النمط لتخصيص هذا القسم</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="space-y-1">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">تخطيط القسم</span>
        <p className="text-[10px] text-slate-400 leading-normal">
          اختر إطار التخطيط المناسب. يؤثر الإطار على موضع العناصر وشكل القسم.
        </p>
      </div>

      {/* Frame Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {frames.map((frame) => {
          const isActive = currentFrame === frame.id;
          return (
            <button
              key={frame.id}
              onClick={() => onFrameChange(frame.id)}
              className={`relative flex flex-col gap-2 p-1.5 rounded-2xl border-2 transition-all group cursor-pointer text-right ${
                isActive
                  ? 'border-blue-500 bg-blue-50/50 shadow-md shadow-blue-500/10'
                  : 'border-slate-100 bg-white hover:border-blue-300 hover:shadow-sm'
              }`}
            >
              {/* Thumbnail */}
              <div className={`w-full aspect-video rounded-xl overflow-hidden border transition-colors ${
                isActive ? 'border-blue-200' : 'border-slate-100'
              }`}>
                {frame.svg}
              </div>

              {/* Label */}
              <div className="px-1 pb-0.5">
                <p className={`text-[10px] font-black leading-tight transition-colors ${
                  isActive ? 'text-blue-600' : 'text-slate-600 group-hover:text-slate-800'
                }`}>
                  {frame.label}
                </p>
                {frame.description && (
                  <p className="text-[9px] text-slate-400 mt-0.5 leading-tight line-clamp-1">{frame.description}</p>
                )}
              </div>

              {/* Active checkmark */}
              {isActive && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <Check size={10} className="text-white" strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Current Frame indicator */}
      <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-2xl">
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        <span className="text-[10px] font-bold text-slate-500">
          الإطار الحالي: <span className="text-slate-700 font-black">{frames.find(f => f.id === currentFrame)?.label || currentFrame}</span>
        </span>
      </div>
    </div>
  );
}
