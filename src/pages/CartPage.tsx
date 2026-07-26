import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  Tag,
  X,
  Loader2,
  CheckCircle2,
  Star,
} from "lucide-react";
import { CartItem } from "../types";
import { Coupon } from "../types/api";
import { couponService } from "../services/couponService";
import { HttpError } from "../services/httpClient";
import { tokenStorage } from "../services/authClient";

interface CartPageProps {
  items: CartItem[];
  onBack: () => void;
  onUpdateQuantity: (id: string, q: number) => void;
  onRemove: (id: string) => void;
  onCheckout: (coupon: Coupon | null, total: number) => void;
  currentUserId?: number;
  onLoginRequired?: () => void;
  key?: React.Key;
}

const CartPage = ({
  items,
  onBack,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  currentUserId,
  onLoginRequired,
}: CartPageProps) => {
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 99 ? 0 : 15;

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ┘ä┘ê ╪¬╪╣╪»┘è┘ä ╪º┘ä┘â╪º╪▒╪¬ ╪«┘ä┘ë ╪º┘ä┘Ç subtotal ┘è┘é┘ä ╪╣┘å ╪º┘ä╪¡╪» ╪º┘ä╪ú╪»┘å┘ë ╪¿╪¬╪º╪╣ ╪º┘ä┘â┘ê╪¿┘ê┘å ╪º┘ä┘à╪╖╪¿┘é╪î ╪┤┘è┘ä┘ç ╪¬┘ä┘é╪º╪ª┘è
  useEffect(() => {
    if (appliedCoupon && subtotal < Number(appliedCoupon.min_order_amount)) {
      setAppliedCoupon(null);
      setCouponError(
        "╪º┘ä╪│┘ä╪⌐ ┘ä┘à ╪¬╪╣╪» ╪¬╪│╪¬┘ê┘ü┘è ╪º┘ä╪¡╪» ╪º┘ä╪ú╪»┘å┘ë ┘ä┘ä╪╖┘ä╪¿ ╪º┘ä╪«╪º╪╡ ╪¿┘ç╪░╪º ╪º┘ä┘â┘ê╪¿┘ê┘å",
      );
    }
  }, [subtotal, appliedCoupon]);

  const discount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? (subtotal * Number(appliedCoupon.value)) / 100
      : Number(appliedCoupon.value)
    : 0;

  const total = Math.max(subtotal + shipping - discount, 0);

  const handleApplyCoupon = async () => {
    const token = tokenStorage.get();
    if (!token) {
      setShowLoginAlert(true);
      return;
    }

    const code = couponCode.trim();
    if (!code) return;

    setCouponLoading(true);
    setCouponError(null);

    try {
      const res = await couponService.apply({ code, subtotal });

      if (!res.status) {
        setCouponError(res.message || "╪¡╪»╪½ ╪«╪╖╪ú ╪ú╪½┘å╪º╪í ╪º┘ä╪¬╪¡┘é┘é ┘à┘å ╪º┘ä┘â┘ê╪¿┘ê┘å");
        setAppliedCoupon(null);
        return;
      }

      setAppliedCoupon(res.data);
      setCouponCode("");
    } catch (err: any) {
      if (err instanceof HttpError && err.status === 401) {
        setShowLoginAlert(true);
        return;
      }
      const msg =
        err instanceof HttpError
          ? (err.body as any)?.message || "╪¬╪╣╪░╪▒ ╪º┘ä╪º╪¬╪╡╪º┘ä ╪¿╪º┘ä╪«╪º╪»┘à╪î ╪¡╪º┘ê┘ä ┘à╪▒╪⌐ ╪ú╪«╪▒┘ë"
          : "╪¬╪╣╪░╪▒ ╪º┘ä╪º╪¬╪╡╪º┘ä ╪¿╪º┘ä╪«╪º╪»┘à╪î ╪¡╪º┘ê┘ä ┘à╪▒╪⌐ ╪ú╪«╪▒┘ë";
      setCouponError(msg);
      setAppliedCoupon(null);
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white min-h-screen"
    >
      {/* Login Alert */}
      {showLoginAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
              <Tag size={28} className="text-brand-blue" />
            </div>
            <h3 className="text-xl font-bold">Login Required</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              You need to be logged in to apply a coupon.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowLoginAlert(false)}
                className="flex-1 py-3 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLoginAlert(false);
                  onLoginRequired?.();
                }}
                className="flex-1 py-3 rounded-2xl bg-brand-blue text-white text-sm font-bold hover:bg-blue-600 transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Shopping Bag</h1>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-brand-blue transition-colors group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Continue Shopping
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-100">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <ShoppingBag size={32} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your bag is empty</h2>
            <p className="text-gray-400 mb-8 max-w-xs mx-auto text-sm">
              Looks like you haven't added anything to your bag yet. Start
              browsing our latest collections!
            </p>
            <button
              onClick={onBack}
              className="px-8 py-3 bg-brand-blue text-white rounded-full font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-100"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-8">
              {items.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  className="flex gap-6 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm group hover:shadow-md transition-shadow"
                >
                  <div className="w-24 h-32 md:w-32 md:h-40 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                        <p className="text-xs text-gray-400">
                          Size:{" "}
                          <span className="text-gray-600 font-bold">
                            {item.selectedSize || "M"}
                          </span>{" "}
                          ΓÇó Color:{" "}
                          <span className="text-gray-600 font-bold">
                            Midnight Blue
                          </span>
                        </p>
                      </div>
                      <button
                        onClick={() => onRemove(item.id!)}
                        className="p-2 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center bg-gray-50 rounded-xl px-1 py-1">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.id!,
                              Math.max(1, item.quantity - 1),
                            )
                          }
                          className="p-1.5 hover:bg-white rounded-lg transition-all"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id!, item.quantity + 1)
                          }
                          className="p-1.5 hover:bg-white rounded-lg transition-all"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-bold text-brand-blue">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="sticky top-32">
              <div className="bg-brand-dark text-white rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>

                <h2 className="text-2xl font-bold mb-6">Summary</h2>

                {/* Coupon Input */}
                <div className="mb-6">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 rounded-2xl px-4 py-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-green-400" />
                        <div>
                          <p className="text-sm font-bold text-green-400">
                            {appliedCoupon.code}
                          </p>
                          <p className="text-[11px] text-gray-400">
                            {appliedCoupon.type === "percentage"
                              ? `╪«╪╡┘à ${Number(appliedCoupon.value)}%`
                              : `╪«╪╡┘à $${Number(appliedCoupon.value).toFixed(2)}`}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 bg-white/5 rounded-2xl p-1.5 border border-white/10 focus-within:border-brand-blue transition-all">
                        <Tag size={16} className="text-gray-500 ml-2" />
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => {
                            setCouponCode(e.target.value.toUpperCase());
                            if (couponError) setCouponError(null);
                          }}
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleApplyCoupon()
                          }
                          placeholder="╪ú╪»╪«┘ä ┘â┘ê╪» ╪º┘ä┘â┘ê╪¿┘ê┘å"
                          className="flex-1 bg-transparent text-sm font-bold placeholder:text-gray-500 placeholder:font-normal outline-none py-1.5"
                        />
                        <button
                          onClick={handleApplyCoupon}
                          disabled={!couponCode.trim() || couponLoading}
                          className="px-4 py-2 bg-brand-blue hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                        >
                          {couponLoading ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            "╪¬╪╖╪¿┘è┘é"
                          )}
                        </button>
                      </div>
                      <AnimatePresence>
                        {couponError && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-[11px] text-red-400 mt-2 px-1"
                          >
                            {couponError}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-white font-bold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Shipping</span>
                    <span
                      className={`font-bold ${shipping === 0 ? "text-green-400" : "text-white"}`}
                    >
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span className="font-bold text-green-400">
                        -${discount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="h-px bg-white/10 my-6"></div>
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-medium">Total Price</span>
                    <span className="text-3xl font-bold text-brand-blue">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onCheckout(appliedCoupon, total)}
                  className="w-full bg-brand-blue hover:bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-blue-900 group"
                >
                  Checkout Now
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
                <p className="text-[10px] text-gray-500 text-center mt-6">
                  Secure Checkout ΓÇó Tax calculated at next step
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CartPage;
