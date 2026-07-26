import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ShoppingBag, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onCartClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onCartClick }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const gentleEase = [0.25, 0.1, 0.25, 1.0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden bg-[#FBE9E1]"
    >
      {/* Background Soft Glow Accents */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#B5613C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#F1D9C3]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: gentleEase }}
              className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-[#241C18] leading-[1.15] tracking-tight"
            >
              Nos soins, <br />
              <span className="italic font-normal text-[#B5613C]">
                Votre éclat naturel.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease: gentleEase }}
              className="font-serif text-lg sm:text-xl text-[#241C18]/80 max-w-xl leading-relaxed"
            >
              Découvrez nos gammes de soins formulées pour chaque type de peau.
              <span className="block font-medium text-[#241C18] mt-1">
                Naturel. Efficace. Fait pour vous.
              </span>
            </motion.p>

            {/* Quick Benefits Pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45, ease: gentleEase }}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-sans-ui font-semibold text-[#241C18] bg-[#F1D9C3]/60 px-3 py-1 rounded-full border border-[#F1D9C3]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B5613C]" />
                Ingrédients Végétaux
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-sans-ui font-semibold text-[#241C18] bg-[#F1D9C3]/60 px-3 py-1 rounded-full border border-[#F1D9C3]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B5613C]" />
                Résultats Visibles
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-sans-ui font-semibold text-[#241C18] bg-[#F1D9C3]/60 px-3 py-1 rounded-full border border-[#F1D9C3]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B5613C]" />
                Fabriqué avec passion
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5, ease: gentleEase }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
            >
              {/* Primary CTA Terracotta */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onExploreClick}
                className="px-8 py-4 rounded-full bg-[#B5613C] text-white font-sans-ui text-sm font-bold tracking-wide shadow-md hover:bg-[#9A4E2D] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Découvrir la collection</span>
                <ArrowDown className="w-4 h-4 -rotate-90 transition-transform group-hover:translate-x-0.5" />
              </motion.button>

              {/* Secondary CTA */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onCartClick}
                className="px-7 py-4 rounded-full bg-white text-[#241C18] font-sans-ui text-sm font-semibold border border-[#F1D9C3] hover:bg-white/80 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <ShoppingBag className="w-4 h-4 text-[#B5613C]" />
                <span>Voir le panier</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Right Editorial Image Showcase Column */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0, ease: gentleEase }}
              style={{
                x: mousePos.x * 12,
                y: mousePos.y * 12,
              }}
              className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#F1D9C3]/50 border border-white/60 aspect-[4/5] group"
            >
              {/* Main Editorial Image */}
              <img
                src="/images/hero-2.jpeg"
                alt="Stern Cosmétique - Gamme de Soins Naturels"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#241C18]/70 via-transparent to-transparent opacity-80" />

              {/* Floating Glassmorphism Tag */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/50 text-left shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-sans-ui uppercase tracking-widest text-[#B5613C] font-bold">
                      Gamme Stern Premium
                    </span>
                    <p className="font-serif font-bold text-[#241C18] text-base">
                      Savon Ozone & Crème Sublimatrice
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-[#B5613C] text-white text-xs font-sans-ui font-semibold">
                    100% Naturel
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Decorative Floating Accent Pill */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: gentleEase }}
              className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-sm p-3.5 rounded-2xl shadow-xl border border-[#F1D9C3] hidden sm:flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-[#F1D9C3] flex items-center justify-center text-[#B5613C] font-serif font-bold text-lg">
                ★
              </div>
              <div className="text-left">
                <p className="text-xs font-sans-ui font-bold text-[#241C18]">
                  Garantie Satisfaction
                </p>
                <p className="text-[11px] text-[#241C18]/70 font-sans-ui">
                  Formules douces non décapantes
                </p>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="#reassurance"
            className="p-3 rounded-full bg-white/80 border border-[#F1D9C3] text-[#B5613C] hover:bg-[#B5613C] hover:text-white transition-all shadow-xs group"
            aria-label="Faire défiler"
          >
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
