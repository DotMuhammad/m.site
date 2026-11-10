import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, ProductCategory, OrderStatus, Coupon } from '../types';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  Package, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  MessageCircle, 
  Settings, 
  Tag, 
  X,
  Eye,
  RefreshCw
} from 'lucide-react';
import { formatWhatsAppNumber } from '../utils/whatsapp';

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    orders, 
    updateOrderStatus, 
    coupons, 
    addCoupon, 
    deleteCoupon, 
    toggleCoupon, 
    settings, 
    updateSettings,
    setActiveInvoiceOrder
  } = useStore();

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'coupons' | 'settings'>('orders');

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<Omit<Product, 'id'>>({
    name: '',
    slug: '',
    subtitle: '',
    price: 150,
    originalPrice: 180,
    category: 'Fragrance',
    subcategory: 'Haute Parfumerie',
    description: '',
    details: ['Handcrafted luxury presentation', 'Limited edition'],
    ingredients: '',
    rating: 4.9,
    reviewsCount: 12,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    stock: 20,
    images: ['/src/assets/images/product_perfume_rose_crystal_1794291819176.jpg'],
    sizes: ['50ml', '100ml'],
    tags: ['Luxury', 'Signature']
  });

  // Coupon Modal State
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [couponForm, setCouponForm] = useState<Coupon>({
    code: '',
    discountType: 'percentage',
    value: 15,
    minSpend: 100,
    isActive: true,
    description: 'Atelier special promotion'
  });

  // Settings State
  const [settingsForm, setSettingsForm] = useState(settings);

  // Filter & Search
  const [productSearch, setProductSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState<string>('all');

  // KPI Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : o.total), 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const lowStockCount = products.filter(p => p.stock < 10).length;

  // Open Edit Product
  const handleOpenEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setProductForm({
      name: prod.name,
      slug: prod.slug,
      subtitle: prod.subtitle,
      price: prod.price,
      originalPrice: prod.originalPrice,
      category: prod.category,
      subcategory: prod.subcategory,
      description: prod.description,
      details: prod.details,
      ingredients: prod.ingredients || '',
      rating: prod.rating,
      reviewsCount: prod.reviewsCount,
      isFeatured: prod.isFeatured || false,
      isBestSeller: prod.isBestSeller || false,
      isNewArrival: prod.isNewArrival || false,
      stock: prod.stock,
      images: prod.images,
      sizes: prod.sizes || [],
      tags: prod.tags
    });
    setIsProductModalOpen(true);
  };

  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      slug: '',
      subtitle: '',
      price: 120,
      originalPrice: 150,
      category: 'Fragrance',
      subcategory: 'Haute Parfumerie',
      description: 'Handcrafted luxury creation with natural Damask rose essences.',
      details: ['Made in Paris', 'Complimentary gift box'],
      ingredients: 'Natural botanicals, fine fragrance oils.',
      rating: 5.0,
      reviewsCount: 1,
      isFeatured: true,
      isBestSeller: false,
      isNewArrival: true,
      stock: 25,
      images: ['/src/assets/images/product_perfume_rose_crystal_1794291819176.jpg'],
      sizes: ['50ml', '100ml'],
      tags: ['New', 'Atelier Exclusive']
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim()) return;

    if (editingProductId) {
      updateProduct(editingProductId, productForm);
    } else {
      addProduct({
        ...productForm,
        slug: productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      });
    }
    setIsProductModalOpen(false);
  };

  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponForm.code.trim()) return;
    addCoupon({
      ...couponForm,
      code: couponForm.code.trim().toUpperCase()
    });
    setIsCouponModalOpen(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Admin Executive Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pink-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#B5426C] uppercase bg-pink-100/70 px-3 py-1 rounded-full mb-1">
            <span>Executive Command Center</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#29141E]">
            Store & WhatsApp Order Management
          </h1>
          <p className="text-xs text-[#7A5B69]">
            Manage products, customer orders, instant WhatsApp billing, inventory stock, and coupons with client-side localStorage persistence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#7A5B69]">Connected WhatsApp:</span>
          <span className="font-mono text-xs font-semibold bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-300">
            {settings.whatsappNumber}
          </span>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-pink-200/80 shadow-xs">
          <div className="flex items-center justify-between text-[#8A6675] text-xs">
            <span>Gross Sales</span>
            <DollarSign className="w-4 h-4 text-[#D1527A]" />
          </div>
          <p className="text-2xl font-serif font-bold text-[#29141E] mt-2 tabular-nums">
            ${totalRevenue.toFixed(2)}
          </p>
          <span className="text-[11px] text-emerald-700 font-medium">All recorded sales</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-pink-200/80 shadow-xs">
          <div className="flex items-center justify-between text-[#8A6675] text-xs">
            <span>Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-[#D1527A]" />
          </div>
          <p className="text-2xl font-serif font-bold text-[#29141E] mt-2 tabular-nums">
            {totalOrders}
          </p>
          <span className="text-[11px] text-[#7A5B69]">WhatsApp & Stripe orders</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-pink-200/80 shadow-xs">
          <div className="flex items-center justify-between text-[#8A6675] text-xs">
            <span>Average Order</span>
            <TrendingUp className="w-4 h-4 text-[#D1527A]" />
          </div>
          <p className="text-2xl font-serif font-bold text-[#29141E] mt-2 tabular-nums">
            ${avgOrderValue.toFixed(2)}
          </p>
          <span className="text-[11px] text-[#7A5B69]">AOV across all channels</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-pink-200/80 shadow-xs">
          <div className="flex items-center justify-between text-[#8A6675] text-xs">
            <span>Low Stock Alerts</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-serif font-bold text-amber-600 mt-2 tabular-nums">
            {lowStockCount}
          </p>
          <span className="text-[11px] text-amber-700">Items below 10 units</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-pink-200 pb-2">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === 'orders'
              ? 'bg-[#D1527A] text-white shadow-xs'
              : 'text-[#593E4C] hover:bg-pink-100/60'
          }`}
        >
          Customer Orders ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === 'products'
              ? 'bg-[#D1527A] text-white shadow-xs'
              : 'text-[#593E4C] hover:bg-pink-100/60'
          }`}
        >
          Products & Stock ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('coupons')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === 'coupons'
              ? 'bg-[#D1527A] text-white shadow-xs'
              : 'text-[#593E4C] hover:bg-pink-100/60'
          }`}
        >
          Coupons & Discounts ({coupons.length})
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === 'settings'
              ? 'bg-[#D1527A] text-white shadow-xs'
              : 'text-[#593E4C] hover:bg-pink-100/60'
          }`}
        >
          Store & WhatsApp Settings
        </button>
      </div>

      {/* TAB 1: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-pink-200/80 shadow-xs overflow-hidden space-y-4 p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-lg font-semibold text-[#29141E]">Customer Orders & Invoices</h2>
              <p className="text-xs text-[#7A5B69]">
                Update order statuses to automatically trigger instant customer push notifications.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8A6675]">Status Filter:</span>
              <select
                value={orderFilter}
                onChange={e => setOrderFilter(e.target.value)}
                className="text-xs bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl px-3 py-1.5 text-[#29141E] focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="packaging">Packaging</option>
                <option value="dispatched">Dispatched</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-pink-200 text-[#9E3E61] uppercase font-semibold">
                  <th className="py-3 px-3">Order / Invoice</th>
                  <th className="py-3 px-3">Customer & WhatsApp</th>
                  <th className="py-3 px-3">Items</th>
                  <th className="py-3 px-3">Total Amount</th>
                  <th className="py-3 px-3">Payment</th>
                  <th className="py-3 px-3">Status Updater</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-100">
                {orders
                  .filter(o => orderFilter === 'all' || o.status === orderFilter)
                  .map(order => (
                    <tr key={order.id} className="hover:bg-pink-50/40">
                      <td className="py-3.5 px-3">
                        <p className="font-mono font-bold text-[#29141E]">#{order.id}</p>
                        <p className="text-[11px] text-[#8A6675] font-mono">{order.invoiceNumber}</p>
                        <span className="text-[10px] text-stone-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </td>

                      <td className="py-3.5 px-3">
                        <p className="font-semibold text-[#29141E]">{order.customer.fullName}</p>
                        <p className="text-[11px] text-[#8A6675] font-mono">{order.customer.phone}</p>
                        <p className="text-[10px] text-stone-500 truncate max-w-xs">{order.customer.city}, {order.customer.country}</p>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="font-semibold text-[#29141E] tabular-nums">
                          {order.items.reduce((s, i) => s + i.quantity, 0)} items
                        </span>
                        <p className="text-[11px] text-[#8A6675] truncate max-w-xs">
                          {order.items.map(i => i.productTitle).join(', ')}
                        </p>
                      </td>

                      <td className="py-3.5 px-3 font-semibold text-[#29141E] tabular-nums text-sm">
                        ${order.total.toFixed(2)}
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-pink-100 text-[#9E3E61]">
                          {order.paymentMethod}
                        </span>
                      </td>

                      <td className="py-3.5 px-3">
                        <select
                          value={order.status}
                          onChange={e => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className="bg-white border border-[#F2B5C7] text-xs font-semibold rounded-lg px-2 py-1 text-[#29141E] focus:outline-none focus:ring-1 focus:ring-[#D1527A]"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="packaging">Packaging</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-3 text-right space-x-2">
                        <button
                          onClick={() => setActiveInvoiceOrder(order)}
                          className="p-1.5 text-stone-600 hover:text-[#D1527A] hover:bg-pink-100 rounded-lg transition-colors"
                          title="View Official PDF Bill"
                        >
                          <FileText className="w-4 h-4" />
                        </button>

                        <a
                          href={`https://wa.me/${formatWhatsAppNumber(order.customer.phone)}?text=${encodeURIComponent(`Hello ${order.customer.fullName}! Regarding your order #${order.id}...`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block p-1.5 text-[#25D366] hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Message customer on WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS CRUD */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl border border-pink-200/80 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-lg font-semibold text-[#29141E]">Product Inventory & Pricing</h2>
              <p className="text-xs text-[#7A5B69]">Add new luxury items, adjust prices, and manage stock quantities.</p>
            </div>

            <button
              onClick={handleOpenAddProduct}
              className="px-4 py-2.5 bg-[#D1527A] hover:bg-[#B93E65] text-white text-xs font-semibold rounded-full shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Product Search */}
          <div className="relative max-w-sm">
            <input
              type="text"
              placeholder="Search inventory by title or category..."
              value={productSearch}
              onChange={e => setProductSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl text-[#29141E] focus:outline-none"
            />
            <Search className="w-3.5 h-3.5 text-[#8A6675] absolute left-3 top-3" />
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-pink-200 text-[#9E3E61] uppercase font-semibold">
                  <th className="py-3 px-3">Product</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Price</th>
                  <th className="py-3 px-3">Stock Units</th>
                  <th className="py-3 px-3">Rating</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-100">
                {products
                  .filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.category.toLowerCase().includes(productSearch.toLowerCase()))
                  .map(prod => (
                    <tr key={prod.id} className="hover:bg-pink-50/40">
                      <td className="py-3 px-3 flex items-center gap-3">
                        <img src={prod.images[0]} alt={prod.name} className="w-12 h-12 rounded-xl object-cover bg-pink-50 shrink-0" />
                        <div>
                          <p className="font-semibold text-sm text-[#29141E]">{prod.name}</p>
                          <p className="text-[11px] text-[#8A6675] line-clamp-1">{prod.subtitle}</p>
                        </div>
                      </td>

                      <td className="py-3 px-3 text-[#593E4C]">
                        <span className="px-2.5 py-1 bg-pink-50 border border-pink-100 rounded-lg font-medium text-[11px]">
                          {prod.category}
                        </span>
                      </td>

                      <td className="py-3 px-3 font-semibold tabular-nums text-sm text-[#29141E]">
                        ${prod.price.toFixed(2)}
                      </td>

                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateProduct(prod.id, { stock: Math.max(0, prod.stock - 1) })}
                            className="w-5 h-5 bg-pink-100 hover:bg-pink-200 text-[#29141E] rounded flex items-center justify-center font-bold"
                          >
                            -
                          </button>
                          <span className={`font-mono font-semibold tabular-nums ${prod.stock < 10 ? 'text-rose-600 font-bold' : 'text-[#29141E]'}`}>
                            {prod.stock}
                          </span>
                          <button
                            onClick={() => updateProduct(prod.id, { stock: prod.stock + 1 })}
                            className="w-5 h-5 bg-pink-100 hover:bg-pink-200 text-[#29141E] rounded flex items-center justify-center font-bold"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td className="py-3 px-3 font-semibold text-[#29141E] tabular-nums">
                        ★ {prod.rating} ({prod.reviewsCount})
                      </td>

                      <td className="py-3 px-3 text-right space-x-1">
                        <button
                          onClick={() => handleOpenEditProduct(prod)}
                          className="p-1.5 text-stone-600 hover:text-[#D1527A] hover:bg-pink-100 rounded-lg transition-colors"
                          title="Edit Product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete ${prod.name}?`)) {
                              deleteProduct(prod.id);
                            }
                          }}
                          className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: COUPONS & DISCOUNTS */}
      {activeTab === 'coupons' && (
        <div className="bg-white rounded-3xl border border-pink-200/80 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-lg font-semibold text-[#29141E]">Promotional Coupons & Privileges</h2>
              <p className="text-xs text-[#7A5B69]">Configure percentage and fixed voucher codes for customer checkout.</p>
            </div>

            <button
              onClick={() => setIsCouponModalOpen(true)}
              className="px-4 py-2.5 bg-[#D1527A] hover:bg-[#B93E65] text-white text-xs font-semibold rounded-full shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create Coupon</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {coupons.map(coupon => (
              <div 
                key={coupon.code} 
                className={`p-4 rounded-2xl border-2 transition-all ${
                  coupon.isActive ? 'border-pink-300 bg-[#FFF8FA]' : 'border-stone-200 bg-stone-50 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-base font-bold text-[#D1527A]">
                    {coupon.code}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleCoupon(coupon.code)}
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        coupon.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {coupon.isActive ? 'Active' : 'Disabled'}
                    </button>
                    <button
                      onClick={() => deleteCoupon(coupon.code)}
                      className="p-1 text-stone-400 hover:text-rose-600 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-[#29141E] font-medium">{coupon.description}</p>
                <div className="mt-3 pt-3 border-t border-pink-100 text-[11px] text-[#7A5B69] flex justify-between">
                  <span>
                    Discount: <strong>{coupon.discountType === 'percentage' ? `${coupon.value}%` : `$${coupon.value}`}</strong>
                  </span>
                  <span>Min Spend: <strong>${coupon.minSpend}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: STORE SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl border border-pink-200/80 shadow-xs p-6 sm:p-8 space-y-6 max-w-2xl">
          <div>
            <h2 className="font-serif text-lg font-semibold text-[#29141E]">Boutique Settings & WhatsApp Number</h2>
            <p className="text-xs text-[#7A5B69]">
              Configure contact numbers, WhatsApp direct order destination, and free shipping rules.
            </p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#4A323D] font-semibold mb-1">
                WhatsApp Order Destination Number *
              </label>
              <input
                type="text"
                value={settingsForm.whatsappNumber}
                onChange={e => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl font-mono text-sm font-semibold text-[#29141E] focus:outline-none focus:ring-2 focus:ring-[#D1527A]/30"
                required
              />
              <p className="text-[11px] text-[#8A6675] mt-1">
                Orders and chat bills will be routed to this number (e.g. 03478543812).
              </p>
            </div>

            <div>
              <label className="block text-[#4A323D] font-semibold mb-1">
                Store Name
              </label>
              <input
                type="text"
                value={settingsForm.storeName}
                onChange={e => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl text-[#29141E] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#4A323D] font-semibold mb-1">
                  Free Shipping Threshold ($)
                </label>
                <input
                  type="number"
                  value={settingsForm.freeShippingThreshold}
                  onChange={e => setSettingsForm({ ...settingsForm, freeShippingThreshold: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl font-mono text-[#29141E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#4A323D] font-semibold mb-1">
                  Standard Courier Fee ($)
                </label>
                <input
                  type="number"
                  value={settingsForm.shippingFee}
                  onChange={e => setSettingsForm({ ...settingsForm, shippingFee: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl font-mono text-[#29141E] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#4A323D] font-semibold mb-1">
                Concierge Support Email
              </label>
              <input
                type="email"
                value={settingsForm.supportEmail}
                onChange={e => setSettingsForm({ ...settingsForm, supportEmail: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl text-[#29141E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#4A323D] font-semibold mb-1">
                Paris Boutique Physical Address
              </label>
              <input
                type="text"
                value={settingsForm.address}
                onChange={e => setSettingsForm({ ...settingsForm, address: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl text-[#29141E] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-[#D1527A] hover:bg-[#B93E65] text-white text-xs font-semibold rounded-full shadow-md transition-colors"
            >
              Save Store Settings
            </button>
          </form>
        </div>
      )}

      {/* PRODUCT CREATE / EDIT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-pink-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <h3 className="font-serif text-lg font-semibold text-[#29141E]">
                {editingProductId ? 'Edit Boutique Product' : 'Add New Boutique Creation'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#4A323D] font-semibold mb-1">Product Title *</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Rose Velours Eau de Parfum"
                  className="w-full px-3.5 py-2 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl text-[#29141E] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[#4A323D] font-semibold mb-1">Subtitle / Key Notes</label>
                <input
                  type="text"
                  value={productForm.subtitle}
                  onChange={e => setProductForm({ ...productForm, subtitle: e.target.value })}
                  placeholder="e.g. Rare Damask Rose & Cashmere Amber"
                  className="w-full px-3.5 py-2 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl text-[#29141E] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#4A323D] font-semibold mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={e => setProductForm({ ...productForm, category: e.target.value as ProductCategory })}
                    className="w-full px-3.5 py-2 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl text-[#29141E] focus:outline-none"
                  >
                    <option value="Fragrance">Fragrance</option>
                    <option value="Skincare">Skincare</option>
                    <option value="Fine Jewelry">Fine Jewelry</option>
                    <option value="Silk Couture">Silk Couture</option>
                    <option value="Gift Sets">Gift Sets</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#4A323D] font-semibold mb-1">Subcategory</label>
                  <input
                    type="text"
                    value={productForm.subcategory}
                    onChange={e => setProductForm({ ...productForm, subcategory: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl text-[#29141E] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#4A323D] font-semibold mb-1">Price ($) *</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={e => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl text-[#29141E] font-mono focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#4A323D] font-semibold mb-1">Compare Price ($)</label>
                  <input
                    type="number"
                    value={productForm.originalPrice || ''}
                    onChange={e => setProductForm({ ...productForm, originalPrice: Number(e.target.value) || undefined })}
                    className="w-full px-3.5 py-2 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl text-[#29141E] font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#4A323D] font-semibold mb-1">Stock Units *</label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={e => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl text-[#29141E] font-mono focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#4A323D] font-semibold mb-1">Image Asset Path / URL</label>
                <input
                  type="text"
                  value={productForm.images[0] || ''}
                  onChange={e => setProductForm({ ...productForm, images: [e.target.value] })}
                  className="w-full px-3.5 py-2 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl text-[#29141E] focus:outline-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-[#4A323D] font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl text-[#29141E] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#D1527A] hover:bg-[#B93E65] text-white font-semibold rounded-xl shadow-xs transition-colors"
                >
                  {editingProductId ? 'Update Product' : 'Add Creation to Catalog'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 border border-stone-200 text-stone-600 rounded-xl hover:bg-stone-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE COUPON MODAL */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-6 border border-pink-200 shadow-2xl space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <h3 className="font-serif text-lg font-semibold text-[#29141E]">Create Discount Coupon</h3>
              <button
                onClick={() => setIsCouponModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCoupon} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#4A323D] font-semibold mb-1">Coupon Code *</label>
                <input
                  type="text"
                  placeholder="e.g. SPRING25"
                  value={couponForm.code}
                  onChange={e => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl font-mono uppercase text-[#29141E] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#4A323D] font-semibold mb-1">Discount Type</label>
                  <select
                    value={couponForm.discountType}
                    onChange={e => setCouponForm({ ...couponForm, discountType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl text-[#29141E] focus:outline-none"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Dollar ($)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#4A323D] font-semibold mb-1">Value *</label>
                  <input
                    type="number"
                    value={couponForm.value}
                    onChange={e => setCouponForm({ ...couponForm, value: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl font-mono text-[#29141E] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#4A323D] font-semibold mb-1">Minimum Spend ($)</label>
                <input
                  type="number"
                  value={couponForm.minSpend}
                  onChange={e => setCouponForm({ ...couponForm, minSpend: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl font-mono text-[#29141E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#4A323D] font-semibold mb-1">Description</label>
                <input
                  type="text"
                  placeholder="e.g. 25% off spring season orders"
                  value={couponForm.description}
                  onChange={e => setCouponForm({ ...couponForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FFF8FA] border border-[#F2B5C7] rounded-xl text-[#29141E] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#D1527A] hover:bg-[#B93E65] text-white font-semibold rounded-xl shadow-xs transition-colors"
                >
                  Activate Coupon
                </button>
                <button
                  type="button"
                  onClick={() => setIsCouponModalOpen(false)}
                  className="px-4 py-2.5 border border-stone-200 text-stone-600 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
