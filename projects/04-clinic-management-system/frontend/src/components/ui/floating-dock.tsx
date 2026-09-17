import React, { useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  MotionValue,
} from 'framer-motion';
import { cn } from '../../lib/utils';

export interface FloatingDockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  target?: string;
}

interface FloatingDockProps {
  items: FloatingDockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
  className?: string;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  items,
  desktopClassName,
  mobileClassName,
  className,
}) => {
  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </div>
  );
};

const FloatingDockDesktop: React.FC<{
  items: FloatingDockItem[];
  className?: string;
}> = ({ items, className }) => {
  const mouseX = useMotionValue(Infinity);
  const isReducedMotion = useReducedMotion();

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      role="toolbar"
      aria-label="Practice Social & Communication Dock"
      className={cn(
        'mx-auto hidden md:flex h-14 items-center gap-3 rounded-2xl bg-neutral-900/70 px-3.5 backdrop-blur-xl shadow-2xl',
        className
      )}
    >
      {items.map((item) => (
        <IconContainer
          key={item.title}
          mouseX={mouseX}
          item={item}
          isReducedMotion={isReducedMotion}
        />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  item,
  isReducedMotion,
}: {
  mouseX: MotionValue;
  item: FloatingDockItem;
  isReducedMotion: boolean | null;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-140, 0, 140], [40, 58, 40]);
  const heightTransform = useTransform(distance, [-140, 0, 140], [40, 58, 40]);
  const iconSizeTransform = useTransform(distance, [-140, 0, 140], [18, 26, 18]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 160, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 160, damping: 12 });
  const iconSize = useSpring(iconSizeTransform, { mass: 0.1, stiffness: 160, damping: 12 });

  return (
    <motion.a
      ref={ref}
      href={item.href}
      target={item.target || (item.href.startsWith('http') ? '_blank' : undefined)}
      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={item.title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={isReducedMotion ? { width: 40, height: 40 } : { width, height }}
      className="relative flex items-center justify-center rounded-xl bg-white/[0.04] text-neutral-400 transition-all hover:bg-white/[0.12] hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 4, x: '-50%' }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900/95 px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase text-neutral-200 shadow-2xl backdrop-blur-md z-30"
          >
            {item.title}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={isReducedMotion ? { width: 18, height: 18 } : { width: iconSize, height: iconSize }}
        className="flex items-center justify-center shrink-0 [&>svg]:w-full [&>svg]:h-full"
      >
        {item.icon}
      </motion.div>
    </motion.a>
  );
}

const FloatingDockMobile: React.FC<{
  items: FloatingDockItem[];
  className?: string;
}> = ({ items, className }) => {
  return (
    <div
      role="toolbar"
      aria-label="Practice Social & Communication Quick Links"
      className={cn(
        'flex md:hidden h-12 items-center gap-2 rounded-2xl bg-neutral-900/80 px-3 backdrop-blur-xl shadow-2xl',
        className
      )}
    >
      {items.map((item) => (
        <a
          key={item.title}
          href={item.href}
          target={item.target || (item.href.startsWith('http') ? '_blank' : undefined)}
          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          aria-label={item.title}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] text-neutral-400 transition-colors hover:text-white hover:bg-white/[0.12] active:scale-95"
        >
          <div className="w-4 h-4 flex items-center justify-center shrink-0 [&>svg]:w-full [&>svg]:h-full">
            {item.icon}
          </div>
        </a>
      ))}
    </div>
  );
};
