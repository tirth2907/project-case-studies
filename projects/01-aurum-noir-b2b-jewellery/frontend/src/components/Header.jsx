import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Sparkles, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { BRAND_CONFIG } from '../config';

export const Header = ({ onNavigate, currentView, searchQuery, setSearchQuery, onOpenB2BModal, b2bBuyer }) => {
  const { totalItems, setIsCartOpen, currency, setCurrency } = useCart();
  const { wishlistCount } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 900, backdropFilter: 'blur(24px) saturate(180%)', WebkitBackdropFilter: 'blur(24px) saturate(180%)', background: 'var(--header-bg)', borderBottom: '1px solid var(--glass-border)', boxShadow: '0 4px 24px rgba(28, 25, 23, 0.04), inset 0 -1px 0 rgba(255, 255, 255, 0.8)' }}>
      {/* Top B2B Announcement Bar */}
      <div style={{ background: 'var(--topbar-bg)', borderBottom: '1px solid rgba(255, 255, 255, 0.04)', padding: '0.45rem 1rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="badge badge-b2b" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
              B2B WHOLESALE PORTAL
            </span>
            <span>Direct Manufacturer Rates for Boutiques & Resellers (Default MOQ: 3 pcs)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {b2bBuyer ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#7b9982', fontWeight: 600 }}>
                <CheckCircle2 size={13} />
                <span>{b2bBuyer.businessName} (GST Verified)</span>
              </div>
            ) : (
              <button
                onClick={onOpenB2BModal}
                style={{ background: 'none', border: 'none', color: 'var(--gold-light)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', textDecoration: 'underline' }}
              >
                <Building2 size={13} />
                <span>Verify Wholesaler Account</span>
              </button>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span>Currency:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--gold-light)', border: '1px solid var(--gold-border)', borderRadius: '4px', padding: '0.15rem 0.4rem', fontSize: '0.75rem', cursor: 'pointer', outline: 'none' }}
              >
                {Object.entries(BRAND_CONFIG.currencies).map(([code, cur]) => (
                  <option key={code} value={code} style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                    {code} ({cur.symbol.trim()})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.5rem' }}>
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ display: 'none', background: 'none', border: 'none', color: 'var(--gold-light)', cursor: 'pointer', padding: '0.3rem' }}
          className="mobile-hamburger"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('home')}
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', fontWeight: 700, letterSpacing: '0.18em', color: 'var(--text-primary)', textTransform: 'uppercase' }}>
            AURUM <span style={{ color: 'var(--gold-primary)', fontStyle: 'italic' }}>NOIR</span>
          </span>
          <span style={{ fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold-light)', marginTop: '-0.2rem' }}>
            B2B Wholesale & Export Vault
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {[
            { id: 'home', label: 'Wholesale Home' },
            { id: 'catalog', label: 'B2B Catalogue' },
            { id: 'lookbook', label: 'Bridal Lookbook' },
            { id: 'about', label: 'Manufacturing' },
            { id: 'contact', label: 'Bulk Concierge' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: currentView === item.id ? 'var(--gold-light)' : 'var(--text-secondary)',
                fontSize: '0.88rem',
                fontWeight: currentView === item.id ? 600 : 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                position: 'relative',
                padding: '0.4rem 0',
                transition: 'color 0.2s'
              }}
            >
              {item.label}
              {currentView === item.id && (
                <span style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', background: 'var(--gold-gradient)', borderRadius: '2px' }} />
              )}
            </button>
          ))}
        </nav>

        {/* Action Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          {/* Search Toggle */}
          <div style={{ position: 'relative' }}>
            {searchOpen ? (
              <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-full)', padding: '0.2rem 0.8rem', border: '1px solid rgba(212, 175, 55, 0.4)' }}>
                <Search size={16} color="var(--gold-primary)" />
                <input
                  type="text"
                  placeholder="Search choker, SKU, Polki..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{ background: 'none', border: 'none', color: '#fff', fontSize: '0.85rem', padding: '0.35rem 0.6rem', outline: 'none', width: '180px' }}
                />
                <button onClick={() => setSearchOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                style={{ background: 'none', border: 'none', color: 'var(--gold-light)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={() => onNavigate('wishlist')}
            style={{ background: 'none', border: 'none', color: currentView === 'wishlist' ? 'var(--gold-primary)' : 'var(--gold-light)', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center' }}
            aria-label="Wishlist"
          >
            <Heart size={20} fill={wishlistCount > 0 ? "var(--gold-primary)" : "none"} />
            {wishlistCount > 0 && (
              <span style={{ position: 'absolute', top: -7, right: -8, background: 'var(--gold-gradient)', color: '#000', fontSize: '0.65rem', fontWeight: 700, width: '17px', height: '17px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {wishlistCount}
              </span>
            )}
          </button>

          {/* B2B Purchase Order Drawer Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{ background: 'rgba(212, 175, 55, 0.12)', border: '1px solid rgba(212, 175, 55, 0.35)', color: 'var(--gold-light)', borderRadius: 'var(--radius-sm)', padding: '0.45rem 0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            aria-label="Open Purchase Order"
          >
            <ShoppingBag size={18} />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.05em' }}>
              PO BAG ({totalItems})
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{ background: '#ffffff', borderTop: '1px solid var(--gold-border)', boxShadow: '0 12px 30px rgba(28, 25, 23, 0.12)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { id: 'home', label: 'Wholesale Home' },
            { id: 'catalog', label: 'B2B Full Catalogue' },
            { id: 'lookbook', label: 'Bridal Lookbook' },
            { id: 'wishlist', label: `Saved Samples (${wishlistCount})` },
            { id: 'account', label: 'Purchase Orders & Tracking' },
            { id: 'about', label: 'Factory & Manufacturing' },
            { id: 'contact', label: 'WhatsApp Bulk Concierge' }
          ].map(it => (
            <button
              key={it.id}
              onClick={() => {
                onNavigate(it.id);
                setMobileMenuOpen(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                textAlign: 'left',
                color: currentView === it.id ? 'var(--gold-primary)' : 'var(--text-primary)',
                fontSize: '1rem',
                fontWeight: 600,
                padding: '0.5rem 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
              }}
            >
              {it.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: block !important; }
        }
      `}</style>
    </header>
  );
};
