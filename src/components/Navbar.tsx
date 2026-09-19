import React, { useState } from 'react';
import { Phone, MessageCircle, ShoppingBag, Search, Sparkles, ShieldCheck, MapPin, Award } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenBulkInquiry: () => void;
  onSelectCategory?: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
  onOpenBulkInquiry,
}) => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs">
      {/* Top Wholesale Urgency & Announcement Bar */}
      <div className="bg-neutral-900 text-neutral-100 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-x-auto py-0.5 whitespace-nowrap">
            <span className="inline-flex items-center gap-1 font-semibold text-amber-400">
              <Sparkles className="w-3.5 h-3.5" /> Direct Manufacturer & Importer
            </span>
            <span className="text-neutral-500">•</span>
            <span className="text-neutral-300">🔥 All Over India Delivery</span>
            <span className="text-neutral-500">•</span>
            <span className="text-emerald-400 font-medium">100% Trustable Company</span>
            <span className="text-neutral-500 hidden md:inline">•</span>
            <span className="text-neutral-300 hidden md:inline">Raipur & Bilaspur Wholesale Hub, CG</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="inline-flex items-center gap-1.5 text-neutral-200 hover:text-amber-400 font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call: <strong className="text-white tracking-wide">{BUSINESS_INFO.phone}</strong></span>
            </a>
            <span className="text-neutral-600">|</span>
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Namaste%20Pankaj%20Ji%2C%20I%20want%20to%20inquire%20about%20event%20products`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Brand & Owner Identity */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20 flex-shrink-0">
              <span className="font-extrabold text-lg tracking-wider">WSC</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-neutral-900 leading-tight">
                  Wholesale Shop CG
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300/60 uppercase">
                  B2B Rates
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <span className="font-semibold text-neutral-800">{BUSINESS_INFO.owner}</span>
                <span className="text-neutral-300">•</span>
                <span className="inline-flex items-center gap-0.5 text-rose-600 font-medium">
                  {BUSINESS_INFO.followers}
                </span>
              </div>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search cold pyros, smoke machines, foggers, lights..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-neutral-100/90 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all placeholder:text-neutral-400"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700 bg-neutral-200 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              aria-label="Search items"
              className="md:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Custom Bulk Rate Request */}
            <button
              onClick={onOpenBulkInquiry}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors border border-neutral-200"
            >
              <span>Bulk Master Carton Rate</span>
            </button>

            {/* Direct Call Button */}
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300/80 rounded-xl transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>

            {/* Cart Button */}
            <button
              id="header-cart-button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Wholesale Cart</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-500 text-neutral-950 font-bold text-xs flex items-center justify-center -mr-1">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search dropdown */}
        {isMobileSearchOpen && (
          <div className="mt-3 md:hidden pt-2 border-t border-neutral-100">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search cold pyros, smoke machines, DJ lights..."
                autoFocus
                className="w-full pl-10 pr-4 py-2 text-sm bg-neutral-100 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
