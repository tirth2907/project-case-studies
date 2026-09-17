import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { faqItems } from '../../data/doctorData';
import { TextRevealFAQ } from '../ui/typography';

export const FAQSection: React.FC = () => {
  return (
    <section id="faq" className="py-24 sm:py-32 border-t border-white/10 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="07 / FAQ"
          title="Frequently Asked"
          serifWord="Clinical Inquiries"
          subtitle="Clear, unhurried guidance regarding consultation hours, practice location, fee reimbursement, and multilingual communication."
          align="center"
          className="mb-16 sm:mb-20"
        />

        {/* 21st.dev Editorial Text Reveal FAQs */}
        <TextRevealFAQ
          items={faqItems}
          defaultOpenId={faqItems[0]?.id || null}
        />
      </div>
    </section>
  );
};
