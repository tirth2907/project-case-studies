import React, { useState, useMemo } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { treatedConditions } from '../../data/doctorData';
import { HoverRevealCards } from '../ui/cards';
import { getImage } from '../../lib/imageRegistry';
import { ArrowRight } from 'lucide-react';

const CATEGORIES = [
  { key: 'All', label: 'All' },
  { key: 'Lifestyle & Metabolic', label: 'Metabolic' },
  { key: 'Rheumatology & Musculoskeletal', label: 'Rheumatology' },
  { key: 'Infectious & Fevers', label: 'Fevers' },
  { key: 'Respiratory', label: 'Respiratory' },
  { key: 'Gastrointestinal & Hepatic', label: 'Gastro' },
];

export const ConditionsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredConditions = useMemo(() => {
    if (selectedCategory === 'All') return treatedConditions;
    return treatedConditions.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="conditions" className="py-24 sm:py-32 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <SectionHeading
            number="03 / CONDITIONS"
            title="Commonly Treated"
            serifWord="Pathologies"
            subtitle="Dr. Prajapati's clinical index across internal medicine, fevers, and rheumatology."
            className="mb-0"
          />
        </div>

        {/* Featured visual cards */}
        <HoverRevealCards
          layout="horizontal"
          className="mb-14"
          cards={[
            {
              id: 'conditions-cardiometabolic',
              title: 'Lifestyle Diseases',
              subtitle: 'METABOLIC CARE',
              imageUrl: getImage('conditionsCardioMetabolic'),
              href: '#contact',
            },
            {
              id: 'conditions-respiratory',
              title: 'Respiratory Health',
              subtitle: 'PULMONARY MEDICINE',
              imageUrl: getImage('conditionsRespiratory'),
              href: '#contact',
            },
          ]}
        />

        {/* ── Conditions Directory ── */}
        <div>
          {/* Header row */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-500 block mb-1">
                PATHOLOGY INDEX
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-light text-white">
                Conditions Treated
              </h3>
            </div>

            {/* Category filter — minimal pill strip */}
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/8 backdrop-blur-md">
              {CATEGORIES.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedCategory(key)}
                  className={[
                    'px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider transition-all duration-300',
                    selectedCategory === key
                      ? 'bg-white text-black font-semibold'
                      : 'text-neutral-400 hover:text-white',
                  ].join(' ')}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile: horizontal scroll filter */}
          <div className="flex sm:hidden gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
            {CATEGORIES.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedCategory(key)}
                className={[
                  'shrink-0 px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-wider border transition-all duration-300',
                  selectedCategory === key
                    ? 'bg-white text-black border-white font-semibold'
                    : 'text-neutral-400 border-white/15 hover:text-white',
                ].join(' ')}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Count */}
          <div className="flex items-center justify-between mb-5">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
              {filteredConditions.length} condition{filteredConditions.length !== 1 ? 's' : ''}
            </span>
            <div className="h-px flex-1 mx-4 bg-white/8" />
          </div>

          {/* Conditions list — editorial rows */}
          <div className="divide-y divide-white/[0.06]">
            {filteredConditions.map((cond) => {
              const isOpen = expandedId === cond.id;
              return (
                <div key={cond.id} className="group">
                  <button
                    type="button"
                    onClick={() => setExpandedId(isOpen ? null : cond.id)}
                    className="w-full flex items-center justify-between gap-4 py-4 text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    {/* Left: name */}
                    <div className="flex items-baseline gap-3 min-w-0">
                      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest shrink-0 w-[4.5rem] text-right hidden sm:block">
                        {CATEGORIES.find((c) => c.key === cond.category)?.label ?? cond.category}
                      </span>
                      <span className={[
                        'text-sm sm:text-[0.95rem] font-serif font-light truncate transition-colors duration-300',
                        isOpen ? 'text-white' : 'text-neutral-300 group-hover:text-white',
                      ].join(' ')}>
                        {cond.name}
                      </span>
                    </div>

                    {/* Right: care type + expand icon */}
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[9px] font-mono text-neutral-500 hidden md:block">
                        {cond.urgencyOrCare}
                      </span>
                      <div className={[
                        'w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300',
                        isOpen
                          ? 'border-white bg-white text-black rotate-90'
                          : 'border-white/20 text-neutral-500 group-hover:border-white/50 group-hover:text-white',
                      ].join(' ')}>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </button>

                  {/* Expanded panel */}
                  <div
                    className={[
                      'overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
                      isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0',
                    ].join(' ')}
                  >
                    <div className="pb-5 pl-0 sm:pl-[7.5rem] pr-8">
                      <p className="text-xs text-neutral-400 font-light leading-relaxed mb-3">
                        {cond.summary}
                      </p>
                      {cond.symptoms && cond.symptoms.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {cond.symptoms.slice(0, 3).map((s) => (
                            <span
                              key={s}
                              className="text-[9px] font-mono px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-neutral-400"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No results */}
          {filteredConditions.length === 0 && (
            <div className="text-center py-16 text-neutral-500 font-mono text-xs">
              No conditions in this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
