import React from 'react';
import { Search, Star } from 'lucide-react';
import { useBoardings } from '../context/BoardingContext';

export default function FilterSidebar() {
  const {
    searchQuery,
    setSearchQuery,
    selectedBudgetRanges,
    setSelectedBudgetRanges,
    customBudgetMax,
    setCustomBudgetMax,
    useCustomBudget,
    setUseCustomBudget,
    selectedRating,
    setSelectedRating,
    selectedPopularFilters,
    setSelectedPopularFilters
  } = useBoardings();

  const budgetOptions = [
    { label: 'LKR 15,000 - LKR 18,000', value: '15000-18000' },
    { label: 'LKR 18,000 - LKR 22,000', value: '18000-22000' },
    { label: 'LKR 22,000 - LKR 25,000', value: '22000-25000' },
    { label: 'LKR 25,000 - LKR 28,000', value: '25000-28000' },
    { label: 'LKR 28,000 - LKR 35,000', value: '28000-35000' },
  ];

  const popularFilterOptions = [
    'Free cancellation',
    'DUMMY',
    'Beach front',
    'Hot tub/ jacuzzi',
    'Book without credit card',
    'No prepayment',
  ];

  const toggleBudget = (val) => {
    if (selectedBudgetRanges.includes(val)) {
      setSelectedBudgetRanges(selectedBudgetRanges.filter((b) => b !== val));
    } else {
      setSelectedBudgetRanges([...selectedBudgetRanges, val]);
    }
  };

  const togglePopular = (val) => {
    if (selectedPopularFilters.includes(val)) {
      setSelectedPopularFilters(selectedPopularFilters.filter((p) => p !== val));
    } else {
      setSelectedPopularFilters([...selectedPopularFilters, val]);
    }
  };

  const handleRatingClick = (stars) => {
    if (selectedRating === stars) {
      setSelectedRating(null); // toggle off
    } else {
      setSelectedRating(stars);
    }
  };

  return (
    <aside className="w-full lg:w-64 space-y-6 shrink-0">
      {/* Search by property name */}
      <div className="bg-[#f8fafc] border border-slate-200/90 rounded-lg p-3.5">
        <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Search by property name
        </h3>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="eg. Beach westpalm"
            className="w-full bg-white border border-slate-200 rounded-md py-2 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Main Filter Section */}
      <div className="bg-white border border-slate-200/90 rounded-lg divide-y divide-slate-100">
        <div className="p-3.5 bg-[#f8fafc] rounded-t-lg border-b border-slate-200/80">
          <h2 className="text-sm font-bold text-slate-800">Filter by</h2>
        </div>

        {/* Your budget per term */}
        <div className="p-4 space-y-3">
          <h4 className="text-xs font-bold text-slate-700">Your budget (LKR / term)</h4>
          <div className="space-y-2">
            {budgetOptions.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center text-xs text-slate-600 hover:text-slate-900 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={selectedBudgetRanges.includes(opt.value)}
                  onChange={() => toggleBudget(opt.value)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5 mr-2.5"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>

          {/* Set your own budget toggle */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
              <span>Set your own budget</span>
              <button
                type="button"
                onClick={() => setUseCustomBudget(!useCustomBudget)}
                className={`w-8 h-4 flex items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
                  useCustomBudget ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                    useCustomBudget ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            {useCustomBudget && (
              <div className="space-y-1">
                <input
                  type="range"
                  min="15000"
                  max="35000"
                  step="500"
                  value={customBudgetMax}
                  onChange={(e) => setCustomBudgetMax(Number(e.target.value))}
                  className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                  <span>Up to:</span>
                  <span className="font-semibold text-blue-600">LKR {customBudgetMax.toLocaleString()} / term</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="p-4 space-y-2.5">
          <h4 className="text-xs font-bold text-slate-700">Rating</h4>
          <p className="text-[11px] text-slate-500">Show only ratings more than</p>
          <div className="grid grid-cols-5 gap-1.5 pt-1">
            {[1, 2, 3, 4, 5].map((stars) => (
              <button
                key={stars}
                type="button"
                onClick={() => handleRatingClick(stars)}
                className={`py-1.5 border rounded flex items-center justify-center text-xs font-semibold transition-all ${
                  selectedRating === stars
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span>{stars}</span>
                <span className="text-amber-500 text-[10px] ml-0.5">★</span>
              </button>
            ))}
          </div>
        </div>

        {/* Popular Filters */}
        <div className="p-4 space-y-3">
          <h4 className="text-xs font-bold text-slate-700">Popular Filters</h4>
          <div className="space-y-2">
            {popularFilterOptions.map((opt) => (
              <label
                key={opt}
                className="flex items-center text-xs text-slate-600 hover:text-slate-900 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={selectedPopularFilters.includes(opt)}
                  onChange={() => togglePopular(opt)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5 mr-2.5"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

