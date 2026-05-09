import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Dashboard from './pages/Dashboard';
import Transfer from './pages/Transfer';
import ConfirmTransfer from './pages/ConfirmTransfer';
import Success from './pages/Success';
import Layout from './components/Layout';
import { AnimatePresence } from 'framer-motion';

export interface Transaction {
  id: string;
  type: 'transfer' | 'deposit';
  amount: number;
  recipientName?: string;
  bankName?: string;
  accountNumber?: string;
  date: string;
  status: 'success' | 'failed' | 'pending';
}

export interface AppState {
  balance: number;
  transactions: Transaction[];
  user: {
    name: string;
    accountNumber: string;
    avatar: string;
  };
}

function App() {
  const [state, setState] = useState<AppState>({
    balance: 125400.50,
    transactions: [
      { id: '1', type: 'deposit', amount: 50000, date: '2023-10-25 14:20', status: 'success' },
      { id: '2', type: 'transfer', amount: 12000, recipientName: 'John Doe', bankName: 'GTBank', accountNumber: '0123456789', date: '2023-10-24 09:15', status: 'success' },
      { id: '3', type: 'transfer', amount: 5000, recipientName: 'Jane Smith', bankName: 'Kuda', accountNumber: '9876543210', date: '2023-10-23 18:45', status: 'success' },
    ],
    user: {
      name: 'Adewale K.',
      accountNumber: '2034958210',
      avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/c3462f35-ff7f-48de-810e-2ef376fade31/user-avatar-1-068c1a49-1778336654186.webp'
    }
  });

  const addTransaction = (transaction: Transaction) => {
    setState(prev => ({
      ...prev,
      balance: prev.balance - transaction.amount,
      transactions: [transaction, ...prev.transactions]
    }));
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100">
        <Layout user={state.user} balance={state.balance}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Dashboard state={state} />} />
              <Route path="/transfer" element={<Transfer />} />
              <Route path="/confirm" element={<ConfirmTransfer />} />
              <Route path="/success" element={<Success addTransaction={addTransaction} />} />
            </Routes>
          </AnimatePresence>
        </Layout>
        <Toaster position="top-center" />
      </div>
    </Router>
  );
}

export default App;