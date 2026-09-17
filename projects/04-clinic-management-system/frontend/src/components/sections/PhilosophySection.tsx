import React from 'react';
import { motion } from 'framer-motion';
import { doctorProfile, clinicInfo } from '../../data/doctorData';
import { ShieldCheck, Clock, Activity } from 'lucide-react';
import { MotionScrollWordReveal, AnimatedTextCycle, SkeletonText } from '../ui/typography';

export const PhilosophySection: React.FC = () => {
  const pillarIcons = [
    <Activity key="activity" className="w-5 h-5 text-white" />,
    <Clock key="clock" className="w-5 h-5 text-white" />,
    <ShieldCheck key="shield" className="w-5 h-5 text-white" />,
  ];

  return (
    <section id="philosophy" className="py-24 sm:py-32 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Identifier with Animated Text Cycle */}
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-neutral-400 mb-8 sm:mb-12">
          <span>Clinical Philosophy •</span>
          <AnimatedTextCycle
            words={['LISTEN.', 'UNDERSTAND.', 'DIAGNOSE.', 'CARE.']}
            interval={3400}
            wordClassName="text-white font-medium"
          />
        </div>

        {/* Visual Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typographic Quote & Large Photography */}
          <div className="lg:col-span-6 space-y-8">
            <MotionScrollWordReveal
              text="Medicine is more than treatment. It is the meticulous art of understanding human physiology."
              italicWords={['meticulous', 'understanding', 'physiology']}
              className="text-[clamp(1.85rem,3.6vw,2.85rem)] font-light font-serif text-white tracking-[-0.02em] leading-[1.22]"
              as="h2"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-neutral-950 shadow-2xl group"
            >
              <img
                src={doctorProfile.interiorUrl}
                alt="Shree Maa Krupa Clinic Consultation Suite"
                className="w-full h-full object-cover grayscale contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-neutral-300">
                <span className="text-white font-medium block text-sm font-serif">
                  The Private Consultation Suite
                </span>
                <span className="text-neutral-400">Vidyanagar Main Road, Rajkot</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Doctor Citation & 3 Core Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="pb-6 border-b border-white/10"
            >
              <div className="text-sm font-mono uppercase tracking-wider text-white">
                <SkeletonText duration={600}>
                  {doctorProfile.name}, {doctorProfile.titles}
                </SkeletonText>
              </div>
              <div className="text-xs font-mono text-neutral-400 mt-0.5">
                Director &amp; Senior Physician, {clinicInfo.name}
              </div>
              <p className="text-sm sm:text-base text-neutral-300 font-light mt-4 leading-relaxed max-w-[60ch]">
                With over 25 years of continuous clinical practice in Rajkot, consultations focus on deep diagnostic listening and proactive lifestyle health oversight.
              </p>
            </motion.div>

            {/* 3 Core Pillars with Restrained Minimal Descriptions */}
            <div className="grid grid-cols-1 gap-3.5">
              {doctorProfile.philosophy.pillars.map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }}
                  className="p-4 sm:p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors flex items-start gap-4"
                >
                  <div className="p-2.5 rounded-lg border border-white/15 bg-white/[0.04] shrink-0">
                    {pillarIcons[idx] || <ShieldCheck className="w-5 h-5 text-white" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed font-light">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
