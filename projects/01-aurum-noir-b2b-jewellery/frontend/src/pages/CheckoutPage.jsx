import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, CreditCard, Smartphone, Truck, ArrowRight, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { BRAND_CONFIG, formatPrice } from '../config';

export const CheckoutPage = ({ onNavigate }) => {
  const { cart, grandTotal, subtotal, discount, shippingFee, currency, clearCart } = useCart();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    whatsapp: '+91 98765 12345',
    address: 'Flat 402, Royal Residency, Juhu Tara Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400049',
    paymentMethod: 'upi'
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const newId = `AN-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newId);
    setOrderPlaced(true);

    // Trigger celebratory confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FAF8F5', '#163E2F', '#ECC974']
    });

    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '3.5rem 2rem', border: '1px solid var(--gold-border-bright)' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(40, 167, 69, 0.15)', border: '2px solid #51cf66', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={38} color="#51cf66" />
          </div>

          <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>Order Confirmed</span>
          <h2 style={{ fontSize: '2.4rem', color: '#fff', marginBottom: '0.5rem' }}>Thank You, {formData.name}!</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Your royal bridal suite order <strong>#{orderId}</strong> has been secured and dispatched to our karigars for final inspection.
          </p>

          <div style={{ background: 'rgba(7,23,17,0.7)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 'var(--radius-sm)', padding: '1.2rem', textAlign: 'left', marginBottom: '2rem', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Estimated Delivery:</span>
              <span style={{ color: 'var(--gold-light)', fontWeight: 600 }}>Within 3-4 Business Days</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Shipping To:</span>
              <span style={{ color: '#fff' }}>{formData.address}, {formData.city}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>WhatsApp Updates:</span>
              <span style={{ color: '#25d366', fontWeight: 600 }}>Sent to {formData.whatsapp}</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={() => onNavigate('account')} className="btn btn-gold">
              Track In My Account
            </button>
            <button onClick={() => onNavigate('home')} className="btn btn-outline-gold">
              Return to Showcase
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '2rem' }}>
        Checkout & Dispatch Details
      </h1>

      {/* 3-Step Progress Indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
        {[
          { num: 1, label: 'Contact Info' },
          { num: 2, label: 'Delivery Address' },
          { num: 3, label: 'Payment Gateway' }
        ].map((st) => (
          <div key={st.num} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: step >= st.num ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.1)', color: step >= st.num ? '#000' : 'var(--text-muted)', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
              {st.num}
            </div>
            <span style={{ fontSize: '0.85rem', color: step >= st.num ? '#fff' : 'var(--text-muted)', fontWeight: step === st.num ? 700 : 500 }}>
              {st.label}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'flex-start' }}>
        {/* Left: Step Form */}
        <div className="glass-card" style={{ padding: '2.2rem' }}>
          {step === 1 && (
            <div>
              <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '1.5rem' }}>Step 1: Contact & WhatsApp</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--gold-light)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="luxury-input" required />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--gold-light)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="luxury-input" required />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--gold-light)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase' }}>WhatsApp Contact (for dispatch video alerts)</label>
                  <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="luxury-input" required />
                </div>
                <button onClick={() => setStep(2)} className="btn btn-gold" style={{ marginTop: '1rem', padding: '0.9rem' }}>
                  <span>Continue to Shipping Address</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '1.5rem' }}>Step 2: Shipping Destination</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--gold-light)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Street Address / Landmark</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} className="luxury-input" required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--gold-light)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Town / City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} className="luxury-input" required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--gold-light)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Postal Code</label>
                    <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="luxury-input" required />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button onClick={() => setStep(1)} className="btn btn-ghost" style={{ flex: 1 }}>
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>
                  <button onClick={() => setStep(3)} className="btn btn-gold" style={{ flex: 2 }}>
                    <span>Proceed to Payment</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '1.5rem' }}>Step 3: Payment Method</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {[
                  { id: 'upi', label: 'UPI / Google Pay / PhonePe (Instant Zero-Fee)', icon: Smartphone },
                  { id: 'card', label: 'Credit / Debit Card (Visa, Mastercard, Amex)', icon: CreditCard },
                  { id: 'cod', label: 'Cash on Delivery (Available for India orders)', icon: Truck }
                ].map(opt => {
                  const Icon = opt.icon;
                  return (
                    <label
                      key={opt.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: formData.paymentMethod === opt.id ? '1px solid var(--gold-primary)' : '1px solid rgba(255,255,255,0.1)',
                        background: formData.paymentMethod === opt.id ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.02)',
                        cursor: 'pointer'
                      }}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={opt.id}
                        checked={formData.paymentMethod === opt.id}
                        onChange={handleChange}
                        style={{ accentColor: 'var(--gold-primary)' }}
                      />
                      <Icon size={20} color="var(--gold-primary)" />
                      <span style={{ fontSize: '0.9rem', color: '#fff' }}>{opt.label}</span>
                    </label>
                  );
                })}
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => setStep(2)} className="btn btn-ghost" style={{ flex: 1 }}>
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button onClick={handlePlaceOrder} className="btn btn-gold" style={{ flex: 2, padding: '1rem' }}>
                  <span>Place Order ({formatPrice(grandTotal, currency)})</span>
                  <ShieldCheck size={18} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Order Summary */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1.2rem' }}>Order Items</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxHeight: '280px', overflowY: 'auto', marginBottom: '1.5rem' }}>
            {cart.map(item => (
              <div key={`${item.id}-${item.variant}`} style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.6rem' }}>
                <img src={item.image} alt={item.name} style={{ width: '50px', height: '55px', objectFit: 'cover', borderRadius: '4px' }} />
                <div style={{ flex: 1 }}>
                  <h5 style={{ fontSize: '0.85rem', color: '#fff', margin: 0 }}>{item.name}</h5>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Qty: {item.qty} • {item.variant}</span>
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--gold-light)' }}>
                  {formatPrice(item.price * item.qty, currency)}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700, color: 'var(--gold-light)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.8rem', marginTop: '0.4rem' }}>
              <span>Total Payable</span>
              <span>{formatPrice(grandTotal, currency)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
