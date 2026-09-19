import React from 'react';
import { BUSINESS_INFO, CATEGORIES } from '../data/products';
import { Phone, MessageCircle, MapPin, Instagram, Truck, ShieldCheck, Mail, Sparkles } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (categoryId: string) => void;
  onOpenBulkInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenBulkInquiry }) => {
  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Owner Profile */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center font-extrabold text-white text-base">
                WSC
              </div>
              <div>
                <h3 className="font-extrabold text-white text-sm">
                  {BUSINESS_INFO.displayName}
                </h3>
                <p className="text-[11px] text-amber-400 font-medium">
                  Prop: {BUSINESS_INFO.owner}
                </p>
              </div>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed">
              Leading direct manufacturer & importer of all event, wedding entry, stage SFX, cold pyros, smoke machines, and DJ party lighting.
            </p>

            <div className="flex items-center gap-3 text-neutral-400 text-xs">
              <span className="flex items-center gap-1 text-rose-400 font-semibold">
                <Instagram className="w-3.5 h-3.5" />
                {BUSINESS_INFO.followers}
              </span>
              <span>•</span>
              <span>{BUSINESS_INFO.following}</span>
              <span>•</span>
              <span className="text-emerald-400">100% Trustable</span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Wholesale Catalogs
            </h4>
            <ul className="space-y-1.5 text-neutral-400">
              {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      window.scrollTo({ top: 550, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-400 transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenBulkInquiry}
                  className="text-amber-400 hover:underline font-semibold"
                >
                  Master Carton Custom Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Logistics & Transport Network */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Pan-India Transport
            </h4>
            <p className="text-neutral-400 text-[11px]">
              Daily Bilty dispatch via registered Indian logistics:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {BUSINESS_INFO.transportPartners.map((p) => (
                <span
                  key={p}
                  className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300 font-medium"
                >
                  {p}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-emerald-400 font-medium pt-1">
              ✓ All Over India Delivered • Safe 5-ply export packaging
            </p>
          </div>

          {/* Col 4: Contact & Warehouse */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Raipur Warehouse Contact
            </h4>
            <div className="space-y-2 text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="text-white hover:text-amber-400 font-bold tracking-wide"
                >
                  {BUSINESS_INFO.phoneFormatted} (Call)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-semibold"
                >
                  WhatsApp: +91 {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Namaste%20Pankaj%20Ji%2C%20please%20send%20your%20latest%20wholesale%20rate%20list`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30 font-semibold text-[11px] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Request Full PDF Rate Card on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-500 text-[11px]">
          <p>
            © {new Date().getFullYear()} Wholesale Shop Chhattisgarh (PANKAJ DHAMECHA). All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span>GST B2B Invoices</span>
            <span>•</span>
            <span>All Event Stage SFX</span>
            <span>•</span>
            <span>Direct Importer</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
