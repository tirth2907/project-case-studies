import React from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';
import { ArrowRight, Phone, Clock, ShieldCheck } from 'lucide-react';
import { clinicInfo } from '../../data/doctorData';

export const ConsultationCTASection: React.FC = () => {
  return (
    <section className="py-24 sm:py-36 relative overflow-hidden bg-gradient-to-b from-transparent via-white/[0.02] to-transparent border-t border-white/10">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.03] rounded-full blur-[160px]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-md mb-8 text-xs font-mono tracking-widest uppercase text-neutral-300"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span>Begin Your Clinical Partnership</span>
        </motion.div>

        {/* Big Editorial Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-light font-serif text-white tracking-tight leading-[1.15] max-w-3xl mx-auto"
        >
          Your health deserves thoughtful,{' '}
          <span className="italic underline decoration-white/20 underline-offset-8">
            unhurried attention.
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-xl mx-auto"
        >
          Whether you are seeking diagnostic clarity for acute fevers, long-term diabetes &amp; BP management, or relief from chronic joint pain, Dr. Samir Prajapati provides attentive, expert medical care.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton
            variant="white"
            size="lg"
            href="#contact"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Visit Clinic Location
          </MagneticButton>

          <MagneticButton
            variant="secondary"
            size="lg"
            href={`tel:${clinicInfo.phoneRaw}`}
            icon={<Phone className="w-4 h-4" />}
          >
            Call Reception: {clinicInfo.phone}
          </MagneticButton>
        </motion.div>

        {/* Reassurance notes */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-neutral-400"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-neutral-300" />
            <span>Mon–Sat Morning &amp; Evening Sessions</span>
          </div>
          <span className="hidden sm:inline text-white/20">•</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-300" />
            <span>GMC Registered (G-10961)</span>
          </div>
          <span className="hidden sm:inline text-white/20">•</span>
          <div>
            <span>Vidyanagar Main Road, Rajkot</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
