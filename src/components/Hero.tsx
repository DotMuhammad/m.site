import React from 'react';
import { useStore } from '../context/StoreContext';
import { HERO_IMAGE } from '../data/initialData';
import { ArrowRight, MessageCircle, ShieldCheck, Sparkles, Truck, Clock } from 'lucide-react';
import { formatWhatsAppNumber } from '../utils/whatsapp';

export const Hero: React.FC = () => {
  const { setCurrentView, settings } = useStore();

  const handleWhatsAppDirect = () => {
    const formattedPhone = formatWhatsAppNumber(settings.whatsappNumber);
    const text = encodeURIComponent(
      `Hello Etoile & Rose Atelier Concierge! I am browsing the boutique collection and would like personal assistance placing an order with instant automated bill generation.`
    );
    window.open(`https://wa.me/${formattedPhone}?text=${text}`, '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF5F8] to-[#FFF8FA] pt-6 pb-12 sm:pb-16 border-b border-[#F7D6E0]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Campaign Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Brand Story & Call to Actions */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#B5426C] uppercase bg-pink-100/70 border border-pink-200/60 px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#D1527A]" />
              <span>Haute Parfumerie & Silk Atelier</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.15] text-[#221019] tracking-tight font-medium" style={{ textWrap: 'balance' }}>
              L&apos;Élégance Éternelle de la Rose
            </h1>

            <p className="text-sm sm:text-base text-[#614552] leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              Indulge in rare Grasse Damask rose extractions, genuine peach morganite jewelry set in 18k rose gold, and pure 22-momme Mulberry silk loungewear. Bespoke luxury delivered with instant WhatsApp ordering and automated PDF invoicing.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => setCurrentView('shop')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#D1527A] hover:bg-[#B93E65] shadow-md hover:shadow-lg transition-all rounded-full active:scale-95 tracking-wide"
              >
                <span>Explore Boutique Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppDirect}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#25D366] hover:text-white bg-white hover:bg-[#25D366] border border-[#25D366]/40 hover:border-[#25D366] shadow-sm transition-all rounded-full active:scale-95 tracking-wide"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Order: {settings.whatsappNumber}</span>
              </button>
            </div>

            {/* Quiet Testimonial Quote */}
            <div className="pt-4 border-t border-[#F2C2CF]/50 flex items-center justify-center lg:justify-start gap-3 text-xs text-[#7A5B69]">
              <span className="font-serif italic">&ldquo;The purest rose fragrance created in modern perfumery.&rdquo;</span>
              <span className="text-[#D1527A] font-medium">— Vogue France, 2026</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-pink-200/60 bg-pink-50">
              <img
                src={HERO_IMAGE}
                alt="Étoile & Rose Atelier Haute Parfumerie Campaign"
                className="w-full h-auto aspect-[16/9] object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                <span className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 font-serif">
                  Collection Printemps 2026
                </span>
                <span className="bg-[#D1527A]/90 backdrop-blur-md px-3 py-1 rounded-full font-medium">
                  Atelier Grasse & Paris
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Luxury Trust & Service Strip */}
        <div className="mt-12 pt-8 border-t border-[#F2C2CF]/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-pink-100/40 transition-colors">
            <div className="w-9 h-9 rounded-full bg-pink-100 text-[#D1527A] flex items-center justify-center mb-1">
              <Truck className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-semibold text-[#2B151F] uppercase tracking-wider">White-Glove Shipping</h4>
            <p className="text-[11px] text-[#705260]">Free worldwide express over ${settings.freeShippingThreshold}</p>
          </div>

          <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-pink-100/40 transition-colors">
            <div className="w-9 h-9 rounded-full bg-pink-100 text-[#D1527A] flex items-center justify-center mb-1">
              <MessageCircle className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-semibold text-[#2B151F] uppercase tracking-wider">WhatsApp Ordering</h4>
            <p className="text-[11px] text-[#705260]">Direct chat bill checkout to {settings.whatsappNumber}</p>
          </div>

          <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-pink-100/40 transition-colors">
            <div className="w-9 h-9 rounded-full bg-pink-100 text-[#D1527A] flex items-center justify-center mb-1">
              <Clock className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-semibold text-[#2B151F] uppercase tracking-wider">Automated PDF Bill</h4>
            <p className="text-[11px] text-[#705260]">Instant downloadable tax invoice with QR verify</p>
          </div>

          <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-pink-100/40 transition-colors">
            <div className="w-9 h-9 rounded-full bg-pink-100 text-[#D1527A] flex items-center justify-center mb-1">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-semibold text-[#2B151F] uppercase tracking-wider">100% Certified</h4>
            <p className="text-[11px] text-[#705260]">Genuine Grasse essences, 18k gold & 6A silk</p>
          </div>
        </div>
      </div>
    </section>
  );
};
