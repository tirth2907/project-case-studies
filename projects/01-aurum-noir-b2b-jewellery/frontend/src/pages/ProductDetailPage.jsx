import React, { useState } from 'react';
import { ChevronRight, Star, Heart, ShoppingBag, MessageCircle, ShieldCheck, Sparkles, Ruler, Info, Check, Plus, Minus, Video, Image as ImageIcon, Building2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { formatPrice, generateWhatsAppLink } from '../config';

export const ProductDetailPage = ({
  product,
  onNavigate,
  onSelectProduct,
  onQuickView,
  onOpenSizeGuide,
  onOpenCareGuide
}) => {
  const { addToCart, currency } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedImg, setSelectedImg] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50, isHovering: false });

  // Wholesale Pricing
  const wholesaleBasePrice = Math.round(product.price * 0.38);
  const retailMSRP = product.price;
  const isSaved = isInWishlist(product.id);

  // B2B Multi-Variant Quantity Matrix
  const [variantQtys, setVariantQtys] = useState(() => {
    const init = {};
    product.variants.forEach((v, idx) => {
      init[v] = idx === 0 ? 3 : 0; // Default first variant to MOQ 3
    });
    return init;
  });

  const handleQtyChange = (variant, delta) => {
    setVariantQtys(prev => ({
      ...prev,
      [variant]: Math.max(0, (prev[variant] || 0) + delta)
    }));
  };

  const totalLotPieces = Object.values(variantQtys).reduce((a, b) => a + b, 0);

  // Volume tier discounts for B2B
  let tierDiscountPercent = 0;
  if (totalLotPieces >= 36) {
    tierDiscountPercent = 25;
  } else if (totalLotPieces >= 12) {
    tierDiscountPercent = 15;
  }

  const effectivePricePerPc = Math.round(wholesaleBasePrice * (1 - tierDiscountPercent / 100));
  const totalLotAmount = totalLotPieces * effectivePricePerPc;
  const potentialRetailValue = totalLotPieces * retailMSRP;
  const potentialProfit = Math.max(0, potentialRetailValue - totalLotAmount);

  const handleAddBulkLot = () => {
    if (totalLotPieces === 0) return;
    Object.entries(variantQtys).forEach(([v, qty]) => {
      if (qty > 0) {
        addToCart({ ...product, price: effectivePricePerPc }, v, qty);
      }
    });
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y, isHovering: true });
  };

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <button onClick={() => onNavigate('home')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>Wholesale Home</button>
        <ChevronRight size={13} />
        <button onClick={() => onNavigate('catalog')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>B2B Catalogue</button>
        <ChevronRight size={13} />
        <span style={{ color: 'var(--gold-light)' }}>{product.name}</span>
      </div>

      {/* Main PDP Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3.5rem', alignItems: 'flex-start', marginBottom: '4rem' }}>
        {/* Left: Media Gallery */}
        <div>
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setZoomPos(prev => ({ ...prev, isHovering: false }))}
            style={{
              position: 'relative',
              width: '100%',
              paddingTop: '110%',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--gold-border)',
              boxShadow: '0 16px 40px rgba(28, 25, 23, 0.12)',
              cursor: showVideo ? 'default' : 'crosshair'
            }}
          >
            {showVideo ? (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f5f2ec', padding: '2rem', textAlign: 'center' }}>
                <Sparkles size={48} color="var(--gold-primary)" style={{ marginBottom: '1rem' }} />
                <h4 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem', fontWeight: 600 }}>Studio Sparkle Reel</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '320px', marginBottom: '1rem' }}>
                  Micro-gold plating and Jadau Kundan shine preview under showcase halogen spotlight.
                </p>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '70%', height: '100%', background: 'var(--gold-gradient)' }} />
                </div>
              </div>
            ) : (
              <>
                <img
                  src={product.images[selectedImg] || product.images[0]}
                  alt={product.name}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    backgroundImage: `url(${product.images[selectedImg] || product.images[0]})`,
                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                    backgroundSize: '280%',
                    backgroundRepeat: 'no-repeat',
                    opacity: zoomPos.isHovering ? 1 : 0,
                    transition: 'opacity 0.2s ease'
                  }}
                />
              </>
            )}

            <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 2 }}>
              <span className="badge badge-b2b">Wholesale Line</span>
              <span className="badge badge-gold">MOQ: 3 Pieces</span>
            </div>

            <button
              onClick={() => toggleWishlist(product)}
              style={{ position: 'absolute', top: 16, right: 16, width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(7,23,17,0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(212,175,55,0.3)', color: isSaved ? 'var(--gold-primary)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}
              aria-label="Wishlist"
            >
              <Heart size={20} fill={isSaved ? "var(--gold-primary)" : "none"} />
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedImg(i);
                    setShowVideo(false);
                  }}
                  style={{
                    width: '65px',
                    height: '65px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    border: !showVideo && selectedImg === i ? '2px solid var(--gold-primary)' : '1px solid rgba(255,255,255,0.15)',
                    background: 'none',
                    padding: 0,
                    cursor: 'pointer'
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowVideo(!showVideo)}
              className={`btn ${showVideo ? 'btn-gold' : 'btn-outline-gold'}`}
              style={{ fontSize: '0.78rem', padding: '0.5rem 0.9rem' }}
            >
              {showVideo ? <ImageIcon size={14} /> : <Video size={14} />}
              <span>{showVideo ? 'View Photos' : 'Studio Reel'}</span>
            </button>
          </div>
        </div>

        {/* Right: Wholesale Pricing, Volume Tiers & Bulk Matrix */}
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--gold-primary)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
            SKU: {product.sku} • Factory Direct
          </span>
          <h1 style={{ fontSize: '2.4rem', color: 'var(--text-primary)', margin: '0.4rem 0 0.8rem 0', fontWeight: 600 }}>
            {product.name}
          </h1>

          {/* Wholesale Pricing Header */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--gold-border)', borderRadius: 'var(--radius-md)', padding: '1.2rem', marginBottom: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Base Wholesale Price</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--gold-primary)' }}>
                  {formatPrice(wholesaleBasePrice, currency)} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/ piece</span>
                </span>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Suggested Retail MSRP</span>
                <span style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {formatPrice(retailMSRP, currency)}
                </span>
              </div>
            </div>

            {/* Volume Tiers Pills */}
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <div style={{ background: totalLotPieces < 12 ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '4px', padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}>
                MOQ 3 pcs: <strong>{formatPrice(wholesaleBasePrice, currency)}</strong>
              </div>
              <div style={{ background: totalLotPieces >= 12 && totalLotPieces < 36 ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '4px', padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}>
                12+ pcs: <strong>{formatPrice(Math.round(wholesaleBasePrice * 0.85), currency)} (-15%)</strong>
              </div>
              <div style={{ background: totalLotPieces >= 36 ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '4px', padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}>
                36+ pcs: <strong>{formatPrice(Math.round(wholesaleBasePrice * 0.75), currency)} (-25%)</strong>
              </div>
            </div>
          </div>

          {/* B2B Multi-Variant Bulk Quick-Order Matrix */}
          <div style={{ border: '1px solid var(--gold-border)', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', overflow: 'hidden', marginBottom: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ padding: '0.8rem 1.2rem', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--gold-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--gold-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Wholesale Variant Order Pad
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Minimum total lot: 3 pieces
              </span>
            </div>

            <div style={{ padding: '1rem 1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {product.variants.map((v) => (
                <div key={v} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--gold-border)', paddingBottom: '0.6rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600, display: 'block' }}>{v}</span>
                    <span style={{ fontSize: '0.72rem', color: '#7b9982' }}>In Stock: 24+ pcs ready</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--gold-primary)', fontWeight: 600 }}>
                      {formatPrice(effectivePricePerPc, currency)} / pc
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--gold-border)', borderRadius: '6px', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                      <button
                        onClick={() => handleQtyChange(v, -1)}
                        className="tactile-stepper"
                        style={{ background: 'none', border: 'none', color: 'var(--text-primary)', padding: '0.45rem 0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Minus size={13} />
                      </button>
                      <span key={variantQtys[v]} className="number-rolling" style={{ padding: '0 0.75rem', fontSize: '0.92rem', fontWeight: 700, minWidth: '28px', textAlign: 'center', color: 'var(--text-primary)' }}>
                        {variantQtys[v] || 0}
                      </span>
                      <button
                        onClick={() => handleQtyChange(v, 1)}
                        className="tactile-stepper"
                        style={{ background: 'var(--gold-gradient)', border: 'none', color: '#fff', padding: '0.45rem 0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Lot Summary Bar */}
            <div style={{ padding: '1rem 1.2rem', background: 'var(--bg-secondary)', borderTop: '1px solid var(--gold-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Lot Total: <strong>{totalLotPieces} pieces</strong></span>
                <div key={totalLotAmount} className="number-rolling" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--gold-primary)' }}>
                  {formatPrice(totalLotAmount, currency)}
                </div>
              </div>

              {totalLotPieces > 0 && (
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.72rem', color: '#51cf66', display: 'block' }}>
                    Est. Resale Profit: {formatPrice(potentialProfit, currency)}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Based on MSRP {formatPrice(potentialRetailValue, currency)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            <button
              onClick={handleAddBulkLot}
              disabled={totalLotPieces < 3}
              className="btn btn-gold"
              style={{ fontSize: '0.9rem', padding: '1rem', opacity: totalLotPieces < 3 ? 0.6 : 1 }}
            >
              <ShoppingBag size={18} />
              <span>Add Bulk Lot to PO ({totalLotPieces} pcs)</span>
            </button>

            <a
              href={generateWhatsAppLink({ ...product, price: effectivePricePerPc }, `Bulk Lot of ${totalLotPieces} pcs (${Object.entries(variantQtys).filter(([_, q]) => q > 0).map(([k, v]) => `${k}: ${v}`).join(', ')})`)}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
              style={{ fontSize: '0.9rem', padding: '1rem' }}
            >
              <MessageCircle size={18} />
              <span>WhatsApp Bulk Quote</span>
            </a>
          </div>

          {totalLotPieces < 3 && (
            <span style={{ fontSize: '0.75rem', color: '#ff6b7b', display: 'block', marginTop: '-1.2rem', marginBottom: '1.5rem' }}>
              ⚠️ Minimum order quantity is 3 pieces to unlock direct wholesale pricing.
            </span>
          )}

          {/* Specs Accordion */}
          <div style={{ border: '1px solid rgba(212,175,55,0.2)', borderRadius: 'var(--radius-md)', background: 'rgba(7,23,17,0.7)', padding: '1.5rem' }}>
            <h4 style={{ color: 'var(--gold-light)', fontSize: '0.95rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Manufacturing & Plating Specifications
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.35rem' }}>
                  <span style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                    {key.replace(/([A-Z])/g, ' $1')}:
                  </span>
                  <span style={{ color: '#fff', fontWeight: 500, textAlign: 'right' }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
