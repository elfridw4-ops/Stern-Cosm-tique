import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface SplashIntroProps {
  onComplete: () => void;
}

export const SplashIntro: React.FC<SplashIntroProps> = ({ onComplete }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Stage 1: Reveal logo image after 400ms
    const logoTimer = setTimeout(() => setShowLogo(true), 400);

    // Stage 2: Reveal tagline after 1500ms
    const taglineTimer = setTimeout(() => setShowTagline(true), 1500);

    // Stage 3: Reveal skip button option after 2600ms
    const buttonTimer = setTimeout(() => setShowButton(true), 2600);

    // Stage 4: Automatically complete splash intro after 5000ms (5 seconds total)
    const autoCompleteTimer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(taglineTimer);
      clearTimeout(buttonTimer);
      clearTimeout(autoCompleteTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: -30,
        transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } 
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FBE9E1] overflow-hidden"
    >
      {/* Botanical/Elegant Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#B5613C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#F1D9C3]/40 rounded-full blur-3xl pointer-events-none" />

      {/* Main Intro content */}
      <div className="relative flex flex-col items-center text-center max-w-md px-6 select-none z-10">
        
        {/* Central Logo Image */}
        <AnimatePresence>
          {showLogo && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
              }}
              className="relative mb-5 mt-4 flex flex-col items-center"
            >
              {/* Soft reflection/glow behind the logo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-white/40 rounded-full blur-xl pointer-events-none" />
              
              <img
                src="/Logo-transparent.png"
                alt="Stern Cosmétique"
                className="h-28 sm:h-32 w-auto object-contain relative z-10 drop-shadow-sm"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Brand Text and Tagline */}
        <div className="space-y-2 h-20">
          <AnimatePresence>
            {showTagline && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }
                }}
                className="flex flex-col items-center"
              >
                <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#241C18]">
                  Stern Cosmétique
                </h1>
                
                {/* Custom Divider */}
                <div className="w-10 h-[1.5px] bg-[#B5613C]/40 my-2.5 rounded-full" />
                
                <p className="font-sans-ui text-xs sm:text-sm uppercase tracking-widest text-[#B5613C] font-semibold">
                  Beauté Naturelle & Élégante
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Loading Ring / Spinner Bar */}
        <div className="w-48 h-[2px] bg-[#F1D9C3] rounded-full overflow-hidden mt-6 relative">
          <motion.div
            initial={{ left: '-100%' }}
            animate={{ 
              left: '100%',
              transition: { 
                repeat: Infinity, 
                duration: 1.8, 
                ease: 'easeInOut' 
              }
            }}
            className="absolute top-0 bottom-0 w-2/3 bg-gradient-to-r from-transparent via-[#B5613C] to-transparent"
          />
        </div>

      </div>

      {/* Bottom Floating skip button */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 0.75, 
              y: 0,
              transition: { duration: 0.5 }
            }}
            whileHover={{ opacity: 1 }}
            className="absolute bottom-8 right-8 z-20"
          >
            <button
              onClick={onComplete}
              className="group flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#B5613C]/20 bg-white/70 backdrop-blur-xs text-[#241C18] text-xs font-sans-ui font-semibold hover:border-[#B5613C] hover:bg-white transition-all cursor-pointer shadow-xs"
            >
              <span>Passer l'introduction</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B5613C] transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
