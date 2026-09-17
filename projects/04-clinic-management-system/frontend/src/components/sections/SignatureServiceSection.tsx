import React from 'react';
import { MagneticButton } from '../ui/MagneticButton';
import { ArrowRight } from 'lucide-react';
import { HoverRevealCards } from '../ui/cards';
import { AnimatedTextCycle } from '../ui/typography';
import { getImage } from '../../lib/imageRegistry';

export const SignatureServiceSection: React.FC = () => {
  return (
    <section id="signature-program" className="py-24 sm:py-32 border-t border-white/10 relative bg-[#050507]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-widest text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Signature Care •</span>
              <AnimatedTextCycle
                words={['METABOLIC DEFENSE.', 'VASCULAR STABILITY.', 'GLYCEMIC BALANCE.']}
                interval={3500}
                wordClassName="text-white font-medium"
              />
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-light font-serif text-white tracking-[-0.025em] leading-[1.1]">
              Metabolic Care &amp;{' '}
              <span className="italic text-neutral-200">Vascular Defense</span>
            </h2>
          </div>

          <MagneticButton
            variant="white"
            size="md"
            href="#contact"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Inquire at Clinic
          </MagneticButton>
        </div>

        {/* Visual Card + 3-Stage Editorial Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          {/* Signature Image Card */}
          <div className="lg:col-span-7">
            <HoverRevealCards
              layout="grid-2"
              cards={[
                {
                  id: 'signature-metabolic',
                  title: 'Metabolic Reversal',
                  subtitle: 'FLAGSHIP PROGRAM',
                  badge: 'Personalized Protocol',
                  imageUrl: getImage('signatureMetabolicRoadmap'),
                  href: '#contact',
                },
              ]}
              cardClassName="h-[340px] sm:h-[440px] lg:h-[476px]"
            />
          </div>

          {/* 3-Stage Companion Panels */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {[
              {
                stage: 'STAGE 1',
                title: 'Biomarker Stabilization',
                body: 'Rapid normalization of glycemic and lipid biomarkers through individualized clinical prescription.',
              },
              {
                stage: 'STAGE 2',
                title: 'Microvascular Defense',
                body: 'Targeted vascular protection with eGFR tracking, retinal screening, and dietary rationalization.',
              },
              {
                stage: 'STAGE 3',
                title: 'Sustainable Autonomy',
                body: 'Long-term biological independence with minimal polypharmacy and documented HbA1c reversal.',
              },
            ].map(({ stage, title, body }) => (
              <div
                key={stage}
                className="flex-1 p-5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl flex flex-col gap-1.5"
              >
                <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400">{stage}</span>
                <h4 className="text-sm sm:text-base font-serif font-light text-white">{title}</h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
