import React, { useState } from 'react';
import { Phone, Mail, ShieldCheck, Award, CheckCircle } from 'lucide-react';
import { AGENTS_DATA } from '../data/properties';

interface AgentsSectionProps {
  onContactAgent?: (agentName: string) => void;
}

export const AgentsSection: React.FC<AgentsSectionProps> = ({ onContactAgent }) => {
  const [bookedAgent, setBookedAgent] = useState<string | null>(null);

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c5a059] bg-[#c5a059]/10 px-3 py-1 rounded-full border border-[#c5a059]/30">
          Private Concierge
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#f4f4f4] mt-2">
          Meet Our Luxury Real Estate Advisors
        </h2>
        <p className="text-stone-400 text-sm mt-2">
          Discreet representation and bespoke advisory for ultra-high-net-worth buyers and sellers worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {AGENTS_DATA.map((agent) => (
          <div
            key={agent.id}
            className="bg-[#121212] rounded-2xl border border-[#222222] p-6 shadow-xl hover:border-[#c5a059]/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-[#1a1a1a]">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-black/80 text-[#c5a059] border border-[#c5a059]/30 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md">
                  {agent.salesVolume} Career Sales
                </div>
              </div>

              <h3 className="font-serif text-xl font-bold text-[#f4f4f4]">{agent.name}</h3>
              <p className="text-xs font-semibold text-[#c5a059] mt-0.5 uppercase tracking-wider">{agent.role}</p>
              <p className="text-xs text-stone-400 mt-2 leading-relaxed">{agent.specialization}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1f1f1f] space-y-3">
              <a
                href={`tel:${agent.phone}`}
                className="flex items-center gap-2 text-xs text-stone-300 font-medium hover:text-[#c5a059] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#c5a059]" />
                <span>{agent.phone}</span>
              </a>

              <a
                href={`mailto:${agent.email}`}
                className="flex items-center gap-2 text-xs text-stone-300 font-medium hover:text-[#c5a059] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#c5a059]" />
                <span>{agent.email}</span>
              </a>

              {bookedAgent === agent.id ? (
                <div className="p-2.5 bg-[#c5a059]/20 text-[#c5a059] rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-1.5 border border-[#c5a059]/30">
                  <CheckCircle className="w-4 h-4 text-[#c5a059]" />
                  <span>Consultation Scheduled</span>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setBookedAgent(agent.id);
                    if (onContactAgent) onContactAgent(agent.name);
                  }}
                  className="w-full py-2.5 bg-[#c5a059] hover:bg-[#b08d46] text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
                >
                  Schedule Advisory
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
