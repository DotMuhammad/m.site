import React from 'react';
import { Order } from '../types';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Printer, 
  Download, 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck,
  Building,
  Calendar,
  Share2
} from 'lucide-react';
import { formatWhatsAppNumber } from '../utils/whatsapp';

interface AutomatedBillModalProps {
  order: Order | null;
  onClose: () => void;
}

export const AutomatedBillModal: React.FC<AutomatedBillModalProps> = ({ order, onClose }) => {
  const { settings } = useStore();

  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const formattedPhone = formatWhatsAppNumber(settings.whatsappNumber);
    const itemsList = order.items
      .map((it, idx) => `${idx + 1}. ${it.productTitle} x ${it.quantity} = $${(it.price * it.quantity).toFixed(2)}`)
      .join('\n');

    const msg = `*OFFICIAL BILL & INVOICE*
*Store:* ${settings.storeName}
*Invoice No:* ${order.invoiceNumber}
*Order ID:* #${order.id}
*Customer:* ${order.customer.fullName} (${order.customer.phone})
*Address:* ${order.customer.address}, ${order.customer.city}, ${order.customer.country}

*ITEMS PURCHASED:*
${itemsList}

--------------------------------
*Subtotal:* $${order.subtotal.toFixed(2)}
${order.discountAmount > 0 ? `*Discount (${order.couponCodeApplied}):* -$${order.discountAmount.toFixed(2)}\n` : ''}*Shipping:* ${order.shippingFee === 0 ? 'FREE' : `$${order.shippingFee.toFixed(2)}`}
*TOTAL PAYABLE:* $${order.total.toFixed(2)}
*Status:* ${order.status.toUpperCase()} (${order.paymentMethod.toUpperCase()})
*Tracking No:* ${order.trackingNumber}
--------------------------------
Automated bill verified by ${settings.storeName} Concierge.`;

    window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-pink-200 my-auto flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Controls Bar (Hidden during print) */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#FFF5F8] to-[#FFF0F4] border-b border-pink-200 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <h3 className="font-serif text-base sm:text-lg font-semibold text-[#29141E]">
              Automated Tax Invoice & Bill
            </h3>
            <span className="text-xs bg-pink-100 text-[#9E3E61] px-2.5 py-0.5 rounded-md font-mono font-medium">
              {order.invoiceNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-[#2B151F] hover:bg-[#D1527A] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="px-3 py-1.5 bg-[#25D366] hover:bg-[#1eb956] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
              title="Send to WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-500 hover:text-black hover:bg-stone-100 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Paper Container */}
        <div id="printable-invoice" className="p-6 sm:p-10 bg-white text-[#1E1418] space-y-6">
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b-2 border-pink-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#2B151F]">
                  Étoile & Rose
                </span>
                <span className="text-[10px] tracking-widest uppercase bg-pink-50 border border-pink-200 text-[#9E3E61] px-2 py-0.5 rounded">
                  Atelier Paris
                </span>
              </div>
              <p className="text-xs text-[#7A5B69] mt-1">Haute Parfumerie & Fine Couture</p>
              <p className="text-[11px] text-[#7A5B69] mt-0.5">14 Rue du Faubourg Saint-Honoré, 75008 Paris</p>
              <p className="text-[11px] text-[#7A5B69] font-mono">
                WhatsApp Hotline: <strong>{settings.whatsappNumber}</strong> · concierge@etoile-rose.com
              </p>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B5426C] block">
                Official Bill of Sale
              </span>
              <p className="font-mono text-sm font-semibold text-[#29141E]">
                {order.invoiceNumber}
              </p>
              <p className="text-xs text-[#7A5B69]">
                Date: {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <p className="text-xs text-[#7A5B69]">
                Order Ref: <strong className="text-[#29141E] font-mono">#{order.id}</strong>
              </p>
            </div>
          </div>

          {/* Customer & Shipping Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-2xl bg-[#FFF9FA] border border-pink-100 text-xs">
            <div>
              <span className="font-semibold uppercase tracking-wider text-[#9E3E61] block mb-1">
                Billed & Shipped To:
              </span>
              <p className="font-semibold text-sm text-[#29141E]">{order.customer.fullName}</p>
              <p className="text-[#593E4C]">{order.customer.address} {order.customer.apartment || ''}</p>
              <p className="text-[#593E4C]">{order.customer.city}, {order.customer.state || ''} {order.customer.postalCode}</p>
              <p className="text-[#593E4C]">{order.customer.country}</p>
              <p className="text-[#593E4C] mt-1">
                Phone: <strong className="font-mono">{order.customer.phone}</strong> · Email: {order.customer.email}
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-semibold uppercase tracking-wider text-[#9E3E61] block mb-1">
                Dispatch & Verification:
              </span>
              <p className="text-[#593E4C]">
                Shipping Method: <strong>{order.carrier}</strong>
              </p>
              <p className="text-[#593E4C]">
                Tracking Number: <strong className="font-mono">{order.trackingNumber}</strong>
              </p>
              <p className="text-[#593E4C]">
                Payment Channel: <strong className="uppercase">{order.paymentMethod}</strong> ({order.paymentStatus.toUpperCase()})
              </p>
              <p className="text-[#593E4C]">
                Estimated Arrival: <strong>{order.estimatedDelivery}</strong>
              </p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-pink-200 text-[#9E3E61] uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-3">Item Description</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Unit Price</th>
                  <th className="py-2.5 px-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-100">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-pink-50/30">
                    <td className="py-3 px-3">
                      <p className="font-semibold text-sm text-[#29141E]">{item.productTitle}</p>
                      <p className="text-[11px] text-[#8A6675]">
                        {item.selectedSize && `Size: ${item.selectedSize} `}
                        {item.selectedColor && `· Color: ${item.selectedColor}`}
                      </p>
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-semibold tabular-nums">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-semibold tabular-nums text-[#29141E]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Breakdown */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t-2 border-pink-200">
            {/* Authenticity Stamp */}
            <div className="p-3 bg-pink-50 border border-pink-200 rounded-xl text-center flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-[#D1527A] shrink-0" />
              <div className="text-left text-[11px] text-[#593E4C]">
                <strong className="block text-[#9E3E61] uppercase tracking-wider">Automated Verification</strong>
                <span>Certified authentic by Étoile & Rose Atelier. WhatsApp confirmed.</span>
              </div>
            </div>

            {/* Price Column */}
            <div className="w-full sm:w-64 space-y-1.5 text-xs text-[#593E4C]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-mono tabular-nums font-semibold text-[#29141E]">${order.subtotal.toFixed(2)}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-[#D1527A]">
                  <span>Discount ({order.couponCodeApplied || 'VOUCHER'}):</span>
                  <span className="font-mono tabular-nums font-semibold">-${order.discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="font-mono tabular-nums font-semibold text-[#29141E]">
                  {order.shippingFee === 0 ? 'FREE (Express)' : `$${order.shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#29141E] border-t-2 border-pink-300 pt-2">
                <span>Total Paid / Due:</span>
                <span className="font-mono tabular-nums text-[#D1527A]">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer Terms & Barcode / QR Simulation */}
          <div className="pt-6 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#7A5B69]">
            <div>
              <p className="font-medium text-[#29141E]">Thank you for your patronage of Étoile & Rose Atelier.</p>
              <p>For any concierge inquiries or order changes, contact our direct WhatsApp at <strong>{settings.whatsappNumber}</strong>.</p>
            </div>

            {/* Stylized Barcode Simulation */}
            <div className="text-center font-mono text-[9px] tracking-widest text-stone-500">
              <div className="h-6 flex items-end justify-center gap-[2px] opacity-70">
                <span className="w-[1px] h-full bg-black"></span>
                <span className="w-[2px] h-full bg-black"></span>
                <span className="w-[1px] h-3/4 bg-black"></span>
                <span className="w-[3px] h-full bg-black"></span>
                <span className="w-[1px] h-full bg-black"></span>
                <span className="w-[2px] h-2/3 bg-black"></span>
                <span className="w-[1px] h-full bg-black"></span>
                <span className="w-[4px] h-full bg-black"></span>
                <span className="w-[2px] h-3/4 bg-black"></span>
                <span className="w-[1px] h-full bg-black"></span>
                <span className="w-[3px] h-full bg-black"></span>
                <span className="w-[1px] h-full bg-black"></span>
              </div>
              <span>{order.invoiceNumber}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
