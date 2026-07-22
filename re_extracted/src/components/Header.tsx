import React, { useState } from 'react';
import { 
  Crown, 
  MoreVertical, 
  Heart, 
  Home, 
  Building, 
  MapPin, 
  Key, 
  Calculator, 
  Video, 
  Users, 
  Info, 
  Mail, 
  X,
  Sparkles,
  PhoneCall,
  Search
} from 'lucide-react';
import { EssentialPage } from '../types';

interface HeaderProps {
  currentPage: EssentialPage;
  setCurrentPage: (page: EssentialPage) => void;
  favoritesCount: number;
  onOpenSearchModal?: () => void;
  onOpenContactModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  favoritesCount,
  onOpenSearchModal,
  onOpenContactModal,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const essentialPages: { id: EssentialPage; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" />, desc: 'Main real estate showcase' },
    { id: 'properties', label: 'Property Listings', icon: <Building className="w-4 h-4" />, desc: 'Explore all luxury homes' },
    { id: 'featured', label: 'Featured Estates', icon: <Sparkles className="w-4 h-4" />, desc: 'Handpicked prime properties' },
    { id: 'cities', label: 'Cities & Regions', icon: <MapPin className="w-4 h-4" />, desc: 'Browse by top premier locations' },
    { id: 'leases', label: 'Luxury Leases', icon: <Key className="w-4 h-4" />, desc: 'Bespoke rentals & high-end leases' },
    { id: 'tours', label: 'Virtual 360° Tours', icon: <Video className="w-4 h-4" />, desc: 'Immersive property walkthroughs' },
    { id: 'mortgage', label: 'Mortgage Calculator', icon: <Calculator className="w-4 h-4" />, desc: 'Calculate loans & interest' },
    { id: 'favorites', label: 'Saved Favorites', icon: <Heart className="w-4 h-4" />, desc: 'View bookmarked estates' },
    { id: 'agents', label: 'Agents & Concierge', icon: <Users className="w-4 h-4" />, desc: 'Private real estate advisors' },
    { id: 'about', label: 'About Us', icon: <Info className="w-4 h-4" />, desc: 'Our legacy & excellence' },
    { id: 'contact', label: 'Contact Us', icon: <Mail className="w-4 h-4" />, desc: 'Get in touch with concierge' },
  ];

