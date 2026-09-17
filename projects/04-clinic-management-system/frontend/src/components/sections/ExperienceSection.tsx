import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { clinicalJourney } from '../../data/doctorData';
import { MapPin } from 'lucide-react';
import { MotionScrollWordReveal, SkeletonText } from '../ui/typography';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 sm:py-32 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="04 / EXPERIENCE"
          title="Clinical Journey &amp;"
          serifWord="Academic Trajectory"
          subtitle="25+ years of clinical immersion across premier university teaching hospitals in Gujarat and dedicated private consultant practice in Rajkot."
        />

        {/* Narrative Scroll Statement */}
        <div className="max-w-4xl mx-auto mb-16 sm:mb-20">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-400 block mb-4">
            A JOURNEY OF CARE
          </span>
          <MotionScrollWordReveal
            text="Years of experience shaped by knowledge, compassion, and an enduring commitment to patient care across university hospitals and dedicated private practice."
            italicWords={['knowledge', 'compassion', 'commitment']}
            className="text-[clamp(1.5rem,3.2vw,2.4rem)] font-serif font-light text-white leading-[1.28] tracking-tight"
            as="h3"
          />
        </div>

        {/* Timeline Container */}
        <div className="relative mt-12 max-w-4xl mx-auto">
          {/* Vertical Center Progress Line */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-white/30 via-white/15 to-transparent" />

          {/* Timeline Milestones */}
          <div className="space-y-12 sm:space-y-16">
            {clinicalJourney.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 pl-12 sm:pl-0 ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white bg-black z-10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  </div>

                  {/* Content Box */}
                  <div
                    className={`w-full sm:w-[calc(50%-2rem)] rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 shadow-md ${
                      isEven ? 'sm:text-right' : 'sm:text-left'
                    }`}
                  >
                    {/* Year & Milestone Tag with SkeletonText */}
                    <div
                      className={`flex items-center gap-2 mb-2 ${
                        isEven ? 'sm:justify-end' : 'justify-start'
                      }`}
                    >
                      <SkeletonText duration={500}>
                        <span className="text-xs font-mono font-bold text-white px-2.5 py-0.5 rounded border border-white/20 bg-white/[0.05]">
                          {item.year}
                        </span>
                      </SkeletonText>
                      <span className="text-[11px] font-mono text-neutral-400">
                        {item.milestone}
                      </span>
                    </div>

                    {/* Role */}
                    <h3 className="text-lg sm:text-xl font-serif font-light text-white mb-1">
                      {item.role}
                    </h3>

                    {/* Institution & Location */}
                    <div
                      className={`flex items-center gap-2 text-xs font-mono text-neutral-400 mb-3 ${
                        isEven ? 'sm:justify-end' : 'justify-start'
                      }`}
                    >
                      <span>{item.institution}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-neutral-500" />
                        {item.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
