import React, { useState } from 'react';
import { MessageCircle, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { BRAND_CONFIG } from '../config';

export const ContactPage = () => {
  const [form, setForm] = useState({ name: '', phone: '', eventDate: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
        <span style={{ color: 'var(--gold-primary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600 }}>
          Direct Ateliers
        </span>
        <h1 style={{ fontSize: '3rem', color: '#fff', margin: '0.4rem 0 1rem 0' }}>
          Personal Bridal Concierge
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Whether you need a custom color-matched gemstone piroi or wish to book a 1-on-1 virtual video consultation with our head stylist, our team is at your disposal.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem' }}>
        {/* Left: Contact Channels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* WhatsApp Direct */}
          <div className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(37,211,102,0.4)', background: 'rgba(7,23,17,0.85)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageCircle size={22} color="#fff" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#fff', margin: 0 }}>WhatsApp Stylist Chat</h3>
                <span style={{ fontSize: '0.75rem', color: '#25d366', fontWeight: 600 }}>Live Concierge • Avg. Reply: 5 Mins</span>
              </div>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
              Instant bridal stock inquiries, photo/video matching against your lehenga, and international shipping rates.
            </p>
            <a
              href={`https://wa.me/${BRAND_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              <MessageCircle size={17} />
              <span>Connect on WhatsApp ({BRAND_CONFIG.whatsappDisplay})</span>
            </a>
          </div>

          {/* Showroom Details */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
              <MapPin size={22} color="var(--gold-primary)" />
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>Flagship Studio</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
              {BRAND_CONFIG.address}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
              <Clock size={15} />
              <span>Mon – Sat: 11:00 AM – 8:00 PM IST</span>
            </div>
          </div>
        </div>

        {/* Right: Consultation Form */}
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.4rem' }}>Request Bridal Styling</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.8rem' }}>
            Fill in your wedding details and our stylist will contact you via WhatsApp with curated lookbook pairings.
          </p>

          {sent ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <CheckCircle2 size={44} color="#51cf66" style={{ margin: '0 auto 1rem' }} />
              <h4 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Request Received!</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                Our senior stylist will reach out on WhatsApp within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--gold-light)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Merchant"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="luxury-input"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--gold-light)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase' }}>WhatsApp Contact Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="luxury-input"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--gold-light)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Event / Wedding Date (Optional)</label>
                <input
                  type="date"
                  value={form.eventDate}
                  onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                  className="luxury-input"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--gold-light)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Jewellery Requirements</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Tell us about your bridal outfit colors (e.g. Red, Pastel, Ivory) and whether you need chokers, jhumkas, or kadas..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="luxury-input"
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button type="submit" className="btn btn-gold" style={{ padding: '0.95rem' }}>
                <span>Send Consultation Request</span>
                <Send size={15} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
