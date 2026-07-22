import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { CITIES_DATA } from '../data/properties';

interface CitiesSectionProps {
  onSelectCity: (cityName: string) => void;
}

export const CitiesSection: React.FC<CitiesSectionProps> = ({ onSelectCity }) => {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c5a059] bg-[#c5a059]/10 px-3 py-1 rounded-full border border-[#c5a059]/30">
            Premier Locations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#f4f4f4] mt-2">
            Explore By World-Class Cities
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Browse trophy homes across North America's most desirable zip codes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CITIES_DATA.map((city) => (
          <div
            key={city.name}
            onClick={() => onSelectCity(city.name)}
            className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 border border-[#222222] bg-[#121212] hover:border-[#c5a059]/50"
          >
            <img
              src={city.image}
              alt={city.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />

            <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059] bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full w-max border border-[#c5a059]/30">
                {city.count} Active Estates
              </span>
              <h3 className="font-serif text-2xl font-bold mt-2 group-hover:text-[#c5a059] transition-colors text-[#f4f4f4]">
                {city.name}
              </h3>
              <p className="text-xs text-stone-400 font-light mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>{city.tagline}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
