import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { ShopView } from './components/ShopView';
import { CheckoutView } from './components/CheckoutView';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTrackingView } from './components/OrderTrackingView';
import { WishlistView } from './components/WishlistView';
import { AdminDashboard } from './components/AdminDashboard';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AutomatedBillModal } from './components/AutomatedBillModal';
import { NotificationCenter } from './components/NotificationCenter';
import { Footer } from './components/Footer';

function MainAppContent() {
  const { 
    currentView, 
    selectedProduct, 
    setSelectedProduct, 
    quickViewProduct, 
    setQuickViewProduct,
    activeInvoiceOrder,
    setActiveInvoiceOrder
  } = useStore();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA] text-[#1E1418]">
      {/* Header with 3-zone contract */}
      <Header onOpenNotifications={() => setIsNotificationsOpen(true)} />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'shop' && <ShopView />}
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'order-confirmation' && <OrderConfirmationModal />}
        {currentView === 'tracking' && <OrderTrackingView />}
        {currentView === 'wishlist' && <WishlistView />}
        {currentView === 'admin' && <AdminDashboard />}
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Product Detail Modal (for detail view or quick view) */}
      {(selectedProduct || quickViewProduct) && (
        <ProductDetailModal
          product={selectedProduct || quickViewProduct}
          onClose={() => {
            setSelectedProduct(null);
            setQuickViewProduct(null);
          }}
        />
      )}

      {/* Automated PDF Bill & Tax Invoice Modal */}
      {activeInvoiceOrder && (
        <AutomatedBillModal
          order={activeInvoiceOrder}
          onClose={() => setActiveInvoiceOrder(null)}
        />
      )}

      {/* Shipping & Order Notification Center */}
      <NotificationCenter
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Luxury Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}
