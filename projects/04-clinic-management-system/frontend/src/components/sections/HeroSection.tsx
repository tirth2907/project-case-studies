import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { ImageStreamHero, StreamImage } from '../ui/image-stream-hero';
import { AnimatedTextCycle, SkeletonText } from '../ui/typography';
import { doctorProfile } from '../../data/doctorData';

import { getImage } from '../../lib/imageRegistry';

// 8 curated clinical and practice photographs, strictly unique to the Hero stream
const STREAM_IMAGES: StreamImage[] = [
  {
    src: getImage('heroStream1'),
    alt: 'Modern diagnostic workstation',
  },
  {
    src: getImage('heroStream2'),
    alt: 'Clinical consultation setting',
  },
  {
    src: getImage('heroStream3'),
    alt: 'Laboratory diagnostic samples',
  },
  {
    src: getImage('heroStream4'),
    alt: 'Advanced medical instrumentation',
  },
  {
    src: getImage('heroStream5'),
    alt: 'Clinical examination tools',
  },
  {
    src: getImage('heroStream6'),
    alt: 'Physician diagnostic consultation',
  },
  {
    src: getImage('heroStream7'),
    alt: 'Quiet clinical corridor',
  },
  {
    src: getImage('heroStream8'),
    alt: 'Compassionate patient support',
  },
];

export const HeroSection: React.FC = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('philosophy');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative w-full min-h-[100svh] bg-[#050505] overflow-hidden">
      {/* Aceternity Perspective 3D Image Stream Corridor */}
      <ImageStreamHero
        images={STREAM_IMAGES}
        cards={8}
        speed={22}
        axis={54}
        imageClassName="h-full w-full object-cover grayscale contrast-105 brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-700"
        className="w-full min-h-[100svh] flex flex-col justify-between"
      >
        {/* Soft Monochromatic Center & Edge Vignettes for Pristine Legibility */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_52%,rgba(5,5,5,0.92)_0%,rgba(5,5,5,0.6)_60%,transparent_100%)] z-10" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050505] via-[#050505]/70 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050505] via-[#050505]/85 to-transparent z-10" />

        {/* Central Hero Experience */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-24 sm:pt-28 pb-10 my-auto">
          {/* Clinic Identifier */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/12 bg-black/60 backdrop-blur-md mb-6 sm:mb-8 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.28em] uppercase text-neutral-300">
              SHREE MAA KRUPA CLINIC
            </span>
          </motion.div>

          {/* Level 01 Display Headline with Animated Text Cycle */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,6.8vw,5.6rem)] font-light text-white tracking-[-0.03em] leading-[1.02] max-w-4xl mb-4 sm:mb-5"
          >
            Care That Puts{' '}
            <AnimatedTextCycle
              words={['You First.', 'Listening First.', 'Precision First.', 'Health First.']}
              interval={3800}
              wordClassName="font-serif italic font-normal text-white"
            />
          </motion.h1>

          {/* Doctor Name & Designation with Progressive Skeleton Text Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-neutral-300 mb-3"
          >
            <SkeletonText duration={650}>
              <span>{doctorProfile.name}, MD (Medicine)</span>
              <span className="text-neutral-500 mx-2">•</span>
              <span className="text-neutral-400">Senior Consultant Physician</span>
            </SkeletonText>
          </motion.div>

          {/* Single Short Supporting Sentence */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg text-neutral-300 font-light max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10"
          >
            Dedicated physician care and personalized medical consultations in Rajkot.
          </motion.p>

          {/* Two Simple Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton
              variant="white"
              size="lg"
              href="#about"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Explore the Clinic
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              size="lg"
              href="#contact"
            >
              Contact
            </MagneticButton>
          </motion.div>
        </div>

        {/* Minimal Bottom Section Transition with SkeletonText */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 pt-3 flex items-center justify-between border-t border-white/[0.08] text-neutral-400 text-xs font-mono"
        >
          <div className="hidden sm:block text-[11px] uppercase tracking-widest text-neutral-400">
            <SkeletonText duration={750}>
              Rajkot, Gujarat • Vidyanagar Main Road
            </SkeletonText>
          </div>

          <button
            onClick={scrollToNext}
            className="group flex items-center gap-2 mx-auto sm:mx-0 text-neutral-400 hover:text-white transition-colors focus:outline-none"
          >
            <span className="text-[11px] uppercase tracking-widest">Explore Practice</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-4 h-4 text-white/70 group-hover:text-white" />
            </motion.div>
          </button>

          <div className="hidden sm:block text-[11px] uppercase tracking-widest text-neutral-400">
            <SkeletonText duration={750}>
              25+ Years Clinical Practice
            </SkeletonText>
          </div>
        </motion.div>
      </ImageStreamHero>
    </section>
  );
};
