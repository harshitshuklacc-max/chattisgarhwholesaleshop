import React, { useState } from 'react';
import { CartItem, CustomerDetails, Order } from '../types';
import { formatINR } from '../utils/whatsapp';
import { BUSINESS_INFO } from '../data/products';
import {
  X,
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  CheckCircle2,
  Lock,
  Building2,
  FileText,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderPlaced: (order: Order) => void;
}

const INDIAN_STATES = [
  'Chhattisgarh',
  'Madhya Pradesh',
  'Maharashtra',
  'Uttar Pradesh',
  'Odisha',
  'Jharkhand',
  'Bihar',
  'West Bengal',
  'Delhi NCR',
  'Rajasthan',
  'Gujarat',
  'Punjab',
  'Haryana',
  'Telangana',
  'Andhra Pradesh',
  'Karnataka',
  'Tamil Nadu',
  'Kerala',
  'Assam',
  'Uttarakhand',
  'Himachal Pradesh',
  'Jammu & Kashmir',
  'Goa',
  'Other State / UT'
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderPlaced,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    whatsappNumber: '',
    shopOrBusinessName: '',
    gstin: '',
    address: '',
    city: '',
    state: 'Chhattisgarh',
    pincode: '',
    transportPreference: 'transport-bilty',
    paymentMethod: 'upi-advance',
    notes: '',
  });

  const [sameAsPhone, setSameAsPhone] = useState(true);
  const [utrNumber, setUtrNumber] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Financial calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.selectedTierPrice * item.quantity, 0);
  const retailComparison = cartItems.reduce((sum, item) => sum + item.product.retailPrice * item.quantity, 0);
  const discountSavings = Math.max(0, retailComparison - subtotal);
  const transportCharge = formData.transportPreference === 'express-courier' ? 450 : 0; // Bilty is paid at depot, courier added
  const gstAmount = formData.gstin ? Math.round(subtotal * 0.18) : 0; // Optional formal GST invoice calculation
  const totalAmount = subtotal + transportCharge + gstAmount;

  const advancePayable = formData.paymentMethod === 'token-deposit' ? Math.round(totalAmount * 0.20) : totalAmount;
  const balancePayable = totalAmount - advancePayable;

  const handlePhoneChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      phone: val,
      whatsappNumber: sameAsPhone ? val : prev.whatsappNumber,
    }));
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText('9244021201@upi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your contact name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!formData.address.trim() || !formData.city.trim() || !formData.pincode.trim()) {
      setErrorMsg('Please enter complete delivery address and pincode for transport bilty booking.');
      return;
    }

    setIsSubmitting(true);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `WSC-${new Date().getFullYear()}-${randomSuffix}`;

    const newOrder: Order = {
      orderId,
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      customer: {
        ...formData,
        whatsappNumber: sameAsPhone ? formData.phone : formData.whatsappNumber || formData.phone,
        notes: formData.notes + (utrNumber ? ` (Payment Ref/UTR: ${utrNumber})` : '')
      },
      items: cartItems,
      subtotal,
      discount: discountSavings,
      transportCharge,
      gstAmount,
      totalAmount,
      advancePayable,
      balancePayable,
      status: 'PENDING_WHATSAPP_CONFIRMATION',
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderPlaced(newOrder);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-neutral-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 text-neutral-950 flex items-center justify-center font-black">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg text-white">
                B2B Wholesale Checkout
              </h2>
              <p className="text-xs text-neutral-400">
                Direct Importer Invoice • Raipur Central Warehouse Dispatch
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            title="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Content Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-h-[80vh] overflow-y-auto">
            {/* Left Column: Customer & Shipping Details */}
            <div className="lg:col-span-7 space-y-6">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Section 1: Business / Buyer Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-1 border-b border-neutral-200">
                  <Building2 className="w-4 h-4 text-amber-600" />
                  <h3 className="font-bold text-sm text-neutral-900">1. Buyer & Business Information</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Agrawal"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Shop / Event Firm Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Royal Stage & SFX Decorators"
                      value={formData.shopOrBusinessName}
                      onChange={(e) => setFormData({ ...formData, shopOrBusinessName: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Calling Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10 digit mobile"
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      GSTIN (Optional for Tax Bill)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 22AAAAA0000A1Z5"
                      value={formData.gstin}
                      onChange={(e) => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
                      className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 uppercase font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-neutral-600">
                  <input
                    type="checkbox"
                    id="sameAsPhone"
                    checked={sameAsPhone}
                    onChange={(e) => setSameAsPhone(e.target.checked)}
                    className="rounded border-neutral-300 text-amber-600 focus:ring-amber-500"
                  />
                  <label htmlFor="sameAsPhone" className="cursor-pointer select-none">
                    WhatsApp number is same as calling mobile (receives Bilty tracking)
                  </label>
                </div>
              </div>

              {/* Section 2: Delivery & Shipping Address */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-1 border-b border-neutral-200">
                  <Truck className="w-4 h-4 text-amber-600" />
                  <h3 className="font-bold text-sm text-neutral-900">2. Destination Delivery Address</h3>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Street Address / Landmark *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Shop No, Building, Transport Nagar or Near Landmark"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      City / District *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bilaspur"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      State *
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-2.5 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium cursor-pointer"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="6 Digits"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Transport Mode Radio */}
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-semibold text-neutral-700">
                    Preferred Shipping Mode:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <label
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        formData.transportPreference === 'transport-bilty'
                          ? 'border-amber-500 bg-amber-50/50'
                          : 'border-neutral-200 bg-white hover:bg-neutral-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="transport"
                        value="transport-bilty"
                        checked={formData.transportPreference === 'transport-bilty'}
                        onChange={() => setFormData({ ...formData, transportPreference: 'transport-bilty' })}
                        className="mt-0.5 text-amber-600 focus:ring-amber-500"
                      />
                      <div>
                        <p className="font-bold text-neutral-900">Transport Bilty (Depot)</p>
                        <p className="text-[11px] text-neutral-500">
                          Economical for heavy boxes. Pay freight at your local transport hub.
                        </p>
                      </div>
                    </label>

                    <label
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        formData.transportPreference === 'express-courier'
                          ? 'border-amber-500 bg-amber-50/50'
                          : 'border-neutral-200 bg-white hover:bg-neutral-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="transport"
                        value="express-courier"
                        checked={formData.transportPreference === 'express-courier'}
                        onChange={() => setFormData({ ...formData, transportPreference: 'express-courier' })}
                        className="mt-0.5 text-amber-600 focus:ring-amber-500"
                      />
                      <div>
                        <p className="font-bold text-neutral-900">Express Doorstep Courier</p>
                        <p className="text-[11px] text-neutral-500">
                          Direct to shop via DTDC/Delhivery (+₹450 packing & courier).
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Special Dispatch Notes (e.g., event date, transport preference)
                </label>
                <input
                  type="text"
                  placeholder="Need urgent dispatch by Thursday for wedding stage setup"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Right Column: Payment Mode & Billing Summary */}
            <div className="lg:col-span-5 space-y-4">
              {/* Payment Mode Selection */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-1 border-b border-neutral-200">
                  <CreditCard className="w-4 h-4 text-amber-600" />
                  <h3 className="font-bold text-sm text-neutral-900">3. B2B Payment Mode</h3>
                </div>

                <div className="space-y-2">
                  {/* Option A: UPI Advance */}
                  <div
                    onClick={() => setFormData({ ...formData, paymentMethod: 'upi-advance' })}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'upi-advance'
                        ? 'border-amber-500 bg-amber-50/40 shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment"
                          value="upi-advance"
                          checked={formData.paymentMethod === 'upi-advance'}
                          onChange={() => {}}
                          className="text-amber-600"
                        />
                        <span className="font-bold text-xs text-neutral-900">
                          Instant UPI QR / Direct Bank
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                        Fastest Dispatch
                      </span>
                    </div>

                    {formData.paymentMethod === 'upi-advance' && (
                      <div className="mt-3 pt-3 border-t border-amber-200/80 space-y-2.5">
                        <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-amber-200 text-xs">
                          <div>
                            <span className="text-neutral-400 text-[10px] block">UPI ID / VPA:</span>
                            <strong className="font-mono text-neutral-900 font-bold">9244021201@upi</strong>
                          </div>
                          <button
                            type="button"
                            onClick={handleCopyUPI}
                            className="px-2 py-1 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-medium flex items-center gap-1"
                          >
                            {copiedUpi ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>

                        {/* UPI QR Demo Presentation */}
                        <div className="flex items-center gap-3 p-2 bg-white rounded-lg border border-neutral-200">
                          <div className="w-16 h-16 bg-neutral-900 text-white rounded flex items-center justify-center flex-shrink-0">
                            <QrCode className="w-10 h-10 text-amber-400" />
                          </div>
                          <div className="text-[11px] text-neutral-600 leading-tight">
                            <p className="font-bold text-neutral-900">Scan via GPay / PhonePe / Paytm</p>
                            <p className="text-neutral-500 mt-0.5">Account: PANKAJ DHAMECHA</p>
                            <p className="text-amber-700 font-medium">Bank: Chhattisgarh Wholesale Hub</p>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-700 mb-0.5">
                            Transaction UTR / Reference ID (Optional):
                          </label>
                          <input
                            type="text"
                            placeholder="Enter 12-digit UTR if paid"
                            value={utrNumber}
                            onChange={(e) => setUtrNumber(e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Option B: Token Advance Deposit */}
                  <div
                    onClick={() => setFormData({ ...formData, paymentMethod: 'token-deposit' })}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'token-deposit'
                        ? 'border-amber-500 bg-amber-50/40 shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment"
                          value="token-deposit"
                          checked={formData.paymentMethod === 'token-deposit'}
                          onChange={() => {}}
                          className="text-amber-600"
                        />
                        <span className="font-bold text-xs text-neutral-900">
                          20% Advance Token + Balance on Bilty
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold bg-neutral-200 text-neutral-800 px-1.5 py-0.5 rounded">
                        Wholesale Standard
                      </span>
                    </div>
                    {formData.paymentMethod === 'token-deposit' && (
                      <p className="text-[11px] text-neutral-600 mt-2 pl-6">
                        Pay <strong>{formatINR(advancePayable)}</strong> now to book stock & carton packaging. Pay remaining <strong>{formatINR(balancePayable)}</strong> when collecting Bilty at your local transport hub.
                      </p>
                    )}
                  </div>

                  {/* Option C: Cash on Delivery / Counter */}
                  <div
                    onClick={() => setFormData({ ...formData, paymentMethod: 'cash-on-delivery' })}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'cash-on-delivery'
                        ? 'border-amber-500 bg-amber-50/40 shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        value="cash-on-delivery"
                        checked={formData.paymentMethod === 'cash-on-delivery'}
                        onChange={() => {}}
                        className="text-amber-600"
                      />
                      <span className="font-bold text-xs text-neutral-900">
                        Cash on Counter / Verifiable Raipur Godown
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Billing Summary Box */}
              <div className="p-4 rounded-xl bg-neutral-100/80 border border-neutral-200 space-y-2 text-xs">
                <h4 className="font-bold text-neutral-900 pb-1 border-b border-neutral-200">
                  Order Summary ({cartItems.length} Products)
                </h4>

                <div className="max-h-28 overflow-y-auto space-y-1.5 pr-1">
                  {cartItems.map((it) => (
                    <div key={it.product.id} className="flex justify-between text-[11px]">
                      <span className="truncate pr-2 text-neutral-700">
                        {it.product.name} (x{it.quantity})
                      </span>
                      <span className="font-mono font-semibold text-neutral-900 flex-shrink-0">
                        {formatINR(it.selectedTierPrice * it.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-neutral-200 space-y-1 text-neutral-600">
                  <div className="flex justify-between">
                    <span>Wholesale Subtotal:</span>
                    <span className="font-semibold text-neutral-900">{formatINR(subtotal)}</span>
                  </div>
                  {discountSavings > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Dealer Margin Savings:</span>
                      <span>-{formatINR(discountSavings)}</span>
                    </div>
                  )}
                  {transportCharge > 0 && (
                    <div className="flex justify-between">
                      <span>Express Courier Surcharge:</span>
                      <span>+{formatINR(transportCharge)}</span>
                    </div>
                  )}
                  {formData.gstin && (
                    <div className="flex justify-between text-neutral-600">
                      <span>GST (18% ITC Billable):</span>
                      <span>+{formatINR(gstAmount)}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-neutral-300 flex justify-between items-baseline text-sm font-extrabold text-neutral-950">
                  <span>Net Order Total:</span>
                  <span className="text-lg text-amber-700">{formatINR(totalAmount)}</span>
                </div>

                {formData.paymentMethod === 'token-deposit' && (
                  <div className="pt-1 text-[11px] text-neutral-700 bg-amber-100/70 p-2 rounded-lg">
                    <div className="flex justify-between">
                      <span>Advance to Book (20%):</span>
                      <strong className="text-amber-950">{formatINR(advancePayable)}</strong>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <span>Balance on Transport Arrival:</span>
                      <span>{formatINR(balancePayable)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 disabled:bg-neutral-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                {isSubmitting ? (
                  <span>Generating Order & WhatsApp Ticket...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Confirm Order & Open WhatsApp Ticket</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-neutral-400 leading-tight">
                Clicking confirm creates your official order receipt and immediately opens WhatsApp to share details directly with <strong>Pankaj Dhamecha ({BUSINESS_INFO.phone})</strong> for instant Bilty booking.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
