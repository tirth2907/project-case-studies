import React from 'react';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../config';

export const CartPage = ({ onNavigate }) => {
  const {
    cart,
    currency,
    updateQty,
    removeFromCart,
    subtotal,
    discount,
    shippingFee,
    grandTotal,
    couponCode,
    setCouponCode,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ShoppingBag size={36} color="var(--gold-primary)" />
        </div>
        <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '0.8rem' }}>Your Bag is Empty</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 2rem' }}>
          Explore our handcrafted Kundan chokers, temple jhumkas, and royal polki sets.
        </p>
        <button onClick={() => onNavigate('catalog')} className="btn btn-gold">
          Browse Full Catalogue
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '2rem' }}>
        Shopping Bag ({cart.reduce((a, b) => a + b.qty, 0)} Items)
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'flex-start' }}>
        {/* Left: Cart Items Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {cart.map(item => (
            <div
              key={`${item.id}-${item.variant}`}
              className="glass-card"
              style={{
                display: 'grid',
                gridTemplateColumns: '90px 1fr auto',
                gap: '1.5rem',
                padding: '1.2rem',
                alignItems: 'center'
              }}
            >
              <img src={item.image} alt={item.name} style={{ width: '90px', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', textTransform: 'uppercase' }}>SKU: {item.sku}</span>
                <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: '0.2rem 0' }}>{item.name}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Plating: {item.variant}</span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginTop: '0.8rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '4px' }}>
                    <button
                      onClick={() => updateQty(item.id, item.variant, -1)}
                      style={{ background: 'none', border: 'none', color: '#fff', padding: '0.3rem 0.6rem', cursor: 'pointer' }}
                    >
                      <Minus size={12} />
                    </button>
                    <span style={{ padding: '0 0.6rem', fontSize: '0.85rem', fontWeight: 600 }}>{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.variant, 1)}
                      style={{ background: 'none', border: 'none', color: '#fff', padding: '0.3rem 0.6rem', cursor: 'pointer' }}
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--gold-light)' }}>
                    {formatPrice(item.price * item.qty, currency)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id, item.variant)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.5rem' }}
                title="Remove item"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          <button
            onClick={() => onNavigate('catalog')}
            className="btn btn-ghost"
            style={{ alignSelf: 'flex-start', fontSize: '0.82rem', marginTop: '1rem' }}
          >
            <ArrowLeft size={16} />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* Right: Order Summary Card */}
        <div className="glass-card" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
          <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.8rem' }}>
            Order Summary
          </h3>

          {/* Coupon Input */}
          <div style={{ marginBottom: '1.5rem' }}>
            {appliedCoupon ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(212,175,55,0.15)', border: '1px solid var(--gold-primary)', padding: '0.6rem 0.9rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--gold-light)' }}>
                  🎟️ <strong>{appliedCoupon.code}</strong> Applied (-{formatPrice(discount, currency)})
                </span>
                <button onClick={removeCoupon} style={{ background: 'none', border: 'none', color: '#ff6b7b', cursor: 'pointer', fontSize: '0.8rem' }}>
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. BRIDAL500)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="luxury-input"
                    style={{ padding: '0.6rem 0.9rem', fontSize: '0.85rem' }}
                  />
                  <button onClick={() => applyCoupon(couponCode)} className="btn btn-outline-gold" style={{ fontSize: '0.8rem', padding: '0.6rem 1rem' }}>
                    Apply
                  </button>
                </div>
                {couponError && <span style={{ color: '#ff6b7b', fontSize: '0.75rem', display: 'block', marginTop: '0.3rem' }}>{couponError}</span>}
              </div>
            )}
          </div>

          {/* Breakdown List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal</span>
              <span style={{ color: '#fff' }}>{formatPrice(subtotal, currency)}</span>
            </div>
            {discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#51cf66' }}>
                <span>Coupon Discount</span>
                <span>-{formatPrice(discount, currency)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Insured Shipping</span>
              <span style={{ color: shippingFee === 0 ? '#51cf66' : '#fff' }}>
                {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee, currency)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 700, color: 'var(--gold-light)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.8rem', marginTop: '0.4rem' }}>
              <span>Grand Total</span>
              <span>{formatPrice(grandTotal, currency)}</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('checkout')}
            className="btn btn-gold"
            style={{ width: '100%', padding: '1rem', fontSize: '0.95rem' }}
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '1.2rem' }}>
            <ShieldCheck size={16} color="var(--gold-primary)" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};
