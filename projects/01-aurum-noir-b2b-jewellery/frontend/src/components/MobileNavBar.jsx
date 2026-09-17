import React from 'react';
import { Home, Sparkles, Heart, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { BRAND_CONFIG } from '../config';

export const MobileNavBar = ({ onNavigate, currentView }) => {
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <div className="mobile-bottom-bar" style={{ display: 'none', position: 'fixed', bottom: 0, left: 0, width: '100%', zIndex: 999, background: 'rgba(7, 23, 17, 0.95)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderTop: '1px solid rgba(212, 175, 55, 0.3)', padding: '0.5rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <button
          onClick={() => onNavigate('home')}
          style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem', color: currentView === 'home' ? 'var(--gold-primary)' : 'var(--text-muted)', cursor: 'pointer' }}
        >
          <Home size={20} />
          <span style={{ fontSize: '0.68rem', fontWeight: 600 }}>Home</span>
        </button>

        <button
          onClick={() => onNavigate('catalog')}
          style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem', color: currentView === 'catalog' ? 'var(--gold-primary)' : 'var(--text-muted)', cursor: 'pointer' }}
        >
          <Sparkles size={20} />
          <span style={{ fontSize: '0.68rem', fontWeight: 600 }}>Catalogue</span>
        </button>

        <button
          onClick={() => onNavigate('wishlist')}
          style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem', color: currentView === 'wishlist' ? 'var(--gold-primary)' : 'var(--text-muted)', cursor: 'pointer', position: 'relative' }}
        >
          <Heart size={20} fill={wishlistCount > 0 ? "var(--gold-primary)" : "none"} />
          {wishlistCount > 0 && (
            <span style={{ position: 'absolute', top: -4, right: 6, background: 'var(--gold-gradient)', color: '#000', fontSize: '0.6rem', fontWeight: 700, width: '15px', height: '15px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {wishlistCount}
            </span>
          )}
          <span style={{ fontSize: '0.68rem', fontWeight: 600 }}>Saved</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem', color: 'var(--gold-light)', cursor: 'pointer', position: 'relative' }}
        >
          <ShoppingBag size={20} />
          {totalItems > 0 && (
            <span style={{ position: 'absolute', top: -4, right: 2, background: 'var(--gold-gradient)', color: '#000', fontSize: '0.6rem', fontWeight: 700, width: '15px', height: '15px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {totalItems}
            </span>
          )}
          <span style={{ fontSize: '0.68rem', fontWeight: 600 }}>Bag</span>
        </button>

        <a
          href={`https://wa.me/${BRAND_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noreferrer"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem', color: '#25d366', textDecoration: 'none' }}
        >
          <MessageCircle size={20} />
          <span style={{ fontSize: '0.68rem', fontWeight: 600 }}>WhatsApp</span>
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-bottom-bar { display: block !important; }
        }
      `}</style>
    </div>
  );
};
