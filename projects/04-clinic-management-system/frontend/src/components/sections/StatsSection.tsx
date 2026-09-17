import React from 'react';
import { motion } from 'framer-motion';
import { medicalStatistics } from '../../data/doctorData';
import { StatsCounter } from '../ui/StatsCounter';

export const StatsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 border-y border-white/10 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {medicalStatistics.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`flex flex-col ${idx !== 0 ? 'sm:pl-8 pt-6 sm:pt-0' : ''}`}
            >
              <StatsCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                subtext={stat.subtext}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
