import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Reassurance } from './components/Reassurance';
import { SpecialPackOffer } from './components/SpecialPackOffer';
import { ProductCatalog } from './components/ProductCatalog';
import { SkinDiagnosticQuiz } from './components/SkinDiagnosticQuiz';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { LegalModal } from './components/LegalModal';
import { Toast } from './components/Toast';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data/products';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('stern_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'mentions' | 'privacy' | 'credits'>('mentions');

  const handleOpenLegal = (tab: 'mentions' | 'privacy' | 'credits' = 'mentions') => {
    setLegalTab(tab);
    setIsLegalOpen(true);
  };

  // Check initial deep link in URL for specific product
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const productIdFromQuery = params.get('product');
      const hash = window.location.hash;
      const productIdFromHash = hash.startsWith('#product-') ? hash.replace('#product-', '') : null;

      const targetId = productIdFromQuery || productIdFromHash;
      if (targetId) {
        const found = PRODUCTS.find((p) => p.id === targetId);
        if (found) {
          setSelectedProduct(found);
        }
      }
    } catch {
      // Ignore URL parsing errors
    }
  }, []);

  // Update dynamic head OG meta tags and URL when selectedProduct changes
  useEffect(() => {
    const updateMetaTag = (selector: string, attr: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (selector.includes('property=')) {
          const propName = selector.split('property="')[1]?.replace('"]', '');
          if (propName) el.setAttribute('property', propName);
        } else if (selector.includes('name=')) {
          const nameValue = selector.split('name="')[1]?.replace('"]', '');
          if (nameValue) el.setAttribute('name', nameValue);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, content);
    };

    if (selectedProduct) {
      const fullImageUrl = selectedProduct.image.startsWith('http')
        ? selectedProduct.image
        : `https://stern-cosm.vercel.app${selectedProduct.image}`;
      const productUrl = `https://stern-cosm.vercel.app/?product=${selectedProduct.id}`;
      const titleText = `${selectedProduct.name} (${selectedProduct.price.toLocaleString('fr-FR')} FCFA) — Stern Cosmétique`;
      const descText = `${selectedProduct.name} : ${selectedProduct.description}`;

      document.title = titleText;

      updateMetaTag('meta[property="og:title"]', 'content', titleText);
      updateMetaTag('meta[property="og:description"]', 'content', descText);
      updateMetaTag('meta[property="og:image"]', 'content', fullImageUrl);
      updateMetaTag('meta[property="og:image:secure_url"]', 'content', fullImageUrl);
      updateMetaTag('meta[property="og:image:alt"]', 'content', selectedProduct.name);
      updateMetaTag('meta[property="og:url"]', 'content', productUrl);

      updateMetaTag('meta[name="twitter:title"]', 'content', titleText);
      updateMetaTag('meta[name="twitter:description"]', 'content', descText);
      updateMetaTag('meta[name="twitter:image"]', 'content', fullImageUrl);

      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', `/?product=${selectedProduct.id}`);
      }
    } else {
      document.title = 'Stern Cosmétique — Beauté Naturelle & Élégante';
      const defaultImage = 'https://stern-cosm.vercel.app/images/pack-stern.jpeg';
      const defaultUrl = 'https://stern-cosm.vercel.app/';

      updateMetaTag('meta[property="og:title"]', 'content', 'Stern Cosmétique — Beauté Naturelle & Élégante');
      updateMetaTag('meta[property="og:description"]', 'content', 'Découvrez le Pack Spécial Stern et nos soins cosmétiques d\'exception 100% naturels.');
      updateMetaTag('meta[property="og:image"]', 'content', defaultImage);
      updateMetaTag('meta[property="og:image:secure_url"]', 'content', defaultImage);
      updateMetaTag('meta[property="og:url"]', 'content', defaultUrl);

      updateMetaTag('meta[name="twitter:title"]', 'content', 'Stern Cosmétique — Beauté Naturelle & Élégante');
      updateMetaTag('meta[name="twitter:description"]', 'content', 'Découvrez le Pack Spécial Stern et nos soins cosmétiques d\'exception 100% naturels.');
      updateMetaTag('meta[name="twitter:image"]', 'content', defaultImage);

      if (window.history && window.history.replaceState) {
        const currentHash = window.location.hash.startsWith('#product-') ? '' : window.location.hash;
        window.history.replaceState(null, '', `/${currentHash}`);
      }
    }
  }, [selectedProduct]);

  useEffect(() => {
    try {
      localStorage.setItem('stern_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    showToast(`"${product.name}" ajouté au panier !`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const packProduct = PRODUCTS.find((p) => p.id === 'pack-stern-special') || PRODUCTS[0];

  const handleOpenWhatsApp = (customText?: string) => {
    const text =
      customText ||
      'Bonjour Stern Cosmétique 👋, je souhaite avoir des conseils sur vos soins et produits.';
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/22941634242?text=${encoded}`, '_blank');
  };

  const handleOpenWhatsAppWholesale = () => {
    handleOpenWhatsApp(
      'Bonjour Stern Cosmétique 👋, je suis intéressé(e) par un achat en gros / devenir revendeur. Pouvez-vous me transmettre vos tarifs et conditions ?'
    );
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBE9E1] text-[#241C18] font-serif antialiased selection:bg-[#B5613C] selection:text-white">
      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateToCatalog={() => scrollToSection('produits')}
        onOpenWhatsApp={() => handleOpenWhatsApp()}
      />

      {/* Main Content Sections */}
      <main>
        {/* Section 1: Hero */}
        <Hero
          onExploreClick={() => scrollToSection('produits')}
          onCartClick={() => setIsCartOpen(true)}
        />

        {/* Section 2: Réassurance */}
        <Reassurance />

        {/* Section 3: Offre Spéciale (Pack Stern) */}
        <SpecialPackOffer
          packProduct={packProduct}
          onAddToCart={handleAddToCart}
          onOpenModal={(prod) => setSelectedProduct(prod)}
        />

        {/* Diagnostic Quiz Interactif */}
        <SkinDiagnosticQuiz
          onAddToCart={handleAddToCart}
          onOpenModal={(prod) => setSelectedProduct(prod)}
        />

        {/* Section 4: Nos Produits (Savons + Crèmes) */}
        <ProductCatalog
          onAddToCart={handleAddToCart}
          onOpenModal={(prod) => setSelectedProduct(prod)}
          onOpenWhatsAppWholesale={handleOpenWhatsAppWholesale}
        />

        {/* Section 5: Pourquoi Choisir Stern */}
        <WhyChooseUs />

        {/* Section 6: Ce que disent nos clientes */}
        <Testimonials />

        {/* Section 7: Contact */}
        <ContactSection onOpenWhatsApp={() => handleOpenWhatsApp()} />
      </main>

      {/* Footer */}
      <Footer
        onOpenWhatsApp={() => handleOpenWhatsApp()}
        onOpenLegal={handleOpenLegal}
      />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenWhatsAppWholesale={handleOpenWhatsAppWholesale}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenWhatsApp={() => handleOpenWhatsApp()}
      />

      {/* Legal Modal */}
      <LegalModal
        isOpen={isLegalOpen}
        initialTab={legalTab}
        onClose={() => setIsLegalOpen(false)}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
