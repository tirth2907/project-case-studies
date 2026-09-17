import React, { useState } from 'react';
import { X, Star, ShoppingBag, MessageCircle, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, generateWhatsAppLink } from '../config';

export const QuickViewModal = ({ product, onClose, onSelectProduct }) => {
  const { addToCart, currency } = useCart();
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || "18K Yellow Gold");
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });
  const [addedFeedback, setAddedFeedback] = useState(false);

  if (!product) return null;

  const currentImage = product.images?.[selectedImg] || product.images?.[0] || "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85";

  // B2B Wholesale calculation
  const wholesalePrice = Math.round(product.price * 0.38);
  const retailMSRP = product.price;
  const retailMarginPercent = Math.round(((retailMSRP - wholesalePrice) / retailMSRP) * 100);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundPosition: `${x}% ${y}%`,
      backgroundImage: `url(${currentImage})`
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  const handleAddMoq = () => {
    addToCart({ ...product, price: wholesalePrice }, selectedVariant, 3);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1400);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        background: 'rgba(28, 25, 23, 0.65)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        animation: 'fadeCardIn 0.25s ease'
      }}
      onClick={onClose}
    >
      {/* Modal Container (Cashmere Greige & Tuscan Bronze) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '880px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: '#ffffff',
          border: '1px solid var(--gold-border)',
          borderRadius: '24px',
          boxShadow: '0 25px 60px -15px rgba(28, 25, 23, 0.25), 0 0 35px rgba(158, 127, 76, 0.12)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          padding: '2.2rem',
          zIndex: 2,
          animation: 'modalZoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          color: 'var(--text-primary)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
            background: 'rgba(28, 25, 23, 0.05)',
            border: '1px solid rgba(28, 25, 23, 0.10)',
            color: 'var(--text-muted)',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.background = 'rgba(28, 25, 23, 0.10)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.background = 'rgba(28, 25, 23, 0.05)';
          }}
          aria-label="Close specifications modal"
        >
          <X size={18} />
        </button>

        {/* Left: Gallery Stage & Loupe Zoom */}
        <div>
          {/* Main Photo with Lens Zoom */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              position: 'relative',
              width: '100%',
              paddingTop: '100%',
              borderRadius: '16px',
              overflow: 'hidden',
              background: 'var(--bg-secondary)',
              cursor: 'crosshair',
              border: '1px solid var(--gold-border)'
            }}
          >
            <img
              src={currentImage}
              alt={product.name}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85";
              }}
            />
            {/* Magnifying Loupe Overlay */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                backgroundSize: '220%',
                backgroundRepeat: 'no-repeat',
                ...zoomStyle
              }}
            />
          </div>

          {/* Thumbnails */}
          {product.images?.length > 1 && (
            <div style={{ display: 'flex', gap: '0.65rem', marginTop: '0.9rem' }}>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(idx)}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: selectedImg === idx ? '2px solid var(--gold-primary)' : '1px solid var(--gold-border)',
                    background: 'var(--bg-secondary)',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <img
                    src={img}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=300&q=80";
                    }}
                  />
                </button>
              ))}
            </div>
          )}
          <span style={{ display: 'block', textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Hover over image to inspect stone settings in high-res
          </span>
        </div>

        {/* Right: Specifications & CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            {/* Badges */}
            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.6rem', alignItems: 'center' }}>
              <span
                style={{
                  background: 'rgba(158, 127, 76, 0.10)',
                  color: 'var(--gold-dark)',
                  border: '1px solid var(--gold-border)',
                  fontSize: '0.70rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '3px 9px',
                  borderRadius: '9999px'
                }}
              >
                SKU: {product.sku}
              </span>

              <span
                style={{
                  background: 'rgba(107, 124, 89, 0.12)',
                  color: '#4e6038',
                  border: '1px solid rgba(107, 124, 89, 0.28)',
                  fontSize: '0.70rem',
                  fontWeight: 600,
                  padding: '3px 9px',
                  borderRadius: '9999px'
                }}
              >
                +{retailMarginPercent}% Retail Margin
              </span>
            </div>

            {/* Title */}
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.65rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                margin: '0 0 0.4rem 0',
                lineHeight: 1.25
              }}
            >
              {product.name}
            </h2>

            {/* Rating Stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.1rem' }}>
              <div style={{ display: 'flex', color: 'var(--gold-primary)' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {product.rating} / 5.0 ({product.reviewCount || 142} boutique reviews)
              </span>
            </div>

            {/* Pricing Section (Wholesale vs Suggested MSRP) */}
            <div
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--gold-border)',
                borderRadius: '12px',
                padding: '0.85rem 1.1rem',
                marginBottom: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Wholesale Lot Rate:
                </span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {formatPrice(wholesalePrice, currency)} <span style={{ fontSize: '0.76rem', fontWeight: 500, color: 'var(--text-muted)' }}>/ pc (MOQ 3)</span>
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                <span>Suggested Retail MSRP:</span>
                <span style={{ color: 'var(--text-secondary)', textDecoration: 'line-through' }}>{formatPrice(retailMSRP, currency)}</span>
              </div>
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {product.description}
            </p>

            {/* Plating Variant Selector */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-dark)', fontWeight: 600, display: 'block', marginBottom: '0.55rem' }}>
                Select Plating: <strong style={{ color: 'var(--text-primary)' }}>{selectedVariant}</strong>
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
                {(product.variants || ["18K Yellow Gold", "Antique Matte Gold", "Rose Gold Polish"]).map((v) => {
                  const isActive = selectedVariant === v;
                  return (
                    <button
                      key={v}
                      onClick={() => setSelectedVariant(v)}
                      style={{
                        background: isActive ? 'var(--gold-gradient)' : 'var(--bg-primary)',
                        color: isActive ? '#ffffff' : 'var(--text-secondary)',
                        border: isActive ? '1px solid rgba(158, 127, 76, 0.4)' : '1px solid var(--gold-border)',
                        boxShadow: isActive ? '0 2px 8px rgba(158, 127, 76, 0.25)' : 'none',
                        borderRadius: '8px',
                        padding: '0.5rem 0.95rem',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {v}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', borderTop: '1px solid var(--gold-border)', paddingTop: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
              {/* Add to Bag (MOQ 3) */}
              <button
                onClick={handleAddMoq}
                className="btn btn-gold"
                style={{ fontSize: '0.84rem', padding: '0.85rem' }}
              >
                {addedFeedback ? (
                  <>
                    <Check size={16} />
                    <span>Added to PO!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>Add MOQ (3 pcs)</span>
                  </>
                )}
              </button>

              {/* Order on WhatsApp (Original Solid Green) */}
              <a
                href={generateWhatsAppLink({ ...product, price: wholesalePrice }, selectedVariant)}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp"
                style={{ fontSize: '0.84rem', padding: '0.85rem' }}
              >
                <MessageCircle size={16} />
                <span>Order on WhatsApp</span>
              </a>
            </div>

            <button
              onClick={() => {
                onClose();
                onSelectProduct(product);
              }}
              className="btn btn-ghost"
              style={{
                fontSize: '0.82rem',
                padding: '0.65rem',
                color: 'var(--gold-dark)',
                border: '1px solid var(--gold-border)',
                background: 'var(--bg-primary)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold-primary)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold-border)';
                e.currentTarget.style.color = 'var(--gold-dark)';
              }}
            >
              <span>View Full Specifications & Matching Sets</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
