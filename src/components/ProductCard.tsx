import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag, Eye, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    setSelectedProduct, 
    setQuickViewProduct, 
    setCurrentView, 
    addToCart, 
    isInWishlist, 
    toggleWishlist,
    addToRecentlyViewed
  } = useStore();

  const [imgError, setImgError] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isLiked = isInWishlist(product.id);

  const handleOpenDetail = () => {
    addToRecentlyViewed(product);
    setSelectedProduct(product);
    setCurrentView('product');
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToRecentlyViewed(product);
    setQuickViewProduct(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div 
      onClick={handleOpenDetail}
      className="group relative flex flex-col bg-white rounded-2xl border border-[#F5D5DF]/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1"
    >
      {/* Visual Asset Container (approx 70% height feel) */}
      <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-[#FFF5F8]">
        {!imgError && product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 text-pink-700">
            <span className="font-serif text-lg font-semibold text-center">{product.name}</span>
            <span className="text-xs text-pink-500 mt-1 uppercase tracking-wider">{product.category}</span>
          </div>
        )}

        {/* Top Badges (Restrained) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start pointer-events-none">
          {product.tags && product.tags.length > 0 && (
            <span className="text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 bg-white/90 backdrop-blur-md text-[#852C4D] rounded-md shadow-xs border border-pink-100">
              {product.tags[0]}
            </span>
          )}
          {product.originalPrice && (
            <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 bg-[#D1527A] text-white rounded-md shadow-xs">
              Save ${(product.originalPrice - product.price).toFixed(0)}
            </span>
          )}
        </div>

        {/* Action Overlay: Wishlist & Quick View */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleToggleWishlist}
            className={`p-2 rounded-full backdrop-blur-md shadow-sm transition-transform active:scale-90 ${
              isLiked
                ? 'bg-white text-[#D1527A]'
                : 'bg-white/80 hover:bg-white text-[#4A323D] hover:text-[#D1527A]'
            }`}
            title={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#D1527A]' : ''}`} />
          </button>

          <button
            onClick={handleQuickView}
            className="p-2 rounded-full bg-white/80 hover:bg-white text-[#4A323D] hover:text-[#D1527A] backdrop-blur-md shadow-sm transition-transform active:scale-90"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Add To Bag Bar on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-95 sm:opacity-0 sm:group-hover:opacity-100 transition-all translate-y-2 sm:translate-y-4 sm:group-hover:translate-y-0">
          <button
            onClick={handleQuickAdd}
            disabled={product.stock <= 0}
            className={`w-full py-2.5 px-4 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors ${
              product.stock <= 0
                ? 'bg-stone-300 text-stone-600 cursor-not-allowed'
                : addedAnimation
                ? 'bg-[#25D366] text-white'
                : 'bg-[#2B151F] hover:bg-[#D1527A] text-white'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : product.stock <= 0 ? (
              <span>Out of Stock</span>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content Metadata */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between gap-2.5">
        <div>
          {/* Unboxed Metadata with · separator */}
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#9E6E82] font-medium">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.subcategory}</span>
          </div>

          <h3 className="font-serif text-[15px] sm:text-base font-semibold text-[#29141E] group-hover:text-[#D1527A] transition-colors line-clamp-1 mt-1">
            {product.name}
          </h3>

          <p className="text-xs text-[#6F5260] line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Rating Row */}
        <div className="flex items-center justify-between pt-2 border-t border-[#F7DCE4]/60">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-semibold text-[#29141E] tabular-nums">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#9E7C8B] line-through tabular-nums">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-[#7A5868]">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium tabular-nums">{product.rating}</span>
            <span className="text-[10px] text-[#A68494]">({product.reviewsCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
