import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileNavBar } from './components/MobileNavBar';
import { MiniCartDrawer } from './components/MiniCartDrawer';
import { FilterDrawer } from './components/FilterDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CareGuideModal } from './components/CareGuideModal';
import { LookbookShowcase } from './components/LookbookShowcase';
import { B2BRegistrationModal } from './components/B2BRegistrationModal';
import { FloatingDock } from './components/FloatingDock';

import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { WishlistPage } from './pages/WishlistPage';
import { AccountPage } from './pages/AccountPage';
import { AuthPage } from './pages/AuthPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { PRODUCTS } from './data/products';

export function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // B2B Wholesale State
  const [b2bModalOpen, setB2bModalOpen] = useState(false);
  const [b2bBuyer, setB2bBuyer] = useState(() => {
    try {
      const saved = localStorage.getItem('aurum_b2b_business');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Filter Drawer State
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlating, setSelectedPlating] = useState('All');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Modals
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [careGuideOpen, setCareGuideOpen] = useState(false);

  // Lock strictly to Cashmere Greige & Tuscan Bronze
  useEffect(() => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('aurum_theme');
  }, []);

  const navigateTo = (view, product = null) => {
    if (product) {
      setSelectedProduct(product);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedPlating('All');
    setMaxPrice(10000);
    setSortBy('featured');
    setInStockOnly(false);
    setSearchQuery('');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Global Luxury Header */}
      <Header
        onNavigate={navigateTo}
        currentView={currentView}
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          if (q && currentView !== 'catalog') {
            setCurrentView('catalog');
          }
        }}
        onOpenB2BModal={() => setB2bModalOpen(true)}
        b2bBuyer={b2bBuyer}
      />

      {/* Main Dynamic View Content */}
      <main style={{ flex: 1, animation: 'pageFadeUp 0.35s ease' }}>
        {currentView === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onSelectProduct={(prod) => navigateTo('product', prod)}
            onQuickView={(prod) => setQuickViewProduct(prod)}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {currentView === 'catalog' && (
          <CatalogPage
            products={PRODUCTS}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedPlating={selectedPlating}
            setSelectedPlating={setSelectedPlating}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            sortBy={sortBy}
            setSortBy={setSortBy}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            onOpenFilter={() => setFilterDrawerOpen(true)}
            onResetFilters={resetFilters}
            onSelectProduct={(prod) => navigateTo('product', prod)}
            onQuickView={(prod) => setQuickViewProduct(prod)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {currentView === 'product' && (
          <ProductDetailPage
            product={selectedProduct}
            onNavigate={navigateTo}
            onSelectProduct={(prod) => navigateTo('product', prod)}
            onQuickView={(prod) => setQuickViewProduct(prod)}
            onOpenSizeGuide={() => setSizeGuideOpen(true)}
            onOpenCareGuide={() => setCareGuideOpen(true)}
          />
        )}

        {currentView === 'lookbook' && (
          <div style={{ paddingTop: '2rem' }}>
            <LookbookShowcase
              onSelectProduct={(prod) => navigateTo('product', prod)}
              onQuickView={(prod) => setQuickViewProduct(prod)}
            />
          </div>
        )}

        {currentView === 'cart' && <CartPage onNavigate={navigateTo} />}
        {currentView === 'checkout' && <CheckoutPage onNavigate={navigateTo} />}
        {currentView === 'wishlist' && (
          <WishlistPage
            onNavigate={navigateTo}
            onSelectProduct={(prod) => navigateTo('product', prod)}
            onQuickView={(prod) => setQuickViewProduct(prod)}
          />
        )}
        {currentView === 'account' && <AccountPage onNavigate={navigateTo} />}
        {currentView === 'auth' && <AuthPage onNavigate={navigateTo} />}
        {currentView === 'about' && <AboutPage onNavigate={navigateTo} />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === '404' && <NotFoundPage onNavigate={navigateTo} />}
      </main>

      {/* Global Slide-Out Mini-Cart Drawer */}
      <MiniCartDrawer onNavigate={navigateTo} />

      {/* Global Filter Drawer */}
      <FilterDrawer
        isOpen={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPlating={selectedPlating}
        setSelectedPlating={setSelectedPlating}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        sortBy={sortBy}
        setSortBy={setSortBy}
        inStockOnly={inStockOnly}
        setInStockOnly={setInStockOnly}
        onReset={resetFilters}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onSelectProduct={(prod) => {
          setQuickViewProduct(null);
          navigateTo('product', prod);
        }}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />

      {/* Care Guide Modal */}
      <CareGuideModal
        isOpen={careGuideOpen}
        onClose={() => setCareGuideOpen(false)}
      />

      {/* B2B Wholesaler Verification Modal */}
      <B2BRegistrationModal
        isOpen={b2bModalOpen}
        onClose={() => setB2bModalOpen(false)}
        onVerified={(data) => setB2bBuyer(data)}
      />

      {/* Aceternity-Inspired Luxury Floating Action Dock */}
      <FloatingDock onNavigate={navigateTo} onOpenB2BModal={() => setB2bModalOpen(true)} b2bBuyer={b2bBuyer} />

      {/* Mobile Bottom Bar */}
      <MobileNavBar onNavigate={navigateTo} currentView={currentView} />

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default App;
