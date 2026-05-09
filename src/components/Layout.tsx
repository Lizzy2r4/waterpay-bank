import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, ArrowLeftRight, CreditCard, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  user: { name: string; avatar: string };
  balance: number;
}

const Layout: React.FC<LayoutProps> = ({ children, user, balance }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-white shadow-xl relative overflow-hidden">
      {/* Header */}
      <header className={`p-4 flex items-center justify-between transition-colors ${isHome ? 'bg-emerald-600 text-white' : 'bg-white text-slate-900 border-b'}`}>
        <div className="flex items-center gap-3">
          <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-white/20 object-cover" />
          <div>
            <p className={`text-xs ${isHome ? 'text-emerald-100' : 'text-slate-500'}`}>Welcome,</p>
            <p className="font-semibold">{user.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className={isHome ? 'text-white hover:bg-emerald-700' : 'text-slate-600'}>
            <Bell size={20} />
          </Button>
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
            PK
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t flex justify-around items-center py-3 px-2 z-50">
        <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
          <Home size={22} />
          <span className="text-[10px] font-medium">Home</span>
        </NavLink>
        <NavLink to="/transfer" className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
          <ArrowLeftRight size={22} />
          <span className="text-[10px] font-medium">Transfer</span>
        </NavLink>
        <div className="relative -top-6">
          <div className="bg-emerald-600 w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200 border-4 border-white">
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/c3462f35-ff7f-48de-810e-2ef376fade31/prankpay-logo-60b1cd95-1778336652356.webp" 
              className="w-8 h-8 invert brightness-0" 
              alt="Logo" 
            />
          </div>
        </div>
        <NavLink to="/cards" className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
          <CreditCard size={22} />
          <span className="text-[10px] font-medium">Cards</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
          <User size={22} />
          <span className="text-[10px] font-medium">Me</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Layout;