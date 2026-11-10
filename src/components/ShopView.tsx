import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCategory, Product } from '../types';
import { ProductCard } from './ProductCard';
import { 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Sparkles,
  RotateCcw,
  Check
} from 'lucide-react';

export const ShopView: React.FC = () => {
  const { 
    products, 
    activeCategory, 
    setActiveCategory, 
    searchQuery, 
    setSearchQuery 
  } = useStore();

  const [selectedSort, setSelectedSort] = useState<string>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(1500);

  const categories: ProductCategory[] = [
    'All',
    'Fragrance',
    'Skincare',
    'Fine Jewelry',
    'Silk Couture',
    'Gift Sets'
  ];

  // Filtering and Sorting
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category match
      if (activeCategory !== 'All' && product.category !== activeCategory) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesSub = product.subtitle.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        const matchesTag = product.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesSub && !matchesCat && !matchesTag) {
          return false;
        }
      }
      // Stock match
      if (inStockOnly && product.stock <= 0) {
        return false;
      }
      // Price match
      if (product.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price-asc') return a.price - b.price;
      if (selectedSort === 'price-desc') return b.price - a.price;
      if (selectedSort === 'rating') return b.rating - a.rating;
      if (selectedSort === 'bestseller') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      if (selectedSort === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      // featured default
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, activeCategory, searchQuery, inStockOnly, maxPrice, selectedSort]);

  const resetFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setInStockOnly(false);
    setMaxPrice(1500);
    setSelectedSort('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <span className="text-xs font-semibold tracking-widest text-[#B5426C] uppercase">
          Curated Catalog
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#29141E] tracking-tight">
          Boutique Collections
        </h1>
        <p className="text-xs sm:text-sm text-[#6E4F5E]">
          Explore artisanal French fragrances, radiant skincare formulations, and bespoke fine jewelry crafted in limited editions.
        </p>
      </div>

      {/* Interactive Category Filter Bar (Buttons with click handlers per frontend-design) */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs font-medium rounded-full transition-all whitespace-nowrap shrink-0 active:scale-95 ${
              activeCategory === cat
                ? 'bg-[#D1527A] text-white shadow-sm'
                : 'bg-white border border-[#F2C2CF]/80 text-[#593E4C] hover:border-[#D1527A] hover:bg-pink-50/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Control Bar: Search & Sort & Filter options */}
      <div className="mt-6 p-4 bg-white rounded-2xl border border-[#F2C2CF]/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search input with live count */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search all items..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl text-[#29141E] placeholder:text-[#9E7C8B] focus:outline-none focus:ring-2 focus:ring-[#D1527A]/30"
          />
          <Search className="w-3.5 h-3.5 text-[#9E7C8B] absolute left-3 top-3 pointer-events-none" />
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center justify-end gap-3 w-full md:w-auto">
          {/* Price Range */}
          <div className="flex items-center gap-2 text-xs text-[#593E4C]">
            <span className="text-[#8A6675]">Max:</span>
            <input
              type="range"
              min="50"
              max="1500"
              step="50"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-24 accent-[#D1527A] cursor-pointer"
            />
            <span className="font-semibold tabular-nums text-[#29141E]">${maxPrice}</span>
          </div>

          {/* In Stock Toggle */}
          <button
            onClick={() => setInStockOnly(!inStockOnly)}
            className={`px-3 py-1.5 text-xs rounded-xl border flex items-center gap-1.5 transition-colors ${
              inStockOnly
                ? 'bg-pink-50 border-[#D1527A] text-[#D1527A] font-medium'
                : 'bg-[#FFF8FA] border-[#F2B5C7] text-[#593E4C]'
            }`}
          >
            {inStockOnly && <Check className="w-3 h-3" />}
            <span>In Stock Only</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl px-2.5 py-1.5 text-xs text-[#593E4C]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#9E7C8B]" />
            <select
              value={selectedSort}
              onChange={e => setSelectedSort(e.target.value)}
              className="bg-transparent text-xs text-[#29141E] font-medium focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="bestseller">Best Sellers</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>

          {/* Reset button if filtered */}
          {(activeCategory !== 'All' || searchQuery || inStockOnly || maxPrice < 1500) && (
            <button
              onClick={resetFilters}
              className="p-2 text-[#9E7C8B] hover:text-[#D1527A] hover:bg-pink-50 rounded-xl transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="mt-4 flex items-center justify-between text-xs text-[#8A6675]">
        <span>Showing <strong className="text-[#29141E] tabular-nums">{filteredProducts.length}</strong> luxurious creations</span>
        {searchQuery && (
          <span>Matching &ldquo;{searchQuery}&rdquo;</span>
        )}
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-12 py-16 text-center bg-white rounded-3xl border border-[#F2C2CF] p-8 max-w-lg mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-pink-100 text-[#D1527A] flex items-center justify-center mx-auto">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-[#29141E]">No creations matched</h3>
          <p className="text-xs text-[#6E4F5E]">
            We could not find any items matching your selected criteria. Try adjusting your filters or price limit.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-[#D1527A] text-white text-xs font-semibold rounded-full shadow-sm hover:bg-[#B93E65] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
