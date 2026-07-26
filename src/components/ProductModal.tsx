import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, CheckCircle2, Sparkles, Shield, Feather, Clock } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onOpenWhatsApp: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenWhatsApp,
}) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#2A2430]/70 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="relative w-full max-w-3xl bg-[#F5F2F5] rounded-3xl shadow-2xl overflow-hidden border border-[#D8D2D8] z-10 text-left my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#2A2430] transition-colors shadow-sm"
            aria-label="Fermer la fenêtre"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
            
            {/* Left Image Section */}
            <div className="md:col-span-5 relative bg-[#2A2430] min-h-[280px] md:min-h-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A2430]/80 via-transparent to-transparent" />

              {product.badge && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#C59B27] text-white text-xs font-sans-ui font-bold shadow-sm">
                  {product.badge}
                </div>
              )}

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="font-sans-ui text-[11px] uppercase tracking-widest text-[#D8D2D8]">
                  Formulation Stern
                </span>
                <p className="font-serif font-bold text-lg leading-tight mt-0.5">
                  100% Ingrédients Végétaux
                </p>
              </div>
            </div>

            {/* Right Details Section */}
            <div className="md:col-span-7 p-6 sm:p-8 space-y-6 bg-white flex flex-col justify-between">
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-sans-ui text-xs font-bold uppercase tracking-wider text-[#6B3F63]">
                      {product.category === 'savon'
                        ? 'Savon de Soin'
                        : product.category === 'creme'
                        ? 'Crème & Soin'
                        : 'Routine Complète'}
                    </span>
                    {product.weight && (
                      <span className="px-2.5 py-0.5 rounded bg-[#F5F2F5] text-[#2A2430] font-sans-ui text-xs font-semibold">
                        Poids net : {product.weight}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#2A2430] mt-1">
                    {product.name}
                  </h3>

                  <div className="mt-2 text-2xl font-serif font-bold text-[#6B3F63]">
                    {product.price.toLocaleString('fr-FR')} FCFA
                  </div>
                </div>

                {/* Description */}
                <p className="font-serif text-sm text-[#2A2430]/80 leading-relaxed">
                  {product.description}
                </p>

                {/* Skin Compatibility */}
                {product.skinTypes && (
                  <div className="space-y-1">
                    <h4 className="font-sans-ui text-xs font-bold text-[#2A2430] uppercase tracking-wider">
                      Carnation & Type de Peau
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {product.skinTypes.map((st) => (
                        <span
                          key={st}
                          className="px-2.5 py-1 rounded-full bg-[#6B3F63]/10 text-[#6B3F63] text-xs font-sans-ui font-medium"
                        >
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Ingredients */}
                {product.ingredients && (
                  <div className="space-y-1.5 pt-2 border-t border-[#D8D2D8]/60">
                    <h4 className="font-sans-ui text-xs font-bold text-[#2A2430] uppercase tracking-wider flex items-center gap-1.5">
                      <Feather className="w-3.5 h-3.5 text-[#6B3F63]" />
                      <span>Ingrédients Clés</span>
                    </h4>
                    <ul className="grid grid-cols-2 gap-1.5 text-xs font-serif text-[#2A2430]/80">
                      {product.ingredients.map((ing) => (
                        <li key={ing} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-[#278652] shrink-0" />
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Directions for use */}
                {product.usage && (
                  <div className="p-3.5 rounded-xl bg-[#F5F2F5] border border-[#D8D2D8] text-xs space-y-1">
                    <span className="font-sans-ui font-bold text-[#6B3F63] uppercase tracking-wider block flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Conseil d'utilisation</span>
                    </span>
                    <p className="font-serif text-[#2A2430]/80 leading-relaxed">
                      {product.usage}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#D8D2D8] flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#6B3F63] hover:bg-[#522F4C] text-white font-sans-ui text-xs font-bold transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Ajouter au panier</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenWhatsApp();
                  }}
                  className="py-3.5 px-5 rounded-full bg-[#2A2430] hover:bg-[#6B3F63] text-white font-sans-ui text-xs font-semibold transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Commander via WhatsApp</span>
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
