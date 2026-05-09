import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const ConfirmTransfer: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleTransfer = () => {
    if (parseFloat(amount) > 0) {
      navigate('/success', { 
        state: { 
          amount: parseFloat(amount), 
          recipientName: 'Musa Ibrahim', // Simulated name lookup
          bankName: state.bank,
          accountNumber: state.accountNumber,
          note
        } 
      });
    }
  };

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
        <h2 className="text-lg font-bold">Confirm Transfer</h2>
      </div>

      <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex items-center gap-4">
        <div className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
          MI
        </div>
        <div>
          <p className="font-bold text-slate-900 text-lg">Musa Ibrahim</p>
          <p className="text-sm text-slate-500">{state.bank} • {state.accountNumber}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <Label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Amount (₦)</Label>
          <div className="relative inline-block w-full">
            <input 
              type="tel" 
              className="w-full text-center text-5xl font-bold text-slate-900 bg-transparent border-none focus:ring-0"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ''))}
              autoFocus
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-500 uppercase">Remark (Optional)</Label>
            <Input 
              placeholder="What's this for?" 
              className="h-12 bg-slate-50 border-none rounded-xl"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="flex items-start gap-2 text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <Info size={14} className="mt-0.5 text-emerald-600 flex-shrink-0" />
            <p>Transaction fees: ₦0.00. Funds will be sent immediately to the recipient's bank account.</p>
          </div>
        </div>

        <div className="pt-4">
          <Button 
            disabled={!amount || parseFloat(amount) <= 0}
            className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-lg font-bold shadow-lg shadow-emerald-100"
            onClick={handleTransfer}
          >
            Send Money
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ConfirmTransfer;