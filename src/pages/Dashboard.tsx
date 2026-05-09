import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Smartphone, Landmark, ReceiptText, ChevronRight, Eye, EyeOff, Download, ExternalLink, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AppState } from '../App';
import { useNavigate } from 'react-router-dom';
import InstallPWA from '@/components/InstallPWA';

const Dashboard: React.FC<{ state: AppState }> = ({ state }) => {
  const [showBalance, setShowBalance] = React.useState(true);
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-4 space-y-6"
    >
      {/* Installation Instruction for iOS or Web */}
      <InstallPWA />

      {/* Balance Card */}
      <Card className="bg-emerald-600 text-white p-5 rounded-2xl border-none shadow-lg shadow-emerald-100 overflow-hidden relative">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-emerald-50 text-xs font-medium uppercase tracking-wider">Available Balance</p>
            <button onClick={() => setShowBalance(!showBalance)} className="text-emerald-200 hover:text-white transition-colors">
              {showBalance ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
          </div>
          <p className="text-3xl font-bold mb-4">
            {showBalance ? `\u20a6${state.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '\u20a6 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022'}
          </p>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 border-none text-white h-8 text-xs font-semibold px-4 rounded-full" onClick={() => navigate('/transfer')}>
              + Add Money
            </Button>
            <Button variant="secondary" size="sm" className="bg-white text-emerald-700 hover:bg-emerald-50 border-none h-8 text-xs font-semibold px-4 rounded-full" onClick={() => navigate('/transfer')}>
              Transfer
            </Button>
          </div>
        </div>
        {/* Abstract circles */}
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -right-4 top-0 w-20 h-20 bg-emerald-500 rounded-full blur-xl" />
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { icon: <Landmark size={24} />, label: 'Transfer', path: '/transfer', color: 'bg-blue-50 text-blue-600' },
          { icon: <Smartphone size={24} />, label: 'Airtime', path: '/', color: 'bg-orange-50 text-orange-600' },
          { icon: <Wallet size={24} />, label: 'Data', path: '/', color: 'bg-purple-50 text-purple-600' },
          { icon: <ReceiptText size={24} />, label: 'Bills', path: '/', color: 'bg-pink-50 text-pink-600' },
        ].map((action, i) => (
          <button key={i} onClick={() => navigate(action.path)} className="flex flex-col items-center gap-2">
            <div className={`w-12 h-12 ${action.color} rounded-2xl flex items-center justify-center`}>
              {action.icon}
            </div>
            <span className="text-[10px] font-medium text-slate-600">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Download/Deploy Guide Section */}
      <Card className="p-4 border-slate-100 shadow-sm bg-white overflow-hidden relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
              <Download size={18} className="text-slate-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Deploy & Download</h4>
              <p className="text-[10px] text-slate-500">How to share this app</p>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 text-xs border-slate-200 text-slate-600 hover:bg-slate-50">
                Guide
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white">
              <DialogHeader>
                <DialogTitle>Deployment Guide</DialogTitle>
                <DialogDescription>
                  Follow these steps to deploy your prank app and make it downloadable for others.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <h5 className="text-sm font-bold flex items-center gap-2">
                    <span className="w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-[10px]">1</span>
                    Build the Project
                  </h5>
                  <p className="text-xs text-slate-600 ml-7">
                    Run <code className="bg-slate-100 px-1 rounded">npm run build</code> to generate the <code className="font-semibold text-slate-800">dist</code> folder.
                  </p>
                </div>
                <div className="space-y-2">
                  <h5 className="text-sm font-bold flex items-center gap-2">
                    <span className="w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-[10px]">2</span>
                    Upload to Vercel/Netlify
                  </h5>
                  <p className="text-xs text-slate-600 ml-7">
                    Drag and drop the <code className="font-semibold text-slate-800">dist</code> folder into Netlify Drop or use Vercel CLI to deploy instantly.
                  </p>
                </div>
                <div className="space-y-2">
                  <h5 className="text-sm font-bold flex items-center gap-2">
                    <span className="w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-[10px]">3</span>
                    Install as App
                  </h5>
                  <p className="text-xs text-slate-600 ml-7">
                    Once deployed, open the link on your phone. Tap <span className="font-semibold">"Add to Home Screen"</span> to download it as a native-looking bank app.
                  </p>
                </div>
                <div className="pt-2 bg-amber-50 p-3 rounded-lg border border-amber-100">
                  <p className="text-[10px] text-amber-800 leading-relaxed">
                    <strong>Note:</strong> Since this is a PWA, users "download" it by installing it through their browser's share menu.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Card>

      {/* Banner */}
      <div className="rounded-2xl overflow-hidden shadow-md">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/c3462f35-ff7f-48de-810e-2ef376fade31/promo-banner-49dd1ccd-1778336653233.webp" 
          alt="Promo" 
          className="w-full h-24 object-cover"
        />
      </div>

      {/* Transaction History */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Transaction History</h3>
          <button className="text-emerald-600 text-xs font-semibold flex items-center">
            See All <ChevronRight size={14} />
          </button>
        </div>
        <div className="space-y-3">
          {state.transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'deposit' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-600'}`}>
                  {tx.type === 'deposit' ? <Wallet size={18} /> : <Landmark size={18} />}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {tx.type === 'deposit' ? 'Wallet Top-up' : `To ${tx.recipientName}`}
                  </p>
                  <p className="text-[10px] text-slate-400">{tx.date}</p>
                </div>
              </div>
              <p className={`text-sm font-bold ${tx.type === 'deposit' ? 'text-emerald-600' : 'text-slate-800'}`}>
                {tx.type === 'deposit' ? '+' : '-'}\u20a6{tx.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;