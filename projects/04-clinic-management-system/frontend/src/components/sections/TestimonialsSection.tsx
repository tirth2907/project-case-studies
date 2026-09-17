import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { HoverRevealCards } from '../ui/cards';
import { Star, ShieldCheck } from 'lucide-react';
import { MotionScrollWordReveal, SkeletonText } from '../ui/typography';
import { getImage } from '../../lib/imageRegistry';

const testimonials = [
  {
    quote:
      'Dr. Samir gave us clear diagnostic answers after weeks of illness when multiple other centers were unable to pinpoint the root cause.',
    author: 'R. Patel',
    location: 'Rajkot',
    label: 'Diagnostic Clarity',
  },
  {
    quote:
      'Under Dr. Prajapati\'s care, my HbA1c dropped from 9.2% to 6.4% without over-medication. His detailed explanations gave me my life back.',
    author: 'M. Joshi',
    location: 'Gondal',
    label: 'Metabolic Management',
  },
  {
    quote:
      'The unhurried consultation made all the difference. He spent 45 minutes reviewing five years of my father\'s previous medical files.',
    author: 'K. Dave',
    location: 'Morbi',
    label: 'Second Opinion',
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-24 sm:py-32 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            number="05 / REVIEWS"
            title="Trusted by"
            serifWord="Our Patients"
            subtitle="Reflections from individuals and families who entrust their health to Dr. Samir Prajapati."
            className="mb-0"
          />

          {/* Verified rating badge */}
          <div className="p-4 px-5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md flex items-center gap-4 shadow-lg self-start md:self-auto shrink-0">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-white text-white" />
              ))}
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
              <SkeletonText duration={550}>
                <span>4.98 • Verified Reviews</span>
              </SkeletonText>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            </div>
          </div>
        </div>

        {/* Editorial Pull Quote */}
        <div className="mb-14 max-w-3xl">
          <MotionScrollWordReveal
            text="Care that feels unhurried, rigorous, and deeply personal."
            italicWords={['unhurried', 'rigorous', 'personal']}
            className="text-[clamp(1.6rem,3.2vw,2.5rem)] font-light font-serif text-neutral-100 leading-snug"
            as="blockquote"
          />
        </div>

        {/* Atmosphere card — full-width horizontal treatment */}
        <HoverRevealCards
          layout="horizontal"
          className="mb-5"
          cards={[
            {
              id: 'testimonial-atmosphere',
              title: 'A Clinic Built on Reassurance',
              subtitle: 'PATIENT EXPERIENCE',
              badge: 'Rajkot, Gujarat',
              imageUrl: getImage('testimonialAtmosphere'),
              href: '#contact',
            },
          ]}
          cardClassName="h-[300px] sm:h-[360px]"
        />

        {/* Three verbal testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((item) => (
            <div
              key={item.author}
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md flex flex-col justify-between gap-5"
            >
              <p className="text-[0.92rem] font-serif font-light text-neutral-200 leading-relaxed italic">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 block mb-0.5">
                  {item.label}
                </span>
                <span className="text-xs font-mono text-neutral-300">
                  {item.author} — {item.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
