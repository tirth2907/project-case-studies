import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass' | 'white';
  size?: 'sm' | 'md' | 'lg';
  onClick?: (e?: React.MouseEvent) => void;
  href?: string;
  icon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  icon,
  type = 'button',
  disabled = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || disabled) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.25, y: middleY * 0.25 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs tracking-wider',
    md: 'px-6 py-3 text-xs tracking-wider uppercase',
    lg: 'px-8 py-4 text-sm tracking-widest uppercase',
  };

  const variantStyles = {
    primary:
      'bg-white text-black font-semibold hover:bg-neutral-200 border border-white shadow-sm transition-all duration-300',
    white:
      'bg-white text-black font-semibold hover:bg-neutral-100 border border-white shadow-lg transition-all duration-300',
    secondary:
      'bg-transparent text-white font-medium border border-white/20 hover:border-white/60 hover:bg-white/[0.04] transition-all duration-300',
    ghost:
      'bg-transparent text-neutral-400 hover:text-white border border-transparent hover:border-white/10 transition-all duration-300',
    glass:
      'bg-white/[0.06] text-white backdrop-blur-md border border-white/10 hover:border-white/30 hover:bg-white/[0.12] transition-all duration-300',
  };

  const content = (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.1 }}
        className="inline-block"
      >
        <motion.button
          type={type}
          disabled={disabled}
          onClick={onClick}
          whileTap={{ scale: 0.97 }}
          className={cn(
            'group relative inline-flex items-center justify-center gap-2.5 rounded-full font-sans transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 disabled:opacity-40 disabled:pointer-events-none',
            sizeStyles[size],
            variantStyles[variant],
            className
          )}
        >
          <span className="relative z-10 flex items-center gap-2">
            {children}
            {icon && (
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                {icon}
              </span>
            )}
          </span>
        </motion.button>
      </motion.div>
    </div>
  );

  if (href) {
    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
      onClick?.(e);
    };

    return (
      <a href={href} onClick={handleAnchorClick} className="inline-block focus:outline-none">
        {content}
      </a>
    );
  }

  return content;
};
