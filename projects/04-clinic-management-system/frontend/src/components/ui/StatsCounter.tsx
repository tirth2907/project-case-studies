import React, { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

interface StatsCounterProps {
  value: number;
  suffix?: string;
  label: string;
  subtext?: string;
}

export const StatsCounter: React.FC<StatsCounterProps> = ({
  value,
  suffix = '',
  label,
  subtext,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2.2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  const formattedValue = new Intl.NumberFormat('en-US').format(displayValue);

  return (
    <div ref={ref} className="flex flex-col">
      <div className="flex items-baseline gap-1 text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight font-serif">
        <span>{formattedValue}</span>
        <span className="text-2xl sm:text-3xl text-neutral-400 font-sans font-normal">
          {suffix}
        </span>
      </div>
      <div className="mt-2 text-sm sm:text-base font-medium text-white tracking-wide">
        {label}
      </div>
      {subtext && (
        <div className="mt-1 text-xs text-neutral-400 font-normal leading-relaxed max-w-xs">
          {subtext}
        </div>
      )}
    </div>
  );
};
