import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, Share2, Download, Bell, Ghost, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Transaction } from '../App';

interface SuccessProps {
  addTransaction: (tx: Transaction) => void;
}

const Success: React.FC<SuccessProps> = ({ addTransaction }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showFakeAlert, setShowFakeAlert] = useState(false);
  const [hasAdded, setHasAdded] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasAdded && state) {
      addTransaction({
        id: Math.random().toString(36).substr(2, 9),
        type: 'transfer',
        amount: state.amount,
        recipientName: state.recipientName,
        bankName: state.bankName,
        accountNumber: state.accountNumber,
        date: new Date().toLocaleString(),
        status: 'success'
      });
      setHasAdded(true);
    }
  }, [state, addTransaction, hasAdded]);

  const triggerPrank = () => {
    setShowFakeAlert(true);
    setTimeout(() => {
      toast.success("Prank alert sent to your imagination! 🎭", {
        description: "In a real world, this would ping the recipient's phone."
      });
    }, 2000);
  };

  if (!state) return null;

  return (
    <div className="min-h-screen bg-white relative">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="p-4 flex flex-col items-center pt-10"
      >
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200">
            <Check size={36} className="text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-1">Transfer Successful</h2>
        <p className="text-emerald-600 font-bold text-3xl mb-8">₦{state.amount.toLocaleString()}.00</p>

        <div className="w-full bg-slate-50 rounded-2xl p-5 space-y-4 border border-slate-100" ref={receiptRef}>
          <div className="flex justify-between items-center text-sm border-b border-slate-200 pb-3">
            <span className="text-slate-500">Transaction Status</span>
            <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded">Success</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Recipient</span>
            <span className="font-bold text-slate-800">{state.recipientName}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Recipient Bank</span>
            <span className="font-bold text-slate-800">{state.bankName}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Account Number</span>
            <span className="font-bold text-slate-800">{state.accountNumber}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Remark</span>
            <span className="font-bold text-slate-800">{state.note || 'None'}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Date & Time</span>
            <span className="font-bold text-slate-800">{new Date().toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm border-t border-slate-200 pt-3">
            <span className="text-slate-500">Ref ID</span>
            <span className="font-mono text-[10px] font-bold text-slate-400">TXN{Math.floor(Math.random() * 1000000000)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full mt-6">
          <Button variant="outline" className="rounded-xl border-slate-200 gap-2 h-12">
            <Share2 size={18} /> Share
          </Button>
          <Button variant="outline" className="rounded-xl border-slate-200 gap-2 h-12">
            <Download size={18} /> Save
          </Button>
        </div>

        {/* Prank Section */}
        <div className="mt-8 w-full">
          <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-purple-700 font-bold">
              <Ghost size={20} />
              <span>Prank Actions</span>
            </div>
            <p className="text-[11px] text-purple-600 text-center">Trigger a realistic-looking bank alert for your friend's phone!</p>
            <Button 
              onClick={triggerPrank}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl gap-2 h-12 shadow-md shadow-purple-100"
            >
              <Bell size={18} /> Generate Fake Alert
            </Button>
          </div>
        </div>

        <Button 
          variant="ghost" 
          className="mt-6 text-slate-500 font-semibold"
          onClick={() => navigate('/')}
        >
          Back to Dashboard
        </Button>
      </motion.div>

      {/* Fake Alert Overlay */}
      <AnimatePresence>
        {showFakeAlert && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-12 pointer-events-none">
             <motion.div 
               initial={{ y: -100, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -100, opacity: 0 }}
               className="w-full max-w-sm bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl border p-4 pointer-events-auto flex items-start gap-3"
             >
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shrink-0">
                  <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/c3462f35-ff7f-48de-810e-2ef376fade31/prankpay-logo-60b1cd95-1778336652356.webp" className="w-6 h-6 invert brightness-0" alt="Logo" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="font-bold text-sm text-slate-900">Transaction Alert</span>
                    <span className="text-[10px] text-slate-400">Just now</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-tight">
                    Credit Alert: NGN {state.amount.toLocaleString()}.00 
                    from {state.user?.name || 'Adewale K.'} 
                    to {state.accountNumber.slice(0,3)}***{state.accountNumber.slice(-3)}. 
                    Ref: TXN{Math.floor(Math.random() * 1000000)}. 
                    Log in to view.
                  </p>
                </div>
                <button onClick={() => setShowFakeAlert(false)} className="text-slate-400">
                  <X size={16} />
                </button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Success;