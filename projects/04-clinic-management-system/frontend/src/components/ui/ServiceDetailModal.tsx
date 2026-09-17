import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Check, Stethoscope, Phone } from 'lucide-react';
import { MedicalService } from '../../types';
import { clinicInfo } from '../../data/doctorData';

interface ServiceDetailModalProps {
  service: MedicalService | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[105] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0e] shadow-2xl my-auto text-white"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-white/[0.02]">
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded bg-white/10 text-neutral-300">
                {service.category}
              </span>
              <span className="text-xs text-neutral-400 font-mono">
                {service.delivery}
              </span>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-light text-white leading-snug">
                {service.title}
              </h2>
              <div className="flex items-center gap-2 mt-2 text-xs font-mono text-neutral-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Dedicated Clinical Duration: {service.duration}</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              {service.fullDescription}
            </p>

            {/* Key Clinical Elements */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Clinical Protocol &amp; Components Included
              </h4>
              <div className="space-y-2">
                {service.keyComponents.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-lg border border-white/5 bg-white/[0.02] text-xs sm:text-sm text-neutral-300"
                  >
                    <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ideal For Box */}
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs text-neutral-300 flex items-start gap-3">
              <Stethoscope className="w-4 h-4 text-white shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-white block mb-0.5">Clinical Indication:</span>
                {service.idealFor}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`tel:${clinicInfo.phoneRaw}`}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-neutral-200 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Reception to Inquire</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-white/20 text-neutral-300 text-xs font-mono uppercase tracking-wider hover:text-white hover:border-white transition-colors"
              >
                Visit Clinic
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-white/10 text-neutral-400 text-xs font-mono uppercase tracking-wider hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
