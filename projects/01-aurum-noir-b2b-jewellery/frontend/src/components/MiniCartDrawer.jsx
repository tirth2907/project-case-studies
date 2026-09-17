import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Building2, MessageCircle, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BRAND_CONFIG, formatPrice, generateB2BWhatsAppPO } from '../config';

export const MiniCartDrawer = ({ onNavigate }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    currency,
    updateQty,
    removeFromCart,
    subtotal
  } = useCart();

  if (!isCartOpen) return null;

  const minOrderThreshold = BRAND_CONFIG.wholesale.minCartValue;
  const isThresholdMet = subtotal >= minOrderThreshold;
  const amountNeeded = Math.max(0, minOrderThreshold - subtotal);
  const totalPieces = cart.reduce((a, b) => a + b.qty, 0);
  const totalLots = cart.length;
  const gstAmount = Math.round(subtotal * 0.03);
  const estTotalWithTax = Math.round(subtotal * 1.03);

  const savedBusiness = (() => {
    try {
      return JSON.parse(localStorage.getItem('aurum_b2b_business') || '{}');
    } catch {
      return {};
    }
  })();

  return (
    <div
      className="po-modal-backdrop"
      onClick={() => setIsCartOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="po-modal-title"
    >
      {/* Centered Floating Modal Window (Cashmere Greige & Tuscan Bronze) */}
      <div
        className="po-modal-window"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="po-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'rgba(158, 127, 76, 0.12)',
                border: '1px solid rgba(158, 127, 76, 0.28)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold-primary)'
              }}
            >
              <Building2 size={19} />
            </div>
            <div>
              <h2
                id="po-modal-title"
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  margin: 0,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em'
                }}
              >
                Purchase Order Vault
              </h2>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                {savedBusiness.businessName ? `${savedBusiness.businessName} (GST Verified)` : 'Official B2B Procurement Desk'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span
              style={{
                background: 'rgba(158, 127, 76, 0.10)',
                border: '1px solid var(--gold-border)',
                color: 'var(--gold-primary)',
                fontSize: '0.72rem',
                fontWeight: 600,
                padding: '4px 12px',
                borderRadius: '9999px',
                letterSpacing: '0.04em'
              }}
            >
              {totalPieces} Pieces • {totalLots} {totalLots === 1 ? 'Lot' : 'Lots'}
            </span>

            <button
              onClick={() => setIsCartOpen(false)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(28, 25, 23, 0.05)',
                border: '1px solid rgba(28, 25, 23, 0.10)',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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
              aria-label="Close purchase order modal"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Glowing Milestone Progress Bar */}
        <div
          style={{
            padding: '0.75rem 1.75rem',
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--gold-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem' }}>
            {isThresholdMet ? (
              <>
                <CheckCircle2 size={15} color="#4e6038" />
                <span style={{ color: '#4e6038', fontWeight: 600 }}>
                  ✓ Wholesale Threshold Unlocked (₹10,000)
                </span>
              </>
            ) : (
              <>
                <Sparkles size={14} color="var(--gold-primary)" />
                <span style={{ color: 'var(--text-secondary)' }}>
                  Add <strong style={{ color: 'var(--text-primary)' }}>{formatPrice(amountNeeded, currency)}</strong> more to reach wholesale threshold
                </span>
              </>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', width: '200px' }}>
            <div
              style={{
                flex: 1,
                height: '4px',
                background: 'rgba(28, 25, 23, 0.12)',
                borderRadius: '2px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: `${Math.min(100, Math.round((subtotal / minOrderThreshold) * 100))}%`,
                  height: '100%',
                  background: 'var(--gold-gradient)',
                  transition: 'width 0.4s ease'
                }}
              />
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--gold-primary)', fontWeight: 600 }}>
              {Math.min(100, Math.round((subtotal / minOrderThreshold) * 100))}%
            </span>
          </div>
        </div>

        {/* 2-Column Body */}
        <div className="po-modal-body">
          {/* Left Column: Line Items */}
          <div className="po-items-column">
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', margin: 'auto', padding: '3rem 1rem' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(158, 127, 76, 0.12)',
                    margin: '0 auto 1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold-primary)'
                  }}
                >
                  <ShoppingBag size={26} />
                </div>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', margin: '0 0 0.4rem 0' }}>
                  Your PO Vault is Empty
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', maxWidth: '320px', margin: '0 auto 1.5rem' }}>
                  Explore the master B2B catalogue to assemble your boutique wholesale order.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigate('catalog');
                  }}
                  className="btn btn-gold"
                  style={{ fontSize: '0.82rem', padding: '0.65rem 1.4rem' }}
                >
                  Browse B2B Catalogue
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemTotal = item.price * item.qty;
                return (
                  <div
                    key={`${item.id}-${item.variant}`}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '64px 1fr auto',
                      gap: '1rem',
                      alignItems: 'center',
                      padding: '0.9rem 1.1rem',
                      background: '#fcfbfa',
                      border: '1px solid var(--gold-border)',
                      borderRadius: '16px',
                      transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--gold-primary)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--gold-border)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* 64x64 Studio Thumbnail */}
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '64px',
                        height: '64px',
                        objectFit: 'cover',
                        borderRadius: '10px',
                        border: '1px solid var(--gold-border)',
                        background: 'var(--bg-secondary)'
                      }}
                      loading="lazy"
                    />

                    {/* Middle Info & Steppers */}
                    <div>
                      <h4
                        style={{
                          fontSize: '0.92rem',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          margin: '0 0 0.2rem 0',
                          lineHeight: 1.3
                        }}
                      >
                        {item.name}
                      </h4>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.55rem' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--gold-primary)', fontWeight: 600 }}>
                          {item.variant}
                        </span>
                        <span style={{ color: 'var(--gold-border)' }}>•</span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          Unit: {formatPrice(item.price, currency)}/pc
                        </span>
                      </div>

                      {/* Tactile Capsule Stepper & Quick Multipliers */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {/* Minus / Number / Plus Capsule */}
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            background: 'var(--bg-primary)',
                            border: '1px solid var(--gold-border)',
                            borderRadius: '9999px',
                            padding: '2px'
                          }}
                        >
                          <button
                            onClick={() => updateQty(item.id, item.variant, -1)}
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              background: 'none',
                              border: 'none',
                              color: 'var(--text-primary)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              transition: 'background 0.15s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(158, 127, 76, 0.15)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={11} />
                          </button>

                          <span
                            style={{
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              color: 'var(--text-primary)',
                              padding: '0 8px',
                              minWidth: '24px',
                              textAlign: 'center'
                            }}
                          >
                            {item.qty}
                          </span>

                          <button
                            onClick={() => updateQty(item.id, item.variant, 1)}
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              background: 'none',
                              border: 'none',
                              color: 'var(--text-primary)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              transition: 'background 0.15s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(158, 127, 76, 0.15)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                            aria-label="Increase quantity"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        {/* Quick Batch Increment Chips */}
                        <button
                          onClick={() => updateQty(item.id, item.variant, 3)}
                          style={{
                            background: 'var(--bg-primary)',
                            border: '1px solid var(--gold-border)',
                            color: 'var(--gold-dark)',
                            fontSize: '0.70rem',
                            fontWeight: 600,
                            padding: '3px 7px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--gold-primary)';
                            e.currentTarget.style.color = '#ffffff';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'var(--bg-primary)';
                            e.currentTarget.style.color = 'var(--gold-dark)';
                          }}
                          title="Add 3 more pieces"
                        >
                          +3 pcs
                        </button>

                        <button
                          onClick={() => updateQty(item.id, item.variant, 6)}
                          style={{
                            background: 'var(--bg-primary)',
                            border: '1px solid var(--gold-border)',
                            color: 'var(--gold-dark)',
                            fontSize: '0.70rem',
                            fontWeight: 600,
                            padding: '3px 7px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--gold-primary)';
                            e.currentTarget.style.color = '#ffffff';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'var(--bg-primary)';
                            e.currentTarget.style.color = 'var(--gold-dark)';
                          }}
                          title="Add 6 more pieces (Half Lot)"
                        >
                          +6 pcs
                        </button>
                      </div>
                    </div>

                    {/* Right: Lot Total & Remove Button */}
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                        {formatPrice(itemTotal, currency)}
                      </span>

                      <button
                        onClick={() => removeFromCart(item.id, item.variant)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          cursor: 'pointer',
                          padding: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          transition: 'color 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#c92a2a'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                        title="Remove lot from order"
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Executive Financial Ledger & Visible Action Console */}
          <div className="po-ledger-column">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold-primary)', fontWeight: 600 }}>
                  Financial Breakdown
                </span>
                <span style={{ fontSize: '0.72rem', color: '#4e6038', background: 'rgba(107, 124, 89, 0.14)', border: '1px solid rgba(107, 124, 89, 0.28)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                  HSN 7117 Compliant
                </span>
              </div>

              {/* Line Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '1.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Wholesale Lot Subtotal</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{formatPrice(subtotal, currency)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>GST Tax (3% Precious Metals & Imitation)</span>
                  <span style={{ color: 'var(--text-primary)' }}>{formatPrice(gstAmount, currency)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Insured Vault Transit (BVC / Sequel)</span>
                  <span style={{ color: '#4e6038', fontWeight: 600 }}>FREE</span>
                </div>

                {/* Grand Total Row */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    borderTop: '1px solid var(--gold-border)',
                    paddingTop: '0.9rem',
                    marginTop: '0.3rem'
                  }}
                >
                  <span style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                    Est. Wholesale PO Total
                  </span>
                  <span style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                    {formatPrice(estTotalWithTax, currency)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Haute Horlogerie Luxury Design */}
            {cart.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {/* Primary Action: Sculpted Tuscan Bronze Button */}
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigate('checkout');
                  }}
                  className="btn btn-gold"
                  style={{
                    width: '100%',
                    padding: '0.95rem 1.4rem',
                    fontSize: '0.88rem',
                    borderRadius: '12px',
                    letterSpacing: '0.04em',
                    textTransform: 'none'
                  }}
                >
                  <span style={{ fontWeight: 600 }}>Generate Official Proforma Invoice (PO)</span>
                  <ArrowRight size={17} style={{ transition: 'transform 0.2s ease' }} />
                </button>

                {/* Secondary Action: Executive WhatsApp Concierge with Live Karigar Beacon */}
                <a
                  href={generateB2BWhatsAppPO(cart, estTotalWithTax, savedBusiness)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp"
                  style={{
                    width: '100%',
                    padding: '0.90rem 1.4rem',
                    fontSize: '0.86rem',
                    borderRadius: '12px',
                    letterSpacing: '0.03em',
                    textTransform: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.7rem'
                  }}
                  title="Direct 1-Click WhatsApp Purchase Order Dispatch"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <span className="beacon-pulse" title="Karigar Factory Desk Online" />
                    <MessageCircle size={18} />
                  </div>
                  <span style={{ fontWeight: 600 }}>Send PO to Factory on WhatsApp</span>
                </a>

                {/* Trust Footer */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.45rem',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    marginTop: '0.2rem'
                  }}
                >
                  <ShieldCheck size={14} color="#4e6038" />
                  <span>100% Insured Transit • Direct Karigar Atelier Allocation</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
