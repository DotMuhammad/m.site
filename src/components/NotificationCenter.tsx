import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Bell, 
  CheckCheck, 
  Truck, 
  ShoppingBag, 
  Tag, 
  Info,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const { 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    setCurrentView,
    getOrderById
  } = useStore();

  const [pushEnabled, setPushEnabled] = useState(() => {
    return typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted';
  });

  if (!isOpen) return null;

  const handleEnablePush = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setPushEnabled(true);
          new Notification('Étoile & Rose Atelier', {
            body: 'Shipping push alerts are now active for your orders.',
            icon: '/src/assets/images/product_perfume_rose_crystal_1794291819176.jpg'
          });
        }
      } catch {
        // Fallback simulation
        setPushEnabled(true);
      }
    } else {
      setPushEnabled(true);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'shipping':
        return <Truck className="w-4 h-4 text-blue-600" />;
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-[#D1527A]" />;
      case 'promo':
        return <Tag className="w-4 h-4 text-emerald-600" />;
      default:
        return <Info className="w-4 h-4 text-purple-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-md bg-[#FFF9FA] h-full shadow-2xl flex flex-col justify-between border-l border-pink-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#F5D5DF] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#D1527A]" />
            <h3 className="font-serif text-lg font-semibold text-[#29141E]">
              Concierge Alerts & Shipping
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsAsRead}
              className="text-xs text-[#9E3E61] hover:underline flex items-center gap-1 font-medium"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark Read</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-500 hover:text-black hover:bg-stone-100 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Browser Push Notification Permission Banner */}
        <div className="p-4 bg-pink-50/80 border-b border-pink-200 text-xs flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="font-semibold text-[#29141E] block">
              Instant Shipping Alerts
            </span>
            <p className="text-[11px] text-[#7A5B69]">
              Receive real-time push notices whenever an order is dispatched or delivered.
            </p>
          </div>

          <button
            onClick={handleEnablePush}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
              pushEnabled
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-[#D1527A] text-white hover:bg-[#B93E65]'
            }`}
          >
            {pushEnabled ? 'Push Active ✓' : 'Enable Push'}
          </button>
        </div>

        {/* Notification Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length > 0 ? (
            notifications.map(item => (
              <div
                key={item.id}
                onClick={() => {
                  markNotificationAsRead(item.id);
                  if (item.orderId) {
                    onClose();
                    setCurrentView('tracking');
                  }
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  item.read
                    ? 'bg-white border-pink-100/80 opacity-80'
                    : 'bg-[#FFF0F4] border-pink-300 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-semibold text-xs text-[#29141E] truncate">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-[#A68494] shrink-0 font-mono">
                        {item.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-[#593E4C] mt-1 leading-relaxed">
                      {item.message}
                    </p>

                    {item.orderId && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#D1527A] font-semibold mt-2 hover:underline">
                        <span>View Tracking #{item.orderId}</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-xs text-[#8A6675]">
              No alerts currently registered.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-pink-200 bg-white text-center text-[11px] text-[#8A6675]">
          Étoile & Rose Atelier Concierge Service · 24/7 Hotline
        </div>
      </div>
    </div>
  );
};
