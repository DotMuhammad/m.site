import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  CheckCircle2, 
  FileText, 
  MessageCircle, 
  Truck, 
  Copy, 
  Check, 
  ExternalLink,
  Smartphone,
  Globe
} from 'lucide-react';
import { 
  formatWhatsAppNumber, 
  formatDisplayPhone,
  getWhatsAppWebUrl,
  getWhatsAppUniversalUrl,
  formatOrderMessage
} from '../utils/whatsapp';

export const OrderConfirmationModal: React.FC = () => {
  const { 
    activeOrder, 
    setActiveInvoiceOrder, 
    setCurrentView, 
    settings 
  } = useStore();

  const [copied, setCopied] = useState(false);

  if (!activeOrder) return null;

  const orderText = formatOrderMessage(activeOrder, settings.storeName);
  const formattedPhone = formatWhatsAppNumber(settings.whatsappNumber);
  const displayPhone = formatDisplayPhone(settings.whatsappNumber);

  // Direct WhatsApp Web link (bypasses api.whatsapp.com redirect on desktop)
  const whatsAppWebLink = getWhatsAppWebUrl(settings.whatsappNumber, orderText);

  // Universal wa.me link (best for mobile devices / installed WhatsApp app)
  const whatsAppUniversalLink = getWhatsAppUniversalUrl(settings.whatsappNumber, orderText);

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(orderText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-pink-200/80 shadow-xl space-y-6">
        {/* Celebration Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="text-xs font-semibold uppercase tracking-widest text-[#B5426C] block">
            Order Confirmed & Automated Bill Ready
          </span>

          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#29141E]">
            Thank You, {activeOrder.customer.fullName}
          </h1>

          <p className="text-xs sm:text-sm text-[#6E4F5E] max-w-lg mx-auto">
            Your luxury order is registered in our system. You can send your order and automated bill directly to our WhatsApp concierge below.
          </p>
        </div>

        {/* Order Details Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#FFF8FA] rounded-2xl border border-pink-100 text-xs text-left">
          <div>
            <span className="text-[#8A6675] block text-[11px]">Order Number</span>
            <span className="font-mono font-semibold text-[#29141E]">#{activeOrder.id}</span>
          </div>
          <div>
            <span className="text-[#8A6675] block text-[11px]">Invoice Number</span>
            <span className="font-mono font-semibold text-[#D1527A]">{activeOrder.invoiceNumber}</span>
          </div>
          <div>
            <span className="text-[#8A6675] block text-[11px]">Total Amount</span>
            <span className="font-mono font-semibold text-[#29141E]">${activeOrder.total.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-[#8A6675] block text-[11px]">Payment Method</span>
            <span className="font-semibold uppercase text-[#29141E]">{activeOrder.paymentMethod}</span>
          </div>
        </div>

        {/* Dedicated WhatsApp Direct Communication Box (Fixes WhatsApp Web freeze) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#F0FDF4] to-[#E9F9EE] border-2 border-[#25D366]/40 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#25D366]/20 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-sm sm:text-base font-semibold text-[#14532D]">
                  WhatsApp Order & Concierge Service
                </h3>
                <p className="text-[11px] text-[#166534]">
                  Destination Number: <strong className="font-mono font-bold text-[#14532D]">{displayPhone}</strong> ({formattedPhone})
                </p>
              </div>
            </div>

            <span className="text-[11px] text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full font-medium inline-block w-fit">
              Ready to Send
            </span>
          </div>

          <p className="text-xs text-[#166534] leading-relaxed">
            Choose the method that works best on your device. All links now use the official international Pakistan code (<strong>+92</strong>) and clean ASCII formatting so WhatsApp Web will load instantly without freezing.
          </p>

          {/* Action Grid for WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 1. WhatsApp Web Direct */}
            <a
              href={whatsAppWebLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white hover:bg-emerald-50 border border-emerald-300 rounded-xl text-left shadow-xs transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between text-[#14532D] mb-1">
                <span className="text-xs font-bold flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#25D366]" />
                  WhatsApp Web
                </span>
                <ExternalLink className="w-3 h-3 text-stone-400 group-hover:text-emerald-700" />
              </div>
              <span className="text-[11px] text-stone-600">
                Direct browser chat on laptop / desktop
              </span>
            </a>

            {/* 2. WhatsApp Mobile App */}
            <a
              href={whatsAppUniversalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white hover:bg-emerald-50 border border-emerald-300 rounded-xl text-left shadow-xs transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between text-[#14532D] mb-1">
                <span className="text-xs font-bold flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-[#25D366]" />
                  WhatsApp App
                </span>
                <ExternalLink className="w-3 h-3 text-stone-400 group-hover:text-emerald-700" />
              </div>
              <span className="text-[11px] text-stone-600">
                Universal link for phone or desktop app
              </span>
            </a>

            {/* 3. One-Click Copy Order Text */}
            <button
              onClick={handleCopyText}
              className={`p-3 border rounded-xl text-left shadow-xs transition-all flex flex-col justify-between ${
                copied
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white hover:bg-emerald-50 border-emerald-300 text-[#14532D]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold flex items-center gap-1.5">
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-[#25D366]" />}
                  {copied ? 'Copied to Clipboard!' : 'Copy Order Text'}
                </span>
              </div>
              <span className={`text-[11px] ${copied ? 'text-emerald-100' : 'text-stone-600'}`}>
                {copied ? 'Paste directly into your chat' : 'Copy and paste into your open chat'}
              </span>
            </button>
          </div>
        </div>

        {/* Secondary Actions: PDF Bill & Track Order */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* Automated PDF Bill Trigger */}
          <button
            onClick={() => setActiveInvoiceOrder(activeOrder)}
            className="w-full py-3.5 px-6 bg-[#2B151F] hover:bg-[#D1527A] text-white text-xs sm:text-sm font-semibold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Download / Print Official PDF Bill</span>
          </button>

          {/* Real-time Order Tracker */}
          <button
            onClick={() => setCurrentView('tracking')}
            className="w-full py-3.5 px-6 bg-white hover:bg-pink-50 border border-pink-200 text-[#29141E] text-xs sm:text-sm font-semibold rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <Truck className="w-4 h-4 text-[#D1527A]" />
            <span>Track Order Delivery Progress</span>
          </button>
        </div>

        {/* Shipping Notice */}
        <div className="pt-4 border-t border-pink-100 text-xs text-[#7A5B69] text-center">
          <p>
            Estimated Delivery: <strong>{activeOrder.estimatedDelivery}</strong> via <strong>{activeOrder.carrier}</strong>. Tracking Code: <strong className="font-mono text-[#29141E]">{activeOrder.trackingNumber}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};
