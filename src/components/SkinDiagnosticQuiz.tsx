import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, ArrowRight, RefreshCw, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface SkinDiagnosticQuizProps {
  onAddToCart: (product: Product) => void;
  onOpenModal: (product: Product) => void;
}

export const SkinDiagnosticQuiz: React.FC<SkinDiagnosticQuizProps> = ({
  onAddToCart,
  onOpenModal,
}) => {
  const [selectedTone, setSelectedTone] = useState<string | null>(null);

  const skinTones = [
    {
      id: 'bronze',
      label: 'Teint Bronzé',
      desc: 'Peau dorée et hâlée cherchant un éclat sain et uniforme.',
      recommendedId: 'savon-bronze',
    },
    {
      id: 'caramel',
      label: 'Teint Caramel',
      desc: 'Peau métissée ou ambrée sujette au teint terne ou déshydraté.',
      recommendedId: 'savon-caramel',
    },
    {
      id: 'ebene',
      label: 'Teint Ébène',
      desc: 'Peau noire profonde désirant préserver un velouté satiné intense.',
      recommendedId: 'savon-ebene',
    },
    {
      id: 'olive',
      label: 'Teint Mat Olive',
      desc: 'Peau matifiée cherchant régulation de sébum et grain affiné.',
      recommendedId: 'savon-olive',
    },
    {
      id: 'porcelaine',
      label: 'Teint très clair Porcelaine',
      desc: 'Peau très claire et délicate nécessitant douceur et unification.',
      recommendedId: 'savon-porcelaine-400g',
    },
  ];

  const recommendedProduct = PRODUCTS.find(
    (p) => p.id === skinTones.find((st) => st.id === selectedTone)?.recommendedId
  );

  return (
    <section className="py-16 bg-[#EFE8EE] border-y border-[#D8D2D8]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
          <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-[#6B3F63] px-3.5 py-1 rounded-full bg-white border border-[#6B3F63]/20 inline-flex items-center gap-1.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#6B3F63]" />
            <span>Diagnostic Beauté Personnalisé</span>
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#2A2430]">
            Trouvez le soin exactement adapté à votre carnation
          </h2>
          <p className="font-serif text-[#2A2430]/80 text-base">
            Sélectionnez votre type de teint pour découvrir la formule Stern recommandée par nos botanistes.
          </p>
        </div>

        {/* Tone Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {skinTones.map((st) => {
            const isSelected = selectedTone === st.id;
            return (
              <button
                key={st.id}
                onClick={() => setSelectedTone(st.id)}
                className={`p-4 rounded-2xl text-left font-serif transition-all duration-300 border cursor-pointer ${
                  isSelected
                    ? 'bg-[#6B3F63] text-white border-[#6B3F63] shadow-md scale-102'
                    : 'bg-white text-[#2A2430] border-[#D8D2D8] hover:border-[#6B3F63]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm">{st.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                </div>
                <p
                  className={`text-[11px] font-sans-ui line-clamp-2 ${
                    isSelected ? 'text-white/90' : 'text-[#2A2430]/70'
                  }`}
                >
                  {st.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Recommendation Output Box */}
        <AnimatePresence mode="wait">
          {recommendedProduct && (
            <motion.div
              key={recommendedProduct.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D8D2D8] shadow-lg max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-left"
            >
              <img
                src={recommendedProduct.image}
                alt={recommendedProduct.name}
                className="w-28 h-28 object-cover rounded-2xl shrink-0 border border-[#D8D2D8]"
              />
              <div className="space-y-3 flex-1">
                <div>
                  <span className="text-[11px] font-sans-ui font-bold uppercase tracking-wider text-[#278652] bg-[#278652]/10 px-2.5 py-0.5 rounded-full inline-block mb-1">
                    ✓ Recommandation Personnalisée
                  </span>
                  <h3 className="font-serif font-bold text-xl text-[#2A2430]">
                    {recommendedProduct.name} ({recommendedProduct.weight})
                  </h3>
                  <p className="font-serif text-xs text-[#2A2430]/75 line-clamp-2 mt-0.5">
                    {recommendedProduct.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#D8D2D8]/50">
                  <span className="font-serif font-bold text-lg text-[#6B3F63]">
                    {recommendedProduct.price.toLocaleString('fr-FR')} FCFA
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenModal(recommendedProduct)}
                      className="px-3.5 py-2 rounded-full border border-[#D8D2D8] text-xs font-sans-ui font-semibold text-[#2A2430] hover:bg-[#F5F2F5]"
                    >
                      Détails
                    </button>
                    <button
                      onClick={() => onAddToCart(recommendedProduct)}
                      className="px-4 py-2 rounded-full bg-[#6B3F63] hover:bg-[#522F4C] text-white text-xs font-sans-ui font-semibold flex items-center gap-1.5 shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Ajouter</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
