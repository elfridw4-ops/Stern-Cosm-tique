import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, MessageCircle, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigateToCatalog: () => void;
  onOpenWhatsApp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigateToCatalog,
  onOpenWhatsApp,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevCount, setPrevCount] = useState(cartCount);
  const [shouldAnimateCart, setShouldAnimateCart] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (cartCount > prevCount) {
      setShouldAnimateCart(true);
      const timer = setTimeout(() => setShouldAnimateCart(false), 500);
      setPrevCount(cartCount);
      return () => clearTimeout(timer);
    }
    setPrevCount(cartCount);
  }, [cartCount, prevCount]);

  const navLinks = [
    { label: 'Accueil', href: '#hero' },
    { label: 'Produits', href: '#produits' },
    { label: 'Offre Pack', href: '#pack' },
    { label: 'Pourquoi Stern', href: '#pourquoi' },
    { label: 'Avis', href: '#avis' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FBE9E1]/95 backdrop-blur-md shadow-sm border-b border-[#F1D9C3] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="group flex items-center gap-2 text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-[#B5613C] text-white flex items-center justify-center font-serif italic text-lg font-bold shadow-sm transition-transform duration-300 group-hover:scale-105">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg tracking-tight text-[#241C18] group-hover:text-[#B5613C] transition-colors">
                Stern Cosmétique
              </span>
              <span className="font-sans-ui text-[10px] uppercase tracking-widest text-[#B5613C] -mt-1 font-semibold">
                Beauté Naturelle
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 font-serif text-sm">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#241C18]/85 hover:text-[#B5613C] font-medium transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#B5613C] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Direct WhatsApp Contact button */}
            <button
              onClick={onOpenWhatsApp}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#B5613C]/10 hover:bg-[#B5613C]/20 text-[#B5613C] font-sans-ui text-xs font-semibold transition-colors border border-[#B5613C]/20"
              title="Achat en gros ou conseils via WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>

            {/* Cart Button with Cart-Pop animation */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-[#241C18] text-white hover:bg-[#B5613C] transition-colors shadow-sm focus:outline-none group"
              aria-label="Voir le panier"
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-105" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={
                      shouldAnimateCart
                        ? { scale: [1, 1.4, 1] }
                        : { scale: 1 }
                    }
                    transition={{
                      duration: 0.4,
                      ease: [0.34, 1.56, 0.64, 1], // cart-pop bezier
                    }}
                    key={cartCount}
                    className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full bg-[#B5613C] text-white text-[11px] font-sans-ui font-bold flex items-center justify-center border-2 border-[#FBE9E1] shadow-sm"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#241C18] hover:bg-[#F1D9C3]/50 transition-colors"
              aria-label="Menu principal"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="md:hidden bg-[#FBE9E1] border-b border-[#F1D9C3] px-4 pt-3 pb-6 shadow-lg overflow-hidden"
          >
            <div className="flex flex-col space-y-3 font-serif">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-[#241C18] font-medium hover:bg-[#F1D9C3]/40 rounded-lg flex items-center justify-between transition-colors"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#B5613C]" />
                </a>
              ))}
              <div className="pt-2 border-t border-[#F1D9C3] flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenWhatsApp();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#B5613C]/10 text-[#B5613C] font-sans-ui text-sm font-semibold flex items-center justify-center gap-2 border border-[#B5613C]/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Conseil / Achat en gros WhatsApp</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateToCatalog();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#B5613C] text-white font-sans-ui text-sm font-semibold flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Découvrir la collection</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
