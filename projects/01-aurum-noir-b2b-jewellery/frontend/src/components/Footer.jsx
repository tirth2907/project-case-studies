import React, { useState } from 'react';
import { ShieldCheck, Truck, Clock, Sparkles, MessageCircle, Heart, CheckCircle2 } from 'lucide-react';
import { BRAND_CONFIG } from '../config';

export const Footer = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer style={{ background: 'var(--topbar-bg)', borderTop: '1px solid var(--gold-border)', marginTop: '5rem', color: 'var(--text-secondary)' }}>
      {/* Customer Trust Badges Banner */}
      <div style={{ borderBottom: '1px solid var(--gold-border)', padding: '2.5rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(158, 127, 76, 0.12)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={24} color="var(--gold-primary)" />
            </div>
            <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>Anti-Tarnish Guarantee</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Double 18K micro-gold electroplating designed to resist moisture and wear.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(158, 127, 76, 0.12)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={24} color="var(--gold-primary)" />
            </div>
            <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>100% Skin Safe</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Lead-free, nickel-free brass and copper alloy that prevents greening.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(158, 127, 76, 0.12)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Truck size={24} color="var(--gold-primary)" />
            </div>
            <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>Worldwide Express</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Insured air freight dispatched in custom velvet keepsake cases.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(158, 127, 76, 0.12)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageCircle size={24} color="var(--gold-primary)" />
            </div>
            <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>WhatsApp Concierge</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>1-on-1 video call consultations for bridal troupe matching.</p>
          </div>
        </div>
      </div>

      {/* Main 4-Column Directory */}
      <div className="container" style={{ padding: '4rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem' }}>
        {/* Col 1: Brand & Heritage */}
        <div>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--text-primary)', display: 'block', marginBottom: '0.8rem' }}>
            AURUM <span style={{ color: 'var(--gold-primary)', fontStyle: 'italic' }}>NOIR</span>
          </span>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Curating heirloom-grade imitation, Kundan, and temple jewellery for modern brides worldwide. Celebrating the timeless grandeur of Indian karigari without compromise.
          </p>
          <a
            href={`https://wa.me/${BRAND_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-whatsapp"
            style={{ fontSize: '0.8rem', padding: '0.6rem 1.2rem' }}
          >
            <MessageCircle size={16} />
            Chat With Stylist
          </a>
        </div>

        {/* Col 2: Collections */}
        <div>
          <h4 style={{ color: 'var(--gold-light)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.2rem' }}>
            Collections
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.88rem' }}>
            {[
              { id: 'bridal-sets', label: 'Bridal Choker Suites' },
              { id: 'chokers', label: 'Layered Hasli Necklaces' },
              { id: 'earrings', label: 'Heritage Temple Jhumkas' },
              { id: 'bangles', label: 'Polki Openable Kadas' },
              { id: 'temple', label: 'Gajlaxmi Temple Jewellery' },
              { id: 'rings', label: 'Statement Cocktail Rings' }
            ].map(cat => (
              <li key={cat.id}>
                <button
                  onClick={() => onNavigate('catalog')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s', padding: 0 }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--gold-primary)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                >
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Customer Care & Sizing */}
        <div>
          <h4 style={{ color: 'var(--gold-light)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.2rem' }}>
            Client Care
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.88rem' }}>
            <li><button onClick={() => onNavigate('about')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>Artisan Craftsmanship</button></li>
            <li><button onClick={() => onNavigate('contact')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>Bespoke Bridal Inquiry</button></li>
            <li><button onClick={() => onNavigate('account')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>Track My Shipment</button></li>
            <li><button onClick={() => onNavigate('contact')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>Bangle & Ring Size Guide</button></li>
            <li><button onClick={() => onNavigate('contact')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>Jewellery Care Instructions</button></li>
          </ul>
        </div>

        {/* Col 4: Newsletter & Exclusive Offers */}
        <div>
          <h4 style={{ color: 'var(--gold-light)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.2rem' }}>
            The Royal Gazette
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Subscribe to receive private preview invitations and a flat ₹500 discount voucher on your first bridal suite order.
          </p>

          {subscribed ? (
            <div style={{ background: 'rgba(40, 167, 69, 0.15)', border: '1px solid rgba(40, 167, 69, 0.4)', borderRadius: 'var(--radius-sm)', padding: '0.8rem', color: '#51cf66', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <CheckCircle2 size={18} />
              <span>Use code <strong>BRIDAL500</strong> for ₹500 off at checkout!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <input
                type="email"
                required
                placeholder="Your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="luxury-input"
                style={{ fontSize: '0.85rem', padding: '0.7rem 1rem' }}
              />
              <button type="submit" className="btn btn-gold" style={{ fontSize: '0.8rem', padding: '0.7rem' }}>
                Join Private List
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Copyright Bar */}
      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', padding: '1.5rem 0', fontSize: '0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>© {new Date().getFullYear()} {BRAND_CONFIG.name}. All rights reserved. Handcrafted with precision in India for worldwide connoisseurs.</p>
      </div>
    </footer>
  );
};
