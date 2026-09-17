import React, { useState, useEffect, useRef, useCallback } from 'react';

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export interface RandomLetterSwapProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
  isTriggered?: boolean;
  characterSet?: string;
  speed?: number; // ms per step
  onAnimationComplete?: () => void;
}

export const RandomLetterSwap: React.FC<RandomLetterSwapProps> = ({
  text,
  className = '',
  triggerOnHover = true,
  isTriggered = false,
  characterSet = DEFAULT_CHARS,
  speed = 28,
  onAnimationComplete,
}) => {
  const [prevText, setPrevText] = useState(text);
  const [displayText, setDisplayText] = useState(text);
  const animationFrameRef = useRef<number | null>(null);
  const isReducedMotion = useRef(false);

  if (prevText !== text) {
    setPrevText(text);
    setDisplayText(text);
  }

  useEffect(() => {
    isReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const runScramble = useCallback(() => {
    if (isReducedMotion.current) {
      setDisplayText(text);
      return;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const totalLength = text.length;
    let iteration = 0;
    const maxIterations = totalLength + 4; // controlled rapid steps

    let lastTick = performance.now();

    const tick = (now: number) => {
      if (now - lastTick >= speed) {
        lastTick = now;
        iteration += 0.65; // settle rate

        const scrambled = text
          .split('')
          .map((char, index) => {
            // Keep spaces intact
            if (char === ' ') return ' ';
            
            // If iteration has progressed past this character index, show original letter
            if (index < iteration) {
              return text[index];
            }

            // Otherwise show random glyph from characterSet
            const randomIndex = Math.floor(Math.random() * characterSet.length);
            return characterSet[randomIndex];
          })
          .join('');

        setDisplayText(scrambled);

        if (iteration >= maxIterations) {
          setDisplayText(text);
          if (onAnimationComplete) {
            onAnimationComplete();
          }
          return;
        }
      }

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);
  }, [text, characterSet, speed, onAnimationComplete]);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Trigger when isTriggered changes to true
  useEffect(() => {
    if (isTriggered) {
      runScramble();
    }
  }, [isTriggered, runScramble]);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      runScramble();
    }
  };

  return (
    <span
      onMouseEnter={handleMouseEnter}
      className={`inline-block select-none ${className}`}
      aria-label={text}
    >
      {displayText}
    </span>
  );
};
