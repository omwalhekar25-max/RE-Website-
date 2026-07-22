import React, { useState } from 'react';
import { X, Video, Compass, Eye, Maximize, Play, Pause, Layers } from 'lucide-react';

interface VirtualTourModalProps {
  onClose: () => void;
  tourUrl?: string;
}

export const VirtualTourModal: React.FC<VirtualTourModalProps> = ({ onClose, tourUrl }) => {
  const [activeRoom, setActiveRoom] = useState<'living' | 'pool' | 'master' | 'kitchen'>('living');
  const [isPlaying, setIsPlaying] = useState(true);

  const rooms = [
    { id: 'living', name: 'Grand Living Salon', img: '/src/assets/images/luxury_villa_hero_1784657963505.jpg' },
    { id: 'pool', name: 'Infinity Pool Deck', img: '/src/assets/images/luxury_villa_card_1784657977404.jpg' },
    { id: 'master', name: 'Primary Suite Sanctuary', img: '/src/assets/images/modern_estate_card_1784657992609.jpg' },
    { id: 'kitchen', name: 'Poliform Chef Kitchen', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },
  ];

  const currentRoom = rooms.find(r => r.id === activeRoom) || rooms[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-300">
      <div className="relative bg-[#121212] rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-[#222222] text-white flex flex-col h-[85vh]">
        
        {/* Top Control Bar */}
        <div className="px-6 py-4 border-b border-[#222222] flex items-center justify-between bg-[#121212]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#c5a059]/15 text-[#c5a059] border border-[#c5a059]/30 rounded-lg">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#f4f4f4]">360° Interactive Virtual Tour</h3>
              <p className="text-xs text-[#c5a059]">Viewing: {currentRoom.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-lg bg-[#1e1e1e] hover:bg-[#282828] text-stone-300 border border-[#2a2a2a] transition-colors"
              title={isPlaying ? "Pause Rotation" : "Auto Orbit"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-lg bg-[#1e1e1e] hover:bg-[#282828] text-stone-300 border border-[#2a2a2a] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Simulated 360 Viewport */}
        <div className="relative flex-1 bg-black overflow-hidden group">
          <img
            src={currentRoom.img}
            alt={currentRoom.name}
            className={`w-full h-full object-cover transition-transform duration-1000 ${
              isPlaying ? 'scale-110 translate-x-2' : 'scale-100'
            }`}
            referrerPolicy="no-referrer"
          />

          {/* Interactive Room Hotspots */}
          <div className="absolute top-1/3 left-1/4 group/spot cursor-pointer">
            <div className="relative flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-[#c5a059]/80 animate-ping absolute" />
              <div className="w-6 h-6 rounded-full bg-[#c5a059] border-2 border-black flex items-center justify-center text-black text-[10px] font-bold shadow-lg">
                1
              </div>
              <div className="absolute left-8 bg-[#121212]/95 backdrop-blur-md px-3 py-1 rounded-md text-xs whitespace-nowrap opacity-0 group-hover/spot:opacity-100 transition-opacity border border-[#333333] text-[#f4f4f4]">
                Floor-to-Ceiling Motorized Glass Pocket Doors
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 right-1/3 group/spot cursor-pointer">
            <div className="relative flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-[#c5a059]/80 animate-ping absolute" />
              <div className="w-6 h-6 rounded-full bg-[#c5a059] border-2 border-black flex items-center justify-center text-black text-[10px] font-bold shadow-lg">
                2
              </div>
              <div className="absolute left-8 bg-[#121212]/95 backdrop-blur-md px-3 py-1 rounded-md text-xs whitespace-nowrap opacity-0 group-hover/spot:opacity-100 transition-opacity border border-[#333333] text-[#f4f4f4]">
                Bespoke Calacatta Marble Fireplace
              </div>
            </div>
          </div>

          {/* Bottom Room Selector Overlay */}
          <div className="absolute bottom-4 inset-x-4 flex items-center justify-center gap-2 overflow-x-auto p-2 bg-black/80 backdrop-blur-md rounded-2xl border border-[#222222]">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setActiveRoom(room.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeRoom === room.id
                    ? 'bg-[#c5a059] text-black shadow-lg'
                    : 'bg-[#181818] text-stone-300 hover:bg-[#222222]'
                }`}
              >
                {room.name}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
