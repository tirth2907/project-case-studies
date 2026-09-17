import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../../lib/utils';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface TextRevealFAQProps {
  items: FAQItem[];
  defaultOpenId?: string | null;
  className?: string;
}

export const TextRevealFAQ: React.FC<TextRevealFAQProps> = ({
  items,
  defaultOpenId = items[0]?.id || null,
  className,
}) => {
  const [activeId, setActiveId] = useState<string | null>(defaultOpenId);
  const isReducedMotion = useReducedMotion();

  const toggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn('w-full border-t border-white/10 divide-y divide-white/10', className)}>
      {items.map((item, index) => {
        const isOpen = activeId === item.id;
        const numberFormatted = String(index + 1).padStart(2, '0');

        return (
          <div
            key={item.id}
            className="group py-8 sm:py-10 transition-colors duration-300"
          >
            {/* Clickable Question Header */}
            <button
              type="button"
              onClick={() => toggle(item.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggle(item.id);
                }
              }}
              aria-expanded={isOpen}
              className="w-full text-left flex items-baseline justify-between gap-6 sm:gap-10 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded-lg"
            >
              <div className="flex items-baseline gap-4 sm:gap-8 flex-1">
                {/* Number Indicator */}
                <span className="font-mono text-xs sm:text-sm tracking-widest text-neutral-400 select-none shrink-0">
                  {numberFormatted}
                </span>

                {/* Editorial Question Typography */}
                <h3
                  className={cn(
                    'text-xl sm:text-2xl md:text-[1.75rem] font-serif tracking-tight leading-[1.2] transition-all duration-400',
                    isOpen
                      ? 'text-white font-normal'
                      : 'text-neutral-300 font-light group-hover:text-white'
                  )}
                >
                  {item.question}
                </h3>
              </div>

              {/* Minimal Indicator (Subtle arrow rotation) */}
              <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-white/10 text-neutral-400 group-hover:text-white group-hover:border-white/25 transition-all duration-300">
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </div>
            </button>

            {/* Progressive Answer Reveal */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={isReducedMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={isReducedMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.35, delay: 0.05 },
                  }}
                  className="overflow-hidden"
                >
                  <div className="pl-8 sm:pl-16 pt-5 sm:pt-6 pr-4 sm:pr-12">
                    <motion.p
                      initial={isReducedMotion ? false : { opacity: 0, y: 8, filter: 'blur(3px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
                      className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-[65ch]"
                    >
                      {item.answer}
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
