import React, { useState } from 'react';
import { X, Ruler, HelpCircle } from 'lucide-react';

export const SizeGuideModal = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState('bangles');

  if (!isOpen) return null;

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
          padding: '2rem',
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
          <Ruler size={20} color="var(--gold-primary)" />
          <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', margin: 0 }}>Jewellery Size Guide</h3>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--gold-border)', paddingBottom: '0.5rem' }}>
          <button
            onClick={() => setTab('bangles')}
            className={`btn ${tab === 'bangles' ? 'btn-gold' : 'btn-ghost'}`}
            style={{ fontSize: '0.8rem', padding: '0.45rem 1rem' }}
          >
            Bangle & Kada Sizes
          </button>
          <button
            onClick={() => setTab('rings')}
            className={`btn ${tab === 'rings' ? 'btn-gold' : 'btn-ghost'}`}
            style={{ fontSize: '0.8rem', padding: '0.45rem 1rem' }}
          >
            Ring Sizing
          </button>
        </div>

        {tab === 'bangles' ? (
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Standard Indian Bangle measurement corresponds to inner diameter in inches and sixteenths:
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
              <thead>
                <tr style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--gold-border)' }}>
                  <th style={{ padding: '0.6rem', textAlign: 'left' }}>Bangle Size</th>
                  <th style={{ padding: '0.6rem', textAlign: 'left' }}>Inner Diameter (Inches)</th>
                  <th style={{ padding: '0.6rem', textAlign: 'left' }}>Inner Diameter (mm)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["2.4 (Small)", "2 - 4/16 in", "57.2 mm"],
                  ["2.6 (Medium)", "2 - 6/16 in", "60.3 mm"],
                  ["2.8 (Large)", "2 - 8/16 in", "63.5 mm"],
                  ["2.10 (Extra Large)", "2 - 10/16 in", "66.7 mm"]
                ].map(([size, inches, mm], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(158, 127, 76, 0.12)' }}>
                    <td style={{ padding: '0.6rem', color: 'var(--gold-dark)', fontWeight: 600 }}>{size}</td>
                    <td style={{ padding: '0.6rem' }}>{inches}</td>
                    <td style={{ padding: '0.6rem' }}>{mm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: '1rem', background: 'var(--bg-primary)', border: '1px solid var(--gold-border)', padding: '0.8rem', borderRadius: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              💡 <strong>Tip for Kadas:</strong> Most openable kadas feature a hidden screw-lock and comfortably fit wrists between 2.4 and 2.8.
            </div>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              All statement cocktail rings at AURUM NOIR are crafted with smooth adjustable bands designed to comfortably fit standard finger sizes 6 through 10.
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
              <thead>
                <tr style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--gold-border)' }}>
                  <th style={{ padding: '0.6rem', textAlign: 'left' }}>US Size</th>
                  <th style={{ padding: '0.6rem', textAlign: 'left' }}>Inner Diameter</th>
                  <th style={{ padding: '0.6rem', textAlign: 'left' }}>Circumference</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Size 6", "16.5 mm", "51.9 mm"],
                  ["Size 7", "17.3 mm", "54.4 mm"],
                  ["Size 8", "18.1 mm", "57.0 mm"],
                  ["Size 9", "18.9 mm", "59.5 mm"]
                ].map(([s, d, c], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(158, 127, 76, 0.12)' }}>
                    <td style={{ padding: '0.6rem', color: 'var(--gold-dark)', fontWeight: 600 }}>{s}</td>
                    <td style={{ padding: '0.6rem' }}>{d}</td>
                    <td style={{ padding: '0.6rem' }}>{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
