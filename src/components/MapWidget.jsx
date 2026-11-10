import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Layers, Compass } from 'lucide-react';

export default function MapWidget({ boarding }) {
  // Mode: 'google' | 'illustrated'
  const [viewMode, setViewMode] = useState('google');

  // Coordinates for NSBM Green University / Pitipana / Homagama
  const lat = boarding?.lat || 6.8214;
  const lng = boarding?.lng || 80.0416;
  const addressQuery = encodeURIComponent(
    boarding?.address || 'NSBM Green University, Pitipana, Homagama, Sri Lanka'
  );

  const nearbyLocations = boarding?.nearbyLocations || [
    { name: 'NSBM Green University', time: '2 min drive', type: 'university' },
    { name: 'Temple Junction Bus Stand', time: '10 min drive', type: 'bus' },
    { name: 'Pitipana Junction', time: '15 min drive', type: 'location' },
    { name: 'Moragahena Junction', time: '18 min drive', type: 'location' },
    { name: 'Homagama', time: '32 min drive', type: 'location' }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-sm">
      
      {/* Map Header with View Controls */}
      <div className="px-3.5 py-2.5 bg-slate-50 border-b border-slate-200/70 flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg"
            alt="Google Maps"
            className="w-4 h-4 object-contain"
          />
          <span className="text-xs font-bold text-slate-800">Google Maps View</span>
        </div>

        {/* View Switcher */}
        <div className="flex items-center bg-slate-200/70 p-0.5 rounded-lg text-[10px]">
          <button
            type="button"
            onClick={() => setViewMode('google')}
            className={`px-2 py-0.5 rounded-md font-semibold transition-all ${
              viewMode === 'google'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Live Map
          </button>
          <button
            type="button"
            onClick={() => setViewMode('illustrated')}
            className={`px-2 py-0.5 rounded-md font-semibold transition-all ${
              viewMode === 'illustrated'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mockup View
          </button>
        </div>
      </div>

      {/* Map View Area */}
      <div className="relative h-52 sm:h-56 w-full bg-slate-100 overflow-hidden">
        {viewMode === 'google' ? (
          <div className="relative w-full h-full">
            {/* Live Google Maps Embed iframe */}
            <iframe
              title={`Google Map - ${boarding?.title || 'NSBM Boarding'}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${lat},${lng}+(${encodeURIComponent(boarding?.title || 'Boarding')})&t=m&z=15&output=embed`}
            />

            {/* Direct Open in Google Maps link */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2 right-2 bg-white/90 hover:bg-white text-[11px] font-semibold text-slate-700 hover:text-blue-600 px-2.5 py-1 rounded shadow-md flex items-center gap-1 transition-all z-10"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ) : (
          <div 
            className="relative w-full h-full cursor-pointer group"
            onClick={() => setViewMode('google')}
          >
            {/* Exact Mockup Map graphic from Product Page .png */}
            <img
              src="/src/assets/product_map.png"
              alt="Google Maps Area Illustration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all flex items-center justify-center">
              <span className="bg-white/95 text-slate-800 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <Navigation className="w-3 h-3 text-blue-600" />
                Click to Open Interactive Google Map
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Explore the area section matching mockup layout */}
      <div className="p-4 space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Explore the area
        </h3>
        <ul className="space-y-2.5 text-xs">
          {nearbyLocations.map((loc, idx) => (
            <li key={idx} className="flex items-center justify-between text-slate-600">
              <div className="flex items-center space-x-2 truncate pr-2">
                {loc.type === 'university' ? (
                  <Navigation className="w-3.5 h-3.5 text-slate-400 rotate-45 shrink-0" />
                ) : (
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                )}
                <span className="truncate">{loc.name}</span>
              </div>
              <span className="text-[11px] font-medium text-slate-400 shrink-0">
                {loc.time}
              </span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
