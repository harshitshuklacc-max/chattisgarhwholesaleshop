import { CartItem, CustomerDetails, Order, Product } from '../types';
import { BUSINESS_INFO } from '../data/products';

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateWhatsAppOrderUrl(order: Order): string {
  const { customer, items, orderId, totalAmount, advancePayable, balancePayable, paymentMethodDisplay } = {
    ...order,
    paymentMethodDisplay:
      order.customer.paymentMethod === 'upi-advance'
        ? '100% Secure UPI / Bank Transfer'
        : order.customer.paymentMethod === 'token-deposit'
        ? '20% Advance Token + Balance on Bilty Transport Delivery'
        : 'Cash on Delivery (Verifiable Hubs)'
  };

  const itemsList = items
    .map((item, index) => {
      const lineTotal = item.selectedTierPrice * item.quantity;
      return `${index + 1}. *${item.product.name}*\n   📦 Qty: ${item.quantity} ${item.product.unitType}\n   💰 Rate: ${formatINR(item.selectedTierPrice)} / unit\n   💵 Total: ${formatINR(lineTotal)}`;
    })
    .join('\n\n');

  const message = `🔥 *NEW B2B WHOLESALE ORDER - #${orderId}* 🔥
🏢 *Shop:* ${BUSINESS_INFO.displayName}
👤 *Owner:* ${BUSINESS_INFO.owner} (Call/WA: ${BUSINESS_INFO.phone})
━━━━━━━━━━━━━━━━━━━━━

📋 *CUSTOMER & DELIVERY DETAILS:*
• *Name:* ${customer.fullName}
• *Business / Shop:* ${customer.shopOrBusinessName || 'Direct Event Decorator'}
• *Mobile / WhatsApp:* ${customer.phone}
${customer.gstin ? `• *GSTIN:* ${customer.gstin}\n` : ''}• *Delivery Address:* ${customer.address}, ${customer.city}, ${customer.state} - PIN: ${customer.pincode}
• *Shipping Mode:* ${customer.transportPreference === 'transport-bilty' ? 'Bilty Transport (Raipur Hub / Local Depot)' : customer.transportPreference === 'express-courier' ? 'Express Doorstep Courier (DTDC / Delhivery)' : 'Self-Pickup at Raipur Central Godown'}

━━━━━━━━━━━━━━━━━━━━━
🛒 *ORDER ITEMS & WHOLESALE RATES:*
${itemsList}

━━━━━━━━━━━━━━━━━━━━━
📊 *BILLING SUMMARY:*
• Subtotal: ${formatINR(order.subtotal)}
• Wholesale Volume Savings: -${formatINR(order.discount)}
• Est. Transport / Handling: ${order.transportCharge === 0 ? 'To Pay at Transport Bilty' : formatINR(order.transportCharge)}
• *FINAL ORDER VALUE:* *${formatINR(totalAmount)}*
• *Payment Option:* ${paymentMethodDisplay}
${order.customer.paymentMethod === 'token-deposit' ? `• Advance Token (20%): ${formatINR(advancePayable)}\n• Balance on Bilty Delivery: ${formatINR(balancePayable)}` : ''}
${customer.notes ? `\n📝 *Special Instructions:* ${customer.notes}` : ''}

━━━━━━━━━━━━━━━━━━━━━
✅ *Please confirm dispatch date, Bilty receipt details, and booking approval.*
🙏 *Thank you, Pankaj Dhamecha Ji!*`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encoded}`;
}

export function generateWhatsAppProductInquiryUrl(product: Product, quantity?: number): string {
  const qty = quantity || product.minOrderQty;
  const message = `Namaste Pankaj Dhamecha Ji 🙏
I am inquiring from *${BUSINESS_INFO.displayName}* wholesale website:

🔥 *Product:* ${product.name}
📦 *Product ID:* ${product.id}
🎯 *Unit Type:* ${product.unitType}
📊 *Quantity Needed:* ${qty} units (MOQ: ${product.minOrderQty})
💰 *Wholesale Base Rate:* ${formatINR(product.pricePerUnit)} per ${product.unitType}

Could you please share:
1. Best master carton wholesale price for this quantity
2. Current stock availability at Raipur warehouse
3. Transport transit time to my state

Looking forward to your quick response!`;

  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function generateWhatsAppBulkQuoteUrl(data: {
  name: string;
  phone: string;
  businessName: string;
  state: string;
  requirements: string;
}): string {
  const message = `Namaste Pankaj Dhamecha Ji 🙏
I need a custom *Wholesale Master Carton Quotation*:

👤 *Name:* ${data.name}
🏢 *Shop / Business:* ${data.businessName}
📞 *Mobile:* ${data.phone}
📍 *Delivery State / City:* ${data.state}

📦 *Requirements / Event Products Needed:*
${data.requirements}

Please send your best bulk rate card and transport charges. Thank you!`;

  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
