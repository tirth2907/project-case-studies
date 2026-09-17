"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CardItem {
  id?: string | number;
  title: string;
  subtitle?: string; // 1-3 word category / label
  imageUrl: string;
  href?: string;
  badge?: string;
  onClick?: () => void;
  className?: string;
}

export interface HoverRevealCardsProps {
  cards: CardItem[];
  layout?: "grid-4" | "grid-3" | "grid-2" | "featured" | "asymmetric" | "horizontal";
  className?: string;
  cardClassName?: string;
  showArrow?: boolean;
}

// ─── Single Card ──────────────────────────────────────────────────────────────

export const HoverRevealCard: React.FC<{
  card: CardItem;
  index: number;
  hovered: number | null;
  setHovered: (index: number | null) => void;
  className?: string;
  showArrow?: boolean;
  animationDelay?: number;
}> = ({ card, index, hovered, setHovered, className, showArrow = true, animationDelay = 0 }) => {
  const isHovered = hovered === index;
  const isAnotherHovered = hovered !== null && !isHovered;
  const cardRef = useRef<Element | null>(null);
  const [visible, setVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) { setVisible(true); return; }
    const node = cardRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (card.onClick) {
        card.onClick();
      } else if (card.href) {
        if (card.href.startsWith("#")) {
          const el = document.querySelector(card.href);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.location.href = card.href;
        }
      }
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (card.onClick) {
      e.preventDefault();
      card.onClick();
    } else if (card.href?.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(card.href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const Tag = card.href ? "a" : "div";

  const motionStyle = !prefersReducedMotion
    ? {
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
        transition: `opacity 0.7s ease ${animationDelay}ms, transform 0.7s ease ${animationDelay}ms`,
      }
    : {};

  const setRef = (node: Element | null) => { cardRef.current = node; };

  return (
    <Tag
      ref={setRef}
      href={card.href}
      onClick={handleClick}
      tabIndex={0}
      role={card.href || card.onClick ? "button" : undefined}
      aria-label={`${card.title}${card.subtitle ? ` — ${card.subtitle}` : ""}`}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onFocus={() => setHovered(index)}
      onBlur={() => setHovered(null)}
      onKeyDown={handleKeyDown}
      style={motionStyle}
      className={cn(
        "group relative block overflow-hidden rounded-2xl bg-neutral-950 text-left outline-none cursor-pointer select-none",
        "will-change-transform",
        /* Hover states — disabled when reduced motion */
        !prefersReducedMotion && [
          "transition-[transform,opacity,filter,box-shadow] duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          isHovered && "scale-[1.025] shadow-[0_24px_64px_rgba(0,0,0,0.90)] z-10",
          isAnotherHovered && "blur-[2.5px] opacity-[0.38] scale-[0.978]",
        ],
        "focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        className
      )}
    >
      {/* ── Background Photography — Cinematic Zoom ── */}
      <img
        src={card.imageUrl}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className={cn(
          "absolute inset-0 h-full w-full object-cover grayscale contrast-[1.08] brightness-[0.88]",
          !prefersReducedMotion && [
            "transition-[transform,filter] duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
            "group-hover:scale-[1.06] group-hover:brightness-95 group-hover:contrast-[1.12]",
            isHovered && "scale-[1.06] brightness-95 contrast-[1.12]",
          ]
        )}
      />

      {/* ── Cinematic Vignette — two-layer for depth ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/22 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/28 via-transparent to-transparent pointer-events-none" />

      {/* ── Badge (top-right) ── */}
      {card.badge && (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center px-2.5 py-[5px] rounded-full text-[9px] font-mono uppercase tracking-[0.18em] bg-black/55 backdrop-blur-md border border-white/12 text-neutral-400">
            {card.badge}
          </span>
        </div>
      )}

      {/* ── Lower Editorial Content ── */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-6 sm:px-7 sm:pb-7 pt-24">
        {card.subtitle && (
          <span
            className={cn(
              "block text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-400 mb-1.5",
              !prefersReducedMotion && "transition-colors duration-500 group-hover:text-neutral-200"
            )}
          >
            {card.subtitle}
          </span>
        )}

        <div className="flex items-end justify-between gap-3">
          <h3
            className={cn(
              "text-[1.35rem] sm:text-2xl font-light text-white leading-[1.18] tracking-[-0.01em]",
              !prefersReducedMotion && "transition-transform duration-500 group-hover:translate-x-[2px]"
            )}
          >
            {card.title}
          </h3>

          {showArrow && (
            <div
              className={cn(
                "w-8 h-8 rounded-full border border-white/18 bg-white/[0.06] backdrop-blur-sm flex items-center justify-center shrink-0 text-white/60",
                !prefersReducedMotion && "transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:text-black group-hover:scale-110"
              )}
            >
              <ArrowUpRight
                className={cn(
                  "w-[15px] h-[15px]",
                  !prefersReducedMotion && "transition-transform duration-500 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                )}
              />
            </div>
          )}
        </div>
      </div>
    </Tag>
  );
};

// ─── Grid Container ───────────────────────────────────────────────────────────

export const HoverRevealCards: React.FC<HoverRevealCardsProps> = ({
  cards,
  layout = "grid-4",
  className,
  cardClassName,
  showArrow = true,
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  // Stagger delay per card
  const delay = (i: number) => i * 90;

  // Layout A — 4-card grid
  if (layout === "grid-4") {
    return (
      <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5", className)}>
        {cards.map((card, i) => (
          <HoverRevealCard
            key={card.id ?? i}
            card={card}
            index={i}
            hovered={hovered}
            setHovered={setHovered}
            showArrow={showArrow}
            animationDelay={delay(i)}
            className={cn("h-[280px] sm:h-[320px] lg:h-[370px]", cardClassName, card.className)}
          />
        ))}
      </div>
    );
  }

  // Layout A-3 — 3-card grid
  if (layout === "grid-3") {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5", className)}>
        {cards.map((card, i) => (
          <HoverRevealCard
            key={card.id ?? i}
            card={card}
            index={i}
            hovered={hovered}
            setHovered={setHovered}
            showArrow={showArrow}
            animationDelay={delay(i)}
            className={cn("h-[300px] sm:h-[360px]", cardClassName, card.className)}
          />
        ))}
      </div>
    );
  }

  // Layout A-2 — 2-card grid (single card = full width)
  if (layout === "grid-2") {
    const isSingle = cards.length === 1;
    return (
      <div className={cn(isSingle ? "block" : "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5", className)}>
        {cards.map((card, i) => (
          <HoverRevealCard
            key={card.id ?? i}
            card={card}
            index={i}
            hovered={hovered}
            setHovered={setHovered}
            showArrow={showArrow}
            animationDelay={delay(i)}
            className={cn(isSingle ? "h-[320px] sm:h-[400px] w-full" : "h-[300px] sm:h-[380px]", cardClassName, card.className)}
          />
        ))}
      </div>
    );
  }

  // Layout B — Featured: 1 large left + stacked right
  if (layout === "featured") {
    const [featured, ...rest] = cards;
    return (
      <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5", className)}>
        {featured && (
          <div className="lg:col-span-7">
            <HoverRevealCard
              card={featured}
              index={0}
              hovered={hovered}
              setHovered={setHovered}
              showArrow={showArrow}
              animationDelay={0}
              className={cn("h-[340px] sm:h-[440px] lg:h-[500px]", cardClassName, featured.className)}
            />
          </div>
        )}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-5">
          {rest.map((card, idx) => (
            <HoverRevealCard
              key={card.id ?? idx + 1}
              card={card}
              index={idx + 1}
              hovered={hovered}
              setHovered={setHovered}
              showArrow={showArrow}
              animationDelay={delay(idx + 1)}
              className={cn("h-[240px] lg:h-[238px]", cardClassName, card.className)}
            />
          ))}
        </div>
      </div>
    );
  }

  // Layout C — Asymmetric: Large 2/3 + narrow 1/3 (stacked 2 cards)
  if (layout === "asymmetric") {
    const [first, second, third] = cards;
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5", className)}>
        {first && (
          <div className="md:col-span-8">
            <HoverRevealCard
              card={first}
              index={0}
              hovered={hovered}
              setHovered={setHovered}
              showArrow={showArrow}
              animationDelay={0}
              className={cn("h-[300px] sm:h-[400px] md:h-[460px]", cardClassName, first.className)}
            />
          </div>
        )}
        <div className="md:col-span-4 flex flex-col gap-4 sm:gap-5">
          {second && (
            <HoverRevealCard
              card={second}
              index={1}
              hovered={hovered}
              setHovered={setHovered}
              showArrow={showArrow}
              animationDelay={delay(1)}
              className={cn("h-[220px] md:h-[218px]", cardClassName, second.className)}
            />
          )}
          {third && (
            <HoverRevealCard
              card={third}
              index={2}
              hovered={hovered}
              setHovered={setHovered}
              showArrow={showArrow}
              animationDelay={delay(2)}
              className={cn("h-[220px] md:h-[218px]", cardClassName, third.className)}
            />
          )}
        </div>
      </div>
    );
  }

  // Layout D — Horizontal panels (single card = full width)
  if (layout === "horizontal") {
    const isSingle = cards.length === 1;
    return (
      <div className={cn(isSingle ? "block" : "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5", className)}>
        {cards.map((card, i) => (
          <HoverRevealCard
            key={card.id ?? i}
            card={card}
            index={i}
            hovered={hovered}
            setHovered={setHovered}
            showArrow={showArrow}
            animationDelay={delay(i)}
            className={cn(isSingle ? "h-[300px] sm:h-[380px] w-full" : "h-[260px] sm:h-[310px]", cardClassName, card.className)}
          />
        ))}
      </div>
    );
  }

  return null;
};

export default HoverRevealCards;

// ─── PhotoCard — standalone single photo card with self-contained hover ───────
// Use this when you need a photo card in a custom grid layout alongside
// 3D info cards. No sibling de-emphasis, just the cinematic zoom on hover.
export const PhotoCard: React.FC<{
  card: CardItem;
  className?: string;
  showArrow?: boolean;
  animationDelay?: number;
}> = ({ card, className, showArrow = true, animationDelay = 0 }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <HoverRevealCard
      card={card}
      index={0}
      hovered={hovered}
      setHovered={setHovered}
      showArrow={showArrow}
      animationDelay={animationDelay}
      className={cn("w-full h-full", className)}
    />
  );
};
