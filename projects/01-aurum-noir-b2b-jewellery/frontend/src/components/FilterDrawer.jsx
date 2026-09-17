import React from 'react';
import { X, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { formatPrice } from '../config';

export const FilterDrawer = ({
  isOpen,
  onClose,
  selectedCategory,
  setSelectedCategory,
  selectedPlating,
  setSelectedPlating,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
  inStockOnly,
  setInStockOnly,
  onReset
}) => {
  if (!isOpen) return null;

  const platings = ["All", "18K Yellow Gold", "Antique Matte Gold", "Rose Gold", "Rhodium Silver"];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1050, display: 'flex', justifyContent: 'flex-start' }}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '380px',
          height: '100%',
          background: '#081c15',
          borderRight: '1px solid rgba(212, 175, 55, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 2,
          animation: 'slideRightIn 0.3s var(--ease-spring)'
        }}
      >
        {/* Header */}
        <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <SlidersHorizontal size={18} color="var(--gold-primary)" />
            <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>Filter Catalogue</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Filters Scrollable Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
          {/* Sort By */}
          <div>
            <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-light)', fontWeight: 600, display: 'block', marginBottom: '0.6rem' }}>
              Sort Order
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="luxury-input"
              style={{ fontSize: '0.85rem', padding: '0.65rem' }}
            >
              <option value="featured" style={{ background: '#081c15' }}>Featured / Bestsellers</option>
              <option value="price-low" style={{ background: '#081c15' }}>Price: Low to High</option>
              <option value="price-high" style={{ background: '#081c15' }}>Price: High to Low</option>
              <option value="rating" style={{ background: '#081c15' }}>Highest Rated</option>
            </select>
          </div>

          {/* Categories */}
          <div>
            <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-light)', fontWeight: 600, display: 'block', marginBottom: '0.6rem' }}>
              Jewellery Collection
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    background: selectedCategory === cat.id ? 'var(--gold-gradient)' : 'rgba(255, 255, 255, 0.05)',
                    color: selectedCategory === cat.id ? '#000' : 'var(--text-secondary)',
                    border: selectedCategory === cat.id ? 'none' : '1px solid rgba(212, 175, 55, 0.25)',
                    borderRadius: 'var(--radius-full)',
                    padding: '0.4rem 0.85rem',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Plating Variant */}
          <div>
            <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-light)', fontWeight: 600, display: 'block', marginBottom: '0.6rem' }}>
              Plating & Polish
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {platings.map(plat => (
                <button
                  key={plat}
                  onClick={() => setSelectedPlating(plat)}
                  style={{
                    background: selectedPlating === plat ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                    border: selectedPlating === plat ? '1px solid var(--gold-primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.6rem 0.9rem',
                    color: selectedPlating === plat ? 'var(--gold-light)' : 'var(--text-secondary)',
                    textAlign: 'left',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>{plat}</span>
                  {selectedPlating === plat && <Check size={14} color="var(--gold-primary)" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-light)', fontWeight: 600 }}>
                Max Price
              </label>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                ₹{maxPrice.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--gold-primary)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
              <span>₹1,000</span>
              <span>₹10,000+</span>
            </div>
          </div>

          {/* In Stock Only Switch */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem', background: 'rgba(255, 255, 255, 0.04)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <span style={{ fontSize: '0.85rem', color: '#fff' }}>Ready to Dispatch Only</span>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--gold-primary)', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Bottom Actions */}
        <div style={{ padding: '1.2rem 1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.8rem' }}>
          <button
            onClick={onReset}
            className="btn btn-ghost"
            style={{ fontSize: '0.8rem', padding: '0.7rem 1rem' }}
            title="Reset Filters"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={onClose}
            className="btn btn-gold"
            style={{ fontSize: '0.82rem', padding: '0.7rem' }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
