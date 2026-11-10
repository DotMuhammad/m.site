import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Coupon,
  StoreSettings,
  Order,
  OrderStatus,
  OrderTrackingStep,
  CustomerInfo,
  NotificationItem,
  ProductCategory
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_COUPONS,
  INITIAL_SETTINGS,
  INITIAL_ORDERS,
  INITIAL_NOTIFICATIONS
} from '../data/initialData';
import {
  formatWhatsAppNumber,
  formatOrderMessage,
  getWhatsAppUniversalUrl,
  getWhatsAppWebUrl
} from '../utils/whatsapp';

interface StoreContextType {
  // Navigation & Views
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  activeCategory: ProductCategory;
  setActiveCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Products CRUD
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Cart Financials
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  total: number;
  freeShippingProgress: number; // percentage 0 - 100

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Coupons
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;
  toggleCoupon: (code: string) => void;

  // Orders
  orders: Order[];
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  createOrder: (customer: CustomerInfo, paymentMethod: 'whatsapp' | 'stripe' | 'cod') => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string, carrier?: string) => void;
  getOrderById: (orderId: string) => Order | undefined;

  // WhatsApp Order & Automated Bill
  activeInvoiceOrder: Order | null;
  setActiveInvoiceOrder: (order: Order | null) => void;
  generateWhatsAppUrl: (order: Order) => string;
  generateWhatsAppWebUrl: (order: Order) => string;
  getOrderMessageText: (order: Order) => string;

  // Settings
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addNotification: (title: string, message: string, type: 'order' | 'shipping' | 'promo' | 'system', orderId?: string) => void;

  // Recently Viewed
  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Product) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Settings
  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('etoile_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('etoile_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('etoile_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('etoile_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('etoile_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    const saved = localStorage.getItem('etoile_applied_coupon');
    return saved ? JSON.parse(saved) : null;
  });
  const [couponError, setCouponError] = useState<string | null>(null);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('etoile_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState<Order | null>(null);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('etoile_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Recently Viewed
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('etoile_recent');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist State to LocalStorage
  useEffect(() => {
    localStorage.setItem('etoile_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('etoile_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('etoile_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('etoile_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('etoile_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('etoile_applied_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('etoile_applied_coupon');
    }
  }, [appliedCoupon]);

  useEffect(() => {
    localStorage.setItem('etoile_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('etoile_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('etoile_recent', JSON.stringify(recentlyViewedIds));
  }, [recentlyViewedIds]);

  // Financial Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minSpend) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = (subtotal * appliedCoupon.value) / 100;
      if (appliedCoupon.maxDiscount && discountAmount > appliedCoupon.maxDiscount) {
        discountAmount = appliedCoupon.maxDiscount;
      }
    } else {
      discountAmount = appliedCoupon.value;
    }
  }

  const isFreeShipping = subtotal >= settings.freeShippingThreshold || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : settings.shippingFee;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / settings.freeShippingThreshold) * 100));

  // Cart Management
  const addToCart = (
    product: Product,
    quantity = 1,
    selectedSize?: string,
    selectedColor?: string
  ) => {
    const size = selectedSize || (product.sizes && product.sizes[0]) || undefined;
    const color = selectedColor || (product.colors && product.colors[0]?.name) || undefined;
    const cartItemId = `${product.id}-${size || 'default'}-${color || 'default'}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: cartItemId, product, quantity, selectedSize: size, selectedColor: color }];
    });

    setIsCartOpen(true);
    addNotification('Added to Bag', `${product.name} (${quantity}x) has been placed in your shopping bag.`, 'system');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const product = products.find(p => p.id === productId);
      if (exists) {
        return prev.filter(id => id !== productId);
      } else {
        if (product) {
          addNotification('Saved to Wishlist', `${product.name} added to your personal atelier wishlist.`, 'system');
        }
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Coupons
  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find(c => c.code.toUpperCase() === cleanCode && c.isActive);

    if (!found) {
      setCouponError('Invalid or expired coupon code.');
      return false;
    }

    if (subtotal < found.minSpend) {
      setCouponError(`Minimum spend of $${found.minSpend} required for this code.`);
      return false;
    }

    setAppliedCoupon(found);
    setCouponError(null);
    addNotification('Privilege Code Applied', `Discount code ${found.code} successfully applied!`, 'promo');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons(prev => [coupon, ...prev]);
    addNotification('New Coupon Created', `Promo code ${coupon.code} is now live.`, 'system');
  };

  const deleteCoupon = (code: string) => {
    setCoupons(prev => prev.filter(c => c.code !== code));
    if (appliedCoupon?.code === code) {
      setAppliedCoupon(null);
    }
  };

  const toggleCoupon = (code: string) => {
    setCoupons(prev =>
      prev.map(c => (c.code === code ? { ...c, isActive: !c.isActive } : c))
    );
  };

  // Products CRUD
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now().toString().slice(-5)}`;
    const product: Product = { ...newProd, id };
    setProducts(prev => [product, ...prev]);
    addNotification('Product Added', `${product.name} has been added to the boutique collection.`, 'system');
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updated } : p))
    );
    addNotification('Product Updated', `Changes to product #${id} have been saved.`, 'system');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    addNotification('Product Removed', `Product #${id} was deleted from inventory.`, 'system');
  };

  // Orders
  const createOrder = (
    customer: CustomerInfo,
    paymentMethod: 'whatsapp' | 'stripe' | 'cod'
  ): Order => {
    const orderIdNum = Math.floor(10000 + Math.random() * 90000);
    const invoiceNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `ORD-${orderIdNum}`;
    const invoiceNumber = `INV-2026-${invoiceNum}`;
    const now = new Date();

    const orderItems = cart.map(item => ({
      productId: item.product.id,
      productTitle: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor,
      image: item.product.images[0]
    }));

    const initialTimeline: OrderTrackingStep[] = [
      {
        status: 'pending',
        label: 'Order Registered & Invoice Generated',
        description: `Order placed via ${paymentMethod.toUpperCase()}. Automated PDF invoice created.`,
        timestamp: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        isCompleted: true,
        isCurrent: paymentMethod === 'whatsapp' || paymentMethod === 'cod'
      },
      {
        status: 'confirmed',
        label: 'Payment & Concierge Verification',
        description: paymentMethod === 'stripe' ? 'Payment processed and verified via Stripe.' : 'Awaiting WhatsApp concierge confirmation.',
        timestamp: paymentMethod === 'stripe' ? now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Pending',
        isCompleted: paymentMethod === 'stripe',
        isCurrent: paymentMethod === 'stripe'
      },
      {
        status: 'packaging',
        label: 'Atelier Artisan Wrapping',
        description: 'Delicate tissue packaging with signature rose fragrance spritz and wax seal.',
        timestamp: 'Upcoming',
        isCompleted: false,
        isCurrent: false
      },
      {
        status: 'dispatched',
        label: 'Handed to Express Courier',
        description: 'Scheduled with DHL Express Prestige with live tracking updates.',
        timestamp: 'Upcoming',
        isCompleted: false,
        isCurrent: false
      },
      {
        status: 'delivered',
        label: 'Delivered with Signature',
        description: 'Delivered securely to recipient.',
        timestamp: 'Estimated 2-3 business days',
        isCompleted: false,
        isCurrent: false
      }
    ];

    const newOrder: Order = {
      id: orderId,
      invoiceNumber,
      createdAt: now.toISOString(),
      customer,
      items: orderItems,
      subtotal,
      discountAmount,
      couponCodeApplied: appliedCoupon?.code,
      shippingFee,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'stripe' ? 'paid' : paymentMethod === 'cod' ? 'cod_pending' : 'pending',
      status: paymentMethod === 'stripe' ? 'confirmed' : 'pending',
      trackingNumber: `ETR-${Math.floor(10000000 + Math.random() * 90000000)}-FR`,
      carrier: 'DHL Express Prestige',
      estimatedDelivery: new Date(Date.now() + 86400000 * 3).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      timeline: initialTimeline,
      whatsappSent: paymentMethod === 'whatsapp'
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrder(newOrder);

    // Push notification for the order
    addNotification(
      `Order Placed #${newOrder.id}`,
      `Thank you, ${customer.fullName}! Your invoice ${newOrder.invoiceNumber} is ready for download.`,
      'order',
      newOrder.id
    );

    // Reduce stock from products
    setProducts(prev =>
      prev.map(p => {
        const orderedItem = cart.find(c => c.product.id === p.id);
        if (orderedItem) {
          return { ...p, stock: Math.max(0, p.stock - orderedItem.quantity) };
        }
        return p;
      })
    );

    // Clear cart after placing order
    clearCart();

    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    trackingNumber?: string,
    carrier?: string
  ) => {
    const nowStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

    setOrders(prev =>
      prev.map(order => {
        if (order.id !== orderId) return order;

        const updatedTimeline = order.timeline.map(step => {
          if (step.status === status) {
            return { ...step, isCompleted: true, isCurrent: true, timestamp: nowStr };
          }
          return step;
        });

        // Trigger instant shipping push notification
        const statusDescriptions: Record<OrderStatus, string> = {
          pending: 'Order is under review.',
          confirmed: 'Payment verified and order confirmed.',
          packaging: 'Your boutique order is currently being hand-packed with wax seal.',
          dispatched: `Your parcel has been dispatched with ${carrier || order.carrier} (Tracking: ${trackingNumber || order.trackingNumber}).`,
          out_for_delivery: 'Your parcel is out for delivery today with the courier.',
          delivered: 'Package delivered and signed for. Enjoy your luxury items!',
          cancelled: 'Order has been cancelled.'
        };

        addNotification(
          `Shipping Alert: ${order.id} ${status.toUpperCase().replace('_', ' ')}`,
          statusDescriptions[status] || `Status updated to ${status}.`,
          'shipping',
          order.id
        );

        return {
          ...order,
          status,
          trackingNumber: trackingNumber || order.trackingNumber,
          carrier: carrier || order.carrier,
          timeline: updatedTimeline
        };
      })
    );
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(
      o =>
        o.id.toLowerCase() === orderId.toLowerCase() ||
        o.invoiceNumber.toLowerCase() === orderId.toLowerCase() ||
        o.customer.phone.replace(/[^0-9]/g, '').includes(orderId.replace(/[^0-9]/g, ''))
    );
  };

  // WhatsApp Order Helpers
  const getOrderMessageText = (order: Order): string => {
    return formatOrderMessage(order, settings.storeName);
  };

  const generateWhatsAppUrl = (order: Order): string => {
    const text = getOrderMessageText(order);
    return getWhatsAppUniversalUrl(settings.whatsappNumber, text);
  };

  const generateWhatsAppWebUrl = (order: Order): string => {
    const text = getOrderMessageText(order);
    return getWhatsAppWebUrl(settings.whatsappNumber, text);
  };

  // Settings
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    addNotification('Settings Saved', 'Boutique settings have been successfully updated.', 'system');
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (
    title: string,
    message: string,
    type: 'order' | 'shipping' | 'promo' | 'system',
    orderId?: string
  ) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      message,
      type,
      timestamp: 'Just now',
      read: false,
      orderId
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  // Recently Viewed
  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewedIds(prev => {
      const filtered = prev.filter(id => id !== product.id);
      return [product.id, ...filtered].slice(0, 8);
    });
  };

  const recentlyViewed = recentlyViewedIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <StoreContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProduct,
        setSelectedProduct,
        quickViewProduct,
        setQuickViewProduct,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        discountAmount,
        shippingFee,
        total,
        freeShippingProgress,
        wishlist,
        toggleWishlist,
        isInWishlist,
        coupons,
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        addCoupon,
        deleteCoupon,
        toggleCoupon,
        orders,
        activeOrder,
        setActiveOrder,
        createOrder,
        updateOrderStatus,
        getOrderById,
        activeInvoiceOrder,
        setActiveInvoiceOrder,
        generateWhatsAppUrl,
        generateWhatsAppWebUrl,
        getOrderMessageText,
        settings,
        updateSettings,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addNotification,
        recentlyViewed,
        addToRecentlyViewed
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
