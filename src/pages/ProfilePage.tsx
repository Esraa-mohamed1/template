import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, History, Wallet, User as UserIcon, Settings, LogOut, CreditCard, Navigation, Smartphone, Banknote, Check } from 'lucide-react';
import { User, Order, Transaction } from '../types';

interface ProfilePageProps {
  user: User;
  orders: Order[];
  transactions: Transaction[];
  onLogout: () => void;
  onUpdateUser: (u: User) => void;
  key?: React.Key;
}

const ProfilePage = ({ user, orders, transactions, onLogout, onUpdateUser }: ProfilePageProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'history' | 'settings' | 'edit' | 'transactions'>('history');
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);

  const handleUpdate = () => {
    onUpdateUser({ ...user, name: editName, email: editEmail });
    setActiveTab('history');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-4 gap-12 items-start">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1 space-y-8 sticky top-32">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 text-center">
            <div className="relative w-24 h-24 mx-auto mb-6 group cursor-pointer">
              <img src={user.avatar} className="w-full h-full object-cover rounded-3xl" alt={user.name} />
              <div className="absolute inset-0 bg-brand-blue/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl flex items-center justify-center text-white">
                <Camera size={20} />
              </div>
            </div>
            <h2 className="text-xl font-bold mb-1">{user.name}</h2>
            <p className="text-xs text-brand-blue font-bold tracking-widest uppercase mb-6">Member Since {user.joinedAt}</p>
            
            <div className="space-y-2">
              {[
                { id: 'history', label: 'Order History', icon: <History size={16} /> },
                { id: 'transactions', label: 'Transactions', icon: <Wallet size={16} /> },
                { id: 'edit', label: 'Edit Profile', icon: <UserIcon size={16} /> },
                { id: 'settings', label: 'Settings', icon: <Settings size={16} /> },
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-brand-blue text-white shadow-lg shadow-blue-100' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
              <button 
                onClick={() => navigate('/admin/builder')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-blue-500 hover:bg-blue-50 transition-all border border-dashed border-blue-200 mt-4 cursor-pointer"
              >
                <Settings size={16} />
                باني الصفحات (Admin)
              </button>
              <button 
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-400 hover:bg-red-50 transition-all mt-6"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {activeTab === 'history' && (
              <motion.div key="history" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight mb-8">Order History</h2>
                {orders.length === 0 ? (
                  <div className="bg-white rounded-[2.5rem] p-12 text-center border border-gray-100">
                    <History size={48} className="text-gray-100 mx-auto mb-6" />
                    <p className="text-gray-400 font-medium">You haven't placed any orders yet.</p>
                  </div>
                ) : (
                  orders.map(order => (
                    <div key={order.id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:border-brand-blue/20 transition-all group">
                      <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID: {order.id}</p>
                          <p className="text-xl font-bold">Placed on {order.date}</p>
                        </div>
                        <div className="flex items-center gap-8">
                          <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold ${order.status === 'Delivered' ? 'bg-green-50 text-green-500' : 'bg-blue-50 text-brand-blue'}`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                            <p className="text-xl font-bold text-brand-blue tracking-tight">${order.total.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex-shrink-0 w-24 space-y-2">
                            <div className="w-24 h-32 rounded-2xl bg-gray-50 overflow-hidden">
                              <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
                            </div>
                            <p className="text-[10px] font-bold line-clamp-1">{item.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}

            {activeTab === 'transactions' && (
              <motion.div key="transactions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight mb-8">Transactions</h2>
                <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50/50">
                        <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Transaction ID</th>
                        <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                        <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Method</th>
                        <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                        <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {transactions.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-8 py-12 text-center text-gray-400 font-medium">No transactions found.</td>
                        </tr>
                      ) : (
                        transactions.map(t => (
                          <tr key={t.id} className="hover:bg-gray-50/30 transition-colors">
                            <td className="px-8 py-6 font-mono text-xs font-bold text-brand-blue">{t.id}</td>
                            <td className="px-8 py-6 text-sm text-gray-600 font-medium">{t.date}</td>
                            <td className="px-8 py-6">
                              <span className="flex items-center gap-2 text-sm font-bold capitalize">
                                {t.method === 'card' && <CreditCard size={14} className="text-gray-400" />}
                                {t.method === 'instapay' && <Navigation size={14} className="text-gray-400" />}
                                {t.method === 'vodafone' && <Smartphone size={14} className="text-gray-400" />}
                                {t.method === 'cash' && <Banknote size={14} className="text-gray-400" />}
                                {t.method}
                              </span>
                            </td>
                            <td className="px-8 py-6 text-sm font-bold text-gray-900">${t.amount.toFixed(2)}</td>
                            <td className="px-8 py-6 text-right">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${t.status === 'Successful' ? 'bg-green-50 text-green-500' : 'bg-blue-50 text-brand-blue'}`}>
                                <Check size={10} />
                                {t.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'edit' && (
              <motion.div key="edit" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-12 shadow-sm border border-gray-100 max-w-2xl">
                <h2 className="text-2xl font-bold mb-10">Account Information</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Display Name</label>
                    <input 
                      type="text" 
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-blue transition-colors text-sm font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                    <input 
                      type="email" 
                      value={editEmail}
                      onChange={e => setEditEmail(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-blue transition-colors text-sm font-medium"
                    />
                  </div>
                  <button 
                    onClick={handleUpdate}
                    className="w-full bg-brand-blue hover:bg-blue-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-100"
                  >
                    Save Changes
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] p-12 shadow-sm border border-gray-100 max-w-2xl">
                <h2 className="text-2xl font-bold mb-10">Preferences</h2>
                <div className="space-y-4">
                  {[
                    'Email Notifications',
                    'SMS Order Updates',
                    'Two-Factor Authentication',
                    'Marketing Newsletter'
                  ].map(setting => (
                    <div key={setting} className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl">
                      <span className="font-bold text-sm">{setting}</span>
                      <button className="w-12 h-6 bg-brand-blue rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
