import React, { useState } from 'react';
import { ShieldCheck, Truck, Award, Phone, CheckCircle2, ChevronDown, Sparkles, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

export const TrustBadges: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Transport Bilty delivery work across India?',
      a: 'We pack your wholesale order in heavy 5-ply cartons and book it at our Raipur transport depot (VRL, TCI, or local Bilty). We share the original Bilty receipt photo directly on your WhatsApp (9244021201) within 24 hours. You simply visit your city\'s transport godown with the Bilty number and take delivery.'
    },
    {
      q: 'Can I order lower than the Minimum Order Quantity (MOQ)?',
      a: 'Since we are direct manufacturers & importers, our listed prices are strict wholesale rates based on minimum box/set packaging. For mixed assortment sample boxes, please contact Pankaj Dhamecha directly on WhatsApp (9244021201).'
    },
    {
      q: 'Are your Cold Pyro fountains safe for indoor banquet halls?',
      a: 'Yes! Our electric cold pyros are 100% smokeless and cold-touch titanium sparks. They do not generate burning heat or heavy toxic fumes and are widely used across top wedding resorts, indoor stages, and ballrooms.'
    },
    {
      q: 'Can I get a formal GST Tax Invoice for my business?',
      a: 'Yes, absolutely. During checkout, simply provide your 15-digit GSTIN number and registered company name to receive an official B2B GST tax invoice for 100% Input Tax Credit (ITC).'
    },
    {
      q: 'What payment methods are supported for wholesale orders?',
      a: 'We support 100% advance payment via Instant UPI QR / Bank NEFT/IMPS for express dispatch, as well as 20% Advance Token Booking (with remaining balance payable on Bilty arrival).'
    }
  ];

  return (
    <section className="py-12 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Trust Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-neutral-900">Direct Manufacturer & Importer</h4>
              <p className="text-xs text-neutral-500 mt-1">
                Zero middleman margin. Direct factory wholesale pricing on all event items.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-neutral-900">100% Trustable Company</h4>
              <p className="text-xs text-neutral-500 mt-1">
                20.3K Instagram followers & 15,000+ verified stage decorators across India.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-sky-100 text-sky-900 flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-neutral-900">All Over India Delivered</h4>
              <p className="text-xs text-neutral-500 mt-1">
                Swift dispatch from Raipur Central Transport Hub to 450+ Indian destinations.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-rose-100 text-rose-900 flex-shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-neutral-900">Direct Call: 9244021201</h4>
              <p className="text-xs text-neutral-500 mt-1">
                Direct WhatsApp & call assistance with owner Pankaj Dhamecha.
              </p>
            </div>
          </div>
        </div>

        {/* Wholesale FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              B2B Guidelines
            </span>
            <h3 className="text-2xl font-black text-neutral-900 mt-1">
              Wholesale & Transport FAQ
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Everything you need to know about dispatch, Bilty tracking, and bulk orders.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-neutral-200 overflow-hidden bg-neutral-50/50 transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-4 py-3.5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-neutral-900 hover:bg-neutral-100/80 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform ${
                        isOpen ? 'rotate-180 text-amber-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-2 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Direct WhatsApp Prompt */}
          <div className="mt-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-left text-xs text-emerald-950">
              <p className="font-bold text-sm">Have a customized event or master lot requirement?</p>
              <p className="text-emerald-700">Chat directly with Pankaj Dhamecha on WhatsApp.</p>
            </div>
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Namaste%20Pankaj%20Ji%2C%20I%20have%20a%20question%20regarding%20wholesale%20order`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors flex-shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
