import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, 
  Heart, 
  Bell, 
  Search, 
  Sparkles, 
  SlidersHorizontal,
  Package,
  X
} from 'lucide-react';
import { formatWhatsAppNumber } from '../utils/whatsapp';

interface HeaderProps {
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenNotifications }) => {
  const { 
    currentView, 
    setCurrentView, 
    cart, 
    wishlist, 
    setIsCartOpen, 
    unreadNotificationCount, 
    searchQuery, 
    setSearchQuery,
    settings
  } = useStore();

  const [showSearchInput, setShowSearchInput] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentView('shop');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF8FA]/95 backdrop-blur-md border-b border-[#F7D6E0]/60 transition-all">
      {/* Slim Top Announcement Bar (<= 40px) */}
      <aside aria-label="Announcement" className="bg-[#2E1822] text-[#FDE8EE] text-[11px] sm:text-xs py-2 px-4 tracking-wider uppercase">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-pink-300 font-semibold">Complimentary Delivery</span>
            <span className="text-white/40">·</span>
            <span className="hidden sm:inline text-white/80">On all orders over ${settings.freeShippingThreshold}</span>
            <span className="text-white/40 hidden sm:inline">·</span>
            <span className="text-pink-200">Use code <strong className="text-white underline decoration-pink-400">ROSE20</strong> for 20% off</span>
          </div>

          <div className="flex items-center gap-4 text-white/80">
            <a 
              href={`https://wa.me/${formatWhatsAppNumber(settings.whatsappNumber)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-pink-300 transition-colors flex items-center gap-1.5"
            >
              <span>Concierge WhatsApp:</span>
              <span className="text-pink-200 font-mono tracking-normal">{settings.whatsappNumber}</span>
            </a>
            <button 
              onClick={() => setCurrentView('admin')}
              className={`text-[10px] px-2 py-0.5 rounded transition-colors ${
                currentView === 'admin' ? 'bg-pink-500 text-white' : 'bg-white/10 text-white/90 hover:bg-white/20'
              }`}
            >
              Store Admin
            </button>
          </div>
        </div>
      </aside>

      {/* Main Navigation: 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Single Brand Wordmark */}
        <button 
          onClick={() => setCurrentView('home')} 
          className="text-left group shrink-0 focus:outline-none"
        >
          <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#2B151F] group-hover:text-[#D1527A] transition-colors whitespace-nowrap">
            Étoile & Rose
          </span>
        </button>

        {/* Zone 2: Concise Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-[13px] tracking-wide font-medium text-[#4A323D]">
          <button
            onClick={() => setCurrentView('home')}
            className={`hover:text-[#D1527A] transition-colors whitespace-nowrap shrink-0 ${
              currentView === 'home' ? 'text-[#D1527A] font-semibold' : ''
            }`}
          >
            Atelier Home
          </button>
          <button
            onClick={() => setCurrentView('shop')}
            className={`hover:text-[#D1527A] transition-colors whitespace-nowrap shrink-0 ${
              currentView === 'shop' ? 'text-[#D1527A] font-semibold' : ''
            }`}
          >
            All Collections
          </button>
          <button
            onClick={() => setCurrentView('tracking')}
            className={`hover:text-[#D1527A] transition-colors whitespace-nowrap shrink-0 ${
              currentView === 'tracking' ? 'text-[#D1527A] font-semibold' : ''
            }`}
          >
            Track Order
          </button>
          <button
            onClick={() => setCurrentView('wishlist')}
            className={`hover:text-[#D1527A] transition-colors whitespace-nowrap shrink-0 ${
              currentView === 'wishlist' ? 'text-[#D1527A] font-semibold' : ''
            }`}
          >
            Wishlist ({wishlist.length})
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Search Toggle / Input */}
          <div className="relative">
            {showSearchInput ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  placeholder="Search fragrances, jewelry, silk..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-48 sm:w-64 pl-8 pr-7 py-1.5 text-xs bg-white border border-[#F2B5C7] rounded-full text-[#2B151F] focus:outline-none focus:ring-2 focus:ring-[#D1527A]/30"
                />
                <Search className="w-3.5 h-3.5 text-[#8A6675] absolute left-2.5 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => {
                    setShowSearchInput(false);
                    setSearchQuery('');
                  }}
                  className="absolute right-2.5 text-[#8A6675] hover:text-[#2B151F]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2 text-[#4A323D] hover:text-[#D1527A] transition-colors rounded-full hover:bg-pink-100/50"
                title="Search Products"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 text-[#4A323D] hover:text-[#D1527A] transition-colors rounded-full hover:bg-pink-100/50"
            title="Shipping and Order Alerts"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#D1527A] rounded-full" />
            )}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => setCurrentView('wishlist')}
            className="p-2 text-[#4A323D] hover:text-[#D1527A] transition-colors rounded-full hover:bg-pink-100/50 relative hidden sm:block"
            title="Saved Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-100 text-[#D1527A] text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center border border-pink-300">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Primary CTA */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-[#D1527A] hover:bg-[#B93E65] shadow-sm hover:shadow transition-all rounded-full whitespace-nowrap shrink-0 active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Shopping Bag</span>
            <span className="bg-white/25 px-1.5 py-0.5 rounded-full text-[11px] tabular-nums font-semibold">
              {totalCartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Row */}
      <div className="flex md:hidden items-center justify-around py-2 px-4 border-t border-[#F7D6E0]/40 text-xs text-[#5C404E] font-medium bg-[#FFF8FA]">
        <button 
          onClick={() => setCurrentView('home')} 
          className={currentView === 'home' ? 'text-[#D1527A] font-semibold' : ''}
        >
          Home
        </button>
        <button 
          onClick={() => setCurrentView('shop')} 
          className={currentView === 'shop' ? 'text-[#D1527A] font-semibold' : ''}
        >
          Boutique
        </button>
        <button 
          onClick={() => setCurrentView('tracking')} 
          className={currentView === 'tracking' ? 'text-[#D1527A] font-semibold' : ''}
        >
          Track Order
        </button>
        <button 
          onClick={() => setCurrentView('wishlist')} 
          className={currentView === 'wishlist' ? 'text-[#D1527A] font-semibold' : ''}
        >
          Wishlist ({wishlist.length})
        </button>
        <button 
          onClick={() => setCurrentView('admin')} 
          className={currentView === 'admin' ? 'text-[#D1527A] font-semibold' : ''}
        >
          Admin
        </button>
      </div>
    </header>
  );
};
