import React, { useState, useEffect } from 'react';
import { Palette, Check, Sparkles } from 'lucide-react';

const PALETTES = [
  {
    id: 'vendome',
    name: 'Maison Vendôme',
    subtitle: 'Cashmere Greige & Tuscan Bronze',
    bg: '#f6f3ee',
    accent: '#9e7f4c',
    tag: 'Flagship Aesthetic'
  },
  {
    id: 'emerald',
    name: 'Antique Royal Atelier',
    subtitle: 'Smoked Noir & Matte Bronze',
    bg: '#090b0a',
    accent: '#856d43',
    tag: 'Sabyasachi Heritage'
  },
  {
    id: 'nocturne',
    name: 'Vendôme Nocturne',
    subtitle: 'Midnight Navy & Champagne Gilt',
    bg: '#08111d',
    accent: '#d0af6f',
    tag: 'Chaumet Imperial'
  },
  {
    id: 'florentine',
    name: 'Florentine Atelier',
    subtitle: 'Smoked Tobacco & Honey Gilt',
    bg: '#191311',
    accent: '#c89d55',
    tag: 'Buccellati Milanese'
  },
  {
    id: 'burgundy',
    name: 'Burgundy Noir',
    subtitle: 'Cassis & English Gilt',
    bg: '#180d11',
    accent: '#d8b27c',
    tag: 'Cartier Red Box'
  },
  {
    id: 'diamond',
    name: 'The Diamond Vault',
    subtitle: 'Anthracite & Ice Platinum',
    bg: '#121417',
    accent: '#a8b8c8',
    tag: 'Graff High Diamond'
  }
];

export const PaletteSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('aurum_theme') || 'vendome';
  });
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('aurum_theme', currentTheme);
  }, [currentTheme]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 9999,
        fontFamily: 'var(--font-sans)',
      }}
    >
      {expanded ? (
        <div
          style={{
            background: 'var(--bg-card)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--gold-border)',
            borderRadius: '16px',
            padding: '1rem',
            boxShadow: '0 16px 36px rgba(0,0,0,0.4)',
            minWidth: '290px',
            animation: 'fadeIn 0.25s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Palette size={16} color="var(--gold-primary)" />
              <span style={{ fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.04em', color: 'var(--text-primary)' }}>
                CURATED LUXURY PALETTES
              </span>
            </div>
            <button
              onClick={() => setExpanded(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.75rem',
                padding: '2px 6px'
              }}
            >
              ✕
            </button>
          </div>

          <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: 1.4 }}>
            Test realistic, non-AI luxury palettes live on the store:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {PALETTES.map((p) => {
              const isActive = currentTheme === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setCurrentTheme(p.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.55rem 0.75rem',
                    borderRadius: '10px',
                    border: isActive ? '1px solid var(--gold-primary)' : '1px solid rgba(255,255,255,0.06)',
                    background: isActive ? 'rgba(197, 162, 98, 0.12)' : 'rgba(255,255,255,0.03)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: p.bg,
                        border: `2px solid ${p.accent}`,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                        flexShrink: 0
                      }}
                    />
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                        {p.subtitle}
                      </div>
                    </div>
                  </div>

                  {isActive && <Check size={15} color="var(--gold-primary)" />}
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: '0.75rem', paddingTop: '0.65rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
            <span>Zero neon glows • Physical material tones</span>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setExpanded(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.55rem',
            background: 'var(--bg-card)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid var(--gold-border)',
            borderRadius: '999px',
            padding: '0.55rem 1rem',
            color: 'var(--text-primary)',
            fontSize: '0.78rem',
            fontWeight: 500,
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
            transition: 'transform 0.2s ease, border-color 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <Palette size={15} color="var(--gold-primary)" />
          <span>Switch Palette Demo</span>
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: 'var(--gold-primary)',
              display: 'inline-block'
            }}
          />
        </button>
      )}
    </div>
  );
};
