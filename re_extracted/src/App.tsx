import React, { useState, useMemo } from 'react';
import { Property, EssentialPage, SearchFilters } from './types';
import { SAMPLE_PROPERTIES } from './data/properties';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedProperties } from './components/FeaturedProperties';
import { LuxuryLeasesSection } from './components/LuxuryLeasesSection';
import { CitiesSection } from './components/CitiesSection';
import { AgentsSection } from './components/AgentsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { MortgageCalculatorModal } from './components/MortgageCalculatorModal';
import { VirtualTourModal } from './components/VirtualTourModal';
import { Footer } from './components/Footer';
import { ScrollCanvas } from './components/ScrollCanvas';

export default function App() {
  const [currentPage, setCurrentPage] = useState<EssentialPage>('home');
  const [properties, setProperties] = useState<Property[]>(SAMPLE_PROPERTIES);
  const [favorites, setFavorites] = useState<string[]>(['prop-1']);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isMortgageOpen, setIsMortgageOpen] = useState(false);
  const [mortgageInitialPrice, setMortgageInitialPrice] = useState<number>(5000000);
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false);
  const [activeVirtualTourUrl, setActiveVirtualTourUrl] = useState<string>('');
  const [searchFilters, setSearchFilters] = useState<Partial<SearchFilters>>({});

  // Toggle Favorite Handler
  const handleToggleFavorite = (propertyId: string) => {
    setFavorites((prev) =>
      prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]
    );
  };

  // Search Filter Handler
  const handleSearchSubmit = (filters: Partial<SearchFilters>) => {
    setSearchFilters(filters);
    setCurrentPage('properties');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Filtered Properties List based on Search Filters & Navigation Page
  const displayedProperties = useMemo(() => {
    let result = properties;

    if (currentPage === 'featured') {
      result = result.filter((p) => p.featured);
    } else if (currentPage === 'leases') {
      result = result.filter((p) => p.isLease || p.price <= 5000000);
    } else if (currentPage === 'favorites') {
      result = result.filter((p) => favorites.includes(p.id));
    }

    if (searchFilters.location) {
      const locQuery = searchFilters.location.toLowerCase();
      result = result.filter(
        (p) =>
          p.location.toLowerCase().includes(locQuery) ||
          p.city.toLowerCase().includes(locQuery) ||
          p.title.toLowerCase().includes(locQuery)
      );
    }

    if (searchFilters.propertyType && searchFilters.propertyType !== 'All') {
      result = result.filter((p) => p.type === searchFilters.propertyType);
    }

    if (searchFilters.maxPrice) {
      result = result.filter((p) => p.price <= searchFilters.maxPrice!);
    }

    if (searchFilters.bedrooms && searchFilters.bedrooms > 0) {
      result = result.filter((p) => p.bedrooms >= searchFilters.bedrooms!);
    }

    return result;
  }, [properties, currentPage, searchFilters, favorites]);

  // Open Mortgage Modal with Price
  const handleOpenMortgage = (price?: number) => {
    if (price) setMortgageInitialPrice(price);
    setIsMortgageOpen(true);
  };

  // Open Virtual Tour Modal
  const handleOpenVirtualTour = (url?: string) => {
    if (url) setActiveVirtualTourUrl(url);
    setIsVirtualTourOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#050507] text-[#f4f4f4] font-sans antialiased flex flex-col selection:bg-[#c5a059] selection:text-black">
      
      {/* 3D Scroll Canvas Backdrop - 100% Crisp Visibility */}
      <ScrollCanvas opacity={1.0} />

      {/* Top Header Bar */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        favoritesCount={favorites.length}
        onOpenSearchModal={() => {
          setCurrentPage('properties');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenContactModal={() => setCurrentPage('contact')}
      />

      {/* Main Dynamic View Area */}
      <main className="relative z-10 flex-1 bg-transparent">
        
        {/* VIEW 1: HOME PAGE */}
        {currentPage === 'home' && (
          <>
            {/* Top Hero Section */}
            <Hero
              onSearchSubmit={handleSearchSubmit}
              onExploreClick={() => {
                const elem = document.getElementById('featured-section');
                elem?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Fresh & Trending / Discover Luxury Living (Featured Estates) */}
            <div id="featured-section" className="pt-8 bg-black/25 backdrop-blur-[2px]">
              <FeaturedProperties
                properties={properties}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectProperty={(prop) => setSelectedProperty(prop)}
                badge="FRESH AND TRENDING"
                title="Discover Luxury Living"
                subtitle="Handpicked architectural masterpieces offering exceptional privacy, luxury amenities, and prime geographic locations."
              />
            </div>

            {/* Turn for Luxury Leases Section */}
            <div className="bg-black/30 backdrop-blur-[2px]">
              <LuxuryLeasesSection
                properties={properties}
                onExploreLeases={() => setCurrentPage('leases')}
                onSelectProperty={(prop) => setSelectedProperty(prop)}
              />
            </div>

            {/* Cities Section */}
            <div className="bg-black/25 backdrop-blur-[2px]">
              <CitiesSection
                onSelectCity={(cityName) => {
                  setSearchFilters({ location: cityName });
                  setCurrentPage('properties');
                }}
              />
            </div>

            {/* Private Agents Section */}
            <div className="bg-black/30 backdrop-blur-[2px]">
              <AgentsSection
                onContactAgent={() => setCurrentPage('contact')}
              />
            </div>
          </>
        )}

        {/* VIEW 2: PROPERTY LISTINGS / SEARCH RESULTS */}
        {currentPage === 'properties' && (
          <div className="py-12 bg-black/60 backdrop-blur-sm min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex items-center justify-between">
              <div>
                <h1 className="font-serif text-3xl font-bold text-[#f4f4f4]">All Luxury Property Listings</h1>
                <p className="text-xs text-stone-400 mt-1">
                  Showing {displayedProperties.length} active premier estates
                  {searchFilters.location ? ` in "${searchFilters.location}"` : ''}
                </p>
              </div>

              {Object.keys(searchFilters).length > 0 && (
                <button
                  onClick={() => setSearchFilters({})}
                  className="text-xs font-semibold uppercase tracking-wider text-[#c5a059] hover:underline"
                >
                  Clear Active Filters
                </button>
              )}
            </div>

            <FeaturedProperties
              properties={displayedProperties}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectProperty={(prop) => setSelectedProperty(prop)}
              badge="EXCLUSIVE CATALOG"
              title="Premier Real Estate Listings"
              subtitle="Filter through oceanfront estates, sky penthouses, and gated luxury villas."
            />
          </div>
        )}

        {/* VIEW 3: FEATURED ESTATES */}
        {currentPage === 'featured' && (
          <div className="py-12 bg-black/60 backdrop-blur-sm min-h-screen">
            <FeaturedProperties
              properties={displayedProperties}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectProperty={(prop) => setSelectedProperty(prop)}
              badge="CURATED COLLECTION"
              title="Handpicked Featured Estates"
              subtitle="Our most prestigious trophy properties available for immediate acquisition."
            />
          </div>
        )}

        {/* VIEW 4: CITIES & REGIONS */}
        {currentPage === 'cities' && (
          <div className="py-12 bg-black/60 backdrop-blur-sm min-h-screen">
            <CitiesSection
              onSelectCity={(cityName) => {
                setSearchFilters({ location: cityName });
                setCurrentPage('properties');
              }}
            />
          </div>
        )}

        {/* VIEW 5: LUXURY LEASES */}
        {currentPage === 'leases' && (
          <div className="py-12 bg-black/60 backdrop-blur-sm min-h-screen">
            <LuxuryLeasesSection
              properties={properties}
              onExploreLeases={() => {}}
              onSelectProperty={(prop) => setSelectedProperty(prop)}
            />
            <FeaturedProperties
              properties={displayedProperties}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectProperty={(prop) => setSelectedProperty(prop)}
              badge="LEASING PORTFOLIO"
              title="Turnkey Luxury Leases"
              subtitle="Fully serviced private residences and high-floor long term leases."
            />
          </div>
        )}

        {/* VIEW 6: VIRTUAL 360° TOURS */}
        {currentPage === 'tours' && (
          <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-black/60 backdrop-blur-sm rounded-3xl my-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c5a059] bg-[#c5a059]/10 px-3 py-1 rounded-full border border-[#c5a059]/30">
              Virtual Reality
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#f4f4f4] mt-2">
              Interactive 360° Virtual Walkthroughs
            </h1>
            <p className="text-stone-400 text-sm mt-2 max-w-xl mx-auto">
              Explore room-by-room architectural details from anywhere in the world.
            </p>

            <div className="mt-8">
              <button
                onClick={() => setIsVirtualTourOpen(true)}
                className="px-8 py-4 bg-[#c5a059] hover:bg-[#b08d46] text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl transition-all"
              >
                Launch Live 360° Demo Tour
              </button>
            </div>

            <div className="mt-12">
              <FeaturedProperties
                properties={properties.filter(p => p.virtualTourUrl || p.featured)}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectProperty={(prop) => {
                  setSelectedProperty(prop);
                }}
                badge="VIRTUAL ENABLED"
                title="Estates with 360° Interactive Tours"
                subtitle="Select any property to view specs and launch virtual walkthroughs."
              />
            </div>
          </div>
        )}

        {/* VIEW 7: MORTGAGE CALCULATOR */}
        {currentPage === 'mortgage' && (
          <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-black/60 backdrop-blur-sm rounded-3xl my-8">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c5a059] bg-[#c5a059]/10 px-3 py-1 rounded-full border border-[#c5a059]/30">
                Financial Advisory
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#f4f4f4] mt-2">
                Luxury Real Estate Mortgage Calculator
              </h1>
              <p className="text-stone-400 text-sm mt-2">
                Calculate estimated loan payments, taxes, and down payment schedules for premier estates.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <button
                onClick={() => setIsMortgageOpen(true)}
                className="w-full py-4 bg-[#c5a059] hover:bg-[#b08d46] text-black font-bold text-xs uppercase tracking-widest rounded-2xl shadow-lg transition-all"
              >
                Open Full Interactive Mortgage Tool
              </button>
            </div>
          </div>
        )}

        {/* VIEW 8: SAVED FAVORITES */}
        {currentPage === 'favorites' && (
          <div className="py-12 bg-black/60 backdrop-blur-sm min-h-screen">
            <FeaturedProperties
              properties={displayedProperties}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectProperty={(prop) => setSelectedProperty(prop)}
              badge="SAVED HOMES"
              title={`Saved Favorites (${favorites.length})`}
              subtitle={
                favorites.length > 0
                  ? "Your bookmarked luxury estates for viewing and consultation."
                  : "You haven't bookmarked any estates yet. Click the heart icon on any property to save it."
              }
            />
          </div>
        )}

        {/* VIEW 9: LUXURY AGENTS */}
        {currentPage === 'agents' && (
          <div className="py-12 bg-black/60 backdrop-blur-sm min-h-screen">
            <AgentsSection onContactAgent={() => setCurrentPage('contact')} />
          </div>
        )}

        {/* VIEW 10: ABOUT US */}
        {currentPage === 'about' && (
          <div className="py-12 bg-black/60 backdrop-blur-sm min-h-screen">
            <AboutSection />
          </div>
        )}

        {/* VIEW 11: CONTACT US */}
        {currentPage === 'contact' && (
          <div className="py-12 bg-black/60 backdrop-blur-sm min-h-screen">
            <ContactSection />
          </div>
        )}

      </main>

      {/* Property Detail Spec Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          isFavorite={favorites.includes(selectedProperty.id)}
          onToggleFavorite={handleToggleFavorite}
          onOpenMortgage={handleOpenMortgage}
          onOpenVirtualTour={handleOpenVirtualTour}
        />
      )}

      {/* Mortgage Calculator Modal */}
      {isMortgageOpen && (
        <MortgageCalculatorModal
          initialPrice={mortgageInitialPrice}
          onClose={() => setIsMortgageOpen(false)}
        />
      )}

      {/* Virtual 360° Tour Modal */}
      {isVirtualTourOpen && (
        <VirtualTourModal
          tourUrl={activeVirtualTourUrl}
          onClose={() => setIsVirtualTourOpen(false)}
        />
      )}

      {/* Clean Footer */}
      <Footer onSelectPage={setCurrentPage} />

    </div>
  );
}
