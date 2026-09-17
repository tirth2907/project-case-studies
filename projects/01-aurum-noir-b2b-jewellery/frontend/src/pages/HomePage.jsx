import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Star, ChevronRight, Eye } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { FlashSaleBanner } from '../components/FlashSaleBanner';
import { LookbookShowcase } from '../components/LookbookShowcase';
import { AmbientSilkDustCanvas } from '../components/AmbientSilkDustCanvas';

export const HomePage = ({ onNavigate, onSelectProduct, onQuickView, setSelectedCategory }) => {
  const bestsellers = PRODUCTS.filter(p => p.tag === 'Bestseller' || p.isFlashSale).slice(0, 6);
  const newArrivals = PRODUCTS.slice(4, 8);

  return (
    <div>
      {/* Hero Banner Showcase with Ambient Dust Canvas */}
      <section style={{ position: 'relative', minHeight: '82vh', display: 'flex', alignItems: 'center', background: 'var(--emerald-radial)', overflow: 'hidden' }}>
        {/* Interactive Ambient Silk Dust */}
        <AmbientSilkDustCanvas />

        {/* Ambient Warm Glow */}
        <div style={{ position: 'absolute', top: '10%', right: '15%', width: '380px', height: '380px', background: 'radial-gradient(circle, var(--gold-border-bright) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center', padding: '4rem 1.5rem' }}>
          {/* Left Text */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gold-primary)', background: 'rgba(158, 127, 76, 0.12)', border: '1px solid var(--gold-border)', padding: '0.35rem 0.9rem', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.2rem', fontWeight: 700 }}>
              <Sparkles size={14} />
              The 2026 Grand Bridal Edit
            </div>

            <h1 style={{ fontSize: '3.6rem', lineHeight: 1.15, color: 'var(--text-primary)', marginBottom: '1.2rem', fontWeight: 600 }}>
              <span className="kinetic-reveal-line kinetic-delay-1">Timeless Elegance,</span> <br />
              <span className="kinetic-reveal-line kinetic-delay-2 text-gold-gradient">Heirloom Brilliance.</span>
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '520px', marginBottom: '2.2rem' }}>
              Handcrafted Jadau Kundan, royal Polki, and South Indian Temple jewellery finished with double-layer 18K micro gold electroplating. Opulence for weddings and sacred celebrations.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <button
                onClick={() => onNavigate('catalog')}
                className="btn btn-gold"
                style={{ fontSize: '0.9rem', padding: '1rem 2rem' }}
              >
                <span>Explore Full Catalogue</span>
                <ArrowRight size={17} />
              </button>

              <button
                onClick={() => onNavigate('lookbook')}
                className="btn btn-outline-gold"
                style={{ fontSize: '0.9rem', padding: '1rem 2rem' }}
              >
                <span>View Bridal Lookbook</span>
              </button>
            </div>

            {/* Micro Stats */}
            <div style={{ display: 'flex', gap: '2.5rem', marginTop: '3rem', borderTop: '1px solid var(--gold-border)', paddingTop: '1.5rem' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--gold-light)' }}>10,000+</span>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Brides Styled Worldwide</span>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--gold-light)' }}>18K Micro</span>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Gold Plating Guarantee</span>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--gold-light)' }}>4.9 ★</span>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Customer Satisfaction</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div
              className="glass-card animate-float"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '440px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--gold-border-bright)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.8), var(--shadow-gold)'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=85"
                alt="Bridal Choker Suite"
                style={{ width: '100%', height: '500px', objectFit: 'cover' }}
              />

              {/* Floating Featured Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  background: 'var(--bg-card)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid var(--gold-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem 1.2rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Featured Masterpiece
                  </span>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', margin: '0 0 0.2rem 0' }}>The Noor-e-Jahan Suite</h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--gold-primary)', fontWeight: 700 }}>₹6,499 (18K Gold Plated)</span>
                </div>

                <button
                  onClick={() => onSelectProduct(PRODUCTS[0])}
                  className="btn btn-gold"
                  style={{ padding: '0.5rem 0.8rem', fontSize: '0.75rem' }}
                >
                  <Eye size={14} />
                  <span>Inspect</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Icons Carousel */}
      <section className="container" style={{ margin: '3.5rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ color: 'var(--gold-primary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600 }}>
            Curated Categories
          </span>
          <h2 style={{ fontSize: '2.2rem', color: 'var(--text-primary)', marginTop: '0.3rem' }}>
            Browse By Craftsmanship
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.2rem' }}>
          {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                onNavigate('catalog');
              }}
              className="glass-card"
              style={{
                cursor: 'pointer',
                textAlign: 'center',
                padding: '1.5rem 1rem',
                border: '1px solid var(--gold-border)',
                transition: 'all 0.3s var(--ease-spring)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.8rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-6px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--gold-border-bright)', position: 'relative' }}>
                <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', margin: '0 0 0.2rem 0' }}>{cat.name}</h4>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{cat.count} Designs</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Flash Sale Ticker Banner */}
      <div className="container">
        <FlashSaleBanner onNavigate={onNavigate} />
      </div>

      {/* Editorial "Shop The Bridal Look" Lookbook */}
      <LookbookShowcase onSelectProduct={onSelectProduct} onQuickView={onQuickView} />

      {/* Bestselling Heirlooms Section */}
      <section className="container section-spacing">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ color: 'var(--gold-primary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600 }}>
              Royal Favourites
            </span>
            <h2 style={{ fontSize: '2.4rem', color: 'var(--text-primary)', marginTop: '0.3rem' }}>
              Best Selling Jewellery
            </h2>
          </div>

          <button
            onClick={() => onNavigate('catalog')}
            className="btn btn-outline-gold"
            style={{ fontSize: '0.82rem' }}
          >
            <span>View All Pieces</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid-catalog">
          {bestsellers.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </section>

      {/* Bento Grid New Arrivals Showcase */}
      <section style={{ background: 'var(--bg-secondary)', padding: '5rem 0', borderTop: '1px solid var(--gold-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: 'var(--gold-primary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600 }}>
              Fresh From Karigar Ateliers
            </span>
            <h2 style={{ fontSize: '2.4rem', color: 'var(--text-primary)', marginTop: '0.3rem' }}>
              New Haute Arrivals
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {newArrivals.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
