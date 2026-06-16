import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => (
  <footer className="bg-[#0f172a] text-white pt-20 pb-10 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
        <div className="lg:col-span-1">
          <h4 className="font-bold mb-6 text-gray-400 text-sm tracking-wider uppercase">Links</h4>
          <ul className="flex flex-col gap-4 text-xs font-medium text-gray-300">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Services</a></li>
            <li><a href="#" className="hover:text-white">Shop</a></li>
            <li><a href="#" className="hover:text-white">For sale</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-gray-400 text-sm tracking-wider uppercase">Categories</h4>
          <ul className="flex flex-col gap-4 text-xs font-medium text-gray-300">
            <li><a href="#" className="hover:text-white">Men</a></li>
            <li><a href="#" className="hover:text-white">Women</a></li>
            <li><a href="#" className="hover:text-white">Children</a></li>
            <li><a href="#" className="hover:text-white">Winter</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-gray-400 text-sm tracking-wider uppercase">Shop</h4>
          <ul className="flex flex-col gap-4 text-xs font-medium text-gray-300">
            <li><a href="#" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">Help</a></li>
            <li><a href="#" className="hover:text-white">Customers</a></li>
            <li><a href="#" className="hover:text-white">Forum</a></li>
          </ul>
        </div>
        <div className="lg:col-span-2">
          <h4 className="font-bold mb-6 text-gray-400 text-sm tracking-wider uppercase">Subscribe To Get Regular Updates</h4>
          <p className="text-xs text-gray-400 mb-6 leading-relaxed">
            We are giving regular discount and offer for our customers to get those subscribe now.
          </p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl flex-1 text-sm focus:outline-none focus:border-brand-blue"
            />
            <button className="bg-brand-blue p-3 rounded-xl hover:bg-blue-600 transition-colors">
              <ArrowRight size={20} />
            </button>
          </div>
          <div className="flex gap-4 mt-8">
            <Facebook size={20} className="text-gray-400 hover:text-white cursor-pointer" />
            <Twitter size={20} className="text-gray-400 hover:text-white cursor-pointer" />
            <Instagram size={20} className="text-gray-400 hover:text-white cursor-pointer" />
            <Linkedin size={20} className="text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-2xl font-black tracking-tighter">E.buy<span className="text-brand-blue">.</span></div>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">© 2024 E.buy Fashion. All rights reserved.</p>
        <div className="flex gap-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
