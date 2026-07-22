import React from 'react';
import { Crown, Heart, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { EssentialPage } from '../types';

interface FooterProps {
  onSelectPage: (page: EssentialPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectPage }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a0a0a] text-stone-400 pt-16 pb-12 border-t border-[#1f1f1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1f1f1f]">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => onSelectPage('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              {/* Classic luxurious icon on left */}
              <div className="w-9 h-9 rounded-lg bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059]">
                <Crown className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-[0.18em] text-[#f4f4f4] uppercase">
                  Real Estate
                </span>
                <span className="text-[9px] tracking-[0.3em] font-medium text-[#c5a059] uppercase -mt-1">
                  Luxury Living
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm font-light">
              The international authority in luxury residential estates, off-market penthouses, and coastal private sanctuaries.
            </p>

            <div className="pt-2 text-xs text-stone-400 space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>9601 Wilshire Blvd, Beverly Hills, CA 90210</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>+1 (310) 902-8811</span>
              </p>
            </div>
          </div>

          {/* Column 2: Essential Pages */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#f4f4f4] uppercase tracking-wider mb-4">Essential Pages</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><button onClick={() => onSelectPage('home')} className="hover:text-[#c5a059] transition-colors">Home Showcase</button></li>
              <li><button onClick={() => onSelectPage('properties')} className="hover:text-[#c5a059] transition-colors">Property Listings</button></li>
              <li><button onClick={() => onSelectPage('featured')} className="hover:text-[#c5a059] transition-colors">Featured Estates</button></li>
              <li><button onClick={() => onSelectPage('cities')} className="hover:text-[#c5a059] transition-colors">Cities & Regions</button></li>
              <li><button onClick={() => onSelectPage('leases')} className="hover:text-[#c5a059] transition-colors">Turnkey Leases</button></li>
            </ul>
          </div>

          {/* Column 3: Tools & Services */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#f4f4f4] uppercase tracking-wider mb-4">Advisory & Tools</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><button onClick={() => onSelectPage('tours')} className="hover:text-[#c5a059] transition-colors">Virtual 360° Tours</button></li>
              <li><button onClick={() => onSelectPage('mortgage')} className="hover:text-[#c5a059] transition-colors">Mortgage Calculator</button></li>
              <li><button onClick={() => onSelectPage('favorites')} className="hover:text-[#c5a059] transition-colors">Saved Favorite Homes</button></li>
              <li><button onClick={() => onSelectPage('agents')} className="hover:text-[#c5a059] transition-colors">Luxury Agents</button></li>
              <li><button onClick={() => onSelectPage('about')} className="hover:text-[#c5a059] transition-colors">Our Legacy</button></li>
            </ul>
          </div>

          {/* Column 4: Private Newsletter */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#f4f4f4] uppercase tracking-wider mb-4">Private Gazette</h4>
            <p className="text-xs text-stone-400 mb-3 leading-relaxed">
              Receive confidential off-market estate listings directly in your inbox.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing to Real Estate Gazette."); }} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="w-full bg-[#181818] border border-[#2a2a2a] rounded-lg p-2.5 text-xs text-[#f4f4f4] focus:outline-none focus:border-[#c5a059]"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-[#c5a059] hover:bg-[#b08d46] text-black font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
              >
                Join Private List
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Real Estate. All rights reserved. Equal Housing Opportunity.</p>
          
          <div className="flex items-center gap-6">
            <button onClick={() => onSelectPage('contact')} className="hover:text-stone-300">Privacy Policy</button>
            <button onClick={() => onSelectPage('contact')} className="hover:text-stone-300">Terms of Service</button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#181818] text-stone-400 hover:text-white border border-[#2a2a2a] transition-colors"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
