import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Filter, Check, Search } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";
import { CategoryWithProducts, CategoryProduct } from "../types/api";
import { categoryService } from "../services/categoryService";

interface CategoriesPageProps {
  initialCategory: string;
  onProductClick: (p: Product) => void;
  onBack: () => void;
  key?: React.Key;
}

const CategoriesPage = ({
  initialCategory,
  onProductClick,
  onBack,
}: CategoriesPageProps) => {
  const [categories, setCategories] = useState<CategoryWithProducts[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(
    initialCategory === "All" ? "All" : initialCategory,
  );
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryService
      .getAllWithProducts()
      .then((res) => setCategories(res.data ?? []))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // كل المنتجات من كل الأقسام، مع اسم وslug القسم
  const allProducts = useMemo(() => {
    return (categories ?? []).flatMap((cat) =>
      cat.products.map((p) => ({
        ...p,
        categoryName: cat.name,
        categorySlug: cat.slug,
      })),
    );
  }, [categories]);

  // أعلى سعر فعلي بين كل المنتجات (للـ slider الديناميكي)
  const priceLimit = useMemo(() => {
    if (allProducts.length === 0) return 100000;
    const prices = allProducts.map((p) => parseFloat(p.price));
    return Math.ceil(Math.max(...prices));
  }, [allProducts]);

  // بمجرد ما الـ priceLimit يتحدد، نبدأ الـ maxPrice بنفس القيمة (مرة واحدة)
  useEffect(() => {
    if (maxPrice === null && allProducts.length > 0) {
      setMaxPrice(priceLimit);
    }
  }, [priceLimit, allProducts, maxPrice]);

  const effectiveMaxPrice = maxPrice ?? priceLimit;

  // فلترة بالـ slug بدل الـ name، لأن activeCategory ممكن تيجي slug من برة
  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const catMatch =
        activeCategory === "All" ||
        p.categorySlug === activeCategory ||
        p.categoryName === activeCategory;
      const priceMatch = parseFloat(p.price) <= effectiveMaxPrice;
      return catMatch && priceMatch;
    });
  }, [allProducts, activeCategory, effectiveMaxPrice]);

  // العنوان: نحاول نلاقي اسم القسم المطابق للـ slug أو الـ name الحالي
  const activeCategoryLabel = useMemo(() => {
    if (activeCategory === "All") return "All";
    const found = categories.find(
      (c) => c.slug === activeCategory || c.name === activeCategory,
    );
    return found ? found.name : activeCategory;
  }, [categories, activeCategory]);

  const toProduct = (p: CategoryProduct): Product => ({
    id: String(p.id),
    name: p.name,
    price: parseFloat(p.price),
    oldPrice: parseFloat(p.compare_price),
    rating: parseFloat(p.average_rating),
    img: p.thumbnail?.image ?? "/placeholder.png",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen pb-20"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-all group"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </button>
            <h1 className="text-3xl font-bold tracking-tight">
              Explore {activeCategoryLabel} Collections
            </h1>
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border ${isFilterOpen ? "bg-brand-blue text-white border-brand-blue" : "bg-white text-gray-600 border-gray-100 hover:border-gray-300"}`}
          >
            <Filter size={16} />
            Filters
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20, width: 0 }}
                animate={{ opacity: 1, x: 0, width: "auto" }}
                exit={{ opacity: 0, x: -20, width: 0 }}
                className="lg:col-span-1 space-y-10 pr-6 border-r border-gray-50 overflow-hidden"
              >
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Categories
                  </h3>
                  <div className="flex flex-col gap-2">
                    {/* All + الأقسام الجاية من الـ API، بنستخدم slug كمعرف */}
                    {[
                      { name: "All", slug: "All" },
                      ...categories.map((c) => ({
                        name: c.name,
                        slug: c.slug,
                      })),
                    ].map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => setActiveCategory(cat.slug)}
                        className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all group ${activeCategory === cat.slug ? "bg-brand-blue text-white" : "text-gray-500 hover:bg-gray-50"}`}
                      >
                        {cat.name}
                        {activeCategory === cat.slug && <Check size={16} />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      Price Range
                    </h3>
                    <span className="text-xs font-bold text-brand-blue">
                      ${effectiveMaxPrice.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={priceLimit}
                    step="500"
                    value={effectiveMaxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                    <span>$0</span>
                    <span>${priceLimit.toLocaleString()}+</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setActiveCategory("All");
                      setMaxPrice(priceLimit);
                    }}
                    className="w-full py-4 text-xs font-bold text-gray-400 hover:text-brand-blue transition-colors text-center uppercase tracking-widest"
                  >
                    Reset All Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div
            className={`${isFilterOpen ? "lg:col-span-3" : "lg:col-span-4"}`}
          >
            {loading ? (
              <div className="py-24 text-center text-gray-400">Loading...</div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredProducts.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-24 text-center bg-gray-50 rounded-[3rem]"
                  >
                    <Search size={40} className="mx-auto text-gray-200 mb-6" />
                    <h3 className="text-xl font-bold mb-2">No items found</h3>
                    <p className="text-sm text-gray-400">
                      Try adjusting your filters.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    layout
                    className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8"
                  >
                    {filteredProducts.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={toProduct(p)}
                        onProductClick={onProductClick}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoriesPage;
