import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { categoryService } from "../../services/categoryService";
import { Category } from "../../types/api";

interface HomeCategoriesProps {
  title?: string;
  onCategoryClick?: (c: string) => void;
}

export default function HomeCategories({
  title = "Popular categories",
  onCategoryClick
}: HomeCategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    categoryService
      .getAll()
      .then((res) => setCategories(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-16 text-center text-sm font-semibold text-gray-500">Loading Categories...</div>;
  if (error)
    return <div className="py-16 text-center text-red-500 font-semibold">{error}</div>;

  return (
    <section id="categories-section" className="px-6 py-16 bg-white rounded-[inherit]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -5 }}
              onClick={() => onCategoryClick && onCategoryClick(cat.slug)}
              className="group cursor-pointer flex flex-col items-center"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-gray-100 group-hover:border-brand-blue transition-colors bg-gray-100">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    {cat.name[0]}
                  </div>
                )}
              </div>
              <span className="font-semibold text-gray-700">{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
