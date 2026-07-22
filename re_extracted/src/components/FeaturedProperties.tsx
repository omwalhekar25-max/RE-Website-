import React, { useState } from 'react';
import { Property, PropertyType } from '../types';
import { Heart, Bed, Bath, Maximize2, MapPin, Eye, Sparkles, Check, ArrowRight } from 'lucide-react';

interface FeaturedPropertiesProps {
  properties: Property[];
  favorites: string[];
  onToggleFavorite: (propertyId: string) => void;
  onSelectProperty: (property: Property) => void;
  title?: string;
  subtitle?: string;
  badge?: string;
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  title = "Discover Luxury Living",
  subtitle = "Handpicked architectural masterpieces offering exceptional privacy, luxury amenities, and prime geographic locations.",
  badge = "FRESH AND TRENDING"
}) => {
  const [selectedType, setSelectedType] = useState<string>('All');

  const filterTypes = ['All', 'Villa', 'Waterfront', 'Penthouse', 'Modern Estate', 'Mansion'];

  const filteredProperties = selectedType === 'All'
    ? properties
    : properties.filter(p => p.type === selectedType);

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header matching the layout from prompt image */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-block text-[11px] font-bold tracking-[0.25em] text-[#c5a059] uppercase bg-[#c5a059]/10 px-3.5 py-1 rounded-full mb-3 border border-[#c5a059]/30">
          {badge}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#f4f4f4] tracking-tight">
          {title}
        </h2>
        <p className="mt-4 text-stone-400 text-sm sm:text-base leading-relaxed font-normal">
          {subtitle}
        </p>

        {/* Property Type Filter Chips */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {filterTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                selectedType === type
                  ? 'bg-[#c5a059] text-black font-bold shadow-md'
                  : 'bg-[#181818] text-stone-300 hover:bg-[#252525] border border-[#2a2a2a]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProperties.map((property) => {
          const isFav = favorites.includes(property.id);

          return (
            <div
              key={property.id}
              className="bg-[#121212] rounded-2xl overflow-hidden border border-[#222222] shadow-xl hover:border-[#c5a059]/40 transition-all duration-300 group flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#1a1a1a]">
                <img
                  src={property.mainImage}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Badge (Featured or Lease) */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {property.isLease ? (
                    <span className="bg-[#0a0a0a]/90 backdrop-blur-md text-[#c5a059] border border-[#c5a059]/30 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                      For Lease
                    </span>
                  ) : (
                    <span className="bg-[#c5a059]/90 backdrop-blur-md text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                      Exclusive Sale
                    </span>
                  )}
                </div>

                {/* Favorite Toggle Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(property.id);
                  }}
                  className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
                    isFav
                      ? 'bg-[#121212] text-rose-500 border border-rose-500/40'
                      : 'bg-[#0a0a0a]/60 text-stone-300 hover:bg-[#121212] hover:text-[#c5a059]'
                  }`}
                  title={isFav ? "Remove from Favorites" : "Save to Favorites"}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                </button>

                {/* Quick Details Trigger Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <button
                    onClick={() => onSelectProperty(property)}
                    className="px-5 py-2.5 bg-[#c5a059] text-black font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg hover:bg-[#b08d46] transition-all transform translate-y-2 group-hover:translate-y-0 flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Property Specs</span>
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#f4f4f4] group-hover:text-[#c5a059] transition-colors">
                        {property.title}
                      </h3>
                      <p className="text-xs text-stone-400 mt-1 flex items-center gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                        <span>{property.location}</span>
                      </p>
                    </div>

                    {/* Price Pill */}
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-[#c5a059]/10 text-[#c5a059] font-bold text-sm sm:text-base rounded-lg border border-[#c5a059]/30">
                        {property.formattedPrice}
                      </span>
                      {property.leaseRateMonthly && (
                        <p className="text-[10px] text-stone-400 mt-0.5">{property.leaseRateMonthly}</p>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-stone-400 line-clamp-2 mt-3 font-normal leading-relaxed">
                    {property.subtitle}
                  </p>
                </div>

                {/* Property Metrics Footer */}
                <div className="mt-6 pt-4 border-t border-[#1f1f1f] flex items-center justify-between text-xs text-stone-400 font-medium">
                  <div className="flex items-center gap-1.5" title="Bedrooms">
                    <Bed className="w-4 h-4 text-[#c5a059]" />
                    <span>{property.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Bathrooms">
                    <Bath className="w-4 h-4 text-[#c5a059]" />
                    <span>{property.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Square Feet">
                    <Maximize2 className="w-4 h-4 text-[#c5a059]" />
                    <span>{property.sqft.toLocaleString()} sqft</span>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-16 bg-[#121212] rounded-2xl border border-[#222222]">
          <p className="text-stone-400 text-sm">No properties found matching the selected filter criteria.</p>
          <button 
            onClick={() => setSelectedType('All')}
            className="mt-3 px-4 py-2 bg-[#c5a059] text-black font-bold text-xs rounded-lg uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
