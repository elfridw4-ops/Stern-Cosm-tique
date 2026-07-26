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
    <section id="pack" className="py-16 bg-[#FBE9E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: gentleEase }}
          className="rounded-3xl bg-[#7A1E3D] text-white border border-[#E85A93]/30 overflow-hidden shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Photo Column */}
            <div className="lg:col-span-5 relative h-80 lg:h-full min-h-[380px] overflow-hidden bg-[#5C152D]">
              <img
                src="/images/pack-stern.jpeg"
                alt="Pack Spécial Stern Cosmétique"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5C152D]/90 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A227] text-white text-xs font-sans-ui font-bold shadow-md">
                <Gift className="w-3.5 h-3.5" />
                <span>Offre Spéciale Exclusivité</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                <p className="font-serif italic text-lg opacity-90">
                  "Une expérience soin complète, élégante et rassurante."
                </p>
                <p className="font-sans-ui text-xs text-[#E85A93] uppercase font-bold tracking-wider mt-1">
                  Sélection Routine Complète
                </p>
              </div>
            </div>

            {/* Right Offer Content Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 text-left space-y-6 text-white">
              
              <div className="inline-block">
                <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-[#E85A93] px-3.5 py-1 rounded-full bg-white/10 border border-[#E85A93]/40">
                  Pack Spécial Stern
                </span>
              </div>

              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white leading-tight">
                La routine beauté premium qui fait la différence
              </h2>

              <p className="font-serif text-base sm:text-lg text-white/90 leading-relaxed">
                Découvrez le pack Stern en avant-première et profitez d'une offre
                pensée pour une expérience soin complète, élégante et rassurante.
              </p>

              {/* Special Offer Secondary Mention */}
              <div className="p-4 rounded-2xl bg-white/10 border border-[#E85A93]/40 flex items-start gap-3 shadow-sm backdrop-blur-xs">
                <div className="p-2 rounded-full bg-[#E85A93] text-white shrink-0 mt-0.5">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-white text-sm sm:text-base">
                    Offre Spéciale Incluse
                  </h4>
                  <p className="font-serif text-xs sm:text-sm text-[#C9A227] font-bold mt-0.5">
                    « Obtenez une crème visage pour un savon acheté »
                  </p>
                </div>
              </div>

              {/* Highlights List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 font-sans-ui text-xs text-white/90">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A227]" />
                  <span>Savon Végétal Ozone 360g au choix</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A227]" />
                  <span>Crème Sublimatrice Éclat Offerte</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A227]" />
                  <span>Lait Hydratant Satiné 250g</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A227]" />
                  <span>Gommage Corporel Nettoyant</span>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="pt-4 border-t border-white/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-sans-ui text-white/70 block uppercase font-medium">
                    Prix avantageux
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif font-bold text-3xl sm:text-4xl text-[#C9A227]">
                      13 000 FCFA
                    </span>
                    <span className="font-sans-ui text-sm text-white/50 line-through">
                      16 500 FCFA
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onOpenModal(packProduct)}
                    className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 font-sans-ui text-xs font-semibold transition-colors shadow-xs"
                  >
                    Voir le pack
                  </button>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onAddToCart(packProduct)}
                    className="px-6 py-3 rounded-full bg-[#E85A93] text-white hover:bg-[#d44880] font-sans-ui text-xs font-bold transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
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
