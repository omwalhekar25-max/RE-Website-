import React, { useState } from 'react';
import { Search, MapPin, Building, DollarSign, BedDouble, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { SearchFilters, PropertyType } from '../types';

interface HeroProps {
  onSearchSubmit: (filters: Partial<SearchFilters>) => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearchSubmit, onExploreClick }) => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('All');
  const [maxPrice, setMaxPrice] = useState<number>(20000000);
  const [bedrooms, setBedrooms] = useState<number>(0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit({
      location,
      propertyType,
      maxPrice,
      bedrooms,
    });
  };

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between overflow-hidden bg-transparent">
      {/* Subtle Transparent Overlay for High Contrast Text */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70 pointer-events-none" />

      {/* Hero Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 flex-1 flex flex-col justify-center items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 text-[#c5a059] text-[11px] font-bold uppercase tracking-[0.25em] mb-4 shadow-lg backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse" />
          Scroll 3D Interactive Showcase
        </div>
        <span className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#c5a059] font-normal tracking-wide drop-shadow-md mb-2">
          Discover
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#f4f4f4] tracking-[0.12em] uppercase drop-shadow-2xl leading-tight">
          Luxury Living
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl text-stone-300 tracking-wider font-light max-w-2xl drop-shadow-xs">
          Exclusive Homes & Prime Estates for Premium Buyers
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExploreClick}
            className="px-8 py-3.5 bg-[#c5a059] hover:bg-[#b08d46] text-black font-bold text-xs sm:text-sm uppercase tracking-[0.2em] rounded-md backdrop-blur-xs transition-all duration-300 shadow-xl hover:-translate-y-0.5"
          >
            Explore Featured Estates
          </button>
        </div>

        {/* Search Filter Bar Widget placed upward directly under Explore button */}
        <div className="mt-10 w-full max-w-6xl text-left">
          <div className="bg-[#121212]/95 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-2xl border border-[#2a2a2a]">
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
              
              {/* Field 1: Location */}
              <div className="flex items-center gap-2 px-3.5 py-3 bg-[#1a1a1a] rounded-xl border border-[#2e2e2e] focus-within:border-[#c5a059] transition-colors">
                <MapPin className="w-5 h-5 text-[#c5a059] shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] uppercase tracking-wider text-stone-400 font-semibold leading-none">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Miami, Malibu, Aspen"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm text-[#f4f4f4] placeholder-stone-500 focus:outline-none mt-1"
                  />
                </div>
              </div>

              {/* Field 2: Property Type */}
              <div className="flex items-center gap-2 px-3.5 py-3 bg-[#1a1a1a] rounded-xl border border-[#2e2e2e] focus-within:border-[#c5a059] transition-colors">
                <Building className="w-5 h-5 text-[#c5a059] shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] uppercase tracking-wider text-stone-400 font-semibold leading-none">Type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                    className="w-full bg-transparent text-xs sm:text-sm text-[#f4f4f4] focus:outline-none cursor-pointer mt-1 font-medium [&>option]:bg-[#1a1a1a] [&>option]:text-[#f4f4f4]"
                  >
                    <option value="All">All Property Types</option>
                    <option value="Villa">Luxury Villa</option>
                    <option value="Penthouse">Sky Penthouse</option>
                    <option value="Modern Estate">Modern Estate</option>
                    <option value="Waterfront">Waterfront</option>
                    <option value="Mansion">Grand Mansion</option>
                  </select>
                </div>
              </div>

              {/* Field 3: Max Price */}
              <div className="flex items-center gap-2 px-3.5 py-3 bg-[#1a1a1a] rounded-xl border border-[#2e2e2e] focus-within:border-[#c5a059] transition-colors">
                <DollarSign className="w-5 h-5 text-[#c5a059] shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] uppercase tracking-wider text-stone-400 font-semibold leading-none">Max Price</label>
                  <select
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full bg-transparent text-xs sm:text-sm text-[#f4f4f4] focus:outline-none cursor-pointer mt-1 font-medium [&>option]:bg-[#1a1a1a] [&>option]:text-[#f4f4f4]"
                  >
                    <option value={25000000}>Up to $25M+</option>
                    <option value={15000000}>Up to $15 Million</option>
                    <option value={10000000}>Up to $10 Million</option>
                    <option value={5000000}>Up to $5 Million</option>
                  </select>
                </div>
              </div>

              {/* Field 4: Bedrooms */}
              <div className="flex items-center gap-2 px-3.5 py-3 bg-[#1a1a1a] rounded-xl border border-[#2e2e2e] focus-within:border-[#c5a059] transition-colors">
                <BedDouble className="w-5 h-5 text-[#c5a059] shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] uppercase tracking-wider text-stone-400 font-semibold leading-none">Bedrooms</label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full bg-transparent text-xs sm:text-sm text-[#f4f4f4] focus:outline-none cursor-pointer mt-1 font-medium [&>option]:bg-[#1a1a1a] [&>option]:text-[#f4f4f4]"
                  >
                    <option value={0}>Any Bedrooms</option>
                    <option value={4}>4+ Bedrooms</option>
                    <option value={5}>5+ Bedrooms</option>
                    <option value={6}>6+ Bedrooms</option>
                  </select>
                </div>
              </div>

              {/* Field 5: Submit Button */}
              <div className="sm:col-span-2 lg:col-span-1">
                <button
                  type="submit"
                  className="w-full h-full py-3.5 px-6 bg-[#c5a059] hover:bg-[#b08d46] text-black font-bold text-xs uppercase tracking-[0.15em] rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                  id="hero-search-btn"
                >
                  <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Search Now</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
