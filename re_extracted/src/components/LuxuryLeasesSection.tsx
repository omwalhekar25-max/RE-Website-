import React from 'react';
import { Key, Shield, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Property } from '../types';

interface LuxuryLeasesSectionProps {
  onExploreLeases: () => void;
  onSelectProperty: (property: Property) => void;
  properties: Property[];
}

export const LuxuryLeasesSection: React.FC<LuxuryLeasesSectionProps> = ({
  onExploreLeases,
  onSelectProperty,
  properties,
}) => {
  const leaseProperties = properties.filter(p => p.isLease || p.price <= 5000000).slice(0, 2);

  return (
    <section className="bg-[#0f0f0f] text-[#f4f4f4] py-20 my-12 relative overflow-hidden border-y border-[#1f1f1f]">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-stone-900/30 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Description matching screenshot */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] text-xs font-semibold tracking-widest uppercase">
              <Key className="w-3.5 h-3.5" />
              <span>Bespoke Leasing Portfolio</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f4f4f4] leading-tight">
              TURN FOR LUXURY LEASES
            </h2>

            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
              Experience turn-key architectural living without long-term commitment. Our luxury lease portfolio encompasses fully serviced estates, oceanfront villas, and high-floor penthouses with private concierge services.
            </p>

            {/* Key Value Points */}
            <ul className="space-y-3 pt-2">
              <li className="flex items-center gap-3 text-stone-200 text-xs sm:text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>Fully Furnished & Serviced Private Residences</span>
              </li>
              <li className="flex items-center gap-3 text-stone-200 text-xs sm:text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>Dedicated 24/7 Lifestyle & Property Concierge</span>
              </li>
              <li className="flex items-center gap-3 text-stone-200 text-xs sm:text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>Flexible Seasonal & Annual Lease Contracts</span>
              </li>
            </ul>

            <div className="pt-4">
              <button
                onClick={onExploreLeases}
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#c5a059] hover:bg-[#b08d46] text-black text-xs font-bold uppercase tracking-[0.18em] rounded-xl transition-all duration-300 shadow-xl group"
                id="explore-leases-btn"
              >
                <span>Browse Lease Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Photos Grid as seen in screenshot */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {leaseProperties.map((prop) => (
              <div
                key={prop.id}
                onClick={() => onSelectProperty(prop)}
                className="group relative rounded-2xl overflow-hidden border border-[#222222] bg-[#141414] cursor-pointer shadow-2xl hover:border-[#c5a059]/50 transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={prop.mainImage}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent" />
                </div>

                <div className="absolute bottom-0 inset-x-0 p-5">
                  <span className="text-[10px] font-bold tracking-wider text-[#c5a059] uppercase bg-[#c5a059]/15 px-2.5 py-0.5 rounded-full border border-[#c5a059]/30">
                    {prop.leaseRateMonthly || prop.formattedPrice}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white mt-2 group-hover:text-[#c5a059] transition-colors">
                    {prop.title}
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5 flex items-center gap-1">
                    <span>{prop.location}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
