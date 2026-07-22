import React, { useState } from 'react';
import { Property } from '../types';
import { 
  X, 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Calendar, 
  Video, 
  Phone, 
  Mail, 
  CheckCircle, 
  Calculator, 
  Share2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenMortgage: (price: number) => void;
  onOpenVirtualTour: (url: string) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  isFavorite,
  onToggleFavorite,
  onOpenMortgage,
  onOpenVirtualTour,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [inquirySent, setInquirySent] = useState(false);
  const [tourDate, setTourDate] = useState('');
  const [tourTime, setTourTime] = useState('10:00 AM');

  if (!property) return null;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
  };

  const handleNextPhoto = () => {
    setActiveImageIndex((prev) => (prev + 1) % property.gallery.length);
  };

  const handlePrevPhoto = () => {
    setActiveImageIndex((prev) => (prev - 1 + property.gallery.length) % property.gallery.length);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#121212] text-[#f4f4f4] rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-[#222222] my-auto">
        
        {/* Top Header Controls */}
        <div className="sticky top-0 z-20 bg-[#121212]/95 backdrop-blur-md px-6 py-4 border-b border-[#222222] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c5a059] bg-[#c5a059]/10 px-3 py-1 rounded-full border border-[#c5a059]/30">
              {property.type}
            </span>
            <span className="text-stone-500 text-sm hidden sm:inline">•</span>
            <span className="text-xs text-stone-400 font-medium hidden sm:inline">{property.address}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleFavorite(property.id)}
              className={`p-2.5 rounded-full border transition-all ${
                isFavorite
                  ? 'bg-rose-950/40 text-rose-400 border-rose-800/50'
                  : 'bg-[#1e1e1e] text-stone-300 border-[#2a2a2a] hover:bg-[#252525]'
              }`}
              title="Save Favorite"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-[#1e1e1e] text-stone-300 hover:bg-[#252525] border border-[#2a2a2a] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-8">
          
          {/* Main Photo Slider & Gallery Thumbnails */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] bg-stone-950 rounded-2xl overflow-hidden group border border-[#222222]">
              <img
                src={property.gallery[activeImageIndex] || property.mainImage}
                alt={property.title}
                className="w-full h-full object-cover transition-all duration-500"
                referrerPolicy="no-referrer"
              />

              {property.gallery.length > 1 && (
                <>
                  <button
                    onClick={handlePrevPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/70 hover:bg-black text-white rounded-full backdrop-blur-xs transition-colors border border-white/10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/70 hover:bg-black text-white rounded-full backdrop-blur-xs transition-colors border border-white/10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <div className="absolute bottom-3 right-3 bg-black/80 text-stone-300 border border-[#c5a059]/30 text-[11px] font-medium px-3 py-1 rounded-full backdrop-blur-md">
                Photo {activeImageIndex + 1} of {property.gallery.length}
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {property.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx ? 'border-[#c5a059] ring-2 ring-[#c5a059]/30' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Title & Specs Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#222222]">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#f4f4f4]">{property.title}</h1>
              <p className="text-stone-400 text-sm mt-1 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#c5a059]" />
                <span>{property.address}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-[#1a1a1a] border border-[#c5a059]/30 p-3 rounded-xl text-right">
                <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Asking Price</p>
                <p className="text-2xl font-bold text-[#c5a059] font-serif">{property.formattedPrice}</p>
                {property.leaseRateMonthly && (
                  <p className="text-xs text-[#c5a059]/80">{property.leaseRateMonthly}</p>
                )}
              </div>

              <button
                onClick={() => onOpenMortgage(property.price)}
                className="px-4 py-3 bg-[#1e1e1e] hover:bg-[#282828] text-stone-200 border border-[#333333] rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <Calculator className="w-4 h-4 text-[#c5a059]" />
                <span>Calculate Mortgage</span>
              </button>

              {property.virtualTourUrl && (
                <button
                  onClick={() => onOpenVirtualTour(property.virtualTourUrl!)}
                  className="px-4 py-3 bg-[#c5a059] hover:bg-[#b08d46] text-black font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg transition-colors"
                >
                  <Video className="w-4 h-4" />
                  <span>Launch 360° Tour</span>
                </button>
              )}
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#181818] rounded-2xl border border-[#222222]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#222222] rounded-xl text-[#c5a059]">
                <Bed className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Bedrooms</p>
                <p className="text-sm font-bold text-[#f4f4f4]">{property.bedrooms} Beds</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#222222] rounded-xl text-[#c5a059]">
                <Bath className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Bathrooms</p>
                <p className="text-sm font-bold text-[#f4f4f4]">{property.bathrooms} Baths</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#222222] rounded-xl text-[#c5a059]">
                <Maximize2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Living Area</p>
                <p className="text-sm font-bold text-[#f4f4f4]">{property.sqft.toLocaleString()} sqft</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#222222] rounded-xl text-[#c5a059]">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Year Built</p>
                <p className="text-sm font-bold text-[#f4f4f4]">{property.yearBuilt}</p>
              </div>
            </div>
          </div>

          {/* Description & Features */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#f4f4f4] mb-2">Architectural Description</h3>
                <p className="text-stone-300 text-sm leading-relaxed">{property.description}</p>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-[#f4f4f4] mb-3">Key Features & Luxury Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {property.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-medium text-stone-300 bg-[#181818] p-2.5 rounded-lg border border-[#222222]">
                      <ShieldCheck className="w-4 h-4 text-[#c5a059] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Agent Contact Card */}
            <div className="bg-[#181818] text-white p-6 rounded-2xl border border-[#2a2a2a] flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059]">Exclusive Advisor</p>
                <div className="flex items-center gap-3 mt-3">
                  <img src={property.agent.avatar} alt={property.agent.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#c5a059]" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="font-bold text-sm text-[#f4f4f4]">{property.agent.name}</h4>
                    <p className="text-xs text-stone-400">Senior Real Estate Advisor</p>
                  </div>
                </div>

                {inquirySent ? (
                  <div className="mt-6 p-4 bg-[#c5a059]/20 border border-[#c5a059]/40 rounded-xl text-center text-[#c5a059] text-xs font-medium space-y-1">
                    <CheckCircle className="w-6 h-6 text-[#c5a059] mx-auto mb-1" />
                    <p className="font-bold">Inquiry Sent Successfully!</p>
                    <p className="text-[11px] text-stone-300">Our senior advisor will reach out within 2 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="mt-6 space-y-3">
                    <div>
                      <label className="block text-[10px] text-stone-400 uppercase font-semibold mb-1">Preferred Viewing Date</label>
                      <input
                        type="date"
                        required
                        value={tourDate}
                        onChange={(e) => setTourDate(e.target.value)}
                        className="w-full bg-[#222222] border border-[#333333] text-white text-xs rounded-lg p-2.5 focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-stone-400 uppercase font-semibold mb-1">Contact Phone or Email</label>
                      <input
                        type="text"
                        required
                        placeholder="Your phone number or email"
                        className="w-full bg-[#222222] border border-[#333333] text-white text-xs rounded-lg p-2.5 focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#c5a059] hover:bg-[#b08d46] text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-lg"
                    >
                      Request Private Showing
                    </button>
                  </form>
                )}
              </div>

              <div className="pt-4 mt-6 border-t border-[#2a2a2a] text-[11px] text-stone-400 flex items-center justify-between">
                <a href={`tel:${property.agent.phone}`} className="flex items-center gap-1.5 hover:text-[#c5a059]">
                  <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{property.agent.phone}</span>
                </a>
                <a href={`mailto:${property.agent.email}`} className="flex items-center gap-1.5 hover:text-[#c5a059]">
                  <Mail className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Email</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
