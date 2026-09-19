import React from 'react';
import { Phone, MessageCircle, Truck, ShieldCheck, Flame, CheckCircle2, Instagram, Award } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

interface HeroBannerProps {
  onExploreClick: () => void;
  onBulkQuoteClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick, onBulkQuoteClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-neutral-800">
      {/* Subtle atmospheric gold/amber glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Manufacturers & Direct Importer
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                100% Trustable Company
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-300 border border-neutral-700">
                <Instagram className="w-3.5 h-3.5 text-rose-400" />
                {BUSINESS_INFO.followers}
              </span>
            </div>

            {/* Main Headline */}
            <div>
              <p className="text-amber-400 font-bold tracking-widest text-xs uppercase mb-2">
                PANKAJ DHAMECHA • WHOLESALE HUB CHHATTISGARH
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight sm:leading-tight">
                All Event Stage SFX, <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200">
                  Cold Pyro & Decor Products
                </span>
              </h1>
              <p className="mt-3 text-neutral-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Direct factory pricing on indoor electronic cold pyros, 12-cue wireless firing machines, low-lying dry ice foggers, color smoke grenades, confetti blasters, and DJ stage lighting.
              </p>
            </div>

            {/* Quick Guarantees Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-800/60 border border-neutral-700/60">
                <Truck className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-white">All India Delivery</p>
                  <p className="text-neutral-400">Raipur Bilty & Courier</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-800/60 border border-neutral-700/60">
                <Award className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-white">Direct Importer</p>
                  <p className="text-neutral-400">Zero Middleman Markup</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-800/60 border border-neutral-700/60 col-span-2 sm:col-span-1">
                <Phone className="w-5 h-5 text-sky-400 flex-shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-white">9244021201</p>
                  <p className="text-neutral-400">Direct WhatsApp / Call</p>
                </div>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-neutral-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2"
              >
                <span>Browse Product Catalog</span>
                <span className="text-xs bg-neutral-950/20 px-1.5 py-0.5 rounded">B2B MOQ</span>
              </button>

              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Namaste%20Pankaj%20Ji%20🙏%20I%20want%20to%20place%20a%20wholesale%20order%20for%20event%20products`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all flex items-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </a>

              <button
                onClick={onBulkQuoteClick}
                className="px-4 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm font-medium transition-colors border border-neutral-700"
              >
                Master Carton Quote
              </button>
            </div>
          </div>

          {/* Right Column: Verified Merchant Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-neutral-850 border border-neutral-700/80 p-5 sm:p-6 shadow-2xl bg-neutral-900/90 backdrop-blur-sm">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center font-black text-xl text-white shadow-inner">
                    PD
                  </div>
                  <div>
                    <h2 className="font-bold text-base text-white flex items-center gap-1.5">
                      {BUSINESS_INFO.owner}
                      <CheckCircle2 className="w-4 h-4 text-sky-400 fill-sky-400/20" />
                    </h2>
                    <p className="text-xs text-neutral-400">
                      @{BUSINESS_INFO.name}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Verified Seller
                  </span>
                </div>
              </div>

              {/* Instagram & Business Stats Grid */}
              <div className="grid grid-cols-2 gap-3 py-4 text-center border-b border-neutral-800">
                <div className="p-2.5 rounded-lg bg-neutral-800/50">
                  <p className="text-xl font-extrabold text-amber-400">20.3K</p>
                  <p className="text-[11px] text-neutral-400 font-medium">Instagram Community</p>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-800/50">
                  <p className="text-xl font-extrabold text-white">450+</p>
                  <p className="text-[11px] text-neutral-400 font-medium">Bilty Transport Hubs</p>
                </div>
              </div>

              {/* Highlights List */}
              <div className="space-y-2.5 py-4 text-xs text-neutral-300">
                <div className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span><strong>Warehouse in Raipur, Chhattisgarh:</strong> Immediate same-day or next-day dispatch.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span><strong>Bilty Transport Service:</strong> Pay nominal freight at destination godown.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span><strong>GST Invoicing:</strong> Input tax credit bills provided for shops & event planners.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span><strong>Direct Line to Pankaj Dhamecha:</strong> 9244021201.</span>
                </div>
              </div>

              {/* Quick Contact Ribbon */}
              <div className="pt-2">
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Warehouse Now: 9244021201</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
