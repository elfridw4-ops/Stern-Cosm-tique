import React, { useState } from 'react';
import { Heart, Sparkles, MessageCircle, ArrowUp, Share2, Copy, Check } from 'lucide-react';

interface FooterProps {
  onOpenWhatsApp: () => void;
  onOpenLegal?: (tab: 'mentions' | 'privacy' | 'credits') => void;
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWhatsApp, onOpenLegal, onReplayIntro }) => {
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShareWhatsApp = () => {
    const text = "Découvre Stern Cosmétique — Beauté Naturelle & Élégante (Pack Spécial & Soins Botaniques) 🌿✨ :\nhttps://stern-cosm.vercel.app";
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    const shareData = {
      title: 'Stern Cosmétique — Beauté Naturelle & Élégante',
      text: 'Découvre le Pack Spécial Stern et nos soins botaniques 100% naturels pour tous types de peau 🌿✨',
      url: 'https://stern-cosm.vercel.app',
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User canceled or device prevented share
      }
    }
    handleShareWhatsApp();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://stern-cosm.vercel.app');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNavScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    if (targetId === 'hero') {
      scrollToTop();
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
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
                <a
                  href="#hero"
                  onClick={(e) => handleNavScroll(e, '#hero')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="#produits"
                  onClick={(e) => handleNavScroll(e, '#produits')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Catalogue Produits
                </a>
              </li>
              <li>
                <a
                  href="#pack"
                  onClick={(e) => handleNavScroll(e, '#pack')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pack Spécial Stern
                </a>
              </li>
              <li>
                <a
                  href="#pourquoi"
                  onClick={(e) => handleNavScroll(e, '#pourquoi')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pourquoi choisir Stern
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNavScroll(e, '#contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Conseils
                </a>
              </li>
              {onReplayIntro && (
                <li className="pt-2">
                  <button
                    onClick={onReplayIntro}
                    className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-full border border-white/10 text-[#F1D9C3]"
                  >
                    <Sparkles className="w-3 h-3 text-[#B5613C]" />
                    <span>Rejouer l'introduction</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Legal & Info + Sharing */}
          <div className="md:col-span-4 space-y-4 font-serif">
            <h4 className="font-bold text-base text-white uppercase tracking-wider text-xs font-sans-ui text-[#F1D9C3]">
              Engagement & Partage
            </h4>
            <p className="text-xs text-[#F1D9C3]/70 leading-relaxed">
              100% formules botaniques. Expédition express avec emballage soigné.
            </p>

            {/* Share Site Box */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <span className="text-xs font-sans-ui font-semibold text-[#F1D9C3] flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-[#B5613C]" />
                <span>Partager Stern Cosmétique (Story / Fil / WhatsApp)</span>
              </span>
              <p className="text-[11px] text-[#F1D9C3]/60 leading-tight">
                Recommandez notre boutique <strong>stern-cosm.vercel.app</strong> (l'image du Pack Spécial s'affichera automatiquement dans votre story/fil).
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={handleNativeShare}
                  className="px-3 py-1.5 rounded-full bg-[#B5613C] hover:bg-[#9A4E2D] text-white text-xs font-sans-ui font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  title="Partager dans votre story ou fil d'actualité"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Story & Fil</span>
                </button>
                <button
                  onClick={handleShareWhatsApp}
                  className="px-3 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-sans-ui font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  title="Partager sur WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-sans-ui font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Copier le lien"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Lien copié !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#F1D9C3]" />
                      <span>Copier lien</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="text-xs text-[#F1D9C3]/60 space-y-0.5">
              <p>Email: contact@sterncosmetique.com</p>
              <p>Tél / WhatsApp: +229 41 63 42 42</p>
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
