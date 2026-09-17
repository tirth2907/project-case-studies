"use client";

import { cn } from "@/lib/utils";
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";

// ─── Context ──────────────────────────────────────────────────────────────────

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a CardContainer");
  }
  return context;
};

// ─── CardContainer ────────────────────────────────────────────────────────────

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 22;
    const y = (e.clientY - top - height / 2) / 22;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
  };

  const handleMouseLeave = () => {
    setIsMouseEntered(false);
    if (containerRef.current) {
      containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    }
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn("flex items-center justify-center", containerClassName)}
        style={{ perspective: "1000px" }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "relative transition-all duration-200 ease-linear w-full h-full",
            className
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

// ─── CardBody ─────────────────────────────────────────────────────────────────

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "w-full h-full [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
        className
      )}
    >
      {children}
    </div>
  );
};

// ─── CardItem ─────────────────────────────────────────────────────────────────

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: unknown;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  }, [isMouseEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

  return (
    <Tag
      ref={ref}
      className={cn("w-fit transition-all duration-200 ease-linear", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// ─── Clinic-Branded 3D Info Cards ─────────────────────────────────────────────

/** Stat card: large number + label + optional sub */
export const StatInfoCard = ({
  stat,
  label,
  sub,
  className,
}: {
  stat: string;
  label: string;
  sub?: string;
  className?: string;
}) => (
  <CardContainer containerClassName={cn("w-full h-full p-0", className)}>
    <CardBody className="w-full h-full rounded-2xl border border-white/10 bg-neutral-950 p-6 sm:p-7 flex flex-col justify-end">
      <CardItem translateZ={20} className="w-full">
        <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-neutral-500 block mb-3">
          CLINICAL RECORD
        </span>
      </CardItem>
      <CardItem translateZ={60} className="w-full">
        <span className="text-[clamp(2.8rem,6vw,4.5rem)] font-light font-serif text-white leading-none tracking-tight block">
          {stat}
        </span>
      </CardItem>
      <CardItem translateZ={40} className="w-full mt-2">
        <span className="text-sm font-light text-neutral-300 block leading-snug">{label}</span>
        {sub && (
          <span className="text-[11px] font-mono text-neutral-500 block mt-1">{sub}</span>
        )}
      </CardItem>
    </CardBody>
  </CardContainer>
);

/** Quote card: italic quote + attribution */
export const QuoteInfoCard = ({
  quote,
  author,
  label,
  className,
}: {
  quote: string;
  author: string;
  label?: string;
  className?: string;
}) => (
  <CardContainer containerClassName={cn("w-full h-full p-0", className)}>
    <CardBody className="w-full h-full rounded-2xl border border-white/10 bg-neutral-950 p-6 sm:p-7 flex flex-col justify-between">
      <CardItem translateZ={20} className="w-full">
        {label && (
          <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-neutral-500 block mb-4">
            {label}
          </span>
        )}
        <div className="w-8 h-px bg-white/20 mb-4" />
      </CardItem>
      <CardItem translateZ={50} className="w-full">
        <p className="text-base sm:text-lg font-serif font-light text-white leading-relaxed italic">
          &ldquo;{quote}&rdquo;
        </p>
      </CardItem>
      <CardItem translateZ={30} className="w-full mt-4">
        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
          — {author}
        </span>
      </CardItem>
    </CardBody>
  </CardContainer>
);

/** Feature card: bold short heading + body copy */
export const FeatureInfoCard = ({
  title,
  body,
  tag,
  className,
}: {
  title: string;
  body: string;
  tag?: string;
  className?: string;
}) => (
  <CardContainer containerClassName={cn("w-full h-full p-0", className)}>
    <CardBody className="w-full h-full rounded-2xl border border-white/10 bg-neutral-950 p-6 sm:p-7 flex flex-col justify-between">
      <CardItem translateZ={20} className="w-full">
        {tag && (
          <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-neutral-500 block mb-3">
            {tag}
          </span>
        )}
      </CardItem>
      <CardItem translateZ={55} className="w-full">
        <h4 className="text-xl sm:text-2xl font-serif font-light text-white leading-snug tracking-tight">
          {title}
        </h4>
      </CardItem>
      <CardItem translateZ={35} className="w-full mt-3">
        <p className="text-xs text-neutral-400 font-light leading-relaxed">{body}</p>
      </CardItem>
    </CardBody>
  </CardContainer>
);
