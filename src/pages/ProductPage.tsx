import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Star,
  Heart,
  Share2,
  Minus,
  Plus,
  ShoppingBag,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { ProductDetail } from "../types/api";
import { productService } from "../services/productService";

interface ProductPageProps {
  productId: string;
  onBack: () => void;
  onAddToCart: (p: ProductDetail, q: number, variant?: any) => void;
}

const ProductPage = ({ productId, onBack, onAddToCart }: ProductPageProps) => {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [selectedImg, setSelectedImg] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setError(false);

    productService
      .getOne(productId)
      .then((res) => {
        const p = res.data;
        setProduct(p);

        const firstImg =
          p.gallery?.find((g) => g.is_primary)?.image ??
          p.gallery?.[0]?.image ??
          "/placeholder.png";
        setSelectedImg(firstImg);

        setQuantity(1);
        setSelectedColor(p.variants?.[0]?.color ?? null);
        setSelectedSize(p.variants?.[0]?.size ?? null);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400">Product not found.</p>
        <button onClick={onBack} className="text-brand-blue font-bold">
          Back to Collections
        </button>
      </div>
    );
  }

  const price = parseFloat(product.price);
  const oldPrice = product.compare_price
    ? parseFloat(product.compare_price)
    : null;
  const rating = parseFloat(product.average_rating) || 0;

  const gallery = product.gallery?.length
    ? product.gallery.map((g) => g.image)
    : ["/placeholder.png"];

  // ألوان ومقاسات فريدة من الـ variants
  const colors = Array.from(
    new Set(product.variants?.map((v) => v.color).filter(Boolean)),
  );
  const sizes = Array.from(
    new Set(product.variants?.map((v) => v.size).filter(Boolean)),
  );

  const selectedVariant = product.variants?.find(
    (v) => v.color === selectedColor && v.size === selectedSize,
  );

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedVariant);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-brand-blue mb-8 transition-colors group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Collections
        </button>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Gallery View */}
          <div className="space-y-6">
            <motion.div
              layoutId={`img-${product.id}`}
              className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-sm"
            >
              <img
                src={selectedImg}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(img)}
                  className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${selectedImg === img ? "border-brand-blue scale-95" : "border-transparent opacity-60 hover:opacity-100 scale-100"}`}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    alt={`Gallery ${i}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details View */}
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-brand-blue font-bold text-sm tracking-widest uppercase">
                  {product.category?.name ?? "Best Seller"}
                </span>
                <div className="flex gap-2">
                  <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-400 transition-all">
                    <Heart size={20} />
                  </button>
                  <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-400 hover:text-brand-blue transition-all">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.round(rating) ? "#fbbf24" : "none"}
                      className={
                        i < Math.round(rating)
                          ? "text-amber-400"
                          : "text-gray-200"
                      }
                    />
                  ))}
                  <span className="text-xs font-bold text-gray-500 ml-2">
                    {rating.toFixed(1)} ({product.reviews_count} reviews)
                  </span>
                </div>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-brand-blue">
                  ${price.toFixed(2)}
                </span>
                {oldPrice && oldPrice > price && (
                  <span className="text-xl text-gray-300 line-through mb-1">
                    ${oldPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <p className="text-gray-500 leading-relaxed max-w-lg">
              {product.description || product.short_description}
            </p>

            <div className="space-y-6">
              {sizes.length > 0 && (
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">
                    Select Size
                  </span>
                  <div className="flex gap-3 flex-wrap">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-12 h-12 px-4 rounded-xl border flex items-center justify-center text-sm font-bold transition-all ${selectedSize === size ? "border-brand-blue text-brand-blue bg-blue-50/50" : "border-gray-100 hover:border-gray-200"}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {colors.length > 0 && (
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">
                    Color
                  </span>
                  <div className="flex gap-4">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        title={color}
                        style={{ backgroundColor: color.toLowerCase() }}
                        className={`w-10 h-10 rounded-full border-2 border-white shadow-sm transition-all ${selectedColor === color ? "ring-2 ring-brand-blue" : ""}`}
                      ></button>
                    ))}
                  </div>
                </div>
              )}

              {product.variants?.length > 0 && selectedVariant && (
                <p className="text-xs text-gray-400">
                  {selectedVariant.stock > 0
                    ? `${selectedVariant.stock} in stock`
                    : "Out of stock"}
                </p>
              )}

              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center bg-gray-50 rounded-2xl px-2 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-white rounded-xl transition-all"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-white rounded-xl transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-brand-blue hover:bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-3"
                >
                  <ShoppingBag size={20} />
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold">Secure Delivery</p>
                  <p className="text-[10px] text-gray-400">Guaranteed safety</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                  <Truck size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold">Fast Delivery</p>
                  <p className="text-[10px] text-gray-400">
                    Fast and reliable delivery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductPage;
