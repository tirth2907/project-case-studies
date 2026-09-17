import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, MessageCircle, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice, generateWhatsAppLink } from '../config';
import { useTiltSpotlight } from '../hooks/useTiltSpotlight';

export const ProductCard = ({ product, onSelectProduct, onQuickView }) => {
  const { addToCart, currency } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // 3D Perspective Tilt & Cursor Spotlight (Aceternity & 21st.dev inspired)
  const { ref: cardRef, style: tiltStyle, spotlightStyle, onMouseMove, onMouseEnter: handleTiltEnter, onMouseLeave: handleTiltLeave } = useTiltSpotlight({
    maxTilt: 3.5,
    scale: 1.015,
    spotlightColor: 'rgba(158, 127, 76, 0.10)'
  });

  // B2B Wholesale pricing calculation:
  // Wholesale price is roughly 38% of retail price
  const wholesalePrice = Math.round(product.price * 0.38);
  const retailMSRP = product.price;
  const retailMarginPercent = Math.round(((retailMSRP - wholesalePrice) / retailMSRP) * 100);
  const isSaved = isInWishlist(product.id);

  // Primary image (jewelry still-life) vs hover image (lifestyle / bridal model)
  const primaryImg = product.images?.[0] || '';
  const hoverImg = product.images?.[1] || product.images?.[0] || '';

  // Craftsmanship signature tag
  const craftTag = product.specs?.stones 
    ? `${product.specs.stones.split('&')[0].trim().toUpperCase()} • 18K MICRO-PLATED`
    : (product.category === 'bridal-sets' ? 'HANDCRAFTED JADAU • 18K MICRO-PLATED' : 'ARTISANAL POLKI • 18K POLISH');

  const handleAddMoq = (e) => {
    e.stopPropagation();
    addToCart({ ...product, price: wholesalePrice }, product.variants[0], 3);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <div
      ref={cardRef}
      className="plinth-card"
      style={{
        ...tiltStyle,
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        handleTiltEnter();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        handleTiltLeave();
      }}
      onClick={() => onSelectProduct(product)}
    >
      {/* Interactive Cursor Spotlight */}
      <div style={spotlightStyle} />

      {/* 4:5 Vertical Portrait Ratio Image Stage */}
      <div className="plinth-stage">
        {/* Primary Still-Life Image */}
        <img
          src={primaryImg}
          alt={product.name}
          className="plinth-img plinth-img-primary"
          loading="lazy"
        />

        {/* Hover Crossfade Lifestyle Image */}
        {hoverImg && (
          <img
            src={hoverImg}
            alt={`${product.name} on model`}
            className="plinth-img plinth-img-hover"
            loading="lazy"
          />
        )}

        {/* Minimalist Hairline Pill Badge */}
        <div className="plinth-badge-moq">
          B2B LOT • MOQ 3
        </div>

        {/* Frosted Circular Wishlist Icon */}
        <button
          className={`plinth-wishlist-btn ${isSaved ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isSaved ? "Remove from curated list" : "Save piece to wishlist"}
          title={isSaved ? "Saved to Wishlist" : "Save to Wishlist"}
        >
          <Heart size={16} fill={isSaved ? "var(--gold-primary)" : "none"} />
        </button>

        {/* Slide-Up Tuscan Bronze Action Drawer (Cartier & Net-a-Porter Pattern) */}
        <div className="plinth-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="plinth-drawer-handle" />
          <div className="plinth-drawer-actions">
            {/* Add MOQ Action */}
            <button
              onClick={handleAddMoq}
              className="plinth-btn-primary"
              aria-label="Add wholesale MOQ (3 pcs)"
            >
              {justAdded ? (
                <>
                  <Check size={14} color="#4e6038" />
                  <span style={{ color: '#4e6038' }}>Added to PO!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={14} />
                  <span>Add MOQ (3 pcs)</span>
                </>
              )}
            </button>

            {/* Quick Specs View */}
            <button
              onClick={() => onQuickView(product)}
              className="plinth-btn-icon"
              title="Quick Specifications"
              aria-label="Quick Specifications"
            >
              <Eye size={15} />
            </button>

            {/* Direct WhatsApp Concierge Inquiry */}
            <a
              href={generateWhatsAppLink({ ...product, price: wholesalePrice }, product.variants[0])}
              target="_blank"
              rel="noreferrer"
              className="plinth-btn-icon"
              title="Inquire Wholesale Lot on WhatsApp"
              aria-label="Inquire Wholesale Lot on WhatsApp"
            >
              <MessageCircle size={15} />
            </a>
          </div>
        </div>
      </div>

      {/* Card Content & Architectural Typography */}
      <div className="plinth-content">
        <div>
          {/* Tracked Craftsmanship Subhead */}
          <div className="plinth-subhead">
            {craftTag}
          </div>

          {/* Cormorant Garamond Serif Title */}
          <h3 className="plinth-title">
            {product.name}
          </h3>

          {/* Wholesale Rate & Margin Badge Row */}
          <div className="plinth-price-row">
            <div>
              <span className="plinth-wholesale-rate">
                {formatPrice(wholesalePrice, currency)}
              </span>
              <span className="plinth-wholesale-unit">/ pc</span>
            </div>
            <span className="plinth-margin-pill">
              +{retailMarginPercent}% Margin
            </span>
          </div>

          {/* Suggested Retail MSRP */}
          <div className="plinth-msrp-row">
            <span>Suggested MSRP: {formatPrice(retailMSRP, currency)}</span>
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--gold-primary)' }}>
              SKU: {product.sku}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
