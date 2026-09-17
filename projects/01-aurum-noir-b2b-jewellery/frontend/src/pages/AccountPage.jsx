import React, { useState } from 'react';
import { Package, User, MapPin, Download, CheckCircle2, Clock, Truck, ShieldAlert } from 'lucide-react';
import { formatPrice } from '../config';

export const AccountPage = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('orders');

  const mockOrders = [
    {
      id: "AN-849201",
      date: "September 10, 2026",
      status: "In Transit",
      statusStep: 3,
      total: 6499,
      item: "The Noor-e-Jahan Kundan Bridal Set (18K Gold Plated)",
      tracking: "BLUE-DART-IND-9920184",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "AN-731920",
      date: "August 24, 2026",
      status: "Delivered",
      statusStep: 4,
      total: 3499,
      item: "Devi Polki Openable Kada Pair",
      tracking: "DELHIVERY-EXP-33019",
      image: "https://images.unsplash.com/photo-1611591475819-797de233865c?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2.5rem', alignItems: 'flex-start' }}>
        {/* Left: Customer VIP Profile Card */}
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--gold-gradient)', color: '#000', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 700 }}>
            AS
          </div>
          <h3 style={{ fontSize: '1.3rem', color: '#fff', margin: 0 }}>Ananya Sharma</h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--gold-light)' }}>Maharani Club VIP Member</span>

          <div style={{ margin: '1.8rem 0', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Loyalty Points:</span>
              <span style={{ color: 'var(--gold-primary)', fontWeight: 700 }}>1,250 Pts</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Member Since:</span>
              <span style={{ color: '#fff' }}>2024</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveTab('orders')}
              className={`btn ${activeTab === 'orders' ? 'btn-gold' : 'btn-ghost'}`}
              style={{ width: '100%', fontSize: '0.82rem', padding: '0.7rem' }}
            >
              <Package size={15} />
              <span>My Orders & Shipments</span>
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`btn ${activeTab === 'addresses' ? 'btn-gold' : 'btn-ghost'}`}
              style={{ width: '100%', fontSize: '0.82rem', padding: '0.7rem' }}
            >
              <MapPin size={15} />
              <span>Saved Addresses</span>
            </button>
          </div>
        </div>

        {/* Right: Orders / Content */}
        <div style={{ gridColumn: 'span 2' }}>
          {activeTab === 'orders' ? (
            <div>
              <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '1.5rem' }}>
                Order History & Live Tracking
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {mockOrders.map(ord => (
                  <div key={ord.id} className="glass-card" style={{ padding: '1.8rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.8rem', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', fontWeight: 700 }}>ORDER #{ord.id}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.8rem' }}>Placed on {ord.date}</span>
                      </div>
                      <span className="badge badge-gold">{ord.status}</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr auto', gap: '1.2rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <img src={ord.image} alt={ord.item} style={{ width: '70px', height: '75px', objectFit: 'cover', borderRadius: '4px' }} />
                      <div>
                        <h4 style={{ color: '#fff', fontSize: '1rem', margin: '0 0 0.3rem 0' }}>{ord.item}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>AWB: {ord.tracking}</span>
                      </div>
                      <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--gold-light)' }}>
                        {formatPrice(ord.total)}
                      </span>
                    </div>

                    {/* Progress Step Bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginTop: '1rem' }}>
                      {['Placed', 'Confirmed', 'Dispatched', 'Delivered'].map((stepName, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', zIndex: 2 }}>
                          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: ord.statusStep >= i + 1 ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.1)', color: ord.statusStep >= i + 1 ? '#000' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>
                            {ord.statusStep >= i + 1 ? '✓' : i + 1}
                          </div>
                          <span style={{ fontSize: '0.7rem', color: ord.statusStep >= i + 1 ? '#fff' : 'var(--text-muted)' }}>
                            {stepName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '1rem' }}>Saved Addresses</h3>
              <div style={{ border: '1px solid var(--gold-border)', borderRadius: 'var(--radius-sm)', padding: '1.2rem', background: 'rgba(255,255,255,0.03)' }}>
                <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>Default Delivery Address</span>
                <p style={{ color: '#fff', margin: '0.4rem 0', fontWeight: 600 }}>Ananya Sharma • +91 98765 12345</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>
                  Flat 402, Royal Residency, Juhu Tara Road, Mumbai, Maharashtra 400049
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
