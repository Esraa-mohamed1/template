import React from 'react';
import { motion } from 'motion/react';
import { Search, User, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
  onCategoryClick: (category: string) => void;
  onUserClick: () => void;
  onBuilderClick: () => void;
}

const Navbar = ({ cartCount, onCartClick, onLogoClick, onCategoryClick, onUserClick, onBuilderClick }: NavbarProps) => (
  <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div 
        className="text-2xl font-black tracking-tighter cursor-pointer text-brand-dark hover:text-brand-blue transition-colors"
        onClick={onLogoClick}
      >
        E.buy<span className="text-brand-blue">.</span>
      </div>
      
      <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-widest text-gray-400">
        <button onClick={() => onCategoryClick('All')} className="hover:text-brand-blue transition-colors cursor-pointer">Collections</button>
        <button onClick={() => onCategoryClick('Men')} className="hover:text-brand-blue transition-colors cursor-pointer">Men</button>
        <button onClick={() => onCategoryClick('Women')} className="hover:text-brand-blue transition-colors cursor-pointer">Women</button>
        <button onClick={() => onCategoryClick('Children')} className="hover:text-brand-blue transition-colors cursor-pointer">Children</button>
        <button onClick={() => onCategoryClick('Winter')} className="hover:text-brand-blue transition-colors cursor-pointer">Winter Sale</button>
        <button onClick={onBuilderClick} className="text-blue-500 hover:text-blue-600 font-extrabold transition-colors cursor-pointer">Builder ✨</button>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex relative group items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-100 focus-within:border-brand-blue transition-all">
          <Search size={16} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search collections..." 
            className="bg-transparent border-none focus:ring-0 text-xs font-medium w-32 md:w-48 placeholder:text-gray-300"
          />
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button onClick={onUserClick} className="p-2.5 hover:bg-gray-100 rounded-2xl transition-all text-gray-600">
            <User size={20} />
          </button>
          <button 
            onClick={onCartClick}
            className="relative p-2.5 hover:bg-brand-blue hover:text-white rounded-2xl transition-all text-gray-600 shadow-sm"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-brand-blue text-white text-[10px] font-bold rounded-lg flex items-center justify-center border-2 border-white shadow-lg"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
