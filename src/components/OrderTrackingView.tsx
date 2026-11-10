import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Package, 
  MapPin, 
  FileText, 
  MessageCircle,
  AlertCircle
} from 'lucide-react';

export const OrderTrackingView: React.FC = () => {
  const { 
    orders, 
    getOrderById, 
    setActiveInvoiceOrder, 
    settings,
    generateWhatsAppUrl
  } = useStore();

  const [searchInput, setSearchInput] = useState('ORD-78241'); // prefill default sample order
  const [searchedOrder, setSearchedOrder] = useState(() => getOrderById('ORD-78241') || orders[0] || null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    const found = getOrderById(searchInput.trim());
    if (found) {
      setSearchedOrder(found);
      setErrorMsg(null);
    } else {
      setErrorMsg(`No order found matching "${searchInput}". Please check your Order ID or Phone number.`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#B5426C]">
          Live Concierge Telemetry
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#29141E]">
          Real-Time Order Tracking
        </h1>
        <p className="text-xs sm:text-sm text-[#6E4F5E]">
          Enter your Order ID (e.g. <code>ORD-78241</code>) or WhatsApp phone number to check live status and shipment updates.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by Order ID (ORD-XXXXX) or Phone..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-white border border-[#F2B5C7] rounded-full text-[#29141E] focus:outline-none focus:ring-2 focus:ring-[#D1527A]/30 shadow-xs"
          />
          <Search className="w-4 h-4 text-[#8A6675] absolute left-3.5 top-3.5" />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-[#D1527A] hover:bg-[#B93E65] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md transition-all active:scale-95"
        >
          Track Parcel
        </button>
      </form>

      {errorMsg && (
        <div className="max-w-xl mx-auto p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Tracked Order Details Card */}
      {searchedOrder ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-200/80 shadow-md space-y-6">
          {/* Header Summary */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-pink-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-base sm:text-lg font-bold text-[#29141E]">
                  #{searchedOrder.id}
                </span>
                <span className={`text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full ${
                  searchedOrder.status === 'delivered' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : searchedOrder.status === 'dispatched' 
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-pink-100 text-[#9E3E61]'
                }`}>
                  {searchedOrder.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-[#7A5B69] mt-0.5">
                Invoice: <strong className="font-mono text-[#29141E]">{searchedOrder.invoiceNumber}</strong> · Placed on {new Date(searchedOrder.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveInvoiceOrder(searchedOrder)}
                className="px-3.5 py-2 bg-[#2B151F] hover:bg-[#D1527A] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View PDF Bill</span>
              </button>

              <a
                href={generateWhatsAppUrl(searchedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-[#25D366] hover:bg-[#1eb956] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>

          {/* Courier Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-[#FFF8FA] border border-pink-100 text-xs">
            <div>
              <span className="text-[#8A6675] block text-[11px]">Courier Partner</span>
              <strong className="text-[#29141E] text-sm">{searchedOrder.carrier}</strong>
            </div>
            <div>
              <span className="text-[#8A6675] block text-[11px]">Tracking Number</span>
              <strong className="text-[#D1527A] text-sm font-mono">{searchedOrder.trackingNumber}</strong>
            </div>
            <div>
              <span className="text-[#8A6675] block text-[11px]">Estimated Delivery</span>
              <strong className="text-[#29141E] text-sm">{searchedOrder.estimatedDelivery}</strong>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="pt-4 space-y-6">
            <h3 className="font-serif text-lg font-semibold text-[#29141E]">
              Shipment Journey
            </h3>

            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-pink-200">
              {searchedOrder.timeline.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  {/* Dot Icon */}
                  <div className={`absolute -left-6 sm:-left-8 w-6 h-6 rounded-full flex items-center justify-center text-white ${
                    step.isCompleted
                      ? 'bg-[#D1527A]'
                      : step.isCurrent
                      ? 'bg-amber-500 ring-4 ring-amber-100'
                      : 'bg-stone-300'
                  }`}>
                    {step.isCompleted ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Clock className="w-3.5 h-3.5" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-[#FFF9FA] p-3.5 rounded-xl border border-pink-100 text-xs">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm text-[#29141E]">{step.label}</h4>
                      <span className="text-[11px] text-[#8A6675] font-mono">{step.timestamp}</span>
                    </div>
                    <p className="text-[#593E4C] mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Items Summary in this Order */}
          <div className="border-t border-pink-100 pt-5 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9E3E61]">
              Items In This Parcel
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {searchedOrder.items.map((it, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 bg-pink-50/50 rounded-xl border border-pink-100 text-xs">
                  <img src={it.image} alt={it.productTitle} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#29141E] truncate">{it.productTitle}</p>
                    <p className="text-[11px] text-[#8A6675]">Qty: {it.quantity} · ${it.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-xs text-[#8A6675]">
          Search for an order above to inspect real-time progress.
        </div>
      )}
    </div>
  );
};
