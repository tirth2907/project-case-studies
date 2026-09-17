import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface BentoCardProps {
  id?: string;
  title: string;
  subtitle?: string;
  category?: string;
  description?: string;
  imageUrl?: string;
  stat?: string;
  statLabel?: string;
  quote?: string;
  quoteAuthor?: string;
  badge?: string;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2;
  variant?: 'featured' | 'standard' | 'stat' | 'quote' | 'interactive' | 'minimal';
  href?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const BentoGrid: React.FC<{
  children: React.ReactNode;
  className?: string;
  cols?: 2 | 3 | 4;
}> = ({ children, className = '', cols = 3 }) => {
  const colClassMap = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div
      className={cn(
        'group/bento grid gap-4 sm:gap-6 auto-rows-[minmax(180px,auto)]',
        colClassMap[cols],
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoCard: React.FC<BentoCardProps> = ({
  title,
  subtitle,
  category,
  description,
  imageUrl,
  stat,
  statLabel,
  quote,
  quoteAuthor,
  badge,
  colSpan = 1,
  rowSpan = 1,
  variant: _variant = 'standard',
  href,
  onClick,
  className = '',
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const colSpanClasses = {
    1: 'col-span-1',
    2: 'col-span-1 md:col-span-2',
    3: 'col-span-1 md:col-span-2 lg:col-span-3',
    4: 'col-span-1 md:col-span-2 lg:col-span-4',
  };

  const rowSpanClasses = {
    1: 'row-span-1',
    2: 'row-span-1 md:row-span-2 min-h-[380px]',
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onClick) {
        onClick();
      } else if (href) {
        if (href.startsWith('#')) {
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.href = href;
        }
      }
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    } else if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isInteractive = Boolean(href || onClick);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      onClick={isInteractive ? handleClick : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      role={isInteractive ? 'button' : undefined}
      className={cn(
        'group relative overflow-hidden rounded-3xl bg-neutral-950/70 p-6 sm:p-7 text-left',
        'backdrop-blur-xl shadow-[0_12px_40px_-15px_rgba(0,0,0,0.7)]',
        'transition-all duration-500 ease-out transform-gpu will-change-transform',
        'group-hover/bento:opacity-75 hover:!opacity-100 hover:scale-[1.012] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9)]',
        isInteractive && 'cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40',
        colSpanClasses[colSpan],
        rowSpanClasses[rowSpan],
        className
      )}
    >
      {/* 
        OPTIONAL BACKGROUND IMAGE WITH ZERO IMAGE REUSE
        Treated with cinematic dark vignette gradients
      */}
      {imageUrl && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            decoding="async"
            className={cn(
              'h-full w-full object-cover grayscale contrast-110 brightness-[0.75]',
              'transition-transform duration-700 ease-out',
              isHovered ? 'scale-105 brightness-[0.85]' : 'scale-100'
            )}
          />
          {/* Subtle Multi-directional Vignette & Tint */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/50" />
        </div>
      )}

      {/* CARD CONTENT LAYER */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* Top Meta Row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {category && (
              <span className="inline-block rounded-full bg-white/[0.08] px-3 py-1 font-mono text-[10px] tracking-widest uppercase text-neutral-300 backdrop-blur-md">
                {category}
              </span>
            )}
            {badge && (
              <span className="inline-block rounded-full bg-white text-black px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider uppercase">
                {badge}
              </span>
            )}
          </div>

          {/* Interactive Arrow indicator */}
          {isInteractive && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-neutral-400 group-hover:bg-white group-hover:text-black transition-all duration-300 flex-shrink-0">
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          )}
        </div>

        {/* Center / Variant Content */}
        <div className="my-auto py-3">
          {/* STAT VARIANT */}
          {stat && (
            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-white">
                {stat}
              </div>
              {statLabel && (
                <div className="text-xs font-mono tracking-widest uppercase text-neutral-400">
                  {statLabel}
                </div>
              )}
            </div>
          )}

          {/* QUOTE VARIANT */}
          {quote && (
            <div className="space-y-3">
              <p className="font-serif text-lg sm:text-xl font-light italic leading-relaxed text-white/95">
                "{quote}"
              </p>
              {quoteAuthor && (
                <p className="font-mono text-xs tracking-widest uppercase text-neutral-400">
                  — {quoteAuthor}
                </p>
              )}
            </div>
          )}

          {/* Custom Injected Content */}
          {children}
        </div>

        {/* Bottom Editorial Content */}
        <div className="space-y-1.5 pt-2">
          {subtitle && (
            <div className="text-[11px] font-mono tracking-widest uppercase text-neutral-400 group-hover:text-neutral-300 transition-colors">
              {subtitle}
            </div>
          )}
          <h3 className="font-serif text-lg sm:text-xl font-normal leading-snug text-white group-hover:text-white transition-colors">
            {title}
          </h3>
          {description && (
            <p className="text-xs sm:text-sm font-sans leading-relaxed text-neutral-400 group-hover:text-neutral-300 transition-colors line-clamp-3">
              {description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
