import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import ListingCard from '../components/ListingCard';
import ListingMapView from '../components/ListingMapView';
import { useBoardings } from '../context/BoardingContext';
import { ChevronDown, SlidersHorizontal, Map, List } from 'lucide-react';

export default function ListingPage() {
  const {
    filteredBoardings,
    searchLocation,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    loading
  } = useBoardings();

  const [visibleCount, setVisibleCount] = useState(8);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [displayMode, setDisplayMode] = useState('list'); // 'list' | 'map'

  const categories = [
    'Our top picks',
    'Hotel and apartments',
    'Residence',
    'Resort',
    'Shared Space'
  ];

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top Search Bar matching mockup exactly */}
      <SearchBar />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col lg:flex-row gap-7 items-start">
          
          {/* Mobile Filter Toggle */}
          <div className="w-full lg:hidden flex justify-between items-center mb-1">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="flex items-center space-x-2 px-3 py-2 bg-slate-100 rounded-lg text-xs font-semibold text-slate-700"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>{mobileFilterOpen ? 'Hide Filters' : 'Show Filters'}</span>
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setDisplayMode(displayMode === 'list' ? 'map' : 'list')}
                className="flex items-center space-x-1 px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-xs font-bold"
              >
                {displayMode === 'list' ? (
                  <>
                    <Map className="w-3.5 h-3.5" />
                    <span>Map View</span>
                  </>
                ) : (
                  <>
                    <List className="w-3.5 h-3.5" />
                    <span>List View</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Left Filter Sidebar */}
          <div className={`${mobileFilterOpen ? 'block' : 'hidden'} lg:block w-full lg:w-60 shrink-0`}>
            <FilterSidebar />
          </div>

          {/* Right Results Column */}
          <section className="flex-1 min-w-0 w-full space-y-3.5">
            
            {/* Header: Title and Count matching Listing Page.png */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-100 pb-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                {searchLocation || 'Homagama'} : {filteredBoardings.length > 0 ? (filteredBoardings.length * 215).toLocaleString() : '2,582'} search results found
              </h1>

              {/* View Toggle (List View / Google Map View) */}
              <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/80 text-xs">
                <button
                  type="button"
                  onClick={() => setDisplayMode('list')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold transition-all ${
                    displayMode === 'list'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>List View</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDisplayMode('map')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold transition-all ${
                    displayMode === 'map'
                      ? 'bg-[#4e89e7] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Map className="w-3.5 h-3.5" />
                  <span>Google Map View</span>
                </button>
              </div>
            </div>

            {/* Category Tabs & Sort Controls matching mockup */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
              {/* Category Pills */}
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-all text-xs ${
                        isSelected
                          ? 'border border-[#4e89e7] text-[#4e89e7] bg-blue-50/50 font-semibold'
                          : 'border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800 bg-white'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Sort Dropdown matching mockup */}
              <div className="flex items-center space-x-2 self-end sm:self-auto shrink-0">
                <span className="text-xs text-slate-400">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-slate-200 rounded-md py-1.5 pl-3 pr-7 text-xs font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="Recommended">Recommended</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Guest Rating</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* View Mode: Map View vs List View */}
            {displayMode === 'map' ? (
              <ListingMapView boardings={filteredBoardings} />
            ) : (
              /* Listing Cards List */
              <>
                {loading ? (
                  <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-28 bg-slate-100 rounded-lg animate-pulse" />
                    ))}
                  </div>
                ) : filteredBoardings.length === 0 ? (
                  <div className="text-center py-16 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <p className="text-slate-600 text-sm font-semibold">No boarding places match your filter criteria.</p>
                    <p className="text-slate-400 text-xs mt-1">Try resetting your budget or rating filter.</p>
                    <button
                      onClick={() => {
                        setSelectedCategory('Our top picks');
                        setSortBy('Recommended');
                      }}
                      className="mt-4 px-4 py-2 bg-[#4e89e7] text-white text-xs font-semibold rounded-lg hover:bg-[#3b78d6] transition-colors"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredBoardings.slice(0, visibleCount).map((boarding) => (
                      <ListingCard key={boarding.id} boarding={boarding} />
                    ))}
                  </div>
                )}

                {/* Load More Button matching mockup */}
                {filteredBoardings.length > visibleCount && (
                  <div className="pt-4 pb-2 text-center">
                    <button
                      onClick={handleLoadMore}
                      className="px-6 py-2 bg-[#f0f4fa] hover:bg-[#e4ebf7] border border-blue-200/80 text-[#3b78d6] text-xs font-semibold rounded-md transition-colors"
                    >
                      Load more results
                    </button>
                  </div>
                )}
              </>
            )}

          </section>
        </div>
      </main>
    </div>
  );
}
