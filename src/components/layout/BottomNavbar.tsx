import React from 'react';
import { motion } from 'motion/react';
import { Home, Search, ShoppingBag, User } from 'lucide-react';

interface BottomNavbarProps {
  currentView: string;
  cartCount: number;
  onHomeClick: () => void;
  onCartClick: () => void;
  onUserClick: () => void;
  onDiscoverClick: () => void;
}

const BottomNavbar = ({ currentView, cartCount, onHomeClick, onCartClick, onUserClick, onDiscoverClick }: BottomNavbarProps) => (
  <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
    <nav className="bg-brand-dark/90 backdrop-blur-2xl rounded-[2.5rem] px-8 py-4 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 relative overflow-hidden">
      {/* Active Indicator Background */}
      <motion.div 
        className="absolute h-12 w-12 bg-brand-blue rounded-2xl -z-10"
        animate={{ 
          x: currentView === 'home' ? 0 : 
             currentView === 'categories' ? 76 : 
             currentView === 'cart' ? 152 : 228 
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ left: 'calc(2rem - 6px)' }}
      />

      {[
        { id: 'home', icon: <Home size={20} />, action: onHomeClick },
        { id: 'categories', icon: <Search size={20} />, action: onDiscoverClick },
        { id: 'cart', icon: <div className="relative"><ShoppingBag size={20} />{cartCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-light text-[8px] font-bold text-brand-dark rounded-full flex items-center justify-center">{cartCount}</span>}</div>, action: onCartClick },
        { id: 'profile', icon: <User size={20} />, action: onUserClick },
      ].map((item) => (
        <button 
          key={item.id}
          onClick={item.action}
          className={`relative z-10 w-11 h-11 flex items-center justify-center transition-all duration-300 ${currentView === item.id ? 'text-white' : 'text-gray-400'}`}
        >
          <motion.div 
            whileTap={{ scale: 0.9 }}
            animate={currentView === item.id ? { scale: 1.1 } : { scale: 1 }}
          >
            {item.icon}
          </motion.div>
          {currentView === item.id && (
            <motion.div 
              layoutId="navDot"
              className="absolute -bottom-1.5 w-1 h-1 bg-white rounded-full"
            />
          )}
        </button>
      ))}
    </nav>
  </div>
);

export default BottomNavbar;
