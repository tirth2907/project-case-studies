import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Phone, ChevronDown, X, Menu } from 'lucide-react';
import { RandomLetterSwap } from './typography/RandomLetterSwap';
import { clinicInfo } from '../../data/doctorData';

interface DropdownChild {
  label: string;
  sublabel: string;
  href: string;
  id: string;
}

interface NavItem {
  label: string;
  href: string;
  id: string;
  dropdownKey?: 'about' | 'services' | 'reviews';
  children?: DropdownChild[];
  footerNote?: string;
}

interface NavbarProps {
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection = 'hero' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'about' | 'services' | 'reviews' | null>(null);
  const [hoveredNavId, setHoveredNavId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);

  const navContainerRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll listener for dynamic glass density (100% borderless)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems: NavItem[] = [
    {
      label: 'Home',
      href: '#hero',
      id: 'hero',
    },
    {
      label: 'About',
      href: '#about',
      id: 'about',
      dropdownKey: 'about',
      footerNote: 'Senior Consultant in Internal Medicine & Complex Diagnostics • 25+ Years Experience',
      children: [
        {
          label: 'Physician Profile',
          sublabel: 'Dr. Samir Prajapati, MD Internal Medicine',
          href: '#about',
          id: 'about',
        },
        {
          label: 'Clinical Expertise',
          sublabel: 'Diagnostic acumen, lifestyle reversal & rheumatology',
          href: '#expertise',
          id: 'expertise',
        },
        {
          label: 'Career Timeline',
          sublabel: 'Continuous academic and private hospital leadership',
          href: '#experience',
          id: 'experience',
        },
        {
          label: 'Care Philosophy',
          sublabel: 'Root-cause medicine, longitudinal care & clinical listening',
          href: '#philosophy',
          id: 'philosophy',
        },
      ],
    },
    {
      label: 'Services',
      href: '#services',
      id: 'services',
      dropdownKey: 'services',
      footerNote: 'Evidence-based protocols tailored to individual cardiovascular and metabolic profiles',
      children: [
        {
          label: 'Executive Consultations',
          sublabel: 'Thorough multi-system systemic health evaluation',
          href: '#services',
          id: 'services',
        },
        {
          label: 'Treated Conditions',
          sublabel: 'Hypertension, Type 2 Diabetes, Arthritis & Fevers of Unknown Origin',
          href: '#conditions',
          id: 'conditions',
        },
        {
          label: 'Metabolic Care Program',
          sublabel: 'Longitudinal lifestyle medicine & organ protection',
          href: '#signature-program',
          id: 'signature-program',
        },
      ],
    },
    {
      label: 'Reviews',
      href: '#reviews',
      id: 'reviews',
      dropdownKey: 'reviews',
      footerNote: 'A quarter-century legacy of patient advocacy, transparent ethics, and clinical empathy',
      children: [
        {
          label: 'Patient Reflections',
          sublabel: 'Authentic recovery stories and longitudinal community trust',
          href: '#reviews',
          id: 'reviews',
        },
        {
          label: 'Clinical Insights',
          sublabel: 'Physician perspectives on metabolic health & disease prevention',
          href: '#insights',
          id: 'insights',
        },
        {
          label: 'Practice FAQ',
          sublabel: 'Consultation workflow, diagnostic timelines & clinic protocols',
          href: '#faq',
          id: 'faq',
        },
      ],
    },
    {
      label: 'Contact',
      href: '#contact',
      id: 'contact',
    },
  ];

