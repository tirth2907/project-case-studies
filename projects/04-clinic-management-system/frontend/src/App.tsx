import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/ui/CustomCursor';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { PhilosophySection } from './components/sections/PhilosophySection';
import { StatsSection } from './components/sections/StatsSection';
import { AboutSection } from './components/sections/AboutSection';
import { ExpertiseSection } from './components/sections/ExpertiseSection';
import { ConditionsSection } from './components/sections/ConditionsSection';
import { SignatureServiceSection } from './components/sections/SignatureServiceSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { InsightsSection } from './components/sections/InsightsSection';
import { FAQSection } from './components/sections/FAQSection';
import { ConsultationCTASection } from './components/sections/ConsultationCTASection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';

import { ArticleModal } from './components/ui/ArticleModal';
import { ServiceDetailModal } from './components/ui/ServiceDetailModal';
import { MedicalService, MedicalInsight } from './types';

export function App() {
  // Modal states
  const [selectedArticle, setSelectedArticle] = useState<MedicalInsight | null>(null);
  const [articleModalOpen, setArticleModalOpen] = useState(false);

  const [selectedService, setSelectedService] = useState<MedicalService | null>(null);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);

  // Active section tracking for navbar
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sectionIds = ['hero', 'philosophy', 'about', 'expertise', 'conditions', 'signature-program', 'services', 'experience', 'reviews', 'insights', 'faq', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenArticle = (article: MedicalInsight) => {
    setSelectedArticle(article);
    setArticleModalOpen(true);
  };

  const handleOpenServiceDetails = (service: MedicalService) => {
    setSelectedService(service);
    setServiceModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#050507] text-white selection:bg-white selection:text-black font-sans bg-grain overflow-x-hidden">
      {/* Desktop-only magnetic custom cursor */}
      <CustomCursor />

      {/* Sticky Adaptive Glass Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main Page Flow */}
      <main>
        <HeroSection />
        <PhilosophySection />
        <StatsSection />
        <AboutSection />
        <ExpertiseSection />
        <ConditionsSection />
        <SignatureServiceSection />
        <ServicesSection onOpenServiceDetails={handleOpenServiceDetails} />
        <ExperienceSection />
        <TestimonialsSection />
        <InsightsSection onSelectArticle={handleOpenArticle} />
        <FAQSection />
        <ConsultationCTASection />
        <ContactSection />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Interactive Modals */}
      <ArticleModal
        isOpen={articleModalOpen}
        article={selectedArticle}
        onClose={() => setArticleModalOpen(false)}
      />

      <ServiceDetailModal
        isOpen={serviceModalOpen}
        service={selectedService}
        onClose={() => setServiceModalOpen(false)}
      />
    </div>
  );
}

export default App;
