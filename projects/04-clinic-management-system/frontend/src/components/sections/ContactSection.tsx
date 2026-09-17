import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { clinicInfo } from '../../data/doctorData';
import { HoverRevealCards } from '../ui/cards';
import { getImage } from '../../lib/imageRegistry';
import {
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
  Train,
  Send,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');

  const fullAddressString = `${clinicInfo.address.line1}, ${clinicInfo.address.line2}, ${clinicInfo.address.city}, ${clinicInfo.address.state} ${clinicInfo.address.postalCode}`;

  const copyAddress = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(fullAddressString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail) return;
    setInquirySent(true);
  };

  const googleMapsUrl = 'https://maps.google.com/maps?cid=5709935782097990968';

  return (
    <section id="contact" className="py-24 sm:py-32 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="08 / CONTACT"
          title="Clinic Location &"
          serifWord="Visiting Information"
          subtitle="Shree Maa Krupa Clinic, Vidyanagar Main Road, Rajkot. Direct telephone reception."
        />

        {/* Clinic Entrance — full-width visual card */}
        <div className="mb-5">
          <HoverRevealCards
            layout="horizontal"
            cards={[
              {
                id: 'contact-entrance',
                title: 'Visit the Clinic',
                subtitle: 'VIDYANAGAR MAIN ROAD',
                imageUrl: getImage('contactClinicEntrance'),
              },
            ]}
            cardClassName="h-[280px] sm:h-[340px]"
            showArrow={false}
          />
        </div>

        {/* Address Actions */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <button
            type="button"
            onClick={copyAddress}
            className="px-3.5 py-1.5 rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-md text-xs font-mono text-white hover:bg-white hover:text-black transition-all flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Address</span>
              </>
            )}
          </button>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-md text-xs font-mono text-neutral-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
          >
            <span>Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Quick Info Panels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
            <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">TELEPHONE</span>
            <a href={`tel:${clinicInfo.phoneRaw}`} className="text-base font-mono text-white hover:text-neutral-300 transition-colors">
              {clinicInfo.phone}
            </a>
            <p className="text-[11px] text-neutral-500 font-light mt-0.5">Call for timings &amp; directions</p>
          </div>
          <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
            <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">CONSULTATION HOURS</span>
            <p className="text-xs font-mono text-white">{clinicInfo.hours.weekday}</p>
            <p className="text-xs font-mono text-white">{clinicInfo.hours.saturday}</p>
            <p className="text-[11px] text-neutral-500 font-light mt-0.5">Mon – Sat</p>
          </div>
          <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
            <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">EMAIL</span>
            <a href={`mailto:${clinicInfo.email}`} className="text-xs font-mono text-white hover:text-neutral-300 transition-colors break-all">
              {clinicInfo.email}
            </a>
            <p className="text-[11px] text-neutral-500 font-light mt-0.5">Report reviews &amp; inquiries</p>
          </div>
        </div>

        {/* Map + Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Map */}
          <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-neutral-950/70 p-6 sm:p-7 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-neutral-400">CLINIC LOCATION</div>
                <div className="text-sm font-serif font-light text-white">Vidyanagar Main Road • Virani Chowk</div>
              </div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
              >
                <span>Navigate</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="relative aspect-[16/9] rounded-2xl border border-white/10 bg-[#09090b] overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 subtle-grid opacity-30" />
              <div className="absolute top-0 bottom-0 left-1/3 w-[2px] bg-white/20" />
              <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-white/20" />
              <span className="absolute top-3 left-1/3 -translate-x-1/2 text-[9px] font-mono text-neutral-400 tracking-widest -rotate-90">
                VIDYANAGAR MAIN ROAD
              </span>
              <span className="absolute left-4 top-1/2 -translate-y-4 text-[9px] font-mono text-neutral-400 tracking-widest">
                13 MANHAR PLOT / VIRANI CHOWK
              </span>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white flex items-center justify-center animate-pulse">
                  <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-black" />
                  </div>
                </div>
                <div className="mt-2 px-3 py-1 rounded-md border border-white/20 bg-black/90 text-[11px] font-mono text-white text-center shadow-lg">
                  Shree Maa Krupa Clinic • 2nd Floor
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex items-start gap-3 text-xs text-neutral-400 font-mono">
              <Train className="w-4 h-4 text-white shrink-0 mt-0.5" />
              <span>
                13 Manhar Plot Corner, Vidyanagar Main Road (opp. Patel Boarding, Virani Chowk). Elevator access.
              </span>
            </div>

            <div className="mt-4 p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/[0.03] flex items-start gap-3 text-xs text-amber-200/80 leading-relaxed font-mono">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
              <span>{clinicInfo.emergencyNotice}</span>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-neutral-950/70 p-6 sm:p-8 backdrop-blur-xl">
            <h3 className="text-lg font-serif font-light text-white mb-1">General Clinic Inquiry</h3>
            <p className="text-xs text-neutral-400 font-light mb-6">
              Questions about consultations, report reviews, or directions? We'll respond within one business day.
            </p>

            {inquirySent ? (
              <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.03] text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto text-white">
                  <Check className="w-5 h-5" />
                </div>
                <div className="text-sm font-medium text-white">Inquiry Received</div>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  Our clinic coordinator will respond within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="Full name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder="email@domain.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder="How may we assist you?"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Send Inquiry</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
