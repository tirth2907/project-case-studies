import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { cn } from '../../../lib/utils';

interface MotionScrollWordRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  as?: 'h2' | 'h3' | 'p' | 'div' | 'span' | 'blockquote';
  italicWords?: string[];
  progressOffset?: any;
}

interface WordProps {
  children: string;
  progress: any;
  range: [number, number];
  isItalic?: boolean;
  wordClassName?: string;
  isReducedMotion: boolean | null;
}

const Word: React.FC<WordProps> = ({
  children,
  progress,
  range,
  isItalic,
  wordClassName,
  isReducedMotion,
}) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const filter = useTransform(progress, range, ['blur(2px)', 'blur(0px)']);
  const color = useTransform(progress, range, ['#71717A', '#FFFFFF']);

  if (isReducedMotion) {
    return (
      <span
        className={cn(
          'inline-block text-white transition-none mr-[0.25em] last:mr-0',
          isItalic && 'font-serif italic font-normal text-white/95',
          wordClassName
        )}
      >
        {children}
      </span>
    );
  }

  return (
    <motion.span
      style={{ opacity, filter, color }}
      className={cn(
        'inline-block transition-[filter] duration-200 mr-[0.25em] last:mr-0 select-none will-change-[opacity,filter]',
        isItalic && 'font-serif italic font-normal',
        wordClassName
      )}
    >
      {children}
    </motion.span>
  );
};

export const MotionScrollWordReveal: React.FC<MotionScrollWordRevealProps> = ({
  text,
  className,
  wordClassName,
  as: Component = 'p',
  italicWords = [],
  progressOffset = ['start 0.85', 'end 0.35'],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: progressOffset,
  });

  const words = text.split(' ');
  const totalWords = words.length;

  return (
    <div ref={containerRef} className="relative">
      <Component className={cn('leading-relaxed font-light', className)}>
        {words.map((word, i) => {
          const start = i / totalWords;
          const end = start + 1 / totalWords;
          const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()"'“”—]/g, '').toLowerCase();
          const isItalic = italicWords.some(
            (w) => w.toLowerCase() === cleanWord || word.toLowerCase().includes(w.toLowerCase())
          );

          return (
            <Word
              key={`${word}-${i}`}
              progress={scrollYProgress}
              range={[start, end]}
              isItalic={isItalic}
              wordClassName={wordClassName}
              isReducedMotion={isReducedMotion}
            >
              {word}
            </Word>
          );
        })}
      </Component>
    </div>
  );
};
