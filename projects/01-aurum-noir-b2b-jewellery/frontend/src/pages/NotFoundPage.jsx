import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const NotFoundPage = ({ onNavigate }) => {
  return (
    <div className="container" style={{ padding: '8rem 1.5rem', textAlign: 'center' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', border: '1px solid var(--gold-border)', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Sparkles size={36} color="var(--gold-primary)" />
      </div>
      <span style={{ fontSize: '1rem', color: 'var(--gold-primary)', fontWeight: 700, letterSpacing: '0.2em' }}>ERROR 404</span>
      <h1 style={{ fontSize: '3rem', color: '#fff', margin: '0.5rem 0 1rem 0' }}>Piece Not In The Vault</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 2rem', fontSize: '0.95rem' }}>
        The bespoke jewellery piece or page you are seeking may have moved to a private archive.
      </p>
      <button onClick={() => onNavigate('home')} className="btn btn-gold">
        <ArrowLeft size={16} />
        <span>Return To Grand Showcase</span>
      </button>
    </div>
  );
};
