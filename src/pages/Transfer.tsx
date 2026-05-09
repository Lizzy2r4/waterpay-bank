import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Landmark, Search, User, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const Transfer: React.FC = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [bank, setBank] = useState('Select Bank');
  const navigate = useNavigate();

  const handleNext = () => {
    if (accountNumber.length === 10) {
      navigate('/confirm', { state: { accountNumber, bank } });
    }
  };

  const banks = [
    { name: 'OPay', icon: 'OP' },
    { name: 'Kuda Bank', icon: 'KB' },
    { name: 'GTBank', icon: 'GT' },
    { name: 'Zenith Bank', icon: 'ZB' },
    { name: 'UBA', icon: 'UB' },
    { name: 'Moniepoint', icon: 'MP' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-4 space-y-6"
    >
      <div className="flex items-center gap-4 mb-2">
        <button onClick={() => navigate(-1)} className="text-slate-600">
          <ChevronRight size={24} className="rotate-180" />
        </button>
        <h2 className="text-lg font-bold">Transfer to Bank</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-slate-500 uppercase">Account Number</Label>
          <div className="relative">
            <Input 
              type="tel" 
              placeholder="Enter 10-digit account number" 
              className="h-14 bg-slate-50 border-none rounded-xl text-lg font-semibold pl-4"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
            />
            {accountNumber.length === 10 && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded">
                VERIFIED
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold text-slate-500 uppercase">Select Bank</Label>
          <div className="grid grid-cols-1 gap-2">
            {banks.map((b) => (
              <button 
                key={b.name}
                onClick={() => setBank(b.name)}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${bank === b.name ? 'border-emerald-500 bg-emerald-50/50 ring-1 ring-emerald-500' : 'border-slate-100 bg-white'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${bank === b.name ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {b.icon}
                  </div>
                  <span className="font-semibold text-slate-800">{b.name}</span>
                </div>
                {bank === b.name && <div className="w-2 h-2 rounded-full bg-emerald-600" />}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <Button 
            disabled={accountNumber.length < 10 || bank === 'Select Bank'}
            className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-lg font-bold shadow-lg shadow-emerald-100"
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-800">Recent Recipients</h3>
          <button className="text-emerald-600 text-xs font-bold">Clear All</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { name: 'John Doe', avatar: 'JD' },
            { name: 'Sarah W.', avatar: 'SW' },
            { name: 'Mike T.', avatar: 'MT' },
            { name: 'Bolu A.', avatar: 'BA' },
          ].map((r, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[70px]">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-slate-100 text-slate-600 font-bold shadow-sm">
                {r.avatar}
              </div>
              <span className="text-[10px] font-medium text-slate-600 whitespace-nowrap">{r.name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Transfer;