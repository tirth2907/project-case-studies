import React, { useState } from 'react';
import { ArrowRight, Lock, Mail, User, Phone, CheckCircle2 } from 'lucide-react';

export const AuthPage = ({ onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      onNavigate('home');
    }, 1500);
  };

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', display: 'flex', justifyContent: 'center' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '440px', padding: '2.5rem', border: '1px solid var(--gold-border-bright)' }}>
        {/* Toggle Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '2rem' }}>
          <button
            onClick={() => setIsLogin(true)}
            style={{
              flex: 1,
              padding: '0.8rem',
              background: 'none',
              border: 'none',
              color: isLogin ? 'var(--gold-light)' : 'var(--text-muted)',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              borderBottom: isLogin ? '2px solid var(--gold-primary)' : 'none'
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            style={{
              flex: 1,
              padding: '0.8rem',
              background: 'none',
              border: 'none',
              color: !isLogin ? 'var(--gold-light)' : 'var(--text-muted)',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              borderBottom: !isLogin ? '2px solid var(--gold-primary)' : 'none'
            }}
          >
            Create Account
          </button>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <CheckCircle2 size={42} color="#51cf66" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ color: '#fff', fontSize: '1.3rem' }}>Welcome to AURUM NOIR</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Redirecting to royal collections...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {!isLogin && (
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--gold-light)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <input type="text" required placeholder="Rani Padmavati" className="luxury-input" style={{ paddingLeft: '2.5rem' }} />
                  <User size={16} color="var(--text-muted)" style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            )}

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--gold-light)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <input type="email" required placeholder="you@royalmail.com" className="luxury-input" style={{ paddingLeft: '2.5rem' }} />
                <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--gold-light)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input type="password" required placeholder="••••••••" className="luxury-input" style={{ paddingLeft: '2.5rem' }} />
                <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <button type="submit" className="btn btn-gold" style={{ padding: '0.9rem', marginTop: '0.5rem' }}>
              <span>{isLogin ? 'Sign In to Account' : 'Register for VIP Trousseau'}</span>
              <ArrowRight size={16} />
            </button>

            {/* Social Alternative */}
            <div style={{ textAlign: 'center', marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.2rem' }}>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-ghost"
                style={{ width: '100%', fontSize: '0.82rem', padding: '0.7rem' }}
              >
                <span>Continue with Google One-Tap</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
