import React from 'react';
import { Award, ShieldCheck, Gem, Building2, Users, Star } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Brand Legacy Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#c5a059] bg-[#c5a059]/10 px-3 py-1 rounded-full border border-[#c5a059]/30">
            About Real Estate
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f4f4f4] leading-tight">
            Setting the Benchmark for World-Class Luxury Real Estate
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-normal">
            Founded with a vision of uncompromised excellence, Real Estate is the global authority in premier residential properties, private coastal villas, and architectural landmarks.
          </p>
          <p className="text-stone-400 text-sm leading-relaxed">
            Our advisory team delivers discreet, white-glove advisory to high-net-worth buyers, investors, and family offices seeking extraordinary residences in Malibu, Miami, Beverly Hills, Manhattan, and Aspen.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#1f1f1f]">
            <div>
              <p className="font-serif text-3xl font-bold text-[#c5a059]">$2.4 Billion+</p>
              <p className="text-xs text-stone-400 font-medium">Cumulative Portfolio Sales</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-bold text-[#c5a059]">100%</p>
              <p className="text-xs text-stone-400 font-medium">Discreet Private Advisory</p>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#222222] bg-[#121212] aspect-[4/3]">
          <img
            src="/src/assets/images/luxury_villa_hero_1784657963505.jpg"
            alt="Real Estate Legacy Estate"
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-stone-950/20" />
        </div>
      </div>

      {/* Pillars of Excellence */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="bg-[#121212] p-6 rounded-2xl border border-[#222222] space-y-3">
          <div className="p-3 bg-[#c5a059]/15 text-[#c5a059] w-max rounded-xl border border-[#c5a059]/30">
            <Gem className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#f4f4f4]">Bespoke Curation</h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            Every property in our portfolio undergoes rigorous architectural, legal, and environmental evaluation before listing.
          </p>
        </div>

        <div className="bg-[#121212] p-6 rounded-2xl border border-[#222222] space-y-3">
          <div className="p-3 bg-[#c5a059]/15 text-[#c5a059] w-max rounded-xl border border-[#c5a059]/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#f4f4f4]">Absolute Confidentiality</h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            We safeguard buyer and seller privacy with off-market private placements and strict NDA protocols.
          </p>
        </div>

        <div className="bg-[#121212] p-6 rounded-2xl border border-[#222222] space-y-3">
          <div className="p-3 bg-[#c5a059]/15 text-[#c5a059] w-max rounded-xl border border-[#c5a059]/30">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#f4f4f4]">End-to-End Concierge</h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            From private jet transfers for viewings to estate management, our lifestyle concierge attends to every detail.
          </p>
        </div>
      </div>

    </section>
  );
};
