import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { PhotoCard } from '../ui/cards';
import { FeatureInfoCard, StatInfoCard } from '../ui/3d-card';
import { medicalServices } from '../../data/doctorData';
import { MedicalService } from '../../types';
import { getImage } from '../../lib/imageRegistry';

interface ServicesSectionProps {
  onOpenServiceDetails: (service: MedicalService) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenServiceDetails,
}) => {
  const findService = (id: string) =>
    medicalServices.find((s) => s.id === id) || medicalServices[0];

  return (
    <section id="services" className="py-24 sm:py-32 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="04 / SERVICES"
          title="Clinical Offerings &"
          serifWord="Consultations"
          subtitle="Unhurried consultations built around precision diagnosis, risk mitigation, and lifelong physician stewardship."
        />

        {/* Custom grid: featured large photo + right column (photo + 3D cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-12">

          {/* Large left — primary consultation photo */}
          <div className="lg:col-span-7 min-h-[360px]">
            <PhotoCard
              card={{
                id: 'service-consult',
                title: 'In-Clinic Consultation',
                subtitle: 'IN-PERSON CARE',
                badge: '45 min slot',
                imageUrl: getImage('serviceComprehensiveConsult'),
                onClick: () => onOpenServiceDetails(findService('in-clinic-physician-consultation')),
              }}
              className="h-[360px] sm:h-full min-h-[360px]"
            />
          </div>

          {/* Right column: 3 stacked items */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Photo card — second opinion */}
            <div className="flex-1 min-h-[200px]">
              <PhotoCard
                card={{
                  id: 'service-second-opinion',
                  title: 'Second Opinion',
                  subtitle: 'DIAGNOSTIC AUDIT',
                  imageUrl: getImage('serviceSecondOpinion'),
                  onClick: () => onOpenServiceDetails(findService('rheumatology-joint-pain-assessment')),
                }}
                className="h-[220px] sm:h-full"
                animationDelay={90}
              />
            </div>

            {/* 3D stat card — pace */}
            <div className="min-h-[160px]">
              <StatInfoCard
                stat="45"
                label="Minutes Per Consultation"
                sub="Zero assembly-line throughput"
                className="h-[160px] sm:h-full min-h-[160px]"
              />
            </div>

            {/* 3D feature card — care philosophy */}
            <div className="min-h-[160px]">
              <FeatureInfoCard
                tag="CARE PRINCIPLE"
                title="Unhurried by Design"
                body="Every session includes a clinical interview, physical examination, and a personalized treatment roadmap."
                className="h-[160px] sm:h-full min-h-[160px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
