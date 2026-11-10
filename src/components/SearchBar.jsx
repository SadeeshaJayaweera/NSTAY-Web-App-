import React, { useState } from 'react';
import { MapPin, Calendar, Users, Search } from 'lucide-react';
import { useBoardings } from '../context/BoardingContext';

export default function SearchBar({ onSearch }) {
  const {
    searchLocation,
    setSearchLocation,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    guestsCount,
    setGuestsCount
  } = useBoardings();

  const [locationInput, setLocationInput] = useState(searchLocation);
  const [guestsInput, setGuestsInput] = useState(guestsCount);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchLocation(locationInput);
    setGuestsCount(guestsInput);
    if (onSearch) onSearch();
  };

  return (
    <div className="w-full bg-white py-3 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form 
          onSubmit={handleSubmit}
          className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-2 max-w-5xl mx-auto"
        >
          {/* Segment 1: Location */}
          <div className="flex items-center bg-[#f4f5f7] hover:bg-[#eceef2] transition-colors rounded-lg px-3.5 py-2.5 flex-1 min-w-[170px] border border-slate-200/60">
            <MapPin className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder="Homagama"
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none"
            />
          </div>

          {/* Segment 2: Check-in Date */}
          <div className="flex items-center bg-[#f4f5f7] hover:bg-[#eceef2] transition-colors rounded-lg px-3.5 py-2.5 flex-1 min-w-[140px] border border-slate-200/60">
            <Calendar className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              placeholder="Mar 18, 2023"
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none cursor-pointer"
            />
          </div>

          {/* Segment 3: Check-out Date */}
          <div className="flex items-center bg-[#f4f5f7] hover:bg-[#eceef2] transition-colors rounded-lg px-3.5 py-2.5 flex-1 min-w-[140px] border border-slate-200/60">
            <Calendar className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              placeholder="March 20, 2023"
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none cursor-pointer"
            />
          </div>

          {/* Segment 4: Guests & Rooms */}
          <div className="flex items-center bg-[#f4f5f7] hover:bg-[#eceef2] transition-colors rounded-lg px-3.5 py-2.5 flex-1 min-w-[150px] border border-slate-200/60">
            <Users className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={guestsInput}
              onChange={(e) => setGuestsInput(e.target.value)}
              placeholder="2 adult, 1 room"
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none"
            />
          </div>

          {/* Segment 5: Search Button matching mockup #4e89e7 */}
          <button
            type="submit"
            className="w-full sm:w-auto px-7 py-2.5 bg-[#4e89e7] hover:bg-[#3b78d6] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all duration-150 flex items-center justify-center shrink-0 active:scale-95"
          >
            <Search className="w-4 h-4 mr-1.5 sm:hidden" />
            <span>Search</span>
          </button>
        </form>
      </div>
    </div>
  );
}
