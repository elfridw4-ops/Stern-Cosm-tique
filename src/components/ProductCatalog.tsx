import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Eye, MessageCircle, ArrowRight, Check, Loader2 } from 'lucide-react';
import { Product, CategoryType } from '../types';
import { PRODUCTS } from '../data/products';

interface ProductCatalogProps {
  onAddToCart: (product: Product) => void;
  onOpenModal: (product: Product) => void;
  onOpenWhatsAppWholesale: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onAddToCart,
  onOpenModal,
  onOpenWhatsAppWholesale,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const gentleEase = [0.25, 0.1, 0.25, 1.0];

  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'Tous les soins' },
    { id: 'savon', label: 'Nos savons' },
    { id: 'creme', label: 'Crème et autres' },
    { id: 'pack', label: 'Packs & Routines' },
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const handleAddToCartClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    setLoadingProductId(product.id);
    
    // Simulate slight natural feedback
    setTimeout(() => {
      onAddToCart(product);
      setLoadingProductId(null);
      setAddedProductId(product.id);
      setTimeout(() => setAddedProductId(null), 1500);
    }, 300);
  };

  return (
    <section id="produits" className="py-20 bg-[#FBE9E1] scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-[#B5613C] px-3.5 py-1 rounded-full bg-[#F1D9C3] border border-[#B5613C]/20 inline-block">
            Catalogue Botanique
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#241C18]">
            Nos soins cosmétiques d'exception
          </h2>
          <p className="font-serif text-[#241C18]/80 text-base sm:text-lg">
            Des formulations d'origine naturelle adaptées à la beauté unique de chaque teint.
          </p>
        </div>

        {/* Sub-Category Filter Toggles */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full font-sans-ui text-xs font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#B5613C] text-white shadow-md scale-105'
                  : 'bg-white text-[#241C18]/80 hover:bg-[#F1D9C3]/50 border border-[#F1D9C3]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Wholesale Inquiry Banner Notice */}
        <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-white border border-[#F1D9C3] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-[#F1D9C3] text-[#B5613C] shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-serif font-bold text-[#241C18] text-sm sm:text-base">
                Achat en gros ou revendeurs ?
              </p>
              <p className="font-serif text-xs sm:text-sm text-[#241C18]/80">
                Pour un achat en gros, contactez-nous sur WhatsApp pour discuter des conditions et des tarifs préférentiels.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenWhatsAppWholesale}
            className="shrink-0 px-5 py-2.5 rounded-full bg-[#B5613C] hover:bg-[#9A4E2D] text-white font-sans-ui text-xs font-bold transition-colors flex items-center gap-2 shadow-xs"
          >
            <span>Discuter sur WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.4,
                  delay: 0.06 * index,
                  ease: gentleEase,
                }}
                onClick={() => onOpenModal(product)}
                className="group rounded-2xl bg-white border border-[#F1D9C3] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between cursor-pointer relative"
              >
                {/* Badge Tag */}
                {product.badge && (
                  <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-[#F1D9C3] border border-[#B5613C]/20 text-[11px] font-sans-ui font-bold text-[#B5613C] shadow-xs">
                    {product.badge}
                  </div>
                )}

                {/* Image Container */}
                <div className="relative aspect-[4/3] bg-[#FBE9E1] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Quick View Floating Action */}
                  <div className="absolute inset-0 bg-[#241C18]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-[#241C18] font-sans-ui text-xs font-bold flex items-center gap-1.5 shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye className="w-3.5 h-3.5 text-[#B5613C]" />
                      <span>Aperçu rapide</span>
                    </span>
                  </div>
                </div>

                {/* Card Info Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4 text-left">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-serif font-bold text-lg text-[#241C18] group-hover:text-[#B5613C] transition-colors leading-snug">
                        {product.name}
                      </h3>
                      {product.weight && (
                        <span className="shrink-0 px-2 py-0.5 rounded bg-[#F1D9C3]/50 text-[#241C18] font-sans-ui text-[11px] font-bold">
                          {product.weight}
                        </span>
                      )}
                    </div>
                    <p className="font-serif text-xs text-[#241C18]/75 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Compatible Skin Tones */}
                  {product.skinTypes && product.skinTypes.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {product.skinTypes.slice(0, 2).map((st) => (
                        <span
                          key={st}
                          className="text-[10px] font-sans-ui px-2 py-0.5 rounded bg-[#F1D9C3]/70 text-[#241C18] font-semibold"
                        >
                          {st}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Price & Add Button */}
                  <div className="pt-3 border-t border-[#F1D9C3] flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="font-sans-ui text-[10px] uppercase text-[#241C18]/60 font-semibold">
                        Prix Unitaire
                      </span>
                      <span className="font-serif font-bold text-xl text-[#B5613C]">
                        {product.price.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={(e) => handleAddToCartClick(e, product)}
                      disabled={loadingProductId === product.id}
                      className={`px-4 py-2.5 rounded-full font-sans-ui text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-xs cursor-pointer ${
                        addedProductId === product.id
                          ? 'bg-[#278652] text-white'
                          : 'bg-[#B5613C] hover:bg-[#9A4E2D] text-white'
                      }`}
                    >
                      {loadingProductId === product.id ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Ajout...</span>
                        </>
                      ) : addedProductId === product.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Ajouté !</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Ajouter</span>
                        </>
                      )}
                    </motion.button>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
