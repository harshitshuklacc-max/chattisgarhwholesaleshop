import React, { useEffect } from 'react';
import { Order } from '../types';
import { formatINR, generateWhatsAppOrderUrl } from '../utils/whatsapp';
import { BUSINESS_INFO } from '../data/products';
import {
  CheckCircle2,
  MessageCircle,
  Printer,
  Phone,
  Truck,
  ShieldCheck,
  Building2,
  X,
  ExternalLink
} from 'lucide-react';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const whatsappUrl = generateWhatsAppOrderUrl(order);

  // Print invoice handler
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-auto print:shadow-none print:border-none print:m-0 print:w-full print:max-w-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Celebration Bar - Hidden in print */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-200">
                Order Received • Raipur Hub
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                Order #{order.orderId}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-emerald-100 hover:text-white hover:bg-emerald-800 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Banner: Send to WhatsApp - Primary Call To Action */}
        <div className="p-4 bg-emerald-50 border-b border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
          <div className="text-xs text-emerald-900 text-center sm:text-left">
            <p className="font-bold">Next Step: Send Order to Pankaj Dhamecha on WhatsApp</p>
            <p className="text-emerald-700">Clicking below sends the itemized Bilty ticket to 9244021201 for immediate dispatch booking.</p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all flex-shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send to WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>

        {/* Formal Printable B2B Invoice Sheet */}
        <div className="p-6 sm:p-8 space-y-6 text-neutral-800" id="printable-invoice">
          {/* Invoice Header */}
          <div className="flex justify-between items-start border-b border-neutral-200 pb-4">
            <div>
              <h1 className="text-lg font-black text-neutral-900 tracking-tight">
                {BUSINESS_INFO.displayName}
              </h1>
              <p className="text-xs font-semibold text-neutral-700">Prop: {BUSINESS_INFO.owner}</p>
              <p className="text-xs text-neutral-500">{BUSINESS_INFO.location}</p>
              <p className="text-xs text-neutral-500">Contact / WhatsApp: <strong>{BUSINESS_INFO.phoneFormatted}</strong></p>
              <p className="text-[11px] text-amber-700 font-semibold">{BUSINESS_INFO.tagline}</p>
            </div>

            <div className="text-right">
              <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-neutral-900 text-white mb-1">
                B2B ORDER INVOICE
              </span>
              <p className="text-xs font-mono font-bold text-neutral-900">ID: {order.orderId}</p>
              <p className="text-xs text-neutral-500">{order.date}</p>
              <p className="text-xs text-emerald-600 font-semibold">Status: Confirmed</p>
            </div>
          </div>

          {/* Bill To & Dispatch Address */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-neutral-50 p-3.5 rounded-xl border border-neutral-200">
            <div>
              <p className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider mb-0.5">Billed & Shipped To:</p>
              <p className="font-bold text-neutral-900">{order.customer.fullName}</p>
              {order.customer.shopOrBusinessName && (
                <p className="font-semibold text-neutral-700">{order.customer.shopOrBusinessName}</p>
              )}
              {order.customer.gstin && (
                <p className="font-mono text-neutral-600">GSTIN: {order.customer.gstin}</p>
              )}
              <p className="text-neutral-600">{order.customer.address}</p>
              <p className="text-neutral-600">{order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
              <p className="text-neutral-600 mt-1">Phone: <strong>{order.customer.phone}</strong></p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider mb-0.5">Logistics & Payment Info:</p>
              <p className="text-neutral-700">
                Shipping Mode: <strong>
                  {order.customer.transportPreference === 'transport-bilty'
                    ? 'Transport Bilty (Depot)'
                    : order.customer.transportPreference === 'express-courier'
                    ? 'Express Doorstep Courier'
                    : 'Raipur Godown Pickup'}
                </strong>
              </p>
              <p className="text-neutral-700 mt-1">
                Payment Method: <strong>
                  {order.customer.paymentMethod === 'upi-advance'
                    ? '100% UPI Advance'
                    : order.customer.paymentMethod === 'token-deposit'
                    ? '20% Token Advance'
                    : 'Cash on Delivery'}
                </strong>
              </p>
              {order.customer.notes && (
                <p className="text-neutral-500 text-[11px] mt-1 italic">
                  Note: {order.customer.notes}
                </p>
              )}
            </div>
          </div>

          {/* Itemized Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-neutral-300 text-neutral-500 uppercase text-[10px]">
                  <th className="py-2 px-1">#</th>
                  <th className="py-2 px-1">Item Description</th>
                  <th className="py-2 px-1 text-center">Unit / Packaging</th>
                  <th className="py-2 px-1 text-center">Qty</th>
                  <th className="py-2 px-1 text-right">Wholesale Rate</th>
                  <th className="py-2 px-1 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {order.items.map((item, idx) => {
                  const lineTotal = item.selectedTierPrice * item.quantity;
                  return (
                    <tr key={item.product.id}>
                      <td className="py-2 px-1 text-neutral-400">{idx + 1}</td>
                      <td className="py-2 px-1 font-semibold text-neutral-900">
                        {item.product.name}
                      </td>
                      <td className="py-2 px-1 text-center text-neutral-500">
                        {item.product.unitType}
                      </td>
                      <td className="py-2 px-1 text-center font-bold text-neutral-900">
                        {item.quantity}
                      </td>
                      <td className="py-2 px-1 text-right font-mono text-neutral-700">
                        {formatINR(item.selectedTierPrice)}
                      </td>
                      <td className="py-2 px-1 text-right font-mono font-bold text-neutral-900">
                        {formatINR(lineTotal)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Totals Summary Table */}
          <div className="flex justify-end pt-2 border-t border-neutral-200">
            <div className="w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal:</span>
                <span className="font-mono font-semibold">{formatINR(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Dealer Volume Savings:</span>
                  <span className="font-mono">- {formatINR(order.discount)}</span>
                </div>
              )}
              {order.transportCharge > 0 && (
                <div className="flex justify-between text-neutral-600">
                  <span>Courier Packaging & Freight:</span>
                  <span className="font-mono">+{formatINR(order.transportCharge)}</span>
                </div>
              )}
              {order.gstAmount > 0 && (
                <div className="flex justify-between text-neutral-600">
                  <span>GST 18% (ITC Billable):</span>
                  <span className="font-mono">+{formatINR(order.gstAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-extrabold text-neutral-950 pt-2 border-t border-neutral-300">
                <span>Grand Total:</span>
                <span className="font-mono text-base text-amber-700">{formatINR(order.totalAmount)}</span>
              </div>

              {order.customer.paymentMethod === 'token-deposit' && (
                <div className="pt-2 text-[11px] bg-amber-50 p-2 rounded-lg border border-amber-200">
                  <div className="flex justify-between font-bold text-amber-950">
                    <span>Advance Payable (20%):</span>
                    <span className="font-mono">{formatINR(order.advancePayable)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-500">
                    <span>Balance on Bilty Delivery:</span>
                    <span className="font-mono">{formatINR(order.balancePayable)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Terms & Verification Stamp */}
          <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
            <div className="space-y-1 text-center sm:text-left">
              <p>• Goods dispatched via registered Raipur transport (VRL, TCI, Raipur Bilty).</p>
              <p>• For any query, contact <strong>Pankaj Dhamecha at 9244021201</strong>.</p>
            </div>
            <div className="text-center sm:text-right font-semibold text-neutral-700">
              <p>For Wholesale Shop Chhattisgarh</p>
              <div className="h-6" />
              <p className="border-t border-neutral-400 pt-0.5 inline-block">Authorized Signatory</p>
            </div>
          </div>
        </div>

        {/* Bottom Actions - Hidden during Print */}
        <div className="p-4 sm:p-5 bg-neutral-100 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <Printer className="w-4 h-4 text-neutral-600" />
              <span>Print / Download Invoice</span>
            </button>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              <span>Call 9244021201</span>
            </a>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open in WhatsApp Now</span>
          </a>
        </div>
      </div>
    </div>
  );
};
