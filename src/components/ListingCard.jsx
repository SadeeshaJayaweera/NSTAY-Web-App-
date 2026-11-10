import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

export default function ListingCard({ boarding }) {
  const {
    id,
    title,
    rating = 4.5,
    reviewsCount = 1200,
    price = 1200,
    originalPrice = 1400,
    discount = '15% off',
    image = '/src/assets/temple_junction.jpg',
    tagline,
    description = 'Quiet, fully-furnished boarding room with high-speed Wi-Fi, study desk, and 24/7 security near NSBM Green University.'
  } = boarding;

  const displayTagline = tagline || (description ? description.split('.')[0] : 'Modern boarding room near NSBM');
  const displaySnippet = description || 'High-speed Wi-Fi, individual study desk, 24/7 security, and peaceful study atmosphere.';

  return (
    <div className="bg-white border border-slate-200/80 rounded-lg p-3 hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      
      {/* Property Image matching size in Listing Page.png */}
      <Link 
        to={`/boarding/${id}`} 
        className="shrink-0 w-full sm:w-[150px] h-[105px] rounded-md overflow-hidden bg-slate-100 group relative block shadow-xs"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = '/src/assets/temple_junction.jpg';
          }}
        />
      </Link>

      {/* Center Details */}
      <div className="flex-1 min-w-0 space-y-1">
        <Link to={`/boarding/${id}`}>
          <h3 className="font-serif font-bold text-slate-900 text-sm sm:text-base hover:text-[#4e89e7] transition-colors line-clamp-1">
            {title}
          </h3>
        </Link>

        {/* Rating matching mockup */}
        <div className="flex items-center space-x-1.5 text-xs text-slate-500">
          <div className="flex items-center text-amber-400">
            {[...Array(4)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
            <Star className="w-3.5 h-3.5 fill-current text-slate-200" />
          </div>
          <span className="font-bold text-slate-700 text-xs">{rating}</span>
          <span className="text-[11px] text-slate-500">({reviewsCount} Reviews)</span>
        </div>

        {/* Dynamic description snippet matching real boarding features */}
        <div className="text-[11px] text-slate-500 leading-snug">
          <p className="font-medium text-slate-700 line-clamp-1">{displayTagline}</p>
          <p className="text-slate-400 text-[10.5px] line-clamp-1">
            {displaySnippet}
          </p>
        </div>

        {/* See availability button matching blue #4e89e7 */}
        <div className="pt-1">
          <Link
            to={`/boarding/${id}`}
            className="inline-block px-4 py-1.5 bg-[#4e89e7] hover:bg-[#3b78d6] text-white text-xs font-semibold rounded shadow-xs transition-colors"
          >
            See availability
          </Link>
        </div>
      </div>

      {/* Right Pricing Section */}
      <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 shrink-0 self-stretch sm:self-center sm:text-right">
        {/* Discount Badge */}
        <div className="mb-1">
          <span className="bg-[#48a153] text-white text-[10px] font-bold px-2 py-0.5 rounded">
            {discount}
          </span>
        </div>

        {/* Price values */}
        <div className="flex items-baseline sm:flex-col sm:items-end gap-1.5 sm:gap-0">
          <div className="flex items-baseline space-x-2">
            <span className="text-xs text-red-500 line-through font-medium">
              LKR {originalPrice ? originalPrice.toLocaleString() : '1,400'}
            </span>
            <span className="text-sm sm:text-base font-extrabold text-slate-900">
              LKR {price ? price.toLocaleString() : '1,200'}
            </span>
          </div>
          <span className="text-[10px] text-slate-400">
            Includes taxes and fees
          </span>
        </div>
      </div>

    </div>
  );
}
