export interface WholesaleTier {
  minQty: number; // e.g. 5, 20, 50 boxes
  pricePerUnit: number; // in INR
  label: string;
}

export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  category: 'cold-pyro' | 'smoke-sfx' | 'wedding-entry' | 'lighting-laser' | 'party-decor' | 'confetti-bubble';
  categoryLabel: string;
  description: string;
  pricePerUnit: number; // wholesale base price per piece/box
  retailPrice: number; // market price for markup comparison
  unitType: string; // 'Box (5 Pcs)', 'Master Carton (50 Pcs)', 'Piece', 'Set of 4', 'Pack of 10'
  minOrderQty: number; // Minimum Order Quantity
  packagingDetails: string;
  image: string;
  gallery?: string[];
  inStock: boolean;
  stockCount: number;
  featured?: boolean;
  bestseller?: boolean;
  specifications: { [key: string]: string };
  wholesaleTiers: WholesaleTier[];
  safetyNotes?: string;
}

export interface CartItem {
  product: Product;
  quantity: number; // in units (boxes/pieces)
  selectedTierPrice: number;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  whatsappNumber: string;
  shopOrBusinessName: string;
  gstin?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  transportPreference: 'transport-bilty' | 'express-courier' | 'raipur-pickup';
  paymentMethod: 'upi-advance' | 'token-deposit' | 'cash-on-delivery';
  notes?: string;
}

export interface Order {
  orderId: string;
  date: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  discount: number;
  transportCharge: number;
  gstAmount: number;
  totalAmount: number;
  advancePayable: number;
  balancePayable: number;
  status: 'PENDING_WHATSAPP_CONFIRMATION' | 'CONFIRMED' | 'DISPATCHED';
}
