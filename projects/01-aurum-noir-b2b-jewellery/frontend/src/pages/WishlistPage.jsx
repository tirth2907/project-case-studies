import React, { useState } from 'react';
import { Heart, ShoppingBag, ArrowRight, Share2, Check } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage = ({ onNavigate, onSelectProduct, onQuickView }) => {
  const { wishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [copied, setCopied] = useState(false);

  const handleMoveAllToBag = () => {
    wishlist.forEach(p => addToCart(p));
    clearWishlist();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (wishlist.length === 0) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Heart size={36} color="var(--gold-primary)" />
        </div>
        <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '0.8rem' }}>Your Wishlist is Empty</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 2rem' }}>
          Save your favourite bridal chokers, jhumkas, and kadas to curate your wedding trousseau.
        </p>
        <button onClick={() => onNavigate('catalog')} className="btn btn-gold">
          Explore Curated Jewels
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ color: 'var(--gold-primary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600 }}>
            Bridal Trousseau Curation
          </span>
          <h1 style={{ fontSize: '2.5rem', color: '#fff', marginTop: '0.3rem' }}>
            Saved Pieces ({wishlist.length})
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          <button onClick={handleShare} className="btn btn-ghost" style={{ fontSize: '0.8rem' }}>
            {copied ? <Check size={14} color="#51cf66" /> : <Share2 size={14} />}
            <span>{copied ? 'Link Copied!' : 'Share Trousseau Link'}</span>
          </button>

          <button onClick={handleMoveAllToBag} className="btn btn-gold" style={{ fontSize: '0.8rem' }}>
            <ShoppingBag size={14} />
            <span>Move All To Bag</span>
          </button>
        </div>
      </div>

      <div className="grid-catalog">
        {wishlist.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onSelectProduct={onSelectProduct}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </div>
  );
};
