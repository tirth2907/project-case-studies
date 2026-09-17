import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Sparkles, BookOpen, Grid, Building2, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BRAND_CONFIG } from '../config';

/**
 * FloatingDock
 * Minimalist luxury floating quick-action bar inspired by Aceternity Floating Dock.
 * Provides rapid wholesale access to PO Drawer, WhatsApp Factory Concierge,
 * Bridal Lookbook, and B2B Wholesaler verification.
 */
export const FloatingDock = ({ onNavigate, onOpenB2BModal, b2bBuyer }) => {
  const { totalItems, setIsCartOpen } = useCart();
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const dockItems = [
    {
      id: 'catalog',
      title: 'Catalogue Vault',
      icon: Grid,
      onClick: () => onNavigate('catalog'),
      badge: null,
    },
    {
      id: 'lookbook',
      title: 'Bridal Lookbook',
      icon: BookOpen,
      onClick: () => onNavigate('lookbook'),
      badge: null,
    },
    {
      id: 'po_bag',
      title: 'Wholesale PO Bag',
      icon: ShoppingBag,
      onClick: () => setIsCartOpen(true),
      badge: totalItems > 0 ? `${totalItems} pcs` : null,
    },
    {
      id: 'whatsapp',
      title: 'Karigar Concierge',
      icon: MessageCircle,
      onClick: () => window.open(`https://wa.me/${BRAND_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}`, '_blank'),
      badge: 'Direct',
    },
    {
      id: 'b2b',
      title: b2bBuyer ? 'GST Verified' : 'B2B Verification',
      icon: b2bBuyer ? CheckCircle2 : Building2,
      onClick: onOpenB2BModal,
      badge: b2bBuyer ? 'Active' : null,
      iconColor: b2bBuyer ? '#7b9982' : undefined,
    }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 850,
        fontFamily: 'var(--font-sans)',
      }}
      className="floating-dock-wrapper"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          background: 'rgba(255, 255, 255, 0.76)',
          backdropFilter: 'blur(28px) saturate(190%)',
          WebkitBackdropFilter: 'blur(28px) saturate(190%)',
          border: '1px solid rgba(158, 127, 76, 0.22)',
          borderRadius: '999px',
          padding: '0.45rem 0.8rem',
          boxShadow: '0 16px 45px rgba(28, 25, 23, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {dockItems.map((item, idx) => {
          const Icon = item.icon;
          const isHovered = hoveredIdx === idx;
          const isNeighbor = Math.abs((hoveredIdx ?? -999) - idx) === 1;

          // Proximity scaling (macOS dock physics)
          let scale = 1;
          if (isHovered) scale = 1.25;
          else if (isNeighbor) scale = 1.10;

          return (
            <div
              key={item.id}
              style={{ position: 'relative' }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Tooltip */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 'calc(100% + 12px)',
                  left: '50%',
                  transform: `translateX(-50%) translateY(${isHovered ? '0' : '6px'})`,
                  opacity: isHovered ? 1 : 0,
                  pointerEvents: 'none',
                  background: 'var(--text-primary)',
                  color: 'var(--bg-primary)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                  padding: '0.3rem 0.65rem',
                  borderRadius: '6px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  zIndex: 999,
                }}
              >
                {item.title}
              </div>

              <button
                onClick={item.onClick}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  border: isHovered ? '1px solid var(--gold-primary)' : '1px solid transparent',
                  background: isHovered ? 'var(--bg-secondary)' : 'transparent',
                  color: item.iconColor || 'var(--text-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  transform: `scale(${scale})`,
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  outline: 'none',
                }}
                aria-label={item.title}
              >
                <Icon size={18} />

                {item.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-3px',
                      right: '-4px',
                      background: 'var(--gold-gradient)',
                      color: '#ffffff',
                      fontSize: '0.58rem',
                      fontWeight: 700,
                      padding: '0.1rem 0.35rem',
                      borderRadius: '999px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
