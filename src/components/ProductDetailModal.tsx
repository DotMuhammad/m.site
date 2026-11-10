import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  MessageCircle, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Sparkles,
  ChevronRight,
  Plus,
  Minus
} from 'lucide-react';
import { formatWhatsAppNumber } from '../utils/whatsapp';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    settings, 
    products, 
    setSelectedProduct,
    addToRecentlyViewed
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(() => product?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(() => product?.colors?.[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'shipping'>('details');

  if (!product) return null;

  const isLiked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    onClose();
  };

  const handleWhatsAppOrder = () => {
    const formattedPhone = formatWhatsAppNumber(settings.whatsappNumber);
    const totalPrice = (product.price * quantity).toFixed(2);
    const msg = `*ETOILE & ROSE ATELIER - DIRECT ITEM ORDER*
Hello Concierge! I would like to order:
- Item: ${product.name}
${selectedSize ? `- Size: ${selectedSize}\n` : ''}${selectedColor ? `- Color: ${selectedColor}\n` : ''}- Quantity: ${quantity}
- Price per unit: $${product.price}
- Total: $${totalPrice}

Please confirm order and automated invoice for delivery.`;

    window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.isFeatured))
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-pink-200/80 my-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-black shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Left Column: Gallery & Thumbnails */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-pink-50/60 border border-pink-100 shadow-inner">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              {product.tags && product.tags.length > 0 && (
                <span className="absolute top-3 left-3 text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 bg-white/95 text-[#913253] rounded-md shadow-xs">
                  {product.tags[0]}
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? 'border-[#D1527A] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Artisan Value Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-[#785766]">
              <div className="p-2 rounded-xl bg-pink-50/60 border border-pink-100/60">
                <Truck className="w-4 h-4 mx-auto mb-1 text-[#D1527A]" />
                <span>Express Courier</span>
              </div>
              <div className="p-2 rounded-xl bg-pink-50/60 border border-pink-100/60">
                <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-[#D1527A]" />
                <span>100% Authentic</span>
              </div>
              <div className="p-2 rounded-xl bg-pink-50/60 border border-pink-100/60">
                <RotateCcw className="w-4 h-4 mx-auto mb-1 text-[#D1527A]" />
                <span>14-Day Returns</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-5">
            <div>
              {/* Category Breadcrumb */}
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#9E6E82] font-medium">
                <span>{product.category}</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span>{product.subcategory}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#29141E] mt-1.5">
                {product.name}
              </h2>

              <p className="text-xs sm:text-sm text-[#664956] mt-1">
                {product.subtitle}
              </p>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-2 mt-2.5">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#29141E] tabular-nums">{product.rating}</span>
                <span className="text-xs text-[#8A6675]">({product.reviewsCount} customer reviews)</span>
              </div>

              {/* Price Banner */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-2xl sm:text-3xl font-semibold text-[#29141E] tabular-nums">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#9E7C8B] line-through tabular-nums">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-medium">
                  In Stock ({product.stock} available)
                </span>
              </div>

              {/* Variations: Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-4">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A323D] mb-2">
                    Select Size / Volume
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                          selectedSize === size
                            ? 'bg-[#2B151F] text-white border-[#2B151F]'
                            : 'bg-white text-[#4A323D] border-[#E8C5D0] hover:border-[#D1527A]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Variations: Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A323D] mb-2">
                    Select Finish: <span className="font-normal text-[#8A6675]">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map(color => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          selectedColor === color.name ? 'scale-115 ring-2 ring-[#D1527A] border-white' : 'border-stone-300'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#4A323D]">
                  Quantity
                </span>
                <div className="flex items-center border border-[#E8C5D0] rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-[#4A323D] hover:bg-pink-50 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-xs font-semibold tabular-nums text-[#29141E]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-2 text-[#4A323D] hover:bg-pink-50 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons: Add to Bag, WhatsApp Order, Wishlist */}
            <div className="space-y-2.5 pt-4 border-t border-[#F5D5DF]">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="flex-1 py-3 px-6 text-xs sm:text-sm font-semibold text-white bg-[#D1527A] hover:bg-[#B93E65] rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Shopping Bag • ${(product.price * quantity).toFixed(2)}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-full border transition-colors ${
                    isLiked
                      ? 'bg-pink-50 border-[#D1527A] text-[#D1527A]'
                      : 'bg-white border-[#E8C5D0] text-[#4A323D] hover:text-[#D1527A]'
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3 px-6 text-xs sm:text-sm font-semibold text-[#128C7E] hover:text-white bg-[#E9F9EE] hover:bg-[#25D366] border border-[#25D366]/40 rounded-full transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp Checkout (03478543812)</span>
              </button>
            </div>

            {/* Tabbed Product Dossier */}
            <div className="pt-2">
              <div className="flex items-center gap-4 border-b border-[#F5D5DF] text-xs font-semibold uppercase tracking-wider text-[#8A6675]">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 transition-colors ${
                    activeTab === 'details' ? 'border-b-2 border-[#D1527A] text-[#29141E]' : 'hover:text-[#29141E]'
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`pb-2 transition-colors ${
                    activeTab === 'ingredients' ? 'border-b-2 border-[#D1527A] text-[#29141E]' : 'hover:text-[#29141E]'
                  }`}
                >
                  Notes & Materials
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-2 transition-colors ${
                    activeTab === 'shipping' ? 'border-b-2 border-[#D1527A] text-[#29141E]' : 'hover:text-[#29141E]'
                  }`}
                >
                  Shipping & Bill
                </button>
              </div>

              <div className="py-3 text-xs text-[#593E4C] leading-relaxed">
                {activeTab === 'details' && (
                  <div className="space-y-2">
                    <p>{product.description}</p>
                    <ul className="list-disc list-inside space-y-1 text-[#6E4F5E]">
                      {product.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeTab === 'ingredients' && (
                  <p>{product.ingredients || 'Hand-selected natural ingredients, fine 18k gold hallmarked, and Grade 6A pure Mulberry silk fabrics certified in Paris.'}</p>
                )}
                {activeTab === 'shipping' && (
                  <p>Complimentary express delivery on orders over ${settings.freeShippingThreshold}. Delivered with signature verification. Automated PDF tax bill provided immediately upon ordering.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-[#F5D5DF] p-6 sm:p-8 bg-[#FFF8FA]/60 rounded-b-3xl">
            <h4 className="font-serif text-lg font-semibold text-[#29141E] mb-4">
              You May Also Adore
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProducts.map(rel => (
                <div
                  key={rel.id}
                  onClick={() => {
                    addToRecentlyViewed(rel);
                    setSelectedProduct(rel);
                  }}
                  className="flex items-center gap-3 p-2.5 bg-white rounded-xl border border-pink-100 hover:border-pink-300 transition-all cursor-pointer shadow-xs"
                >
                  <img src={rel.images[0]} alt={rel.name} className="w-14 h-14 rounded-lg object-cover" />
                  <div>
                    <h5 className="text-xs font-semibold text-[#29141E] line-clamp-1">{rel.name}</h5>
                    <p className="text-[11px] text-[#8A6675]">${rel.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
