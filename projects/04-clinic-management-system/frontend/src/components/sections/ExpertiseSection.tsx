import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { HoverRevealCards } from '../ui/cards';
import { getImage } from '../../lib/imageRegistry';

export const ExpertiseSection: React.FC = () => {
  return (
    <section id="expertise" className="py-24 sm:py-32 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="02 / EXPERTISE"
          title="Core Clinical"
          serifWord="Specializations"
          subtitle="Precision internal medicine targeted at complex chronic pathology, cardiometabolic disease, and rheumatological conditions."
        />

        {/* Asymmetric editorial grid — large anchor + two stacked */}
        <HoverRevealCards
          layout="asymmetric"
          className="mt-12"
          cards={[
            {
              id: 'expertise-metabolic',
              title: 'Metabolic Medicine',
              subtitle: 'DIABETES & HYPERTENSION',
              imageUrl: getImage('expertiseMetabolic'),
              href: '#contact',
            },
            {
              id: 'expertise-rheumatology',
              title: 'Joint & Rheumatic Care',
              subtitle: 'RHEUMATOLOGY',
              imageUrl: getImage('expertiseRheumatology'),
              href: '#contact',
            },
            {
              id: 'expertise-infectious',
              title: 'Complex Fevers',
              subtitle: 'INFECTIOUS DISEASE',
              imageUrl: getImage('expertiseInfectious'),
              href: '#contact',
            },
          ]}
        />
      </div>
    </section>
  );
};
