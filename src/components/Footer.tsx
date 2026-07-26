import React from 'react';
import { Heart, Sparkles, MessageCircle, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenWhatsApp: () => void;
  onOpenLegal?: (tab: 'mentions' | 'privacy' | 'credits') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWhatsApp, onOpenLegal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#241C18] text-[#FBE9E1] pt-16 pb-10 text-left border-t border-[#B5613C]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center border border-white/10">
                <img
                  src="/Logo-transparent.png"
                  alt="Stern Cosmétique"
                  className="h-9 w-auto object-contain brightness-0 invert"
                />
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-white">
                Stern Cosmétique
              </span>
            </div>

            <p className="font-serif text-sm text-[#F1D9C3]/80 leading-relaxed max-w-sm">
              L'Essence de la Beauté Naturelle. Des formulations botaniques d'exception créées pour sublimer chaque grain de peau avec élégance.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenWhatsApp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B5613C] hover:bg-[#9A4E2D] text-white text-xs font-sans-ui font-bold transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact direct WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 font-serif">
            <h4 className="font-bold text-base text-white uppercase tracking-wider text-xs font-sans-ui text-[#F1D9C3]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#F1D9C3]/80">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#produits" className="hover:text-white transition-colors">
                  Catalogue Produits
                </a>
              </li>
              <li>
                <a href="#pack" className="hover:text-white transition-colors">
                  Pack Spécial Stern
                </a>
              </li>
              <li>
                <a href="#pourquoi" className="hover:text-white transition-colors">
                  Pourquoi choisir Stern
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact & Conseils
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Info */}
          <div className="md:col-span-4 space-y-3 font-serif">
            <h4 className="font-bold text-base text-white uppercase tracking-wider text-xs font-sans-ui text-[#F1D9C3]">
              Engagement & Qualité
            </h4>
            <p className="text-xs text-[#F1D9C3]/70 leading-relaxed">
              100% formules vegan et cruelty-free. Expédition express sous 24h avec emballage soigné.
            </p>

            <div className="pt-2 text-xs text-[#F1D9C3]/60 space-y-1">
              <p>Email: contact@sterncosmetique.com</p>
              <p>Tél: +229 41 63 42 42</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans-ui text-[#F1D9C3]/60">
          <p>
            © 2026 Stern Cosmétique — Beauté élégante et naturelle. Tous droits réservés.
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={() => onOpenLegal?.('mentions')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Mentions légales & Droits d'auteur
            </button>
            <button
              onClick={() => onOpenLegal?.('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Politique de confidentialité
            </button>
            <button
              onClick={() => onOpenLegal?.('credits')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Propriété des Visuels
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Haut de page"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
