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
      <Footer onOpenWhatsApp={() => handleOpenWhatsApp()} />

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

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
