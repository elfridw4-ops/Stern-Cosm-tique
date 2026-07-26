import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          className="fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl bg-[#241C18] text-white shadow-xl border border-[#F1D9C3]/30 flex items-center gap-3"
        >
          <div className="p-1.5 rounded-full bg-[#278652] text-white">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="font-serif text-sm font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
