export type ProductCategory = 
  | 'All'
  | 'Fragrance'
  | 'Skincare'
  | 'Fine Jewelry'
  | 'Silk Couture'
  | 'Gift Sets';

export interface ProductVariantColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  subcategory: string;
  description: string;
  details: string[];
  ingredients?: string;
  materials?: string;
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  stock: number;
  images: string[];
  sizes?: string[];
  colors?: ProductVariantColor[];
  tags: string[];
}

export interface CartItem {
  id: string; // unique item id combining product id and chosen variants
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minSpend: number;
  maxDiscount?: number;
  expiresAt?: string;
  isActive: boolean;
  description: string;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  notes?: string;
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  price: number;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  image: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'packaging'
  | 'dispatched'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderTrackingStep {
  status: OrderStatus;
  label: string;
  description: string;
  timestamp: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface Order {
  id: string;
  invoiceNumber: string;
  createdAt: string;
  customer: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  couponCodeApplied?: string;
  shippingFee: number;
  total: number;
  paymentMethod: 'whatsapp' | 'stripe' | 'cod';
  paymentStatus: 'pending' | 'paid' | 'cod_pending';
  status: OrderStatus;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  timeline: OrderTrackingStep[];
  whatsappSent?: boolean;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  whatsappNumber: string;
  currencySymbol: string;
  freeShippingThreshold: number;
  shippingFee: number;
  supportEmail: string;
  address: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'shipping' | 'promo' | 'system';
  timestamp: string;
  read: boolean;
  orderId?: string;
}
