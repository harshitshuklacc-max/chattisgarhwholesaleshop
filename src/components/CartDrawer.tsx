import React from 'react';
import { CartItem } from '../types';
import { formatINR } from '../utils/whatsapp';
import { BUSINESS_INFO } from '../data/products';
import { X, Trash2, ShoppingBag, ArrowRight, MessageCircle, AlertCircle, ShieldCheck, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  onQuickWhatsAppOrder: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onQuickWhatsAppOrder,
}) => {
  if (!isOpen) return null;

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.selectedTierPrice * item.quantity, 0);
  const retailComparisonTotal = items.reduce((sum, item) => sum + item.product.retailPrice * item.quantity, 0);
  const wholesaleSavings = Math.max(0, retailComparisonTotal - subtotal);

  // Check if all items satisfy MOQ
  const hasMoqViolations = items.some((item) => item.quantity < item.product.minOrderQty);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500 text-neutral-950">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-neutral-900 text-base">Wholesale Cart</h3>
                <p className="text-xs text-neutral-500">
                  {items.length} unique event {items.length === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 transition-colors"
              title="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-base">Your Wholesale Cart is Empty</h4>
                  <p className="text-xs text-neutral-500 max-w-xs mt-1">
                    Add cold pyros, wireless firing boxes, smoke machines, or event supplies to see dealer rates.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              <>
                {/* Free Transport Hub Advice */}
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2">
                  <Truck className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>Pan-India Bilty Transport:</strong> Goods are safely dispatched from Raipur central godown with transport bilty receipt.
                  </p>
                </div>

                {items.map((item) => {
                  const lineTotal = item.selectedTierPrice * item.quantity;
                  const isBelowMoq = item.quantity < item.product.minOrderQty;

                  return (
                    <div
                      key={item.product.id}
                      className="flex gap-3 p-3 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 transition-all shadow-2xs"
                    >
                      {/* Product Thumbnail */}
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-lg object-cover bg-neutral-100 flex-shrink-0 border border-neutral-100"
                      />

                      {/* Info & Quantity controls */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">
                              {item.product.name}
                            </h4>
                            <p className="text-[11px] text-neutral-500 font-medium">
                              Rate: {formatINR(item.selectedTierPrice)} / {item.product.unitType.split('(')[0]}
                            </p>
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-neutral-400 hover:text-rose-600 p-1 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* MOQ Alert if violated */}
                        {isBelowMoq && (
                          <p className="text-[10px] text-rose-600 font-semibold flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3 h-3" /> Min MOQ is {item.product.minOrderQty} {item.product.unitType}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100">
                          {/* Stepper */}
                          <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-50">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="px-2 py-0.5 text-xs font-bold text-neutral-600 hover:bg-neutral-200 disabled:opacity-30"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-bold text-neutral-900 min-w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-0.5 text-xs font-bold text-neutral-600 hover:bg-neutral-200"
                            >
                              +
                            </button>
                          </div>

                          <span className="text-xs font-extrabold text-neutral-950">
                            {formatINR(lineTotal)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Drawer Footer & Checkout Controls */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-neutral-200 bg-neutral-50 space-y-3">
              {/* Savings notification */}
              {wholesaleSavings > 0 && (
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <span>Wholesale Discount Applied:</span>
                  <span>Save {formatINR(wholesaleSavings)}</span>
                </div>
              )}

              {/* Subtotal Summary */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal (Wholesale Net):</span>
                  <span className="font-semibold text-neutral-900">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Est. Transport Freight:</span>
                  <span className="text-neutral-500 font-medium">To Pay on Bilty Arrival</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-neutral-950 pt-1.5 border-t border-neutral-200">
                  <span>Order Total:</span>
                  <span className="text-base text-amber-700">{formatINR(subtotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={onProceedToCheckout}
                  disabled={hasMoqViolations}
                  className="w-full py-3 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 disabled:bg-neutral-300 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>

                <button
                  onClick={onQuickWhatsAppOrder}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Quick WhatsApp Order to {BUSINESS_INFO.phone}</span>
                </button>
              </div>

              <p className="text-[10px] text-center text-neutral-400">
                100% genuine B2B invoices • All items inspected before packing at Raipur Hub
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
