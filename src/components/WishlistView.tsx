import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { wishlist, products, setCurrentView, addToCart } = useStore();

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    wishlistProducts.forEach(p => {
      addToCart(p, 1);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-pink-200 pb-6 mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B5426C]">
            Personal Curation
          </span>
          <h1 className="font-serif text-3xl font-semibold text-[#29141E]">
            Saved Wishlist ({wishlist.length})
          </h1>
          <p className="text-xs text-[#7A5B69] mt-1">
            Creations you have saved for future atelier appointments or WhatsApp orders.
          </p>
        </div>

        {wishlistProducts.length > 0 && (
          <button
            onClick={handleAddAllToCart}
            className="px-5 py-2.5 bg-[#D1527A] hover:bg-[#B93E65] text-white text-xs font-semibold rounded-full shadow-sm transition-colors flex items-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add All to Shopping Bag</span>
          </button>
        )}
      </div>

      {wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {wishlistProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center max-w-md mx-auto space-y-4 bg-white p-8 rounded-3xl border border-pink-200 shadow-xs">
          <div className="w-14 h-14 rounded-full bg-pink-100 text-[#D1527A] flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-[#29141E]">Your wishlist is pristine</h3>
          <p className="text-xs text-[#7A5B69]">
            Save your favorite fragrances, morganite jewelry, or silk couture pieces to review anytime.
          </p>
          <button
            onClick={() => setCurrentView('shop')}
            className="px-6 py-3 bg-[#D1527A] text-white text-xs font-semibold rounded-full hover:bg-[#B93E65] transition-colors"
          >
            Explore Boutique Collections
          </button>
        </div>
      )}
    </div>
  );
};
