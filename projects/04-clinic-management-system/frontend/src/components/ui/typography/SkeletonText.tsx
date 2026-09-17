import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { cn } from '../../../lib/utils';

interface SkeletonTextProps {
  children: React.ReactNode;
  className?: string;
  skeletonClassName?: string;
  duration?: number; // ms to stay in skeleton state before reveal (e.g. 550ms)
  as?: 'span' | 'div' | 'p' | 'h3' | 'h4';
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  children,
  className,
  skeletonClassName,
  duration = 600,
  as: Component = 'span',
}) => {
  const ref = useRef<any>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const isReducedMotion = useReducedMotion();
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (isReducedMotion) return;

    if (isInView && !isRevealed) {
      const timer = setTimeout(() => {
        setIsRevealed(true);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isInView, duration, isReducedMotion, isRevealed]);

  const showContent = isReducedMotion || isRevealed;

  if (showContent) {
    return (
      <Component ref={ref} className={cn('inline-block', className)}>
        <motion.span
          initial={isReducedMotion ? false : { opacity: 0, filter: 'blur(3px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="inline-block"
        >
          {children}
        </motion.span>
      </Component>
    );
  }

  return (
    <Component ref={ref} className={cn('relative inline-flex items-center', className)}>
      {/* Invisible content to preserve layout geometry & avoid CLS */}
      <span className="opacity-0 pointer-events-none select-none inline-block">
        {children}
      </span>

      {/* Refined dark-glass editorial skeleton shimmer */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-0 rounded bg-white/[0.08] backdrop-blur-sm overflow-hidden animate-pulse',
          skeletonClassName
        )}
      >
        <span className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </span>
    </Component>
  );
};
