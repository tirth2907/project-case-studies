import React from 'react';
import { SlidersHorizontal, Search, RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/ProductCard';

export const CatalogPage = ({
  products,
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
  onOpenFilter,
  onResetFilters,
  onSelectProduct,
  onQuickView,
  searchQuery,
  setSearchQuery
}) => {
  // Filter products based on all conditions
  let filtered = products.filter(p => {
    // Search
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.description.toLowerCase().includes(searchQuery.toLowerCase()) && !p.sku.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // Category
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }
    // Plating
    if (selectedPlating !== 'All' && !p.variants.some(v => v.toLowerCase().includes(selectedPlating.toLowerCase().replace(' polish', '')))) {
      return false;
    }
    // Max Price
    if (p.price > maxPrice) {
      return false;
    }
    // In Stock
    if (inStockOnly && !p.inStock) {
      return false;
    }
    return true;
  });

  // Sort
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const activeCategoryObj = CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      {/* Catalogue Header */}
      <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 2.5rem' }}>
        <span style={{ color: 'var(--gold-primary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600 }}>
          Heirloom Vault
        </span>
        <h1 style={{ fontSize: '3rem', color: '#fff', margin: '0.4rem 0 0.8rem 0' }}>
          {activeCategoryObj ? activeCategoryObj.name : 'Complete Royal Collection'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Explore handcrafted Kundan choker suites, matte antique temple jewellery, and chandelier party drops.
        </p>
      </div>

      {/* Category Horizontal Pills */}
      <div style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem', scrollbarWidth: 'none' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              background: selectedCategory === cat.id ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.05)',
              color: selectedCategory === cat.id ? '#000' : 'var(--text-secondary)',
              border: selectedCategory === cat.id ? 'none' : '1px solid rgba(212,175,55,0.25)',
              borderRadius: 'var(--radius-full)',
              padding: '0.55rem 1.2rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Filter Bar Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem', background: 'rgba(7,23,17,0.6)', border: '1px solid rgba(212,175,55,0.2)', padding: '0.9rem 1.2rem', borderRadius: 'var(--radius-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onOpenFilter}
            className="btn btn-gold"
            style={{ fontSize: '0.8rem', padding: '0.6rem 1.1rem' }}
          >
            <SlidersHorizontal size={15} />
            <span>Filters & Sort</span>
          </button>

          {(selectedCategory !== 'all' || selectedPlating !== 'All' || maxPrice < 10000 || inStockOnly) && (
            <button
              onClick={onResetFilters}
              style={{ background: 'none', border: 'none', color: 'var(--gold-primary)', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            >
              <RotateCcw size={13} />
              <span>Reset Active Filters</span>
            </button>
          )}
        </div>

        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filtered.length}</strong> master jewellery creations
        </span>
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
          <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '0.5rem' }}>No Jewellery Found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
            No pieces match your current filter settings. Try adjusting price or plating options.
          </p>
          <button onClick={onResetFilters} className="btn btn-outline-gold">
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid-catalog">
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      )}
    </div>
  );
};
