import React from 'react';
import { Heart, Sparkles, MessageCircle, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenWhatsApp: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWhatsApp }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2A2430] text-[#F5F2F5] pt-16 pb-10 text-left border-t border-[#6B3F63]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#6B3F63] text-white flex items-center justify-center font-serif italic text-lg font-bold">
                S
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-white">
                Stern Cosmétique
              </span>
            </div>

            <p className="font-serif text-sm text-[#D8D2D8]/80 leading-relaxed max-w-sm">
              L'Essence de la Beauté Naturelle. Des formulations botaniques d'exception créées pour sublimer chaque grain de peau avec élégance.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenWhatsApp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6B3F63] hover:bg-[#8A5282] text-white text-xs font-sans-ui font-semibold transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact direct WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 font-serif">
            <h4 className="font-bold text-base text-white uppercase tracking-wider text-xs font-sans-ui text-[#D8D2D8]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#D8D2D8]/80">
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
            <h4 className="font-bold text-base text-white uppercase tracking-wider text-xs font-sans-ui text-[#D8D2D8]">
              Engagement & Qualité
            </h4>
            <p className="text-xs text-[#D8D2D8]/70 leading-relaxed">
              100% formules vegan et cruelty-free. Expédition express sous 24h avec emballage soigné.
            </p>

            <div className="pt-2 text-xs text-[#D8D2D8]/60 space-y-1">
              <p>Email: contact@sterncosmetique.com</p>
              <p>Tél: +229 41 63 42 42</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans-ui text-[#D8D2D8]/60">
          <p>
            © 2026 Stern Cosmétique — Beauté élégante et naturelle. Tous droits réservés.
          </p>

          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-white transition-colors">
              Mentions légales
            </a>
            <a href="#hero" className="hover:text-white transition-colors">
              Politique de confidentialité
            </a>
            <a href="#hero" className="hover:text-white transition-colors">
              Crédits
            </a>

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
