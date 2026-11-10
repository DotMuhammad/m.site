import { Order } from '../types';

/**
 * Formats a phone number for WhatsApp URLs.
 * WhatsApp strictly requires the country code with NO leading zero and NO symbols (+, -, space).
 * E.g. Pakistan mobile 03478543812 -> 923478543812
 */
export function formatWhatsAppNumber(phone: string): string {
  if (!phone) return '923478543812';
  let clean = phone.replace(/\D/g, '');

  // If starts with 00, remove 00
  if (clean.startsWith('00')) {
    clean = clean.slice(2);
  }

  // If standard Pakistani number starting with 03 and length 11 (e.g. 03478543812)
  if (clean.startsWith('03') && clean.length === 11) {
    clean = '92' + clean.slice(1);
  }
  // If starts with single 0 and is 11 digits
  else if (clean.startsWith('0') && clean.length === 11) {
    clean = '92' + clean.slice(1);
  }
  // If already starts with 92 and length 12 (e.g. 923478543812)
  else if (clean.startsWith('92') && clean.length === 12) {
    // already in full international format
  }
  // If 10 digits without leading 0 (e.g. 3478543812)
  else if (clean.length === 10 && clean.startsWith('3')) {
    clean = '92' + clean;
  }

  return clean;
}

/**
 * Formats a human-readable display representation of the number
 */
export function formatDisplayPhone(phone: string): string {
  const clean = formatWhatsAppNumber(phone);
  if (clean.startsWith('92') && clean.length === 12) {
    return `+92 ${clean.slice(2, 5)} ${clean.slice(5)}`;
  }
  return phone;
}

/**
 * Generates clean, standard ASCII WhatsApp order text that does not break URL query strings
 * and will never freeze or crash WhatsApp Web.
 */
export function formatOrderMessage(order: Order, storeName = 'ETOILE & ROSE ATELIER'): string {
  const itemsText = order.items
    .map(
      (it, idx) =>
        `${idx + 1}. ${it.productTitle}${it.selectedSize ? ` (${it.selectedSize})` : ''} x ${it.quantity} = $${(it.price * it.quantity).toFixed(2)}`
    )
    .join('\n');

  return `*${storeName} - OFFICIAL ORDER*
--------------------------------
*Order ID:* #${order.id}
*Invoice No:* ${order.invoiceNumber}
*Date:* ${new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}

*CUSTOMER INFORMATION:*
*Name:* ${order.customer.fullName}
*Phone:* ${order.customer.phone}
*Address:* ${order.customer.address}, ${order.customer.city}, ${order.customer.country}
${order.customer.notes ? `*Notes:* ${order.customer.notes}\n` : ''}
*ITEMS ORDERED:*
${itemsText}
--------------------------------
*Subtotal:* $${order.subtotal.toFixed(2)}
${order.discountAmount > 0 ? `*Discount (${order.couponCodeApplied || 'PROMO'}):* -$${order.discountAmount.toFixed(2)}\n` : ''}*Shipping:* ${order.shippingFee === 0 ? 'FREE (Express Privilege)' : `$${order.shippingFee.toFixed(2)}`}
*TOTAL PAYABLE:* $${order.total.toFixed(2)}
*Payment Method:* ${order.paymentMethod.toUpperCase()}
*Current Status:* ${order.status.toUpperCase()}
--------------------------------
Official automated PDF bill has been generated in store system.
Please confirm order and delivery dispatch!`;
}

/**
 * Universal wa.me link with validated international phone number
 */
export function getWhatsAppUniversalUrl(phone: string, text: string): string {
  const formattedPhone = formatWhatsAppNumber(phone);
  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * Direct WhatsApp Web URL (avoids redirection delays on desktop)
 */
export function getWhatsAppWebUrl(phone: string, text: string): string {
  const formattedPhone = formatWhatsAppNumber(phone);
  return `https://web.whatsapp.com/send?phone=${formattedPhone}&text=${encodeURIComponent(text)}`;
}
