import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CreditCard, Navigation, Smartphone, Banknote, Upload, ArrowRight, ShieldCheck, Truck, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutPageProps {
  items: CartItem[];
  onBack: () => void;
  onComplete: (method: string) => void;
  key?: React.Key;
}

const CheckoutPage = ({ items, onBack, onComplete }: CheckoutPageProps) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'instapay' | 'vodafone' | 'cash'>('card');
  const [walletPhone, setWalletPhone] = useState('');
  const [receiptImage, setReceiptImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    phone: ''
  });

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 99 ? 0 : 15;
  const total = subtotal + shipping;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const methods: { id: 'card' | 'instapay' | 'vodafone' | 'cash', name: string, icon: any, desc: string }[] = [
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard size={20} />, desc: 'Visa, Mastercard, AMEX' },
    { id: 'instapay', name: 'InstaPay', icon: <Navigation size={20} />, desc: 'Instant bank transfer' },
    { id: 'vodafone', name: 'Vodafone Cash', icon: <Smartphone size={20} />, desc: 'Mobile wallet payment' },
    { id: 'cash', name: 'Cash on Delivery', icon: <Banknote size={20} />, desc: 'Pay when you receive' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gray-50/50 min-h-screen pb-20"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-12">
          <button onClick={onBack} className="p-2 hover:bg-white rounded-full transition-all group shadow-sm bg-white">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-8">
            {/* Steps Indicator */}
            <div className="flex items-center gap-4 mb-8 px-2">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 1 ? 'bg-brand-blue text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                <span className={`text-xs font-bold ${step >= 1 ? 'text-brand-blue' : 'text-gray-400'}`}>Shipping</span>
              </div>
              <div className="h-px w-12 bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 2 ? 'bg-brand-blue text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                <span className={`text-xs font-bold ${step >= 2 ? 'text-brand-blue' : 'text-gray-400'}`}>Payment</span>
              </div>
            </div>

            {step === 1 ? (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-8">Shipping Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-blue transition-colors font-medium text-sm"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-blue transition-colors font-medium text-sm"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Shipping Address</label>
                    <input 
                      type="text" 
                      placeholder="Street address, apartment, suite, etc."
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-blue transition-colors font-medium text-sm"
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">City</label>
                    <input 
                      type="text" 
                      placeholder="New York"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-blue transition-colors font-medium text-sm"
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-blue transition-colors font-medium text-sm"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <button 
                  onClick={() => setStep(2)}
                  className="w-full mt-10 bg-brand-blue hover:bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all"
                >
                  Continue to Payment
                  <ArrowRight size={20} />
                </button>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold mb-8">Choose Payment Method</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {methods.map(method => (
                      <button 
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`p-6 rounded-[2rem] border-2 transition-all text-left flex flex-col gap-4 group ${paymentMethod === method.id ? 'border-brand-blue bg-blue-50/50' : 'border-gray-50 hover:border-gray-200 bg-white'}`}
                      >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${paymentMethod === method.id ? 'bg-brand-blue text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-white'}`}>
                          {method.icon}
                        </div>
                        <div>
                          <p className="font-bold text-sm mb-1">{method.name}</p>
                          <p className="text-[10px] text-gray-400 font-medium">{method.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {paymentMethod === 'vodafone' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-8 p-8 bg-red-50/50 rounded-3xl border border-red-100 space-y-4">
                      <p className="text-xs font-bold text-red-500 uppercase tracking-widest">Mobile Wallet Details</p>
                      <input 
                        type="tel" 
                        placeholder="010XXXXXXXX"
                        className="w-full bg-white border border-red-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-400 transition-colors font-medium text-sm"
                        value={walletPhone}
                        onChange={e => setWalletPhone(e.target.value)}
                      />
                    </motion.div>
                  )}

                  {paymentMethod === 'instapay' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-8 p-8 bg-blue-50/50 rounded-3xl border border-blue-100 space-y-6">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-brand-blue uppercase tracking-widest">Transfer Instructions</p>
                        <span className="text-[10px] font-black text-blue-300">Address: NEXASTORE@INSTAPAY</span>
                      </div>
                      <div className="border-2 border-dashed border-blue-200 rounded-[2rem] p-10 text-center relative group cursor-pointer hover:bg-white transition-colors">
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setReceiptImage(e.target.files?.[0] || null)} />
                        <Upload size={32} className="mx-auto text-blue-300 mb-4 group-hover:scale-110 transition-transform" />
                        <p className="text-sm font-bold text-brand-dark mb-1">{receiptImage ? receiptImage.name : 'Upload Payment Receipt'}</p>
                        <p className="text-[10px] text-gray-400">PNG, JPG up to 10MB</p>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="px-8 py-4 rounded-2xl border border-gray-200 font-bold text-gray-500 hover:bg-white transiton-all">Back</button>
                  <button 
                    onClick={() => onComplete(paymentMethod)}
                    className="flex-1 bg-brand-blue hover:bg-blue-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-3"
                  >
                    Confirm Order & Pay
                    <Check size={20} />
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-4 sticky top-32">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-8">Order Summary</h2>
              <div className="space-y-6 mb-8 overflow-y-auto max-h-[300px] pr-2 scrollbar-hide">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                      <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold line-clamp-1 mb-1">{item.name}</h4>
                      <p className="text-[10px] text-gray-400 mb-2">Qty: {item.quantity} • {item.selectedSize || 'M'}</p>
                      <p className="text-xs font-bold text-brand-blue">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="h-px bg-gray-50 mb-6"></div>
              
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-xs font-bold text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-brand-dark">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-gray-400">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-500' : 'text-brand-dark'}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-black text-brand-dark pt-4 border-t border-gray-50 border-dashed">
                  <span>Total</span>
                  <span className="text-brand-blue">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={16} className="text-green-500" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">SSL Secure Payment</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck size={16} className="text-blue-500" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Fast Tracked Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;
