import React from 'react';
import { Sparkles, ShieldCheck, Award, Users, ArrowRight } from 'lucide-react';

export const AboutPage = ({ onNavigate }) => {
  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      {/* Narrative Hero */}
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 4rem' }}>
        <span style={{ color: 'var(--gold-primary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600 }}>
          Heirloom Karigari
        </span>
        <h1 style={{ fontSize: '3.2rem', color: '#fff', margin: '0.4rem 0 1.2rem 0' }}>
          Reviving The Splendor of Indian Royalty
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          Founded in 2018 in Mumbai’s historic Zaveri Bazaar, <strong>AURUM NOIR</strong> bridges the gap between inaccessible museum real-gold suites and flimsy fashion accessories. We recreate royal Rajasthani Kundan and Chola Temple heirlooms with modern microscopic precision and longevity.
        </p>
      </div>

      {/* Craftsmanship Pillars */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
        <div className="glass-card" style={{ padding: '2.5rem 1.8rem', textAlign: 'center' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(212,175,55,0.15)', border: '1px solid var(--gold-border)', margin: '0 auto 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Award size={26} color="var(--gold-primary)" />
          </div>
          <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem' }}>Double 18K Micro Plating</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Unlike standard flash plating that fades after single wear, our pieces undergo dual-layer micro-gold electroplating tested to withstand heat, sweat, and wedding festivities.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '2.5rem 1.8rem', textAlign: 'center' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(212,175,55,0.15)', border: '1px solid var(--gold-border)', margin: '0 auto 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={26} color="var(--gold-primary)" />
          </div>
          <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem' }}>Hand-Set Jadau Stones</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Every uncut glass Kundan gem and Russian AD solitaire is individually hand-seated in 24K silver-foil cups by master artisans from Jaipur and Hyderabad.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '2.5rem 1.8rem', textAlign: 'center' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(212,175,55,0.15)', border: '1px solid var(--gold-border)', margin: '0 auto 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={26} color="var(--gold-primary)" />
          </div>
          <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem' }}>Certified Hypoallergenic</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            100% lead and nickel-free jewellers brass core. Zero green residue or skin irritation, so brides can celebrate from Sangeet to Pheras in absolute comfort.
          </p>
        </div>
      </div>

      {/* Atelier Banner */}
      <div
        className="glass-card"
        style={{
          padding: '3.5rem 2rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(14,45,33,0.9) 0%, rgba(7,23,17,0.9) 100%)',
          border: '1px solid var(--gold-border-bright)'
        }}
      >
        <h2 style={{ fontSize: '2.4rem', color: '#fff', marginBottom: '0.8rem' }}>
          Ready to Craft Your Bridal Trousseau?
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 2rem', fontSize: '0.95rem' }}>
          Explore our complete catalogue of bridal chokers, temple jhumkas, and royal polki kadas.
        </p>
        <button onClick={() => onNavigate('catalog')} className="btn btn-gold" style={{ padding: '1rem 2.2rem' }}>
          <span>Explore All Collections</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
};