  const handleDropdownEnter = (key: 'about' | 'services' | 'reviews') => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(key);
  };

  const handleDropdownLeave = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 280);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) => {
    if (item.dropdownKey) {
      e.preventDefault();
      // Toggle dropdown on click
      setActiveDropdown((prev) => (prev === item.dropdownKey ? null : item.dropdownKey!));
    } else {
      scrollToSection(e, item.href);
    }
  };

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const isItemActive = (item: NavItem) => {
    if (item.id === activeSection) return true;
    if (item.children) {
      return item.children.some((child) => child.id === activeSection);
    }
    return false;
  };

  const currentDropdownData = navItems.find((item) => item.dropdownKey === activeDropdown);

  return (
    <>
      {/* 
        BACKGROUND FOCUS / DIMMING OVERLAY
        When a dropdown is active, the entire website gently recedes.
        Clicking anywhere on this layer smoothly closes the liquid navigation.
      */}
      <AnimatePresence>
        {(activeDropdown !== null || mobileMenuOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => {
              setActiveDropdown(null);
              setMobileMenuOpen(false);
            }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[3px] pointer-events-auto cursor-pointer"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* 
        FLOATING NAVIGATION HEADER CONTAINER
        Detached from viewport edges with generous breathing room.
        Zero borders anywhere.
      */}
      <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-3 sm:px-6">
        {/* DESKTOP LIQUID MORPH NAVIGATION CONTAINER */}
        <div
          ref={navContainerRef}
          className="hidden lg:flex justify-center pointer-events-auto max-w-5xl w-full"
        >
          <motion.nav
            layout
            onMouseEnter={() => {
              if (dropdownTimeoutRef.current) {
                clearTimeout(dropdownTimeoutRef.current);
              }
            }}
            onMouseLeave={handleDropdownLeave}
            transition={{
              type: 'spring',
              stiffness: 420,
              damping: 34,
              mass: 0.5,
            }}
            className={`overflow-hidden transform-gpu will-change-transform ${
              activeDropdown !== null
                ? 'w-full max-w-4xl rounded-3xl p-6 bg-neutral-950/85 backdrop-blur-3xl shadow-[0_28px_80px_-15px_rgba(0,0,0,0.95)]'
                : `w-fit rounded-full px-5 py-2.5 shadow-[0_16px_50px_-10px_rgba(0,0,0,0.85)] ${
                    isScrolled
                      ? 'bg-neutral-950/75 backdrop-blur-2xl'
                      : 'bg-neutral-950/40 backdrop-blur-2xl'
                  }`
            }`}
            style={{
              WebkitBackdropFilter: 'blur(28px) saturate(135%)',
              backdropFilter: 'blur(28px) saturate(135%)',
            }}
          >
            {/* TOP BAR ROW: Brand Identifier + Navigation Links + Quick Reception Action */}
            <div className="flex items-center justify-between gap-6 sm:gap-8">
              {/* BRAND IDENTIFIER */}
              <a
                href="#hero"
                onClick={(e) => scrollToSection(e, '#hero')}
                className="flex items-center gap-2.5 group focus:outline-none flex-shrink-0 whitespace-nowrap"
                aria-label="Dr. Samir Prajapati - Return to top"
              >
                <div className="w-7 h-7 rounded-full bg-white/[0.07] flex items-center justify-center font-serif text-[11px] font-semibold tracking-wider text-white group-hover:bg-white/[0.14] transition-colors flex-shrink-0">
                  SP
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-serif font-medium tracking-widest uppercase text-white/90 group-hover:text-white transition-colors whitespace-nowrap">
                    Dr. Samir Prajapati
                  </span>
                </div>
              </a>

              {/* PRIMARY NAVIGATION LINKS WITH RANDOM LETTER SWAP */}
              <div className="flex items-center gap-1 flex-shrink-0">
                {navItems.map((item) => {
                  const active = isItemActive(item);
                  const isDropdownActive = activeDropdown === item.dropdownKey;
                  const hasDropdown = Boolean(item.dropdownKey);

                  return (
                    <div
                      key={item.id}
                      className="relative"
                      onMouseEnter={() => {
                        setHoveredNavId(item.id);
                        if (hasDropdown && item.dropdownKey) {
                          handleDropdownEnter(item.dropdownKey);
                        } else {
                          setActiveDropdown(null);
                        }
                      }}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item)}
                        className={`relative inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] font-mono tracking-widest uppercase rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                          isDropdownActive || active
                            ? 'text-white'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        {/* Soft Ambient Indicator Pill (Zero Borders) */}
                        {(isDropdownActive || hoveredNavId === item.id) && (
                          <motion.div
                            layoutId="liquidActiveHoverPill"
                            className="absolute inset-0 rounded-full bg-white/[0.08]"
                            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                          />
                        )}

                        <span className="relative z-10 whitespace-nowrap">
                          <RandomLetterSwap text={item.label} triggerOnHover={true} />
                        </span>

                        {hasDropdown && (
                          <ChevronDown
                            className={`relative z-10 w-3 h-3 transition-transform duration-200 ${
                              isDropdownActive ? 'rotate-180 text-white' : 'text-neutral-500'
                            }`}
                          />
                        )}
                      </a>
                    </div>
                  );
                })}
              </div>

              {/* RIGHT QUICK CONTACT ACTION — STRICTLY ZERO BOOKING */}
              <div className="flex items-center gap-2.5 flex-shrink-0">
                <a
                  href={`tel:${clinicInfo.phoneRaw}`}
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-neutral-300 hover:text-white text-[11px] font-mono tracking-wider flex items-center gap-2 transition-colors focus:outline-none flex-shrink-0 whitespace-nowrap"
                  title="Direct phone line to clinic reception"
                >
                  <Phone className="w-3 h-3 text-neutral-400 flex-shrink-0" />
                  <span className="hidden xl:inline whitespace-nowrap">{clinicInfo.phone}</span>
                  <span className="xl:hidden whitespace-nowrap">Reception</span>
                </a>
              </div>
            </div>

            {/* 
              LIQUID MORPH EXPANDED DROPDOWN PANEL
              The same floating container physically stretches and expands
              to reveal minimal, high-end editorial clinical navigation.
            */}
            <AnimatePresence mode="popLayout">
              {activeDropdown !== null && currentDropdownData && (
                <motion.div
                  key={activeDropdown}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="pt-6 mt-4"
                >
                  {/* Grid Layout of Dropdown Children */}
                  <div
                    className={`grid gap-3 ${
                      currentDropdownData.children && currentDropdownData.children.length > 3
                        ? 'grid-cols-2'
                        : 'grid-cols-3'
                    }`}
                  >
                    {currentDropdownData.children?.map((child) => {
                      const isChildActive = activeSection === child.id;
                      return (
                        <a
                          key={child.id}
                          href={child.href}
                          onClick={(e) => scrollToSection(e, child.href)}
                          className={`group flex flex-col justify-between p-4 rounded-2xl transition-all duration-200 text-left ${
                            isChildActive
                              ? 'bg-white/[0.09] text-white'
                              : 'hover:bg-white/[0.06] text-neutral-300 hover:text-white'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="text-xs font-mono font-medium tracking-wider uppercase text-white group-hover:text-white transition-colors">
                              {child.label}
                            </div>
                            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all group-hover:text-white" />
                          </div>
                          <div className="mt-2 text-[11px] leading-relaxed text-neutral-400 group-hover:text-neutral-300 transition-colors font-sans">
                            {child.sublabel}
                          </div>
                        </a>
                      );
                    })}
                  </div>

                  {/* Dropdown Editorial Footer Note */}
                  {currentDropdownData.footerNote && (
                    <div className="mt-5 pt-3 flex items-center justify-between text-[11px] font-mono text-neutral-500 tracking-wider">
                      <span>{currentDropdownData.footerNote}</span>
                      <a
                        href="#contact"
                        onClick={(e) => scrollToSection(e, '#contact')}
                        className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
                      >
                        <span>Visit Clinic</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        </div>

        {/* MOBILE LIQUID GLASS NAVIGATION TRIGGER & CONTAINER */}
        <div className="block lg:hidden pointer-events-auto w-full max-w-sm">
          <motion.nav
            layout
            transition={{
              type: 'spring',
              stiffness: 340,
              damping: 30,
              mass: 0.8,
            }}
            className={`mx-auto overflow-hidden transition-colors duration-300 ${
              mobileMenuOpen
                ? 'w-full rounded-3xl p-6 bg-neutral-950/95 backdrop-blur-3xl shadow-[0_30px_90px_-15px_rgba(0,0,0,0.95)] max-h-[85vh] overflow-y-auto'
                : `w-full rounded-full px-4 py-2.5 shadow-[0_16px_50px_-10px_rgba(0,0,0,0.85)] flex items-center justify-between ${
                    isScrolled
                      ? 'bg-neutral-950/80 backdrop-blur-2xl'
                      : 'bg-neutral-950/50 backdrop-blur-2xl'
                  }`
            }`}
            style={{
              WebkitBackdropFilter: 'blur(28px) saturate(135%)',
              backdropFilter: 'blur(28px) saturate(135%)',
            }}
          >
            {/* Mobile Header Bar */}
            <div className="flex items-center justify-between w-full">
              <a
                href="#hero"
                onClick={(e) => scrollToSection(e, '#hero')}
                className="flex items-center gap-2 group focus:outline-none"
              >
                <div className="w-7 h-7 rounded-full bg-white/[0.08] flex items-center justify-center font-serif text-[11px] font-semibold text-white">
                  SP
                </div>
                <span className="text-xs font-serif font-medium tracking-widest uppercase text-white">
                  Dr. Samir Prajapati
                </span>
              </a>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${clinicInfo.phoneRaw}`}
                  className="px-2.5 py-1 rounded-full bg-white/[0.08] text-white text-[11px] font-mono tracking-wider flex items-center gap-1"
                  aria-label="Call clinic directly"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call</span>
                </a>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1.5 text-neutral-300 hover:text-white rounded-full bg-white/[0.06] hover:bg-white/[0.12] transition-colors focus:outline-none"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Mobile Expanded Sheet Content */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="pt-6 space-y-4 text-left"
                >
                  <div className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 pb-1">
                    Clinical Practice Navigation
                  </div>

                  <div className="space-y-1">
                    {navItems.map((item) => {
                      const hasChildren = Boolean(item.children && item.children.length > 0);
                      const isExpanded = mobileExpandedSection === item.id;
                      const active = isItemActive(item);

                      return (
                        <div key={item.id} className="py-1">
                          <div className="flex items-center justify-between">
                            <a
                              href={item.href}
                              onClick={(e) => scrollToSection(e, item.href)}
                              className={`text-lg font-serif font-light transition-colors py-1 ${
                                active ? 'text-white font-normal' : 'text-neutral-300 hover:text-white'
                              }`}
                            >
                              {item.label}
                            </a>

                            {hasChildren && (
                              <button
                                type="button"
                                onClick={() =>
                                  setMobileExpandedSection(isExpanded ? null : item.id)
                                }
                                className="p-2 text-neutral-400 hover:text-white focus:outline-none"
                                aria-label={`Toggle ${item.label} submenu`}
                              >
                                <ChevronDown
                                  className={`w-4 h-4 transition-transform duration-200 ${
                                    isExpanded ? 'rotate-180 text-white' : ''
                                  }`}
                                />
                              </button>
                            )}
                          </div>

                          {/* Mobile Accordion Children */}
                          <AnimatePresence initial={false}>
                            {hasChildren && isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden pl-3 pt-1 space-y-2 ml-1"
                              >
                                {item.children?.map((child) => (
                                  <a
                                    key={child.id}
                                    href={child.href}
                                    onClick={(e) => scrollToSection(e, child.href)}
                                    className="block py-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                                  >
                                    <div className="text-neutral-200">{child.label}</div>
                                    <div className="text-[10px] text-neutral-500 font-sans mt-0.5">
                                      {child.sublabel}
                                    </div>
                                  </a>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>

                  {/* Direct Contact Action in Mobile Drawer */}
                  <div className="pt-4 space-y-3">
                    <a
                      href={`tel:${clinicInfo.phoneRaw}`}
                      className="w-full py-3 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Reception: {clinicInfo.phone}</span>
                    </a>
                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 pt-1">
                      <span>{clinicInfo.address.city}, {clinicInfo.address.state}</span>
                      <span>Mon–Sat: 09:30 AM – 08:30 PM</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        </div>
      </header>
    </>
  );
};
