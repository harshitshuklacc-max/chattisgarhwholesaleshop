import React, { useState, useEffect, useMemo } from 'react';
import { Product, CartItem, Order } from './types';
import { PRODUCTS, BUSINESS_INFO } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { BulkInquiryModal } from './components/BulkInquiryModal';
import { TrustBadges } from './components/TrustBadges';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { generateWhatsAppOrderUrl } from './utils/whatsapp';
import { Sparkles, MessageCircle, Phone, Package, SearchX } from 'lucide-react';

const CART_STORAGE_KEY = 'wsc_wholesale_cart_v1';
const ORDERS_STORAGE_KEY = 'wsc_wholesale_orders_v1';

export default function App() {
  // Cart State with LocalStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Recent Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filter & Search State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'moq-asc'>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  // Modal & Drawer visibility
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isBulkInquiryOpen, setIsBulkInquiryOpen] = useState<boolean>(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Sync Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (err) {
      console.error('Failed to sync cart', err);
    }
  }, [cartItems]);

  // Sync Orders to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (err) {
      console.error('Failed to sync orders', err);
    }
  }, [orders]);

  // Calculate tier price for a given product and quantity
  const getProductTierPrice = (product: Product, quantity: number): number => {
    const sortedTiers = [...product.wholesaleTiers].sort((a, b) => b.minQty - a.minQty);
    for (const tier of sortedTiers) {
      if (quantity >= tier.minQty) {
        return tier.pricePerUnit;
      }
    }
    return product.pricePerUnit;
  };

  // Add or update items in cart
  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          product,
          quantity: newQty,
          selectedTierPrice: getProductTierPrice(product, newQty),
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            quantity,
            selectedTierPrice: getProductTierPrice(product, quantity),
          },
        ];
      }
    });
    showToast(`Added ${quantity} x ${product.name.slice(0, 24)}... to cart!`);
  };

  const handleUpdateCartQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          return {
            ...item,
            quantity: newQty,
            selectedTierPrice: getProductTierPrice(item.product, newQty),
          };
        }
        return item;
      })
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // In-stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesHindi = product.hindiName?.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesCategory = product.categoryLabel.toLowerCase().includes(q);
        return matchesName || matchesHindi || matchesDesc || matchesCategory;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerUnit - b.pricePerUnit;
      if (sortBy === 'price-desc') return b.pricePerUnit - a.pricePerUnit;
      if (sortBy === 'moq-asc') return a.minOrderQty - b.minOrderQty;
      // Default: featured first, then bestsellers
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy, inStockOnly]);

  // Order Placement
  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCompletedOrder(newOrder);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  // Direct quick WhatsApp order for cart items
  const handleQuickWhatsAppCartOrder = () => {
    if (cartItems.length === 0) return;

    const dummyOrder: Order = {
      orderId: `WSC-QUICK-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-IN'),
      customer: {
        fullName: 'Wholesale Buyer (WhatsApp Inquiry)',
        phone: 'To be provided on chat',
        whatsappNumber: '',
        shopOrBusinessName: '',
        address: 'To be confirmed on WhatsApp',
        city: 'Raipur Transport Depot / All India',
        state: 'India',
        pincode: '',
        transportPreference: 'transport-bilty',
        paymentMethod: 'upi-advance',
      },
      items: cartItems,
      subtotal: cartItems.reduce((s, i) => s + i.selectedTierPrice * i.quantity, 0),
      discount: 0,
      transportCharge: 0,
      gstAmount: 0,
      totalAmount: cartItems.reduce((s, i) => s + i.selectedTierPrice * i.quantity, 0),
      advancePayable: cartItems.reduce((s, i) => s + i.selectedTierPrice * i.quantity, 0),
      balancePayable: 0,
      status: 'PENDING_WHATSAPP_CONFIRMATION',
    };

    const url = generateWhatsAppOrderUrl(dummyOrder);
    window.open(url, '_blank');
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 bg-neutral-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl border border-neutral-700 animate-fadeIn">
          {toastMessage}
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenBulkInquiry={() => setIsBulkInquiryOpen(true)}
      />

      {/* Hero Banner with Pankaj Dhamecha & Business Credentials */}
      <HeroBanner
        onExploreClick={() => {
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onBulkQuoteClick={() => setIsBulkInquiryOpen(true)}
      />

      {/* Main Product Catalog Section */}
      <main id="catalog-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs uppercase font-bold tracking-wider text-amber-700">
                Direct Importer Catalog
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight mt-1">
              Event Products & Cold Pyro Wholesale
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Minimum Order Quantities (MOQ) clearly indicated. Tier discounts applied automatically.
            </p>
          </div>

          {/* WhatsApp Direct Inquiry Quick Button */}
          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Namaste%20Pankaj%20Ji%20🙏%20Please%20send%20complete%20wholesale%20catalogue%20with%20prices`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Get Full Rate Card on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Category & Sorting Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          inStockOnly={inStockOnly}
          onInStockToggle={setInStockOnly}
          totalProducts={filteredProducts.length}
        />

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-3">
            <SearchX className="w-12 h-12 text-neutral-400 mx-auto" />
            <h3 className="text-base font-bold text-neutral-800">No event products match your search</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              We may have additional unlisted master cartons at our Raipur warehouse. Contact Pankaj Dhamecha directly at 9244021201 for availability.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setInStockOnly(false);
              }}
              className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onQuickView={setSelectedProductForModal}
              />
            ))}
          </div>
        )}
      </main>

      {/* Trust Badges & FAQ Section */}
      <TrustBadges />

      {/* Footer */}
      <Footer
        onSelectCategory={(catId) => setSelectedCategory(catId)}
        onOpenBulkInquiry={() => setIsBulkInquiryOpen(true)}
      />

      {/* Modals & Slide-overs */}
      <ProductModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onQuickWhatsAppOrder={handleQuickWhatsAppCartOrder}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderPlaced={handleOrderPlaced}
      />

      <OrderSuccessModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      <BulkInquiryModal
        isOpen={isBulkInquiryOpen}
        onClose={() => setIsBulkInquiryOpen(false)}
      />

      {/* Persistent WhatsApp Floating Help */}
      <WhatsAppFloatingButton />
    </div>
  );
}
