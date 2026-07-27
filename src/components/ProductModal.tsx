import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, CheckCircle2, MessageCircle, Feather, Clock, Share2, Copy, Check } from 'lucide-react';
import { Product } from '../types';
import { shareProduct } from '../utils/shareUtils';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onOpenWhatsApp: (customText?: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenWhatsApp,
}) => {
  const [copied, setCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  if (!product) return null;

  const handleNativeShare = async () => {
    setIsSharing(true);
    await shareProduct(product, 'native');
    setIsSharing(false);
  };

  const handleShareWhatsApp = () => {
    shareProduct(product, 'whatsapp');
  };

  const handleCopyLink = async () => {
    const res = await shareProduct(product, 'copy');
    if (res.copied) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 md:p-10 flex items-center justify-center">
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
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#F1D9C3] z-10 text-left my-auto flex flex-col md:grid md:grid-cols-12 max-h-[88vh] md:max-h-none h-[88vh] md:h-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 p-2 rounded-full bg-white/90 hover:bg-white text-[#241C18] transition-colors shadow-md border border-[#F1D9C3]/50 cursor-pointer"
            aria-label="Fermer la fenêtre"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Image Section */}
          <div className="relative bg-[#241C18] h-44 sm:h-56 md:h-auto md:col-span-5 shrink-0 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#241C18]/80 via-transparent to-transparent" />

            {product.badge && (
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-3 py-1 rounded-full bg-[#B5613C] text-white text-xs font-sans-ui font-bold shadow-xs">
                {product.badge}
              </div>
            )}

            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 right-3 sm:right-4 text-white">
              <span className="font-sans-ui text-[10px] sm:text-[11px] uppercase tracking-widest text-[#F1D9C3]">
                Formulation Stern
              </span>
              <p className="font-serif font-bold text-base sm:text-lg leading-tight mt-0.5">
                100% Ingrédients Végétaux
              </p>
            </div>
          </div>

          {/* Right Details Section */}
          <div className="flex-1 md:col-span-7 bg-white flex flex-col min-h-0 md:h-auto">
            
            {/* Scrollable details container */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-5 md:space-y-6 md:overflow-y-visible">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-sans-ui text-xs font-bold uppercase tracking-wider text-[#B5613C]">
                    {product.category === 'savon'
                      ? 'Savon de Soin'
                      : product.category === 'creme'
                      ? 'Crème & Soin'
                      : 'Routine Complète'}
                  </span>
                  {product.weight && (
                    <span className="px-2.5 py-0.5 rounded bg-[#F1D9C3]/50 text-[#241C18] font-sans-ui text-xs font-semibold">
                      Poids net : {product.weight}
                    </span>
                  )}
                </div>

                <h3 className="font-serif font-bold text-xl sm:text-2xl md:text-3xl text-[#241C18] leading-tight">
                  {product.name}
                </h3>

                <div className="text-xl sm:text-2xl font-serif font-bold text-[#B5613C]">
                  {product.price.toLocaleString('fr-FR')} FCFA
                </div>
              </div>

              {/* Description */}
              <p className="font-serif text-sm text-[#241C18]/80 leading-relaxed">
                {product.description}
              </p>

              {/* Skin Compatibility */}
              {product.skinTypes && (
                <div className="space-y-1">
                  <h4 className="font-sans-ui text-xs font-bold text-[#241C18] uppercase tracking-wider">
                    Carnation & Type de Peau
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {product.skinTypes.map((st) => (
                      <span
                        key={st}
                        className="px-2.5 py-1 rounded-full bg-[#F1D9C3] text-[#B5613C] text-xs font-sans-ui font-semibold"
                      >
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Ingredients */}
              {product.ingredients && (
                <div className="space-y-1.5 pt-4 border-t border-[#F1D9C3]">
                  <h4 className="font-sans-ui text-xs font-bold text-[#241C18] uppercase tracking-wider flex items-center gap-1.5">
                    <Feather className="w-3.5 h-3.5 text-[#B5613C]" />
                    <span>Ingrédients Clés</span>
                  </h4>
                  <ul className="grid grid-cols-2 gap-2 text-xs font-serif text-[#241C18]/80">
                    {product.ingredients.map((ing) => (
                      <li key={ing} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#278652] shrink-0" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Directions for use */}
              {product.usage && (
                <div className="p-3.5 rounded-xl bg-[#FBE9E1]/60 border border-[#F1D9C3] text-xs space-y-1">
                  <span className="font-sans-ui font-bold text-[#B5613C] uppercase tracking-wider block flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Conseil d'utilisation</span>
                  </span>
                  <p className="font-serif text-[#241C18]/80 leading-relaxed">
                    {product.usage}
                  </p>
                </div>
              )}
            </div>

            {/* Pinned Bottom Actions Footer */}
            <div className="p-4 sm:p-6 border-t border-[#F1D9C3] bg-white space-y-3 shrink-0">
              <div className="flex gap-2.5">
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 sm:px-6 rounded-full bg-[#B5613C] hover:bg-[#9A4E2D] text-white font-sans-ui text-xs font-bold transition-colors shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Ajouter au panier</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenWhatsApp(`Bonjour Stern Cosmétique 👋, je souhaite commander le produit "${product.name}" (${product.price.toLocaleString('fr-FR')} FCFA).`);
                  }}
                  className="py-3 px-4 sm:px-5 rounded-full bg-[#241C18] hover:bg-[#B5613C] text-white font-sans-ui text-xs font-semibold transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#F1D9C3]" />
                  <span>Commander</span>
                </button>
              </div>

              {/* Quick Sharing Section */}
              <div className="pt-2.5 border-t border-[#F1D9C3]/70 space-y-2">
                <div className="flex items-center justify-between text-[11px] sm:text-xs font-sans-ui text-[#241C18]/80">
                  <span className="flex items-center gap-1 font-bold text-[#B5613C]">
                    <Share2 className="w-3 h-3" />
                    <span className="truncate">Partager ce produit :</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={handleNativeShare}
                    disabled={isSharing}
                    className="px-2.5 py-1 rounded-full bg-[#B5613C] hover:bg-[#9A4E2D] text-white text-[10px] sm:text-xs font-sans-ui font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-xs disabled:opacity-50"
                    title="Partager le visuel"
                  >
                    <Share2 className="w-3 h-3" />
                    <span>Story / Image</span>
                  </button>

                  <button
                    onClick={handleShareWhatsApp}
                    className="px-2.5 py-1 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] text-[10px] sm:text-xs font-sans-ui font-bold transition-colors flex items-center gap-1 cursor-pointer"
                    title="Partager sur WhatsApp"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="px-2.5 py-1 rounded-full bg-[#F1D9C3]/60 hover:bg-[#F1D9C3] text-[#241C18] text-[10px] sm:text-xs font-sans-ui font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                    title="Copier le lien direct"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-[#278652]" />
                        <span className="text-[#278652]">Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copier</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
