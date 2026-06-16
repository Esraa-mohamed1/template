import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ShoppingBag, Trash2, Minus, Plus, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartPageProps {
  items: CartItem[];
  onBack: () => void;
  onUpdateQuantity: (id: string, q: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  key?: React.Key;
}

const CartPage = ({ items, onBack, onUpdateQuantity, onRemove, onCheckout }: CartPageProps) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 99 ? 0 : 15;
  const total = subtotal + shipping;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Shopping Bag</h1>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-brand-blue transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-100">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <ShoppingBag size={32} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your bag is empty</h2>
            <p className="text-gray-400 mb-8 max-w-xs mx-auto text-sm">Looks like you haven't added anything to your bag yet. Start browsing our latest collections!</p>
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
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                        <p className="text-xs text-gray-400">Size: <span className="text-gray-600 font-bold">{item.selectedSize || 'M'}</span> • Color: <span className="text-gray-600 font-bold">Midnight Blue</span></p>
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
                          onClick={() => onUpdateQuantity(item.id!, Math.max(1, item.quantity - 1))}
                          className="p-1.5 hover:bg-white rounded-lg transition-all"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id!, item.quantity + 1)}
                          className="p-1.5 hover:bg-white rounded-lg transition-all"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-bold text-brand-blue">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="sticky top-32">
              <div className="bg-brand-dark text-white rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative">
                {/* Decorative blob */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                
                <h2 className="text-2xl font-bold mb-8">Summary</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Shipping</span>
                    <span className={`font-bold ${shipping === 0 ? 'text-green-400' : 'text-white'}`}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="h-px bg-white/10 my-6"></div>
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-medium">Total Price</span>
                    <span className="text-3xl font-bold text-brand-blue">${total.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-brand-blue hover:bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-blue-900 group"
                >
                  Checkout Now
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-[10px] text-gray-500 text-center mt-6">Secure Checkout • Tax calculated at next step</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CartPage;
