import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { doctorProfile } from '../../data/doctorData';
import { PhotoCard } from '../ui/cards';
import { StatInfoCard, QuoteInfoCard } from '../ui/3d-card';
import { Award, GraduationCap, ShieldCheck, MapPin } from 'lucide-react';
import { MotionScrollWordReveal, SkeletonText } from '../ui/typography';
import { getImage } from '../../lib/imageRegistry';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="01 / ABOUT"
          title="Physician Profile &"
          serifWord="Clinical Pedigree"
          subtitle="Combining elite university hospital mentorship with over two decades of dedicated private practice in Rajkot."
        />

        {/* Editorial Doctor Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          {/* Portrait */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-950 shadow-2xl group transform-gpu"
            >
              <img
                src={getImage('heroPortrait')}
                alt={`${doctorProfile.name}, Senior Consultant Physician`}
                className="w-full h-full object-cover object-top grayscale contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-left">
                <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400 block mb-1">
                  THE PHYSICIAN
                </span>
                <h3 className="text-2xl font-light font-serif text-white leading-snug">
                  <SkeletonText duration={500}>{doctorProfile.name}</SkeletonText>
                </h3>
                <p className="text-xs font-mono text-neutral-300 mt-1">
                  <SkeletonText duration={650}>MD (Medicine) • Senior Consultant Physician</SkeletonText>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Narrative & Credentials */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase text-neutral-400 block mb-3">
                DIRECTOR &amp; CHIEF PHYSICIAN
              </span>
              <MotionScrollWordReveal
                text="Clinical listening is the foundation of definitive diagnosis and enduring patient trust."
                italicWords={['listening', 'definitive', 'trust']}
                className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-light font-serif text-white tracking-[-0.02em] leading-[1.2]"
                as="h2"
              />
            </div>

            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-[65ch]">
              With over 25 years of continuous clinical practice, Dr. Samir Prajapati combines academic mentorship from B.J. Medical College and V.S. Hospital with personalized outpatient care at Shree Maa Krupa Clinic.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                { icon: GraduationCap, label: 'M.D. in Medicine (2001)', sub: 'B.J. Medical College (BJMC), Ahmedabad', dur: 500 },
                { icon: Award, label: 'Former Assistant Professor', sub: 'V.S. General Hospital & NHL MMC (2004–2006)', dur: 550 },
                { icon: ShieldCheck, label: 'GMC Registration', sub: 'Reg. No: G-10961 (Gujarat Medical Council)', dur: 600 },
                { icon: MapPin, label: 'Central Location', sub: 'Vidyanagar Main Road, Rajkot', dur: 650 },
              ].map(({ icon: Icon, label, sub, dur }) => (
                <div key={label} className="p-4 rounded-2xl bg-white/[0.03] backdrop-blur-md flex items-start gap-3.5">
                  <Icon className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-white">
                      <SkeletonText duration={dur}>{label}</SkeletonText>
                    </div>
                    <div className="text-[11px] text-neutral-400 font-sans mt-0.5">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Inside the Clinic ── */}
        <div className="pt-4">
          <div className="flex items-end justify-between mb-7 gap-4">
            <div>
              <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400 block mb-1">
                FACILITY &amp; PRACTICE
              </span>
              <h3 className="text-2xl sm:text-3xl font-light font-serif text-white">Inside the Clinic</h3>
            </div>
            <p className="text-xs font-mono text-neutral-500 hidden sm:block">13 Manhar Plot, Rajkot</p>
          </div>

          {/* Custom grid: large photo + stacked photo + 3D stat card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Large left photo */}
            <div className="lg:col-span-7 min-h-[340px] sm:min-h-[480px]">
              <PhotoCard
                card={{
                  id: 'about-interior',
                  title: 'The Consultation Suite',
                  subtitle: 'OUR ENVIRONMENT',
                  imageUrl: getImage('aboutClinicInterior'),
                  href: '#contact',
                }}
                className="h-[340px] sm:h-full min-h-[340px]"
              />
            </div>

            {/* Right column: photo + 3D stat card */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="flex-1 min-h-[220px]">
                <PhotoCard
                  card={{
                    id: 'about-diagnostic',
                    title: 'Diagnostic Suite',
                    subtitle: 'ON-SITE INVESTIGATIONS',
                    imageUrl: getImage('aboutDiagnosticSuite'),
                    href: '#contact',
                  }}
                  className="h-[220px] sm:h-full"
                  animationDelay={90}
                />
              </div>
              <div className="min-h-[200px]">
                <StatInfoCard
                  stat="25+"
                  label="Years of Clinical Practice"
                  sub="Continuous OPD Care in Rajkot since 2001"
                  className="h-[200px] sm:h-full min-h-[200px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
