import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  MessageCircle, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Sparkles,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { formatWhatsAppNumber } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  const { setCurrentView, setActiveCategory, settings, addNotification } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setSubscribed(true);
      addNotification(
        'Privilege Welcome 10% Unlocked',
        'Thank you for joining our private salon. Use code WELCOME10 at checkout.',
        'promo'
      );
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#24131B] text-[#E8D3DC] pt-14 pb-10 border-t border-pink-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-white block">
              Étoile & Rose
            </span>
            <p className="text-xs text-[#C9A8B7] leading-relaxed max-w-sm">
              An independent French luxury maison dedicated to rare Grasse Damask rose extractions, fine morganite jewelry in 18k rose gold, and pure Mulberry silk couture.
            </p>

            <div className="pt-2 space-y-2 text-xs text-[#D8B6C7]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                <span>14 Rue du Faubourg Saint-Honoré, 75008 Paris, France</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a 
                  href={`https://wa.me/${formatWhatsAppNumber(settings.whatsappNumber)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Concierge: <strong className="font-mono text-emerald-300">{settings.whatsappNumber}</strong>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/90">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#C9A8B7]">
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('Fragrance');
                    setCurrentView('shop');
                  }}
                  className="hover:text-pink-300 transition-colors"
                >
                  Haute Fragrance
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('Skincare');
                    setCurrentView('shop');
                  }}
                  className="hover:text-pink-300 transition-colors"
                >
                  Radiance Skincare
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('Fine Jewelry');
                    setCurrentView('shop');
                  }}
                  className="hover:text-pink-300 transition-colors"
                >
                  Morganite Jewelry
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('Silk Couture');
                    setCurrentView('shop');
                  }}
                  className="hover:text-pink-300 transition-colors"
                >
                  Silk Loungewear
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('Gift Sets');
                    setCurrentView('shop');
                  }}
                  className="hover:text-pink-300 transition-colors"
                >
                  Curated Coffrets
                </button>
              </li>
            </ul>
          </div>

          {/* Concierge & Orders */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/90">
              Concierge
            </h4>
            <ul className="space-y-2 text-xs text-[#C9A8B7]">
              <li>
                <button
                  onClick={() => setCurrentView('tracking')}
                  className="hover:text-pink-300 transition-colors"
                >
                  Live Order Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('wishlist')}
                  className="hover:text-pink-300 transition-colors"
                >
                  Saved Wishlist
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/${formatWhatsAppNumber(settings.whatsappNumber)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-300 transition-colors"
                >
                  Automated WhatsApp Bill
                </a>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('admin')}
                  className="hover:text-pink-300 transition-colors"
                >
                  Store Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Privilege Club */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/90">
              The Atelier Salon
            </h4>
            <p className="text-xs text-[#C9A8B7] leading-relaxed">
              Subscribe to receive private salon invitations, seasonal harvests of May roses, and an immediate 10% privilege discount.
            </p>

            {subscribed ? (
              <div className="p-3 bg-pink-900/40 border border-pink-700/60 rounded-xl text-xs text-pink-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Privilege confirmed. Code <strong>WELCOME10</strong> is active.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs bg-white/10 border border-pink-700/50 rounded-xl text-white placeholder:text-pink-300/50 focus:outline-none focus:ring-1 focus:ring-pink-400"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D1527A] hover:bg-[#B93E65] text-white text-xs font-semibold rounded-xl transition-colors whitespace-nowrap"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B896A6]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </span>
            <span>·</span>
            <span>DHL Express Global Logistics</span>
          </div>

          <p className="tabular-nums">
            © 2026 Étoile & Rose Atelier Paris. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
