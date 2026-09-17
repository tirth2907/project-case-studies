import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Calendar, User, ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import { MedicalInsight } from '../../types';
import { clinicInfo } from '../../data/doctorData';

interface ArticleModalProps {
  article: MedicalInsight | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
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

  if (!isOpen || !article) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d10] shadow-2xl my-auto text-white"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-white/[0.02] sticky top-0 z-20 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full border border-white/15 bg-white/[0.04] text-neutral-300">
                {article.category}
              </span>
              <span className="text-xs text-neutral-400 hidden sm:inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readingTime}
              </span>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Article Scrollable Content */}
          <div className="p-6 sm:p-10 max-h-[78vh] overflow-y-auto space-y-8">
            {/* Metadata */}
            <div className="space-y-3">
              <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  {article.author}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-light font-serif text-white tracking-tight leading-[1.2]">
                {article.title}
              </h1>

              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed italic border-l-2 border-white/30 pl-4 py-1">
                {article.excerpt}
              </p>
            </div>

            {/* Key Clinical Takeaways */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 space-y-3">
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  Key Clinical Takeaways
                </div>
                <ul className="space-y-2.5">
                  {article.keyTakeaways.map((takeaway, i) => (
                    <li
                      key={i}
                      className="text-xs sm:text-sm text-neutral-300 flex items-start gap-2.5 leading-relaxed"
                    >
                      <span className="text-white/60 font-mono text-xs mt-0.5">•</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Body Paragraphs */}
            <div className="space-y-5 text-sm sm:text-base text-neutral-300 font-light leading-[1.8]">
              {article.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Consultation Action Box */}
            <div className="rounded-xl border border-white/15 bg-gradient-to-br from-white/[0.06] to-transparent p-6 sm:p-8 text-center space-y-4">
              <h3 className="text-xl sm:text-2xl font-serif font-light text-white">
                Seeking personalized clinical advice?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto leading-relaxed">
                Reach out to Shree Maa Krupa Clinic, Vidyanagar Main Road, Rajkot or call our reception desk directly to inquire about consultation timings.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`tel:${clinicInfo.phoneRaw}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-neutral-200 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Reception: {clinicInfo.phone}</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-neutral-200 text-xs font-mono uppercase tracking-wider hover:text-white hover:border-white transition-colors"
                >
                  <span>Clinic Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="text-[11px] text-neutral-400 font-mono border-t border-white/10 pt-4 leading-relaxed">
              Medical Disclaimer: Clinical articles published by Dr. Samir Prajapati are for educational and public health awareness purposes. They do not constitute personalized medical diagnosis or replace a formal clinical examination. Always consult a qualified medical physician regarding acute symptoms.
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
