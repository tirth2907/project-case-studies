import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  number?: string;
  badge?: string;
  title: string;
  serifWord?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  badge,
  title,
  serifWord,
  subtitle,
  align = 'left',
  className,
}) => {
  return (
    <div
      className={cn(
        'max-w-4xl mb-12 sm:mb-16 md:mb-20',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {/* Top Number / Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'flex items-center gap-3 mb-3 sm:mb-4 text-[11px] sm:text-xs tracking-[0.25em] uppercase font-mono text-neutral-400',
          align === 'center' ? 'justify-center' : 'justify-start'
        )}
      >
        {number && <span className="text-white/60 font-medium">{number}</span>}
        {number && badge && <span className="w-1 h-1 rounded-full bg-neutral-600" />}
        {badge && (
          <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[10px] sm:text-[11px] text-neutral-300">
            {badge}
          </span>
        )}
      </motion.div>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="text-[clamp(2rem,4.2vw,3.6rem)] font-light text-white tracking-[-0.025em] leading-[1.08]"
      >
        {title}{' '}
        {serifWord && (
          <span className="font-serif italic font-normal text-white">
            {serifWord}
          </span>
        )}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.16, ease: 'easeOut' }}
          className={cn(
            'mt-4 sm:mt-5 text-neutral-300 text-sm sm:text-base md:text-lg leading-[1.7] font-light max-w-[65ch]',
            align === 'center' && 'mx-auto'
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
