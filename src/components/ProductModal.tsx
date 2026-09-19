import React, { useState } from 'react';
import { Product } from '../types';
import { formatINR, generateWhatsAppProductInquiryUrl } from '../utils/whatsapp';
import { BUSINESS_INFO } from '../data/products';
import { X, MessageCircle, ShoppingBag, Phone, ShieldCheck, Box, Check, Sparkles, AlertTriangle } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState<number>(product.minOrderQty);
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [isAdded, setIsAdded] = useState(false);

  // Calculate current tier price based on quantity
  const calculateTierPrice = (qty: number): number => {
    const sortedTiers = [...product.wholesaleTiers].sort((a, b) => b.minQty - a.minQty);
    for (const tier of sortedTiers) {
      if (qty >= tier.minQty) {
        return tier.pricePerUnit;
      }
    }
    return product.pricePerUnit;
  };

  const currentPrice = calculateTierPrice(quantity);
  const totalAmount = currentPrice * quantity;
  const retailTotal = product.retailPrice * quantity;
  const totalSavings = retailTotal - totalAmount;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/75 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors"
          title="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image & Badges */}
          <div className="p-6 bg-neutral-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-200">
            <div>
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-neutral-200 border border-neutral-200">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-neutral-900/90 text-white backdrop-blur-xs">
                    MOQ: {product.minOrderQty} {product.unitType}
                  </span>
                </div>
              </div>

              {/* Gallery Thumbnails if available */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto">
                  {product.gallery.map((imgUrl, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(imgUrl)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                        selectedImage === imgUrl ? 'border-amber-500 scale-105' : 'border-neutral-300 opacity-70'
                      }`}
                    >
                      <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Warehouse Dispatch Card */}
            <div className="mt-6 p-3.5 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-600 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Raipur Central Godown • Ready Stock</span>
              </div>
              <p className="text-[11px] text-neutral-500">
                Packaging: <strong>{product.packagingDetails}</strong>. Safe for inter-state transport via VRL / TCI / Raipur Bilty.
              </p>
            </div>
          </div>

          {/* Right Column: Wholesale Pricing, Specifications & Order */}
          <div className="p-6 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  {product.categoryLabel}
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-neutral-900 mt-1 leading-snug">
                  {product.name}
                </h2>
                {product.hindiName && (
                  <p className="text-xs text-neutral-500 font-medium mt-0.5">
                    {product.hindiName}
                  </p>
                )}
              </div>

              {/* Wholesale Slab Tier Table */}
              <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-3">
                <p className="text-xs font-bold text-amber-950 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Wholesale Quantity Discount Tiers:
                </p>
                <div className="grid grid-cols-3 gap-1.5 text-xs text-center">
                  {product.wholesaleTiers.map((tier, idx) => {
                    const isApplicable = quantity >= tier.minQty;
                    return (
                      <div
                        key={idx}
                        className={`p-2 rounded-lg border transition-all ${
                          isApplicable
                            ? 'bg-amber-500 text-neutral-950 border-amber-600 font-bold shadow-xs'
                            : 'bg-white text-neutral-700 border-amber-200'
                        }`}
                      >
                        <p className="text-[10px] uppercase font-semibold">{tier.label.split('(')[0]}</p>
                        <p className="text-sm font-extrabold">{formatINR(tier.pricePerUnit)}</p>
                        <p className="text-[9px] opacity-80">per {product.unitType.split('(')[0]}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-600 leading-relaxed">
                {product.description}
              </p>

              {/* Technical Specifications */}
              <div>
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wide mb-2">
                  Technical Specifications
                </h4>
                <div className="rounded-xl border border-neutral-200 overflow-hidden text-xs">
                  {Object.entries(product.specifications).map(([key, val], idx) => (
                    <div
                      key={key}
                      className={`grid grid-cols-2 p-2 ${
                        idx % 2 === 0 ? 'bg-neutral-50' : 'bg-white'
                      }`}
                    >
                      <span className="font-semibold text-neutral-600">{key}</span>
                      <span className="text-neutral-900">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Note */}
              {product.safetyNotes && (
                <div className="p-2.5 rounded-lg bg-yellow-50 border border-yellow-200 text-[11px] text-yellow-900 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <span>{product.safetyNotes}</span>
                </div>
              )}
            </div>

            {/* Bottom Actions & Quantity Selector */}
            <div className="mt-6 pt-4 border-t border-neutral-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-neutral-400">Your Slab Rate:</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-neutral-950">
                      {formatINR(currentPrice)}
                    </span>
                    <span className="text-xs text-neutral-500">/ {product.unitType}</span>
                  </div>
                </div>

                {/* Quantity Controller */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-500 font-medium">Quantity:</span>
                  <div className="flex items-center border border-neutral-300 rounded-xl bg-neutral-100 overflow-hidden">
                    <button
                      onClick={() => setQuantity((prev) => (prev > product.minOrderQty ? prev - 1 : product.minOrderQty))}
                      disabled={quantity <= product.minOrderQty}
                      className="px-3 py-1.5 font-bold text-neutral-700 hover:bg-neutral-200 disabled:opacity-30"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      min={product.minOrderQty}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val) && val >= product.minOrderQty) {
                          setQuantity(val);
                        }
                      }}
                      className="w-12 text-center text-xs font-bold text-neutral-900 bg-transparent border-none focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="px-3 py-1.5 font-bold text-neutral-700 hover:bg-neutral-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Calculations Summary */}
              <div className="p-2.5 rounded-xl bg-neutral-100 text-xs flex items-center justify-between">
                <div>
                  <span className="text-neutral-500">Estimated Total: </span>
                  <strong className="text-neutral-900 text-sm font-bold">{formatINR(totalAmount)}</strong>
                </div>
                {totalSavings > 0 && (
                  <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-md text-[11px]">
                    Saved {formatINR(totalSavings)} vs Retail MRP
                  </span>
                )}
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={generateWhatsAppProductInquiryUrl(product, quantity)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order on WhatsApp</span>
                </a>

                <button
                  onClick={handleAdd}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs transition-all ${
                    isAdded
                      ? 'bg-amber-600 text-white'
                      : 'bg-neutral-950 hover:bg-neutral-800 text-white shadow-md'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-amber-400" />
                      <span>Add to B2B Cart</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-1">
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-amber-600 font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  <span>Need custom master carton quote? Call Pankaj Dhamecha at {BUSINESS_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
