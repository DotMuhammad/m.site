import React from 'react';
import { useStore } from '../context/StoreContext';
import { Hero } from './Hero';
import { ProductCard } from './ProductCard';
import { 
  ArrowRight, 
  Sparkles, 
  MessageCircle, 
  ShieldCheck, 
  Feather, 
  Gem, 
  HeartHandshake 
} from 'lucide-react';
import { formatWhatsAppNumber } from '../utils/whatsapp';

export const HomeView: React.FC = () => {
  const { products, setCurrentView, setActiveCategory, recentlyViewed, settings } = useStore();

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <Hero />

      {/* Featured Collection Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B5426C]">
              Signature Selection
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#29141E] mt-1">
              Featured Creations
            </h2>
          </div>

          <button
            onClick={() => setCurrentView('shop')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D1527A] hover:text-[#B93E65] transition-colors group"
          >
            <span>View All Curations</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Craftsmanship & French Atelier Story Section */}
      <section className="bg-gradient-to-r from-[#FFF5F8] via-[#FFF0F4] to-[#FFF5F8] py-16 border-y border-pink-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Mosaic */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-pink-200/80 aspect-[4/3] bg-pink-100">
                <img
                  src="/src/assets/images/product_perfume_rose_crystal_1794291819176.jpg"
                  alt="Grasse May Rose Harvest"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
                  <p className="font-serif text-lg font-medium text-pink-100">
                    Harvested at Dawn in Grasse
                  </p>
                  <p className="text-white/80 mt-1">
                    Every flacon contains over 2,000 hand-picked petals of rare Rosa Centifolia.
                  </p>
                </div>
              </div>
            </div>

            {/* Story Text */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#B5426C] uppercase bg-pink-100 px-3 py-1 rounded-full">
                <Feather className="w-3.5 h-3.5 text-[#D1527A]" />
                <span>The Atelier Heritage</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#29141E] leading-snug">
                Quiet Luxury, Handcrafted Without Compromise
              </h2>

              <p className="text-xs sm:text-sm text-[#5C404E] leading-relaxed">
                Born in the historic salon quarters of Paris, Étoile & Rose unites the world&apos;s oldest botanical perfumery disciplines with contemporary haute joaillerie. We harvest roses only during the ephemeral 4-week May bloom, ensuring an olfactory brilliance untouched by synthetic diluents.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2 text-xs text-[#4A323D]">
                <div className="p-4 rounded-2xl bg-white border border-pink-200/70 shadow-xs">
                  <Gem className="w-5 h-5 text-[#D1527A] mb-2" />
                  <strong className="block text-sm text-[#29141E] mb-0.5">18K Solid Gold</strong>
                  <span className="text-[#7A5B69]">Hallmarked Au750 and certified conflict-free.</span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-pink-200/70 shadow-xs">
                  <HeartHandshake className="w-5 h-5 text-[#D1527A] mb-2" />
                  <strong className="block text-sm text-[#29141E] mb-0.5">22-Momme Silk</strong>
                  <span className="text-[#7A5B69]">Grade 6A Mulberry silk with Calais-Caudry lace.</span>
                </div>
              </div>

              <button
                onClick={() => setCurrentView('shop')}
                className="px-6 py-3 bg-[#2B151F] hover:bg-[#D1527A] text-white text-xs font-semibold rounded-full shadow-md transition-colors"
              >
                Discover the Creations
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Concierge Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#1E3A2B] to-[#142B20] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left z-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-emerald-400">
              Bespoke Digital Concierge
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold">
              Direct WhatsApp Ordering & Automated Invoicing
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              Prefer personal consultation? Send your shopping bag directly to our concierge hotline at <strong className="text-emerald-300 font-mono">{settings.whatsappNumber}</strong>. An official PDF invoice is generated automatically upon message receipt.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 z-10">
            <a
              href={`https://wa.me/${formatWhatsAppNumber(settings.whatsappNumber)}?text=${encodeURIComponent('Hello Etoile & Rose Concierge! I would like personal assistance placing an order with instant automated bill generation.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#25D366] hover:bg-[#1eb956] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md transition-all flex items-center gap-2 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat WhatsApp: {settings.whatsappNumber}</span>
            </a>

            <button
              onClick={() => setCurrentView('tracking')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold rounded-full border border-white/20 transition-colors"
            >
              Track Existing Order
            </button>
          </div>

          {/* Background Decorative Rings */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B5426C]">
            Coveted By Connoisseurs
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#29141E]">
            Atelier Best Sellers
          </h2>
          <p className="text-xs text-[#7A5B69]">
            The most sought-after extractions and jewelry pieces in our boutique.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Recently Viewed Strip */}
      {recentlyViewed.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-pink-200/60 pt-12 pb-4">
          <h3 className="font-serif text-lg font-semibold text-[#29141E] mb-6">
            Recently Viewed by You
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recentlyViewed.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
