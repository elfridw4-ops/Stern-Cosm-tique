import React from 'react';
import { motion } from 'motion/react';
import { Gift, CheckCircle2, ShoppingCart, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SpecialPackOfferProps {
  packProduct: Product;
  onAddToCart: (product: Product) => void;
  onOpenModal: (product: Product) => void;
}

export const SpecialPackOffer: React.FC<SpecialPackOfferProps> = ({
  packProduct,
  onAddToCart,
  onOpenModal,
}) => {
  const gentleEase = [0.25, 0.1, 0.25, 1.0];

  return (
    <section id="pack" className="py-16 bg-[#F5F2F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: gentleEase }}
          className="rounded-3xl bg-[#EFE8EE] border border-[#D8D2D8] overflow-hidden shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Photo Column */}
            <div className="lg:col-span-5 relative h-80 lg:h-full min-h-[380px] overflow-hidden bg-[#2A2430]">
              <img
                src="/images/pack-stern.jpeg"
                alt="Pack Spécial Stern Cosmétique"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A2430]/80 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C59B27] text-white text-xs font-sans-ui font-bold shadow-sm">
                <Gift className="w-3.5 h-3.5" />
                <span>Offre Spéciale Exclusivité</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                <p className="font-serif italic text-lg opacity-90">
                  "Une expérience soin complète, élégante et rassurante."
                </p>
                <p className="font-sans-ui text-xs text-[#D8D2D8] uppercase tracking-wider mt-1">
                  Sélection Routine Complète
                </p>
              </div>
            </div>

            {/* Right Offer Content Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 text-left space-y-6">
              
              <div className="inline-block">
                <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-[#6B3F63] px-3 py-1 rounded-md bg-[#6B3F63]/10 border border-[#6B3F63]/20">
                  Pack spécial Stern
                </span>
              </div>

              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#2A2430] leading-tight">
                La routine beauté premium qui fait la différence
              </h2>

              <p className="font-serif text-base sm:text-lg text-[#2A2430]/80 leading-relaxed">
                Découvrez le pack Stern en avant-première et profitez d'une offre
                pensée pour une expérience soin complète, élégante et rassurante.
              </p>

              {/* Special Offer Secondary Mention */}
              <div className="p-4 rounded-xl bg-white/80 border border-[#6B3F63]/20 flex items-start gap-3 shadow-sm">
                <div className="p-2 rounded-full bg-[#6B3F63] text-white shrink-0 mt-0.5">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#2A2430] text-sm sm:text-base">
                    Offre Spéciale Incluse
                  </h4>
                  <p className="font-serif text-xs sm:text-sm text-[#6B3F63] font-semibold mt-0.5">
                    « Obtenez une crème visage pour un savon acheté »
                  </p>
                </div>
              </div>

              {/* Highlights List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-sans-ui text-xs text-[#2A2430]/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#6B3F63]" />
                  <span>Savon Végétal Ozone 360g au choix</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#6B3F63]" />
                  <span>Crème Sublimatrice Éclat Offerte</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#6B3F63]" />
                  <span>Lait Hydratant Satiné 250g</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#6B3F63]" />
                  <span>Gommage Corporel Nettoyant</span>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="pt-4 border-t border-[#D8D2D8] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-sans-ui text-[#2A2430]/60 block uppercase font-medium">
                    Prix avantageux
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif font-bold text-3xl sm:text-4xl text-[#6B3F63]">
                      13 000 FCFA
                    </span>
                    <span className="font-sans-ui text-sm text-[#2A2430]/50 line-through">
                      16 500 FCFA
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onOpenModal(packProduct)}
                    className="px-5 py-3 rounded-full bg-white text-[#2A2430] hover:bg-[#F5F2F5] border border-[#D8D2D8] font-sans-ui text-xs font-semibold transition-colors shadow-sm"
                  >
                    Voir le pack
                  </button>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onAddToCart(packProduct)}
                    className="px-6 py-3 rounded-full bg-[#6B3F63] text-white hover:bg-[#522F4C] font-sans-ui text-xs font-semibold transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Demander le pack</span>
                  </motion.button>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
