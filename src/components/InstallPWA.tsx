import React, { useEffect, useState } from 'react';
import { Download, Smartphone, Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

const InstallPWA: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if it's iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(ios);

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Only show if not already installed
      if (!window.matchMedia('(display-mode: standalone)').matches) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 left-4 right-4 z-50"
        >
          <Card className="p-4 border-emerald-100 shadow-2xl bg-white/95 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                <Smartphone className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-800 text-sm">Download Dala Bank</h3>
                  <button onClick={() => setShowPrompt(false)} className="text-slate-400">
                    <X size={16} />
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Install this app on your phone for a faster, better experience.
                </p>
                <div className="mt-3 flex gap-2">
                  <Button 
                    size="sm" 
                    className="bg-emerald-600 hover:bg-emerald-700 h-8 text-xs font-semibold px-4 rounded-lg"
                    onClick={handleInstall}
                  >
                    <Download size={14} className="mr-1.5" />
                    Install Now
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 text-xs text-slate-400 hover:text-slate-600 px-2"
                    onClick={() => setShowPrompt(false)}
                  >
                    Maybe Later
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {isIOS && !window.matchMedia('(display-mode: standalone)').matches && (
        <Card className="p-4 border-blue-50 bg-blue-50/50 mb-6">
          <div className="flex items-start gap-3">
            <Info className="text-blue-500 shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-sm font-semibold text-blue-900">How to Download</p>
              <p className="text-[11px] text-blue-700 mt-1 leading-relaxed">
                To download on iPhone: Tap <span className="font-bold">Share</span> and select <span className="font-bold">"Add to Home Screen"</span>.
              </p>
            </div>
          </div>
        </Card>
      )}
    </AnimatePresence>
  );
};

export default InstallPWA;