  const handleSelectPage = (page: EssentialPage) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1f1f1f] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LEFT: Classic & Luxurious Icon + Logo Name "Real Estate" */}
          <div 
            onClick={() => handleSelectPage('home')}
            className="flex items-center gap-3 cursor-pointer group py-2"
            id="brand-logo"
          >
            {/* Classic Classic/Luxurious Crest Icon */}
            <div className="w-10 h-10 rounded-lg bg-[#c5a059]/15 border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] shadow-xs group-hover:scale-105 group-hover:bg-[#c5a059] group-hover:text-black transition-all duration-300">
              <Crown className="w-5 h-5 stroke-[2.2]" />
            </div>

            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.18em] text-[#f4f4f4] uppercase">
                Real Estate
              </span>
              <span className="text-[10px] tracking-[0.3em] font-medium text-[#c5a059] uppercase -mt-1">
                Luxury Living
              </span>
            </div>
          </div>

          {/* CENTER: Main Quick Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-6 text-xs lg:text-sm font-medium tracking-wider uppercase text-stone-400">
            <button
              onClick={() => handleSelectPage('home')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentPage === 'home' ? 'text-[#c5a059] font-semibold' : 'hover:text-[#f4f4f4]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleSelectPage('properties')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentPage === 'properties' ? 'text-[#c5a059] font-semibold' : 'hover:text-[#f4f4f4]'
              }`}
            >
              Properties
            </button>
            <button
              onClick={() => handleSelectPage('cities')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentPage === 'cities' ? 'text-[#c5a059] font-semibold' : 'hover:text-[#f4f4f4]'
              }`}
            >
              Cities
            </button>
            <button
              onClick={() => handleSelectPage('leases')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentPage === 'leases' ? 'text-[#c5a059] font-semibold' : 'hover:text-[#f4f4f4]'
              }`}
            >
              Leases
            </button>
            <button
              onClick={() => handleSelectPage('tours')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentPage === 'tours' ? 'text-[#c5a059] font-semibold' : 'hover:text-[#f4f4f4]'
              }`}
            >
              Virtual Tours
            </button>
          </nav>

          {/* RIGHT CORNER: Actions + 3-DOTS ICON MENU containing all essential pages */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Quick Action */}
            {onOpenSearchModal && (
              <button 
                onClick={onOpenSearchModal}
                className="p-2 text-stone-400 hover:text-[#f4f4f4] hover:bg-[#1a1a1a] rounded-lg transition-colors"
                title="Search Properties"
                id="header-search-btn"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* Saved Favorites Heart Badge */}
            <button
              onClick={() => handleSelectPage('favorites')}
              className="relative p-2 text-stone-400 hover:text-[#c5a059] hover:bg-[#c5a059]/10 rounded-lg transition-colors"
              title="Saved Favorites"
              id="header-favorites-btn"
            >
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-[#c5a059] text-[#c5a059]' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c5a059] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Concierge Contact Button */}
            <button
              onClick={() => onOpenContactModal ? onOpenContactModal() : handleSelectPage('contact')}
              className="hidden lg:flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30 hover:bg-[#c5a059] hover:text-black rounded-md transition-all duration-300"
              id="header-concierge-btn"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Concierge</span>
            </button>

            {/* THREE-DOTS ICON BUTTON in right corner holding ALL essential pages */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2.5 rounded-lg border transition-all duration-300 flex items-center justify-center ${
                  isMenuOpen
                    ? 'bg-[#c5a059] text-black border-[#c5a059]'
                    : 'bg-[#141414] text-[#f4f4f4] border-[#2a2a2a] hover:border-[#c5a059]/50'
                }`}
                title="All Pages & Navigation Menu"
                id="three-dots-menu-btn"
              >
                <MoreVertical className="w-5 h-5" />
              </button>

              {/* DROPDOWN MENU FOR ALL ESSENTIAL PAGES */}
              {isMenuOpen && (
                <div 
                  className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#121212] rounded-xl shadow-2xl border border-[#2a2a2a] py-3 z-50 divide-y divide-[#1f1f1f] animate-in fade-in slide-in-from-top-2 duration-200"
                  id="three-dots-dropdown"
                >
                  <div className="px-4 py-2 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-[#c5a059]">Essential Pages</p>
                      <p className="text-[11px] text-stone-400">Explore all sections of Real Estate</p>
                    </div>
                    <button 
                      onClick={() => setIsMenuOpen(false)}
                      className="p-1 text-stone-400 hover:text-[#f4f4f4] rounded-md"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="py-2 max-h-[70vh] overflow-y-auto space-y-0.5 px-2">
                    {essentialPages.map((page) => (
                      <button
                        key={page.id}
                        onClick={() => handleSelectPage(page.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-center gap-3 ${
                          currentPage === page.id
                            ? 'bg-[#c5a059]/15 text-[#c5a059] font-semibold border-l-2 border-[#c5a059]'
                            : 'hover:bg-[#1a1a1a] text-stone-300 hover:text-white'
                        }`}
                      >
                        <div className={`p-1.5 rounded-md ${
                          currentPage === page.id ? 'bg-[#c5a059]/25 text-[#c5a059]' : 'bg-[#1f1f1f] text-stone-400'
                        }`}>
                          {page.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium leading-none">{page.label}</p>
                          <p className="text-[11px] text-stone-500 truncate mt-1">{page.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="p-3 bg-[#171717] rounded-b-xl flex items-center justify-between text-xs">
                    <span className="text-stone-400 font-medium">Bespoke Advisory</span>
                    <button 
                      onClick={() => handleSelectPage('contact')}
                      className="text-[#c5a059] font-semibold hover:underline"
                    >
                      Schedule Private Viewing →
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
