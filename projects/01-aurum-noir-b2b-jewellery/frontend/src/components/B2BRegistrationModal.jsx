import React, { useState } from 'react';
import { X, Building2, CheckCircle2, ShieldCheck, FileText, ArrowRight } from 'lucide-react';

export const B2BRegistrationModal = ({ isOpen, onClose, onVerified }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    gstin: '',
    storeType: 'boutique',
    city: '',
    country: 'India',
    phone: '',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('aurum_b2b_verified', 'true');
    localStorage.setItem('aurum_b2b_business', JSON.stringify(formData));
    setSubmitted(true);
    setTimeout(() => {
      onVerified(formData);
      onClose();
    }, 1500);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(28, 25, 23, 0.65)', backdropFilter: 'blur(14px)' }} />

      <div
        className="glass-card"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '580px',
          background: '#ffffff',
          border: '1px solid var(--gold-border)',
          borderRadius: '24px',
          boxShadow: '0 25px 60px -15px rgba(28, 25, 23, 0.25)',
          padding: '2.5rem',
          zIndex: 2,
          animation: 'modalZoomIn 0.3s var(--ease-spring)',
          color: 'var(--text-primary)'
        }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <Building2 size={24} color="var(--gold-primary)" />
          <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', margin: 0 }}>B2B Wholesaler Verification</h3>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.8rem', lineHeight: 1.6 }}>
          AURUM NOIR operates strictly as a master manufacturing atelier. Verify your boutique or business to unlock direct factory wholesale pricing and volume purchase orders.
        </p>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <CheckCircle2 size={46} color="#51cf66" style={{ margin: '0 auto 1rem' }} />
            <h4 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '0.4rem' }}>Wholesale Access Approved!</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              Your account for <strong>{formData.businessName}</strong> is verified. Direct factory pricing unlocked.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.3rem' }}>
                  Boutique / Company Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Gems Boutique"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="luxury-input"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.3rem' }}>
                  Owner / Buyer Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Mehta"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  className="luxury-input"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.3rem' }}>
                  GSTIN / Tax ID / VAT
                </label>
                <input
                  type="text"
                  required
                  placeholder="27AAACN0192Q1Z3"
                  value={formData.gstin}
                  onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                  className="luxury-input"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.3rem' }}>
                  Store Business Type
                </label>
                <select
                  value={formData.storeType}
                  onChange={(e) => setFormData({ ...formData, storeType: e.target.value })}
                  className="luxury-input"
                  style={{ padding: '0.85rem' }}
                >
                  <option value="boutique">Bridal & Jewellery Boutique</option>
                  <option value="retail">Multi-Brand Retail Store</option>
                  <option value="instagram">Online / Instagram Reseller</option>
                  <option value="exporter">International Wholesaler / Exporter</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.3rem' }}>
                  City & State / Country
                </label>
                <input
                  type="text"
                  required
                  placeholder="Jaipur, Rajasthan (or Dubai / USA)"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="luxury-input"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.3rem' }}>
                  WhatsApp / Phone Contact
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="luxury-input"
                />
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.8rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(212,175,55,0.15)', fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <ShieldCheck size={16} color="var(--gold-primary)" />
              <span>Wholesale pricing is strictly restricted to verified business entities with minimum 3 pcs/SKU commitment.</span>
            </div>

            <button type="submit" className="btn btn-gold" style={{ marginTop: '0.5rem', padding: '0.95rem' }}>
              <span>Verify & Unlock Wholesale Rates</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
