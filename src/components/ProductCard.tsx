import React, { useState } from 'react';
import { Product } from '../types';
import { formatINR, generateWhatsAppProductInquiryUrl } from '../utils/whatsapp';
import { MessageCircle, ShoppingBag, Info, Check, Sparkles, Box, Shield } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
}) => {
  const [selectedQty, setSelectedQty] = useState<number>(product.minOrderQty);
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);

  // Calculate current tier price based on selectedQty
  const calculateTierPrice = (qty: number): number => {
    const sortedTiers = [...product.wholesaleTiers].sort((a, b) => b.minQty - a.minQty);
    for (const tier of sortedTiers) {
      if (qty >= tier.minQty) {
        return tier.pricePerUnit;
      }
    }
    return product.pricePerUnit;
  };

  const currentPrice = calculateTierPrice(selectedQty);
  const savingsPercent = Math.round(((product.retailPrice - currentPrice) / product.retailPrice) * 100);

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedQty((prev) => prev + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedQty((prev) => (prev > product.minOrderQty ? prev - 1 : product.minOrderQty));
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedQty);
    setIsAddedAnimation(true);
    setTimeout(() => setIsAddedAnimation(false), 1200);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group flex flex-col bg-white rounded-2xl border border-neutral-200 hover:border-neutral-300 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-4/3 bg-neutral-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Top Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start">
          {product.bestseller && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-500 text-neutral-950 shadow-xs">
              <Sparkles className="w-3 h-3" /> Top Seller
            </span>
          )}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-neutral-900/85 text-white backdrop-blur-xs">
            MOQ: {product.minOrderQty} {product.unitType.includes('(') ? product.unitType.split('(')[0].trim() : product.unitType}
          </span>
        </div>

        {/* Raipur Stock Status */}
        <div className="absolute bottom-2.5 right-2.5">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/90 text-white backdrop-blur-xs shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Raipur Ready Stock ({product.stockCount})
          </span>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1">
            <span className="uppercase tracking-wider font-semibold text-amber-700">
              {product.categoryLabel}
            </span>
            <span className="font-mono text-neutral-400">ID: {product.id.toUpperCase()}</span>
          </div>

          <h3 className="font-bold text-neutral-900 text-sm sm:text-base line-clamp-2 leading-snug group-hover:text-amber-800 transition-colors">
            {product.name}
          </h3>

          {product.hindiName && (
            <p className="text-xs text-neutral-500 font-medium mt-0.5 font-hindi line-clamp-1">
              {product.hindiName}
            </p>
          )}

          <p className="text-xs text-neutral-500 mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Packaging Note */}
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-neutral-600 bg-neutral-50 rounded-lg p-2 border border-neutral-100">
            <Box className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
            <span className="truncate">{product.packagingDetails}</span>
          </div>
        </div>

        {/* Pricing & Cart Action Area */}
        <div className="mt-4 pt-3 border-t border-neutral-100">
          <div className="flex items-baseline justify-between gap-2 mb-2">
            <div>
              <span className="text-xs text-neutral-400">Wholesale Rate:</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg sm:text-xl font-extrabold text-neutral-950">
                  {formatINR(currentPrice)}
                </span>
                <span className="text-xs text-neutral-500 font-normal">/ {product.unitType}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-neutral-400 block">Retail MRP</span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-neutral-400 line-through">
                  {formatINR(product.retailPrice)}
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded">
                  {savingsPercent}% Margin
                </span>
              </div>
            </div>
          </div>

          {/* Wholesale Quantity Stepper */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-50 overflow-hidden">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={selectedQty <= product.minOrderQty}
                className="px-2.5 py-1 text-sm font-bold text-neutral-600 hover:bg-neutral-200 disabled:opacity-30 transition-colors"
                title="Decrease quantity"
              >
                -
              </button>
              <span className="px-2 text-xs font-semibold text-neutral-900 min-w-8 text-center">
                {selectedQty}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="px-2.5 py-1 text-sm font-bold text-neutral-600 hover:bg-neutral-200 transition-colors"
                title="Increase quantity"
              >
                +
              </button>
            </div>

            <span className="text-[11px] text-neutral-500 font-medium">
              Total: <strong>{formatINR(currentPrice * selectedQty)}</strong>
            </span>
          </div>

          {/* Action Buttons: WhatsApp & Add to Cart */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={generateWhatsAppProductInquiryUrl(product, selectedQty)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-xs transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="truncate">WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleAdd}
              className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl font-semibold text-xs transition-all ${
                isAddedAnimation
                  ? 'bg-amber-600 text-white'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-white'
              }`}
            >
              {isAddedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
