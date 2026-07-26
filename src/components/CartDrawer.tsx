import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOpenWhatsAppWholesale: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenWhatsAppWholesale,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [orderSentModal, setOrderSentModal] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountAmount = discountApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discountAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'STERN10') {
      setDiscountApplied(true);
    } else {
      alert('Code promo invalide. Essayez "STERN10"');
    }
  };

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    let itemsText = cartItems
      .map(
        (item) =>
          `• ${item.quantity}x ${item.product.name}${
            item.product.weight ? ` (${item.product.weight})` : ''
          } - ${(item.product.price * item.quantity).toLocaleString('fr-FR')} FCFA`
      )
      .join('\n');

    let text = `Bonjour Stern Cosmétique 👋,\n\nJe souhaite passer la commande suivante :\n\n${itemsText}\n\n`;
    if (discountApplied) {
      text += `Sous-total : ${subtotal.toLocaleString('fr-FR')} FCFA\nRemise STERN10 : -${discountAmount.toLocaleString('fr-FR')} FCFA\n`;
    }
    text += `TOTAL : ${total.toLocaleString('fr-FR')} FCFA\n\n📌 *Boutique :* https://stern-cosm.vercel.app\nMerci de me confirmer la disponibilité et les modalités de livraison !`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/22941634242?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
    setOrderSentModal(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#2A2430]/60 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-[#FBE9E1] shadow-2xl flex flex-col justify-between border-l border-[#F1D9C3]"
            >
              {/* Drawer Header */}
              <div className="p-6 bg-white border-b border-[#F1D9C3] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-[#B5613C] text-white">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-lg text-[#241C18]">
                      Votre Panier Soins
                    </h2>
                    <p className="font-sans-ui text-xs text-[#241C18]/60">
                      {cartItems.length} article{cartItems.length > 1 ? 's' : ''} sélectionné{cartItems.length > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-[#FBE9E1] text-[#241C18] transition-colors"
                  aria-label="Fermer le panier"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 text-left">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                    <div className="w-16 h-16 rounded-full bg-[#F1D9C3] flex items-center justify-center text-[#B5613C]">
                      <ShoppingBag className="w-8 h-8 opacity-80" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-[#241C18]">
                        Votre panier est vide
                      </h3>
                      <p className="font-serif text-xs text-[#241C18]/70 max-w-xs mt-1">
                        Explorez notre catalogue pour découvrir nos savons, crèmes et le Pack Spécial Stern.
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-full bg-[#B5613C] text-white font-sans-ui text-xs font-bold shadow-xs hover:bg-[#9A4E2D]"
                    >
                      Découvrir la collection
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Wholesale Tip Badge */}
                    <div className="p-3 rounded-xl bg-white border border-[#B5613C]/20 flex items-center justify-between text-xs font-sans-ui text-[#241C18]">
                      <span className="font-medium">
                        💼 Vente en gros disponible à partir de 10 pièces
                      </span>
                      <button
                        onClick={onOpenWhatsAppWholesale}
                        className="text-[#B5613C] font-bold hover:underline shrink-0"
                      >
                        En savoir +
                      </button>
                    </div>

                    {/* Cart Items */}
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div
                          key={item.product.id}
                          className="p-4 rounded-2xl bg-white border border-[#F1D9C3] flex items-center gap-3 shadow-2xs"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-xl border border-[#F1D9C3] shrink-0"
                          />

                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif font-bold text-sm text-[#241C18] truncate">
                              {item.product.name}
                            </h4>
                            <p className="font-sans-ui text-xs text-[#B5613C] font-bold mt-0.5">
                              {item.product.price.toLocaleString('fr-FR')} FCFA
                            </p>

                            {/* Quantity buttons */}
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex items-center rounded-lg border border-[#F1D9C3] bg-[#FBE9E1]">
                                <button
                                  onClick={() =>
                                    onUpdateQuantity(item.product.id, item.quantity - 1)
                                  }
                                  className="p-1 hover:bg-[#F1D9C3]/50 text-[#241C18] rounded-l-lg transition-colors"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2 text-xs font-sans-ui font-bold text-[#241C18]">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    onUpdateQuantity(item.product.id, item.quantity + 1)
                                  }
                                  className="p-1 hover:bg-[#F1D9C3]/50 text-[#241C18] rounded-r-lg transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <button
                                onClick={() => onRemoveItem(item.product.id)}
                                className="p-1 text-[#241C18]/40 hover:text-red-600 transition-colors"
                                title="Supprimer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="font-serif font-bold text-sm text-[#241C18]">
                              {(item.product.price * item.quantity).toLocaleString('fr-FR')} FCFA
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Promo Code Entry */}
                    <form onSubmit={handleApplyPromo} className="pt-2 flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Code Promo (ex. STERN10)"
                        className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#F1D9C3] text-xs font-sans-ui focus:outline-none focus:ring-1 focus:ring-[#B5613C]"
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-2 rounded-xl bg-[#241C18] text-white text-xs font-sans-ui font-bold hover:bg-[#B5613C] transition-colors"
                      >
                        Appliquer
                      </button>
                    </form>

                    {discountApplied && (
                      <p className="text-xs font-sans-ui text-[#278652] font-semibold">
                        ✓ Remise de 10% appliquée !
                      </p>
                    )}
                  </>
                )}
              </div>

              {/* Drawer Footer Checkout */}
              {cartItems.length > 0 && (
                <div className="p-6 bg-white border-t border-[#F1D9C3] space-y-4">
                  <div className="space-y-1.5 font-sans-ui text-xs text-[#241C18]">
                    <div className="flex justify-between">
                      <span>Sous-total</span>
                      <span className="font-semibold">{subtotal.toLocaleString('fr-FR')} FCFA</span>
                    </div>

                    {discountApplied && (
                      <div className="flex justify-between text-[#278652]">
                        <span>Remise (10%)</span>
                        <span>-{discountAmount.toLocaleString('fr-FR')} FCFA</span>
                      </div>
                    )}

                    <div className="flex justify-between text-base font-serif font-bold text-[#241C18] pt-2 border-t border-[#F1D9C3]">
                      <span>Total à payer</span>
                      <span className="text-[#B5613C]">{total.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                  </div>

                  {/* Main WhatsApp Checkout Button */}
                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-3.5 px-6 rounded-full bg-[#278652] hover:bg-[#1e6940] text-white font-sans-ui text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Commander via WhatsApp ({total.toLocaleString('fr-FR')} FCFA)</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] font-sans-ui text-[#241C18]/70">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#278652]" />
                    <span>Paiement à la livraison / Mobile Money sécurisé</span>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
