import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  MessageCircle, 
  Tag, 
  Truck,
  Check
} from 'lucide-react';
import { formatWhatsAppNumber } from '../utils/whatsapp';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    subtotal, 
    discountAmount, 
    shippingFee, 
    total, 
    freeShippingProgress, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    couponError, 
    setCurrentView,
    settings
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      const ok = applyCoupon(couponInput.trim());
      if (ok) setCouponInput('');
    }
  };

  const handleGoToCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  const handleWhatsAppCartOrder = () => {
    const formattedPhone = formatWhatsAppNumber(settings.whatsappNumber);
    const itemsList = cart.map((it, idx) => 
      `${idx + 1}. ${it.product.name} ${it.selectedSize ? `(${it.selectedSize})` : ''} x ${it.quantity} = $${(it.product.price * it.quantity).toFixed(2)}`
    ).join('\n');

    const msg = `*ETOILE & ROSE ATELIER - DIRECT BAG ORDER*
Hello! I would like to place an order for my shopping bag:

${itemsList}

--------------------------------
*Subtotal:* $${subtotal.toFixed(2)}
${discountAmount > 0 ? `*Discount (${appliedCoupon?.code}):* -$${discountAmount.toFixed(2)}\n` : ''}*Shipping:* ${shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
*ESTIMATED TOTAL:* $${total.toFixed(2)}

Please generate an automated PDF bill and confirm delivery dispatch!`;

    window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-md bg-[#FFF9FA] h-full shadow-2xl flex flex-col justify-between border-l border-pink-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-[#F5D5DF] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#D1527A]" />
            <h3 className="font-serif text-lg font-semibold text-[#29141E]">Your Shopping Bag</h3>
            <span className="text-xs bg-pink-100 text-[#9E3E61] px-2 py-0.5 rounded-full font-medium tabular-nums">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full text-stone-500 hover:text-black hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="p-4 bg-pink-50/70 border-b border-[#F5D5DF] text-xs">
          <div className="flex items-center justify-between text-[#593E4C] mb-1.5 font-medium">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#D1527A]" />
              {subtotal >= settings.freeShippingThreshold ? (
                <span className="text-emerald-700 font-semibold">You unlocked Free Express Shipping!</span>
              ) : (
                <span>Add <strong>${(settings.freeShippingThreshold - subtotal).toFixed(2)}</strong> more for Free Shipping</span>
              )}
            </span>
            <span className="tabular-nums font-semibold">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-pink-200/60 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#D1527A] transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length > 0 ? (
            cart.map(item => (
              <div 
                key={item.id} 
                className="flex gap-3.5 p-3 bg-white rounded-2xl border border-pink-100 shadow-xs"
              >
                <img 
                  src={item.product.images[0]} 
                  alt={item.product.name} 
                  className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover bg-pink-50 shrink-0" 
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-sm font-semibold text-[#29141E] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-[#D1527A] transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#8A6675] space-x-1.5 mt-0.5">
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      {item.selectedColor && <span>· {item.selectedColor}</span>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs sm:text-sm font-semibold text-[#29141E] tabular-nums">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#F2C2CF] rounded-lg overflow-hidden bg-[#FFF8FA]">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="p-1 hover:bg-pink-100 text-[#4A323D] transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-semibold tabular-nums text-[#29141E]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="p-1 hover:bg-pink-100 text-[#4A323D] transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-pink-100 text-[#D1527A] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-semibold text-[#29141E]">Your bag is empty</h4>
              <p className="text-xs text-[#7A5B69] max-w-xs mx-auto">
                Discover our signature fragrances, cellular serums, and mulberry silk loungewear.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setCurrentView('shop');
                }}
                className="px-5 py-2.5 bg-[#D1527A] text-white text-xs font-semibold rounded-full hover:bg-[#B93E65] transition-colors shadow-xs"
              >
                Browse Collections
              </button>
            </div>
          )}
        </div>

        {/* Footer: Coupon Input & Calculations & Checkout Button */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#F5D5DF] bg-white space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Enter coupon (e.g. ROSE20)"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl text-[#29141E] uppercase placeholder:normal-case focus:outline-none focus:ring-1 focus:ring-[#D1527A]"
                  />
                  <Tag className="w-3.5 h-3.5 text-[#8A6675] absolute left-2.5 top-2.5" />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 text-xs font-semibold bg-[#2B151F] text-white rounded-xl hover:bg-[#D1527A] transition-colors"
                >
                  Apply
                </button>
              </div>

              {couponError && (
                <p className="text-[11px] text-rose-600 font-medium pl-1">{couponError}</p>
              )}

              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs bg-pink-50 border border-pink-200 px-2.5 py-1.5 rounded-lg text-pink-800">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Privilege <strong>{appliedCoupon.code}</strong> applied
                  </span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-[11px] text-pink-600 hover:text-pink-900 underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#593E4C] border-t border-pink-100 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold tabular-nums text-[#29141E]">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#D1527A]">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span className="font-semibold tabular-nums">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold tabular-nums text-[#29141E]">
                  {shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-semibold text-[#29141E] border-t border-pink-200 pt-2">
                <span>Total</span>
                <span className="tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions: Proceed to Checkout & WhatsApp Bag Checkout */}
            <div className="space-y-2">
              <button
                onClick={handleGoToCheckout}
                className="w-full py-3.5 px-6 bg-[#D1527A] hover:bg-[#B93E65] text-white font-semibold text-xs sm:text-sm rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppCartOrder}
                className="w-full py-2.5 px-4 bg-[#E9F9EE] hover:bg-[#25D366] text-[#128C7E] hover:text-white border border-[#25D366]/40 text-xs font-semibold rounded-full transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Checkout via WhatsApp ({settings.whatsappNumber})</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
