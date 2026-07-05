import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { categoryService } from "../../services/categoryService";
import { Category } from "../../types/api";

interface HomeCategoriesProps {
  title?: string;
  textColor?: string;
  bgColor?: string;
  accentColor?: string;
  imageSize?: 'small' | 'medium' | 'large';
  onCategoryClick?: (c: string) => void;
}

export default function HomeCategories({
  title = "Popular categories",
  textColor = "#1e293b",
  bgColor = "#ffffff",
  accentColor = "#f97316",
  imageSize = "medium",
  onCategoryClick
}: HomeCategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    categoryService
      .getAll()
      .then((res) => setCategories(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Map category circle sizes
  const sizeMap: Record<string, string> = {
    small: 'w-16 h-16 text-xs',
    medium: 'w-24 h-24 text-sm',
    large: 'w-32 h-32 text-base',
  };
  const circleSizeClass = sizeMap[imageSize] || 'w-24 h-24';

  if (loading) return <div className="py-16 text-center text-sm font-semibold text-gray-500">Loading Categories...</div>;
  if (error)
    return <div className="py-16 text-center text-red-500 font-semibold">{error}</div>;

  return (
    <section id="categories-section" style={{ backgroundColor: bgColor }} className="px-6 py-16 rounded-[inherit] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h2 style={{ color: textColor }} className="text-3xl font-bold text-center mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -5 }}
              onMouseEnter={() => setHoveredId(String(cat.id))}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onCategoryClick && onCategoryClick(cat.slug)}
              className="group cursor-pointer flex flex-col items-center"
            >
              <div 
                style={{ 
                  borderColor: hoveredId === String(cat.id) ? accentColor : '#f1f5f9'
                }}
                className={`${circleSizeClass} rounded-full overflow-hidden mb-4 border-2 transition-colors duration-300 bg-gray-100`}
              >
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">
                    {cat.name[0]}
                  </div>
                )}
              </div>
              <span style={{ color: textColor }} className="font-semibold text-center leading-tight">{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
