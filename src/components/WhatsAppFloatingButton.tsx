import React, { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
      {showTooltip && (
        <div className="relative flex items-center gap-2 bg-neutral-900 text-white text-xs py-2 px-3 rounded-xl shadow-xl border border-neutral-700 max-w-xs animate-bounce duration-1000">
          <span>
            💬 Chat with <strong>Pankaj Dhamecha</strong> on WhatsApp
          </span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-neutral-400 hover:text-white p-0.5"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          {/* Triangle arrow pointing down */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-neutral-900 rotate-45 border-r border-b border-neutral-700" />
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Direct Call Floating */}
        <a
          href={`tel:${BUSINESS_INFO.phone}`}
          className="w-11 h-11 rounded-full bg-neutral-900 hover:bg-neutral-800 text-amber-400 flex items-center justify-center shadow-lg border border-neutral-700 transition-transform hover:scale-105"
          title={`Call ${BUSINESS_INFO.phone}`}
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* WhatsApp Floating */}
        <a
          href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Namaste%20Pankaj%20Ji%20🙏%20I%20am%20contacting%20from%20your%20Wholesale%20Shop%20Chhattisgarh%20website`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/30 hover:scale-105 transition-all"
          title="Direct WhatsApp Order"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white animate-pulse" />
          <MessageCircle className="w-7 h-7" />
        </a>
      </div>
    </div>
  );
};
