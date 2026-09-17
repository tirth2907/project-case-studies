import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '../../../lib/utils';

interface AnimatedTextCycleProps {
  words: string[];
  interval?: number;
  className?: string;
  wordClassName?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div' | 'p';
}

export const AnimatedTextCycle: React.FC<AnimatedTextCycleProps> = ({
  words,
  interval = 3600,
  className,
  wordClassName,
  as: Component = 'span',
}) => {
  const [index, setIndex] = useState(0);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isReducedMotion || words.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval, isReducedMotion]);

  if (isReducedMotion) {
    return (
      <Component className={cn('inline-block text-white', className)}>
        <span className={cn('inline-block', wordClassName)}>{words[0]}</span>
      </Component>
    );
  }

  return (
    <Component className={cn('relative inline-flex items-center overflow-hidden py-1', className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={cn('inline-block will-change-[transform,opacity,filter]', wordClassName)}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </Component>
  );
};
