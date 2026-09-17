import React from 'react';
import { X, Sparkles, Droplets, Wind, ShieldAlert } from 'lucide-react';

export const CareGuideModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const rules = [
    {
      icon: Droplets,
      title: "Keep Away from Perfumes & Sprays",
      desc: "Apply hairspray, perfumes, and lotions first. Allow them to dry completely before wearing your jewellery to prevent chemical reactions with the micro-gold plating."
    },
    {
      icon: Wind,
      title: "Store in Airtight Velvet Pouches",
      desc: "Air and moisture oxidize metallic coatings. Always store each piece separately in the provided zip-lock pouch and velvet box to prevent stone scratching."
    },
    {
      icon: ShieldAlert,
      title: "Remove Before Bathing or Swimming",
      desc: "Never immerse Kundan or temple jewellery in water or chlorinated pools. Water can soften the lac (gum) holding the Kundan stones in place."
    },
    {
      icon: Sparkles,
      title: "Gentle Microfiber Wipe",
      desc: "After each wear, gently wipe away perspiration with a dry, soft microfiber cloth before returning the piece to its box. Avoid chemical jewellery cleaners."
    }
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(28, 25, 23, 0.65)', backdropFilter: 'blur(14px)' }} />

      <div
        className="glass-card"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '560px',
          background: '#ffffff',
          border: '1px solid var(--gold-border)',
          borderRadius: '24px',
          boxShadow: '0 25px 60px -15px rgba(28, 25, 23, 0.25)',
          padding: '2.2rem',
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
          <Sparkles size={20} color="var(--gold-primary)" />
          <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', margin: 0 }}>Heirloom Care & Longevity</h3>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          AURUM NOIR jewellery is engineered with double 18K micro-gold electroplating. Follow these simple guidelines to maintain its showroom sparkle for years:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {rules.map((rule, idx) => {
            const Icon = rule.icon;
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  background: 'var(--bg-primary)',
                  padding: '0.9rem',
                  borderRadius: '12px',
                  border: '1px solid var(--gold-border)'
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(158, 127, 76, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: 'var(--gold-primary)'
                  }}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', color: 'var(--text-primary)', margin: '0 0 0.3rem 0', fontWeight: 600 }}>{rule.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{rule.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="btn btn-gold"
          style={{ width: '100%', marginTop: '1.5rem', fontSize: '0.85rem', padding: '0.85rem' }}
        >
          I Understand, Keep My Jewels Sparkling
        </button>
      </div>
    </div>
  );
};
