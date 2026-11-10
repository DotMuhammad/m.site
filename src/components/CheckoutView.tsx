import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CustomerInfo } from '../types';
import { 
  ShieldCheck, 
  CreditCard, 
  MessageCircle, 
  Banknote, 
  Truck, 
  ArrowLeft, 
  Lock, 
  Check, 
  FileText,
  Sparkles
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const { 
    cart, 
    subtotal, 
    discountAmount, 
    shippingFee, 
    total, 
    appliedCoupon, 
    createOrder, 
    setCurrentView, 
    setActiveInvoiceOrder,
    settings 
  } = useStore();

  // Load saved customer info if available
  const [customer, setCustomer] = useState<CustomerInfo>(() => {
    const saved = localStorage.getItem('etoile_customer_info');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      fullName: '',
      email: '',
      phone: '03478543812', // default prefill to user's phone for convenience
      address: '',
      apartment: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'United States',
      notes: ''
    };
  });

  const [paymentMethod, setPaymentMethod] = useState<'whatsapp' | 'stripe' | 'cod'>('whatsapp');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');

  // Stripe card fields simulation
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  const [formError, setFormError] = useState<string | null>(null);

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-semibold text-[#29141E]">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-[#7A5B69]">Add creations to your bag before proceeding to checkout.</p>
        <button
          onClick={() => setCurrentView('shop')}
          className="px-6 py-2.5 bg-[#D1527A] text-white text-xs font-semibold rounded-full hover:bg-[#B93E65] transition-colors"
        >
          Explore Boutique
        </button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!customer.fullName.trim()) {
      setFormError('Please enter your full name.');
      return false;
    }
    if (!customer.email.trim() || !customer.email.includes('@')) {
      setFormError('Please enter a valid email address for receipt delivery.');
      return false;
    }
    if (!customer.phone.trim()) {
      setFormError('Please enter your phone or WhatsApp number.');
      return false;
    }
    if (!customer.address.trim()) {
      setFormError('Please provide your street delivery address.');
      return false;
    }
    if (!customer.city.trim()) {
      setFormError('Please enter your city.');
      return false;
    }
    if (!customer.postalCode.trim()) {
      setFormError('Please enter your postal / zip code.');
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Save customer info for future visits
    localStorage.setItem('etoile_customer_info', JSON.stringify(customer));

    setIsProcessing(true);

    if (paymentMethod === 'stripe') {
      setProcessingStep('Connecting to Stripe Secure Gateway...');
      await new Promise(r => setTimeout(r, 900));
      setProcessingStep('Authorizing 3D-Secure 2.0 Verification...');
      await new Promise(r => setTimeout(r, 1000));
      setProcessingStep('Payment Approved! Generating Automated Bill...');
      await new Promise(r => setTimeout(r, 600));
    } else if (paymentMethod === 'whatsapp') {
      setProcessingStep('Formatting Cart & Generating Automated Bill...');
      await new Promise(r => setTimeout(r, 700));
    } else {
      setProcessingStep('Confirming Cash on Delivery Reservation...');
      await new Promise(r => setTimeout(r, 800));
    }

    const newOrder = createOrder(customer, paymentMethod);
    setIsProcessing(false);

    // Smoothly transition to the Order Confirmation page
    setCurrentView('order-confirmation');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Return to Cart Bar */}
      <button
        onClick={() => setCurrentView('shop')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#8A6675] hover:text-[#D1527A] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Continue Shopping</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Customer Form & Payment Method */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: Customer Information */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-200/80 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-pink-100 pb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#9E3E61]">
                  Step 1 of 2
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#29141E]">
                  Customer & Shipping Information
                </h2>
              </div>
              <ShieldCheck className="w-6 h-6 text-[#D1527A]" />
            </div>

            {formError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
                {formError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-[#4A323D] font-semibold mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g. Lady Genevieve Vance"
                  value={customer.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl text-[#29141E] focus:outline-none focus:ring-2 focus:ring-[#D1527A]/30"
                  required
                />
              </div>

              <div>
                <label className="block text-[#4A323D] font-semibold mb-1">
                  Email Address * (for invoice delivery)
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. genevieve@vance.com"
                  value={customer.email}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl text-[#29141E] focus:outline-none focus:ring-2 focus:ring-[#D1527A]/30"
                  required
                />
              </div>

              <div>
                <label className="block text-[#4A323D] font-semibold mb-1">
                  WhatsApp / Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="e.g. 03478543812"
                  value={customer.phone}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl text-[#29141E] focus:outline-none focus:ring-2 focus:ring-[#D1527A]/30"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[#4A323D] font-semibold mb-1">
                  Street Delivery Address *
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Street name and house/flat number"
                  value={customer.address}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl text-[#29141E] focus:outline-none focus:ring-2 focus:ring-[#D1527A]/30"
                  required
                />
              </div>

              <div>
                <label className="block text-[#4A323D] font-semibold mb-1">
                  Apartment, Suite, Unit (optional)
                </label>
                <input
                  type="text"
                  name="apartment"
                  placeholder="Apt 4B"
                  value={customer.apartment}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl text-[#29141E] focus:outline-none focus:ring-2 focus:ring-[#D1527A]/30"
                />
              </div>

              <div>
                <label className="block text-[#4A323D] font-semibold mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="Paris / New York / London"
                  value={customer.city}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl text-[#29141E] focus:outline-none focus:ring-2 focus:ring-[#D1527A]/30"
                  required
                />
              </div>

              <div>
                <label className="block text-[#4A323D] font-semibold mb-1">
                  Postal / ZIP Code *
                </label>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="75008 or 10021"
                  value={customer.postalCode}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl text-[#29141E] focus:outline-none focus:ring-2 focus:ring-[#D1527A]/30"
                  required
                />
              </div>

              <div>
                <label className="block text-[#4A323D] font-semibold mb-1">
                  Country *
                </label>
                <select
                  name="country"
                  value={customer.country}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl text-[#29141E] focus:outline-none focus:ring-2 focus:ring-[#D1527A]/30"
                >
                  <option value="United States">United States</option>
                  <option value="France">France</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[#4A323D] font-semibold mb-1">
                  Special Delivery Instructions (optional)
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="Leave with front desk concierge, discreet gift packaging, etc."
                  value={customer.notes}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl text-[#29141E] focus:outline-none focus:ring-2 focus:ring-[#D1527A]/30"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment Method Choice */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-200/80 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-pink-100 pb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#9E3E61]">
                  Step 2 of 2
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#29141E]">
                  Select Payment & Invoicing Method
                </h2>
              </div>
              <Lock className="w-5 h-5 text-emerald-600" />
            </div>

            {/* Payment Method Selector Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* WhatsApp Direct Order */}
              <div
                onClick={() => setPaymentMethod('whatsapp')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'whatsapp'
                    ? 'border-[#25D366] bg-[#F2FBF5] shadow-xs'
                    : 'border-[#F2C2CF] bg-white hover:border-[#25D366]/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#E9F9EE] text-[#25D366] flex items-center justify-center">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  {paymentMethod === 'whatsapp' && (
                    <span className="w-4 h-4 rounded-full bg-[#25D366] text-white flex items-center justify-center text-[10px]">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <h4 className="font-serif text-sm font-semibold text-[#29141E]">WhatsApp Direct</h4>
                <p className="text-[11px] text-[#593E4C] mt-0.5">
                  Send cart to <strong>{settings.whatsappNumber}</strong> & get instant PDF bill
                </p>
              </div>

              {/* Stripe Card */}
              <div
                onClick={() => setPaymentMethod('stripe')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'stripe'
                    ? 'border-[#D1527A] bg-[#FFF0F4] shadow-xs'
                    : 'border-[#F2C2CF] bg-white hover:border-[#D1527A]/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-full bg-pink-100 text-[#D1527A] flex items-center justify-center">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  {paymentMethod === 'stripe' && (
                    <span className="w-4 h-4 rounded-full bg-[#D1527A] text-white flex items-center justify-center text-[10px]">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <h4 className="font-serif text-sm font-semibold text-[#29141E]">Stripe Gateway</h4>
                <p className="text-[11px] text-[#593E4C] mt-0.5">
                  Visa, Mastercard, Amex with 3D-Secure 256-bit encryption
                </p>
              </div>

              {/* Cash on Delivery */}
              <div
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[#B5426C] bg-[#FFF0F4] shadow-xs'
                    : 'border-[#F2C2CF] bg-white hover:border-[#B5426C]/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-full bg-stone-100 text-[#593E4C] flex items-center justify-center">
                    <Banknote className="w-4 h-4" />
                  </div>
                  {paymentMethod === 'cod' && (
                    <span className="w-4 h-4 rounded-full bg-[#B5426C] text-white flex items-center justify-center text-[10px]">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <h4 className="font-serif text-sm font-semibold text-[#29141E]">Cash on Delivery</h4>
                <p className="text-[11px] text-[#593E4C] mt-0.5">
                  Pay cash upon doorstep courier verification
                </p>
              </div>
            </div>

            {/* Detailed Form for chosen method */}
            {paymentMethod === 'whatsapp' && (
              <div className="p-4 rounded-2xl bg-[#F2FBF5] border border-[#C5ECD0] text-xs space-y-2">
                <div className="flex items-center gap-2 text-[#128C7E] font-semibold">
                  <MessageCircle className="w-4 h-4" />
                  <span>Direct WhatsApp Checkout System</span>
                </div>
                <p className="text-[#325E40] leading-relaxed">
                  Upon clicking <strong>&ldquo;Complete WhatsApp Order&rdquo;</strong>, our automated bill generator creates your official invoice with Invoice Number, customer details, and itemized calculations. WhatsApp will open with your pre-formatted order message sent directly to <strong>{settings.whatsappNumber}</strong>.
                </p>
                <div className="flex items-center gap-2 text-[11px] text-[#128C7E] pt-1 font-mono">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Automated printable PDF invoice downloads immediately.</span>
                </div>
              </div>
            )}

            {paymentMethod === 'stripe' && (
              <div className="p-5 rounded-2xl bg-[#FFF8FA] border border-pink-200 text-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#29141E] flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    Stripe 256-Bit SSL Encrypted Card Payment
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    TEST SIMULATION READY
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[#4A323D] font-medium mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="Name on card"
                      value={cardName || customer.fullName}
                      onChange={e => setCardName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#F2B5C7] rounded-xl text-[#29141E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4A323D] font-medium mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#F2B5C7] rounded-xl text-[#29141E] font-mono focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#4A323D] font-medium mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={e => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#F2B5C7] rounded-xl text-[#29141E] font-mono focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#4A323D] font-medium mb-1">
                        CVC Security Code
                      </label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={e => setCardCvc(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#F2B5C7] rounded-xl text-[#29141E] font-mono focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1">
                <span className="font-semibold block">Doorstep Verification Protocol</span>
                <p>
                  Please keep <strong>${total.toFixed(2)}</strong> in exact cash ready upon arrival of the DHL Express courier. Signature verification is required.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order Button */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-200/80 shadow-xs space-y-6 sticky top-24">
            <h3 className="font-serif text-xl font-semibold text-[#29141E] border-b border-pink-100 pb-3">
              Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} items)
            </h3>

            {/* Cart Items List */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-3 text-xs">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-lg object-cover bg-pink-50 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#29141E] truncate">{item.product.name}</p>
                    <p className="text-[11px] text-[#8A6675]">
                      Qty: {item.quantity} {item.selectedSize ? `· ${item.selectedSize}` : ''}
                    </p>
                  </div>
                  <span className="font-semibold tabular-nums text-[#29141E]">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-2 text-xs text-[#593E4C] border-t border-pink-100 pt-4">
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
                <span>White-Glove Shipping</span>
                <span className="font-semibold tabular-nums text-[#29141E]">
                  {shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base sm:text-lg font-bold text-[#29141E] border-t-2 border-pink-200 pt-3">
                <span>Total Amount Due</span>
                <span className="tabular-nums text-[#D1527A]">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleCompleteOrder}
              disabled={isProcessing}
              className={`w-full py-4 px-6 rounded-full font-semibold text-xs sm:text-sm text-white shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 ${
                paymentMethod === 'whatsapp'
                  ? 'bg-[#25D366] hover:bg-[#1eb956]'
                  : 'bg-[#D1527A] hover:bg-[#B93E65]'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{processingStep}</span>
                </div>
              ) : paymentMethod === 'whatsapp' ? (
                <>
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirm WhatsApp Order & Get PDF Bill</span>
                </>
              ) : paymentMethod === 'stripe' ? (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Authorize Stripe Payment (${total.toFixed(2)})</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Place Cash on Delivery Order</span>
                </>
              )}
            </button>

            {/* Trust Seals */}
            <div className="pt-2 text-center text-[11px] text-[#8A6675] space-y-1">
              <p className="flex items-center justify-center gap-1.5 font-medium">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>SSL Encrypted · 100% Secure Checkout</span>
              </p>
              <p>Automated invoice generated immediately upon submission.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
