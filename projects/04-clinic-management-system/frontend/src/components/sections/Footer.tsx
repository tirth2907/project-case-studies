import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import {
  IconBrandWhatsapp,
  IconPhoneCall,
  IconMapPin,
  IconMail,
} from '@tabler/icons-react';
import { FloatingDock, FloatingDockItem } from '../ui/floating-dock';
import { clinicInfo, doctorProfile } from '../../data/doctorData';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const DOCK_ITEMS: FloatingDockItem[] = [
  {
    title: 'WhatsApp Direct',
    icon: <IconBrandWhatsapp stroke={1.5} />,
    href: 'https://wa.me/916351539718',
  },
  {
    title: 'Telephone Reception',
    icon: <IconPhoneCall stroke={1.5} />,
    href: `tel:${clinicInfo.phoneRaw}`,
  },
  {
    title: 'Clinic Directions',
    icon: <IconMapPin stroke={1.5} />,
    href: 'https://maps.google.com/maps?cid=5709935782097990968',
  },
  {
    title: 'Electronic Mail',
    icon: <IconMail stroke={1.5} />,
    href: `mailto:${clinicInfo.email}`,
  },
];

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#000000] text-white pt-16 pb-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[380px] gap-12">
        {/* Top Tier: Clean Identity, Navigation, and Back-to-Top */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Identity */}
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.25em] text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>SHREE MAA KRUPA CLINIC</span>
            </div>
            <p className="text-xs font-mono text-neutral-400">
              {doctorProfile.name}, MD (Medicine) • Rajkot, Gujarat
            </p>
          </div>

          {/* Minimal Essential Navigation Links */}
          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-2.5 text-xs sm:text-sm font-light text-neutral-400"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group inline-flex items-center gap-0.5 transition-colors hover:text-white"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-neutral-400" />
              </a>
            ))}
          </nav>

          {/* Minimal Back to Top Action */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors focus:outline-none"
          >
            <span>Back to top</span>
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            >
              <ArrowUp className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
            </motion.div>
          </button>
        </div>

        {/* Mid Tier: Floating Social Dock & Motto */}
        <div className="flex flex-col items-center justify-center gap-4 my-2">
          <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.35em] text-neutral-400">
            Care • Clarity • Trust
          </div>
          <FloatingDock items={DOCK_ITEMS} />
        </div>

        {/* Monumental Grand Signature (Modem-Style Large Typographic Word Play) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center overflow-hidden -my-2"
        >
          <h2 className="text-[clamp(3.2rem,13.2vw,10.2rem)] font-serif font-light tracking-[-0.04em] leading-[0.88] bg-gradient-to-b from-neutral-200/25 via-neutral-300/10 to-transparent bg-clip-text text-transparent hover:from-neutral-100/40 hover:via-neutral-200/20 transition-all duration-700 select-none">
            SHREE MAA KRUPA
          </h2>
        </motion.div>

        {/* Bottom Tier: Pure Minimal Contact & Legal Line (Borderless) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-neutral-400">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1">
            <span>Vidyanagar Main Road, Rajkot</span>
            <span className="text-neutral-700 hidden sm:inline">•</span>
            <a
              href={`tel:${clinicInfo.phoneRaw}`}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              {clinicInfo.phone}
            </a>
            <span className="text-neutral-700 hidden sm:inline">•</span>
            <span>GMC Reg. G-10961</span>
          </div>

          <div className="text-neutral-400">
            &copy; {new Date().getFullYear()} Shree Maa Krupa Clinic. Senior Consultant Physician Dr. Samir Prajapati.
          </div>
        </div>
      </div>
    </footer>
  );
};
