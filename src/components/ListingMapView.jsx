import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, ExternalLink, Navigation, X } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Custom price pill marker icon generator
function createPriceIcon(price, isSelected) {
  return L.divIcon({
    className: 'custom-price-marker',
    html: `
      <div style="
        background: ${isSelected ? '#1e293b' : '#2b78e4'};
        color: white;
        font-weight: 700;
        font-size: 11px;
        padding: 3px 8px;
        border-radius: 12px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        border: 2px solid white;
        white-space: nowrap;
        transform: translate(-50%, -100%);
        cursor: pointer;
      ">
        LKR ${Number(price).toLocaleString()}
      </div>
    `,
    iconSize: [40, 20],
    iconAnchor: [20, 20]
  });
}

const nsbmCampusIcon = L.divIcon({
  className: 'nsbm-campus-marker',
  html: `
    <div style="
      background: #16a34a;
      color: white;
      font-weight: 800;
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 16px;
      box-shadow: 0 4px 10px rgba(22,163,74,0.4);
      border: 2px solid white;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 4px;
      transform: translate(-50%, -100%);
    ">
      🎓 NSBM Green University
    </div>
  `,
  iconSize: [160, 30],
  iconAnchor: [80, 25]
});

export default function ListingMapView({ boardings }) {
  const [selectedBoarding, setSelectedBoarding] = useState(boardings[0] || null);
  const [mapType, setMapType] = useState('google'); // 'google' | 'leaflet'

  // NSBM Center: 6.8214, 80.0416
  const centerLat = 6.8214;
  const centerLng = 80.0416;

  return (
    <div className="relative w-full h-[650px] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-sm flex flex-col md:flex-row">
      
      {/* Map Switcher Header */}
      <div className="absolute top-3 left-3 z-[1000] bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md border border-slate-200 flex items-center space-x-2 text-xs">
        <span className="font-bold text-slate-800 flex items-center gap-1.5">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg"
            alt="Google Maps"
            className="w-4 h-4"
          />
          Map View:
        </span>
        <button
          onClick={() => setMapType('google')}
          className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
            mapType === 'google' ? 'bg-[#4e89e7] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-slate-100'
          }`}
        >
          Google Maps Embed
        </button>
        <button
          onClick={() => setMapType('leaflet')}
          className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
            mapType === 'leaflet' ? 'bg-[#4e89e7] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-slate-100'
          }`}
        >
          Interactive Pins Map
        </button>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 h-full w-full relative">
        {mapType === 'google' ? (
          <div className="w-full h-full relative">
            <iframe
              title="NSBM Green University Boardings Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              src="https://maps.google.com/maps?q=NSBM+Green+University+Pitipana+Homagama+Sri+Lanka&t=m&z=15&output=embed"
            />
            {/* Overlay Notice */}
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow text-xs text-slate-700 max-w-sm pointer-events-none">
              <p className="font-bold text-slate-900">📍 Showing NSBM Green University Perimeter</p>
              <p className="text-[11px] text-slate-500">
                All {boardings.length} boardings are located along Pitipana, Temple Junction, Dampe, and Moragahahena.
              </p>
            </div>
          </div>
        ) : (
          <MapContainer
            center={[centerLat, centerLng]}
            zoom={14}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* NSBM Campus Marker */}
            <Marker position={[centerLat, centerLng]} icon={nsbmCampusIcon}>
              <Popup>
                <div className="text-xs p-1">
                  <h4 className="font-bold text-emerald-700">NSBM Green University</h4>
                  <p className="text-[11px] text-slate-500">Pitipana, Homagama</p>
                </div>
              </Popup>
            </Marker>

            {/* Boarding Locations with Price Markers */}
            {boardings.map((b) => (
              <Marker
                key={b.id}
                position={[b.lat || centerLat, b.lng || centerLng]}
                icon={createPriceIcon(b.price || 1200, selectedBoarding?.id === b.id)}
                eventHandlers={{
                  click: () => setSelectedBoarding(b)
                }}
              >
                <Popup>
                  <div className="text-xs p-1 space-y-1 max-w-[160px]">
                    <img src={b.image} alt={b.title} className="w-full h-16 object-cover rounded" />
                    <h5 className="font-bold text-slate-900 text-xs truncate">{b.title}</h5>
                    <p className="font-extrabold text-blue-600">LKR {b.price?.toLocaleString()} / term</p>
                    <Link
                      to={`/boarding/${b.id}`}
                      className="inline-block text-[10px] font-bold text-white bg-blue-600 px-2 py-0.5 rounded"
                    >
                      View Details
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>

      {/* Side Selected Property Drawer */}
      {selectedBoarding && (
        <div className="w-full md:w-80 bg-white border-t md:border-t-0 md:border-l border-slate-200 p-4 shrink-0 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Selected Property
              </span>
              <button
                onClick={() => setSelectedBoarding(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative h-36 bg-slate-100 rounded-lg overflow-hidden mb-3">
              <img
                src={selectedBoarding.image}
                alt={selectedBoarding.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                {selectedBoarding.discount || '15% off'}
              </span>
            </div>

            <h4 className="font-serif font-bold text-slate-900 text-sm">
              {selectedBoarding.title}
            </h4>

            <div className="flex items-center space-x-1.5 text-xs text-slate-500 mt-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-700">{selectedBoarding.rating}</span>
              <span>({selectedBoarding.reviewsCount || 1200} Reviews)</span>
            </div>

            <p className="text-xs text-slate-600 flex items-start gap-1 mt-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>{selectedBoarding.address}</span>
            </p>

            <p className="text-[11px] text-slate-500 mt-2 line-clamp-2">
              {selectedBoarding.description}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-4 space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-500">Term Rate:</span>
              <div className="text-right">
                <span className="text-xs text-red-500 line-through mr-1">
                  LKR {(selectedBoarding.originalPrice || 1400).toLocaleString()}
                </span>
                <span className="text-base font-extrabold text-slate-900">
                  LKR {(selectedBoarding.price || 1200).toLocaleString()}
                </span>
              </div>
            </div>

            <Link
              to={`/boarding/${selectedBoarding.id}`}
              className="w-full py-2 bg-[#4e89e7] hover:bg-[#3b78d6] text-white text-xs font-bold rounded-lg text-center shadow-xs block transition-colors"
            >
              See availability & Reserve
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}

