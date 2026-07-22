import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, Shield } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Buying Luxury Estate',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c5a059] bg-[#c5a059]/10 px-3 py-1 rounded-full border border-[#c5a059]/30">
          Private Concierge
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#f4f4f4] mt-2">
          Contact Real Estate Concierge
        </h2>
        <p className="text-stone-400 text-sm mt-2">
          Our senior partners are at your disposal to discuss acquisitions, private viewings, or estate listings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Info Panel */}
        <div className="lg:col-span-5 bg-[#121212] text-white p-8 rounded-3xl border border-[#222222] flex flex-col justify-between shadow-2xl">
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#f4f4f4]">Global Headquarters</h3>
            <p className="text-xs text-stone-300 leading-relaxed font-light">
              Visit our flagship private lounge in Beverly Hills or request an in-person advisor meeting at your location.
            </p>

            <div className="space-y-4 pt-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#1f1f1f] text-[#c5a059] rounded-lg shrink-0 border border-[#c5a059]/20">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#f4f4f4]">Beverly Hills Lounge</p>
                  <p className="text-stone-400">9601 Wilshire Blvd, Suite 800, Beverly Hills, CA 90210</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#1f1f1f] text-[#c5a059] rounded-lg shrink-0 border border-[#c5a059]/20">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#f4f4f4]">24/7 Private Line</p>
                  <p className="text-stone-400">+1 (800) 555-LUXURY / +1 (310) 902-8811</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#1f1f1f] text-[#c5a059] rounded-lg shrink-0 border border-[#c5a059]/20">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#f4f4f4]">Direct Advisory Email</p>
                  <p className="text-stone-400">concierge@realestate-luxury.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#1f1f1f] text-[#c5a059] rounded-lg shrink-0 border border-[#c5a059]/20">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#f4f4f4]">Hours of Service</p>
                  <p className="text-stone-400">Monday - Sunday: 8:00 AM - 10:00 PM PST</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-[#1f1f1f] text-[11px] text-stone-400 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#c5a059] shrink-0" />
            <span>Strict Client NDA & Privacy Compliant</span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-[#121212] p-8 rounded-3xl border border-[#222222] shadow-2xl">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/30 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#f4f4f4]">Inquiry Received</h3>
              <p className="text-stone-300 text-sm max-w-md mx-auto">
                Thank you, {formData.name || 'valued client'}. A senior advisor will review your request and contact you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-[#c5a059] text-black font-bold text-xs rounded-xl uppercase tracking-wider hover:bg-[#b08d46]"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#f4f4f4] mb-2">Private Inquiry Form</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-400 uppercase mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Harrison Sterling"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#f4f4f4] placeholder-stone-500 rounded-xl p-3 text-xs focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-400 uppercase mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#f4f4f4] placeholder-stone-500 rounded-xl p-3 text-xs focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-400 uppercase mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#f4f4f4] placeholder-stone-500 rounded-xl p-3 text-xs focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-400 uppercase mb-1">Primary Interest</label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#f4f4f4] rounded-xl p-3 text-xs focus:outline-none focus:border-[#c5a059] font-medium [&>option]:bg-[#1a1a1a] [&>option]:text-[#f4f4f4]"
                  >
                    <option value="Buying Luxury Estate">Buying Luxury Estate</option>
                    <option value="Listing a Property">Listing a Property for Sale</option>
                    <option value="Luxury Lease Agreement">Luxury Lease Agreement</option>
                    <option value="Private Off-Market Search">Private Off-Market Search</option>
                    <option value="Portfolio Investment Advisory">Portfolio Investment Advisory</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 uppercase mb-1">Message / Requirements</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail preferred location, budget range, and special architectural requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#f4f4f4] placeholder-stone-500 rounded-xl p-3 text-xs focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#c5a059] hover:bg-[#b08d46] text-black font-bold text-xs uppercase tracking-[0.15em] rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Confidential Inquiry</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
