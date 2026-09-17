import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { medicalInsights } from '../../data/doctorData';
import { MedicalInsight } from '../../types';
import { PhotoCard, HoverRevealCards } from '../ui/cards';
import { QuoteInfoCard, StatInfoCard } from '../ui/3d-card';
import { getImage } from '../../lib/imageRegistry';

interface InsightsSectionProps {
  onSelectArticle: (article: MedicalInsight) => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ onSelectArticle }) => {
  return (
    <section id="insights" className="py-24 sm:py-32 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="06 / INSIGHTS"
          title="Clinical Monographs &"
          serifWord="Perspectives"
          subtitle="Scholarly essays on cardiometabolic risk, subclinical atherosclerosis, and the science of healthspan."
        />

        {/* Row 1: Large anchor + right column (photo + 3D cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-12">

          {/* Large left — hypertension article */}
          <div className="lg:col-span-7 min-h-[360px]">
            <PhotoCard
              card={{
                id: 'insight-hypertension',
                title: 'Silent Hypertension',
                subtitle: 'CARDIOMETABOLIC',
                badge: medicalInsights[0]?.readingTime || '5 min read',
                imageUrl: getImage('insightHypertension'),
                onClick: () => medicalInsights[0] && onSelectArticle(medicalInsights[0]),
              }}
              className="h-[360px] sm:h-full min-h-[360px]"
            />
          </div>

          {/* Right column: photo + quote + stat cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Diabetes article photo */}
            <div className="flex-1 min-h-[200px]">
              <PhotoCard
                card={{
                  id: 'insight-diabetes',
                  title: 'Diabetes & the Kidney',
                  subtitle: 'MICROVASCULAR DEFENSE',
                  badge: medicalInsights[3]?.readingTime || '5 min read',
                  imageUrl: getImage('insightDiabetes'),
                  onClick: () => medicalInsights[3] && onSelectArticle(medicalInsights[3]),
                }}
                className="h-[220px] sm:h-full"
                animationDelay={90}
              />
            </div>

            {/* 3D quote card — physician perspective */}
            <div className="min-h-[170px]">
              <QuoteInfoCard
                label="PHYSICIAN'S NOTE"
                quote="Your HbA1c is a window into the last three months of your vascular health."
                author="Dr. Samir Prajapati"
                className="h-[170px] sm:h-full min-h-[170px]"
              />
            </div>

            {/* 3D stat card — monograph count */}
            <div className="min-h-[130px]">
              <StatInfoCard
                stat="4"
                label="Clinical Monographs"
                sub="Covering metabolic, infectious & rheumatic pathology"
                className="h-[130px] sm:h-full min-h-[130px]"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Two remaining article photos side by side */}
        <HoverRevealCards
          layout="grid-2"
          className="mt-4"
          cards={[
            {
              id: 'insight-fevers',
              title: 'Seasonal Fevers',
              subtitle: 'INFECTIOUS DISEASE',
              badge: medicalInsights[1]?.readingTime || '6 min read',
              imageUrl: getImage('insightFevers'),
              onClick: () => medicalInsights[1] && onSelectArticle(medicalInsights[1]),
            },
            {
              id: 'insight-philosophy',
              title: 'Joint Pain & Gout',
              subtitle: 'RHEUMATOLOGY',
              badge: medicalInsights[2]?.readingTime || '6 min read',
              imageUrl: getImage('insightPhilosophy'),
              onClick: () => medicalInsights[2] && onSelectArticle(medicalInsights[2]),
            },
          ]}
        />
      </div>
    </section>
  );
};
