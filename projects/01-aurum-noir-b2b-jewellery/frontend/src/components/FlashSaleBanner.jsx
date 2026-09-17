import React, { useState, useEffect } from 'react';
import { Flame, ArrowRight } from 'lucide-react';

export const FlashSaleBanner = ({ onNavigate }) => {
  // 3 days countdown from now
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 42,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(14, 45, 33, 0.95) 0%, rgba(7, 23, 17, 0.95) 100%)',
        border: '1px solid var(--gold-border-bright)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        margin: '3rem 0',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 15px 40px rgba(0,0,0,0.5)'
      }}
      className="animate-pulse-aura"
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', position: 'relative', zIndex: 2 }}>
        {/* Left Info */}
        <div style={{ maxWidth: '480px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(220, 53, 69, 0.2)', border: '1px solid rgba(220, 53, 69, 0.5)', color: '#ff6b7b', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.8rem' }}>
            <Flame size={14} />
            Limited Festive Flash Drop
          </div>
          <h3 style={{ fontSize: '1.8rem', color: '#fff', margin: '0 0 0.5rem 0' }}>
            Royal Rajputana Bridal Suites: Up to 35% Off
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
            Hand-set Jadau Kundan pieces and heirloom chokers with complimentary insured worldwide dispatch.
          </p>
        </div>

        {/* Center Countdown Clock */}
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
          {[
            { label: 'Days', val: timeLeft.days },
            { label: 'Hours', val: timeLeft.hours },
            { label: 'Mins', val: timeLeft.minutes },
            { label: 'Secs', val: timeLeft.seconds }
          ].map((slot, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(7, 23, 17, 0.85)',
                border: '1px solid var(--gold-border)',
                borderRadius: 'var(--radius-md)',
                minWidth: '64px',
                padding: '0.6rem 0.4rem'
              }}
            >
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--gold-light)' }}>
                {String(slot.val).padStart(2, '0')}
              </span>
              <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
                {slot.label}
              </span>
            </div>
          ))}
        </div>

        {/* Right CTA */}
        <div>
          <button
            onClick={() => onNavigate('catalog')}
            className="btn btn-gold"
            style={{ fontSize: '0.85rem', padding: '0.9rem 1.6rem' }}
          >
            <span>Claim Offer</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
