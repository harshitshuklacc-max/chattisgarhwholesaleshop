import React from 'react';
import { CATEGORIES } from '../data/products';
import { Sparkles, Flame, CloudFog, Crown, PartyPopper, Zap, ArrowUpDown } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'moq-asc';
  onSortChange: (sort: 'featured' | 'price-asc' | 'price-desc' | 'moq-asc') => void;
  inStockOnly: boolean;
  onInStockToggle: (val: boolean) => void;
  totalProducts: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  inStockOnly,
  onInStockToggle,
  totalProducts,
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-4 h-4 text-amber-500" />;
      case 'CloudFog':
        return <CloudFog className="w-4 h-4 text-sky-500" />;
      case 'Crown':
        return <Crown className="w-4 h-4 text-yellow-500" />;
      case 'PartyPopper':
        return <PartyPopper className="w-4 h-4 text-pink-500" />;
      case 'Zap':
        return <Zap className="w-4 h-4 text-purple-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 shadow-xs mb-8">
      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                isSelected
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {getCategoryIcon(cat.icon)}
              <span>{cat.name}</span>
              {cat.id !== 'all' && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-200 text-neutral-600'
                  }`}
                >
                  {cat.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Filter and Sort Sub-Bar */}
      <div className="mt-3 pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="text-neutral-500 font-medium">
            Showing <strong className="text-neutral-900">{totalProducts}</strong> wholesale products
          </span>

          <label className="flex items-center gap-1.5 cursor-pointer select-none text-neutral-700 font-medium">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onInStockToggle(e.target.checked)}
              className="rounded border-neutral-300 text-amber-600 focus:ring-amber-500 w-3.5 h-3.5"
            />
            <span>In Stock at Raipur Godown Only</span>
          </label>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-neutral-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium cursor-pointer"
          >
            <option value="featured">Featured / Bestsellers</option>
            <option value="price-asc">Wholesale Rate: Low to High</option>
            <option value="price-desc">Wholesale Rate: High to Low</option>
            <option value="moq-asc">Lowest Minimum Order (MOQ)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
