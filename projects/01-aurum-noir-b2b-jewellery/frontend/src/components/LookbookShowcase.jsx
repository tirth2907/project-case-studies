import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Eye, X, ArrowRight } from 'lucide-react';
import { LOOKBOOK_DATA } from '../data/lookbook';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../config';

export const LookbookShowcase = ({ onSelectProduct, onQuickView }) => {
  const { addToCart, currency } = useCart();
  const [activeSpot, setActiveSpot] = useState(LOOKBOOK_DATA.hotspots[0]);

  const activeProduct = activeSpot ? PRODUCTS.find(p => p.id === activeSpot.productId) : null;

  return (
    <section className="section-spacing" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--gold-border)', borderBottom: '1px solid var(--gold-border)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gold-primary)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 600 }}>
            <Sparkles size={14} />
            Editorial Lookbook
          </div>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '0.8rem' }}>
            {LOOKBOOK_DATA.title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Click the golden shimmering pins on the model below to explore and shop individual handcrafted elements of this complete bridal trousseau.
          </p>
        </div>

        {/* Interactive Lookbook Canvas */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1000px',
            margin: '0 auto',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '1px solid var(--gold-border-bright)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
          }}
        >
          {/* Main Editorial Photo */}
          <div style={{ position: 'relative', width: '100%', height: '580px', background: 'var(--bg-card)' }}>
            <img
              src={LOOKBOOK_DATA.image}
              alt="Bridal Lookbook"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* Gradient Overlays for Elegance */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)' }} />

            {/* Hotspot Pins */}
            {LOOKBOOK_DATA.hotspots.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setActiveSpot(spot)}
                style={{
                  position: 'absolute',
                  top: `${spot.y}%`,
                  left: `${spot.x}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--gold-gradient)',
                  border: '2px solid #ffffff',
                  boxShadow: '0 0 15px rgba(212,175,55,0.9)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                  animation: 'hotspotRipple 2.5s infinite ease-in-out'
                }}
                title={spot.name}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#000' }} />
              </button>
            ))}

            {/* Active Pin Floating Card */}
            {activeSpot && activeProduct && (
              <div
                className="glass-card"
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  maxWidth: '360px',
                  padding: '1.2rem',
                  background: 'rgba(7, 23, 17, 0.92)',
                  border: '1px solid var(--gold-border-bright)',
                  borderRadius: 'var(--radius-md)',
                  zIndex: 20,
                  animation: 'modalZoomIn 0.3s var(--ease-spring)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                  <span className="badge badge-gold" style={{ fontSize: '0.68rem' }}>
                    {activeSpot.tag}
                  </span>
                  <button
                    onClick={() => setActiveSpot(null)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                  >
                    <X size={16} />
                  </button>
                </div>

                <h4 style={{ fontSize: '1.1rem', color: '#fff', margin: '0 0 0.3rem 0' }}>
                  {activeProduct.name}
                </h4>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '0.8rem' }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--gold-light)' }}>
                    {formatPrice(activeProduct.price, currency)}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    {formatPrice(activeProduct.originalPrice, currency)}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <button
                    onClick={() => addToCart(activeProduct)}
                    className="btn btn-gold"
                    style={{ fontSize: '0.75rem', padding: '0.6rem 0.5rem' }}
                  >
                    <ShoppingBag size={14} />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={() => onSelectProduct(activeProduct)}
                    className="btn btn-outline-gold"
                    style={{ fontSize: '0.75rem', padding: '0.6rem 0.5rem' }}
                  >
                    <span>View Piece</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
