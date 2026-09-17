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
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(28, 25, 23, 0.60)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          animation: 'fadeCardIn 0.25s ease'
        }}
      />

      {/* Drawer Container (Cashmere Greige & Tuscan Bronze) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '390px',
          height: '100%',
          background: '#ffffff',
          borderRight: '1px solid var(--gold-border)',
          boxShadow: '16px 0 50px rgba(28, 25, 23, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 2,
          animation: 'slideRightIn 0.3s var(--ease-spring)',
          color: 'var(--text-primary)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.4rem 1.6rem',
            background: '#fbf9f6',
            borderBottom: '1px solid var(--gold-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'rgba(158, 127, 76, 0.12)',
                border: '1px solid rgba(158, 127, 76, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <SlidersHorizontal size={17} color="var(--gold-primary)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', margin: 0, fontWeight: 600 }}>
                Filter Catalogue
              </h3>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Wholesale Specifications
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(28, 25, 23, 0.05)',
              border: '1px solid rgba(28, 25, 23, 0.08)',
              color: 'var(--text-muted)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.background = 'rgba(28, 25, 23, 0.10)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.background = 'rgba(28, 25, 23, 0.05)';
            }}
            aria-label="Close filter drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filters Scrollable Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.6rem', display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
          {/* Sort By */}
          <div>
            <label style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold-dark)', fontWeight: 700, display: 'block', marginBottom: '0.6rem' }}>
              Sort Order
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="luxury-input"
              style={{
                width: '100%',
                fontSize: '0.86rem',
                padding: '0.75rem 1rem',
                background: '#faf8f5',
                color: 'var(--text-primary)',
                border: '1px solid var(--gold-border)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <option value="featured" style={{ background: '#ffffff', color: '#1c1917' }}>Featured / Bestsellers</option>
              <option value="price-low" style={{ background: '#ffffff', color: '#1c1917' }}>Price: Low to High</option>
              <option value="price-high" style={{ background: '#ffffff', color: '#1c1917' }}>Price: High to Low</option>
              <option value="rating" style={{ background: '#ffffff', color: '#1c1917' }}>Highest Rated</option>
            </select>
          </div>

          {/* Categories */}
          <div>
            <label style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold-dark)', fontWeight: 700, display: 'block', marginBottom: '0.6rem' }}>
              Jewellery Collection
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {CATEGORIES.map(cat => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      background: isSelected ? 'var(--gold-gradient)' : '#f6f3ee',
                      color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                      border: isSelected ? 'none' : '1px solid rgba(158, 127, 76, 0.25)',
                      borderRadius: 'var(--radius-full)',
                      padding: '0.45rem 0.95rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: isSelected ? '0 4px 12px rgba(158, 127, 76, 0.30)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = '#ede7de';
                        e.currentTarget.style.borderColor = 'var(--gold-primary)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = '#f6f3ee';
                        e.currentTarget.style.borderColor = 'rgba(158, 127, 76, 0.25)';
                      }
                    }}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Plating Variant */}
          <div>
            <label style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold-dark)', fontWeight: 700, display: 'block', marginBottom: '0.6rem' }}>
              Plating & Polish
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {platings.map(plat => {
                const isSelected = selectedPlating === plat;
                return (
                  <button
                    key={plat}
                    onClick={() => setSelectedPlating(plat)}
                    style={{
                      background: isSelected ? 'rgba(158, 127, 76, 0.10)' : '#faf8f5',
                      border: isSelected ? '1.5px solid var(--gold-primary)' : '1px solid rgba(28, 25, 23, 0.08)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.65rem 1rem',
                      color: isSelected ? 'var(--gold-dark)' : 'var(--text-secondary)',
                      fontWeight: isSelected ? 700 : 500,
                      textAlign: 'left',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = '#f2ede4';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = '#faf8f5';
                      }
                    }}
                  >
                    <span>{plat}</span>
                    {isSelected && <Check size={15} color="var(--gold-primary)" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <label style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold-dark)', fontWeight: 700 }}>
                Max Wholesale Price
              </label>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              <span>₹1,000</span>
              <span>₹10,000+</span>
            </div>
          </div>

          {/* In Stock Only Switch */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.95rem 1.1rem',
              background: '#faf8f5',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(158, 127, 76, 0.20)'
            }}
          >
            <div>
              <span style={{ fontSize: '0.86rem', color: 'var(--text-primary)', fontWeight: 600, display: 'block' }}>
                Ready to Dispatch Only
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Excludes made-to-order artisan lots
              </span>
            </div>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--gold-primary)', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Bottom Actions */}
        <div
          style={{
            padding: '1.2rem 1.6rem',
            background: '#fbf9f6',
            borderTop: '1px solid var(--gold-border)',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '0.85rem'
          }}
        >
          <button
            onClick={onReset}
            style={{
              background: '#f5f2ec',
              border: '1px solid rgba(158, 127, 76, 0.25)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-secondary)',
              padding: '0.75rem 1.1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.background = '#ede7de';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.background = '#f5f2ec';
            }}
            title="Reset Filters"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={onClose}
            style={{
              background: 'var(--gold-gradient)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem 1.4rem',
              fontSize: '0.86rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(158, 127, 76, 0.35)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'brightness(1.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'none';
            }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
