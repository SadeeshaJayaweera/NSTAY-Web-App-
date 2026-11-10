import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Phone, Wifi, Wind, Car, ThumbsUp, Calendar, Users, AlertCircle, CheckCircle, MessageSquare } from 'lucide-react';
import { useBoardings } from '../context/BoardingContext';
import { useAuth } from '../context/AuthContext';
import MapWidget from '../components/MapWidget';
import BookingModal from '../components/BookingModal';

export default function ProductPage() {
  const { id } = useParams();
  const { boardings } = useBoardings();
  const { user } = useAuth();

  const [boarding, setBoarding] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'reviews'
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Review submission state
  const [newRating, setNewRating] = useState(5);
  const [faculty, setFaculty] = useState('Faculty of Computing');
  const [comment, setComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    // Find boarding by ID or default to first boarding
    const found = boardings.find(b => b.id === id) || boardings[0];
    if (found) {
      setBoarding(found);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, boardings]);

  if (!boarding) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleOpenBooking = (room = null) => {
    setSelectedRoom(room);
    setBookingModalOpen(true);
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!comment) return;

    try {
      setReviewSubmitting(true);
      const res = await fetch(`/api/boardings/${boarding.id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: user?.name || 'NSBM Student',
          faculty,
          rating: newRating,
          comment
        })
      });

      if (res.ok) {
        const updated = await res.json();
        setBoarding(updated);
        setComment('');
        setReviewSuccess(true);
        setTimeout(() => setReviewSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Failed to submit review:', err);
    } finally {
      setReviewSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* Booking / Reservation Modal */}
      <BookingModal
        boarding={boarding}
        room={selectedRoom}
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      {/* Hero Image Gallery - Exact 3-Photo Layout from Product Page .png */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 h-72 sm:h-84 md:h-96 rounded-xl overflow-hidden bg-slate-100">
          
          {/* Main Large Left Photo (Bedroom with lamps and wall art) */}
          <div className="md:col-span-8 h-full overflow-hidden group relative">
            <img
              src={boarding.gallery?.[0] || boarding.image || '/src/assets/product_hero_main.png'}
              alt={boarding.title}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              onError={(e) => { e.target.src = '/src/assets/product_hero_main.png'; }}
            />
          </div>

          {/* Stacked Right Photos (NSBM Building exterior & Balcony View) */}
          <div className="hidden md:flex md:col-span-4 flex-col gap-2 h-full">
            <div className="h-1/2 overflow-hidden group relative">
              <img
                src={boarding.gallery?.[1] || '/src/assets/product_hero_top.png'}
                alt={`${boarding.title} Exterior`}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                onError={(e) => { e.target.src = '/src/assets/product_hero_top.png'; }}
              />
            </div>
            <div className="h-1/2 overflow-hidden group relative">
              <img
                src={boarding.gallery?.[2] || '/src/assets/product_hero_bottom.png'}
                alt={`${boarding.title} Room Interior`}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                onError={(e) => { e.target.src = '/src/assets/product_hero_bottom.png'; }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* Navigation Tabs matching mockup: Overview | Guest Reviews */}
      <div className="border-b border-slate-200 mt-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-10 text-sm">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 font-semibold transition-all relative ${
              activeTab === 'overview'
                ? 'text-[#2b78e4] border-b-2 border-[#2b78e4]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 font-semibold transition-all relative ${
              activeTab === 'reviews'
                ? 'text-[#2b78e4] border-b-2 border-[#2b78e4]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Guest Reviews
          </button>
        </div>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 space-y-10">
          
          {/* Main Details and Map Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Title, Ratings, Address, Overview Text & Facilities */}
            <div className="lg:col-span-8 space-y-5">
              
              {/* Title in Serif font matching Product Page .png */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                    {boarding.title}
                  </h1>
                  
                  {/* Rating stars */}
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex items-center text-amber-500">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                      <Star className="w-4 h-4 fill-current text-slate-200" />
                    </div>
                    <span className="text-xs font-bold text-slate-700">{boarding.rating || 4.5}</span>
                    <span className="text-xs text-slate-400">({boarding.reviewsCount || 1200} Reviews)</span>
                  </div>

                  {/* Location Pin & Phone matching screenshot */}
                  <div className="mt-2.5 text-xs text-slate-600 space-y-1">
                    <div className="flex items-center">
                      <MapPin className="w-3.5 h-3.5 text-blue-500 mr-1.5 shrink-0" />
                      <span>{boarding.address}</span>
                    </div>
                    <div className="flex items-center font-medium pl-5 text-slate-700">
                      <span>{boarding.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Price Display Card */}
                <div className="sm:text-right shrink-0 bg-emerald-50/70 border border-emerald-200/80 rounded-xl px-4 py-2.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-0.5">
                    {boarding.discount || '15% off'}
                  </div>
                  <div className="flex items-baseline sm:justify-end space-x-1.5">
                    <span className="text-xs text-red-500 line-through">
                      LKR {(boarding.originalPrice || 1400).toLocaleString()}
                    </span>
                    <span className="text-xl font-black text-slate-900">
                      LKR {(boarding.price || 1200).toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 block">per semester / term</span>
                </div>
              </div>

              {/* Overview text */}
              <div className="space-y-3 pt-1">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Overview
                </h3>
                <div className="text-xs sm:text-[13px] text-slate-600 space-y-3 leading-relaxed whitespace-pre-line">
                  <p>
                    {boarding.longDescription || boarding.description || 'Featuring free WiFi throughout the property, this boarding offers comfortable accommodations near NSBM Green University in Pitipana, Homagama.'}
                  </p>
                </div>
              </div>

              {/* Top facilities matching screenshot */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Top facilities
                </h3>
                <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs text-slate-700">
                  <div className="flex items-center space-x-2">
                    <Wifi className="w-4 h-4 text-slate-400" />
                    <span>Free wifi</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ThumbsUp className="w-4 h-4 text-slate-400" />
                    <span>Top rated in area</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wind className="w-4 h-4 text-slate-400" />
                    <span>Air Conditioning</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Car className="w-4 h-4 text-slate-400" />
                    <span>Parking available</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Google Maps View & Area Exploration */}
            <div className="lg:col-span-4">
              <MapWidget boarding={boarding} />
            </div>

          </div>

          {/* "Available Boardings" Section matching screenshot */}
          <section className="space-y-5 pt-6 border-t border-slate-200">
            <div>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
                Available Boardings
              </h2>
            </div>

            {/* Date Check Bar matching mockup */}
            <div className="bg-[#f8fafc] border border-slate-200/90 p-2 rounded-xl flex flex-wrap lg:flex-nowrap items-center gap-2">
              <div className="flex items-center flex-1 min-w-[140px] px-3 py-2 bg-white rounded-lg border border-slate-200 text-xs text-slate-700">
                <Calendar className="w-4 h-4 text-slate-400 mr-2" />
                <span>Mar 18, 2022</span>
              </div>
              <div className="flex items-center flex-1 min-w-[140px] px-3 py-2 bg-white rounded-lg border border-slate-200 text-xs text-slate-700">
                <Calendar className="w-4 h-4 text-slate-400 mr-2" />
                <span>March 20, 2022</span>
              </div>
              <div className="flex items-center flex-1 min-w-[140px] px-3 py-2 bg-white rounded-lg border border-slate-200 text-xs text-slate-700">
                <Users className="w-4 h-4 text-slate-400 mr-2" />
                <span>2 adult, 1 room</span>
              </div>
              <button
                type="button"
                onClick={() => handleOpenBooking()}
                className="w-full lg:w-auto px-6 py-2.5 bg-[#4e89e7] hover:bg-[#3b78d6] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
              >
                Check Availability
              </button>
            </div>

            {/* 3 Room Cards Grid matching Product Page .png with high quality photos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(boarding.rooms && boarding.rooms.length > 0 ? boarding.rooms : [
                { id: 'room-1', title: 'Shared Room for NSBM Students', size: '300 sq ft', capacity: 'Sleeps 3', beds: '1 double bed and 1 twin bed', image: '/src/assets/product_hero_bottom.jpg' },
                { id: 'room-2', title: 'Temple Junction Study Room', size: '280 sq ft', capacity: 'Sleeps 2', beds: '2 single beds with study desks', image: '/src/assets/school_junction.jpg' },
                { id: 'room-3', title: 'Shared Room For NSBM Girls', size: '300 sq ft', capacity: 'Sleeps 3', beds: '3 single beds', image: '/src/assets/shared_room_students.jpg' }
              ]).map((room, idx) => (
                <div key={room.id || idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div>
                    <div className="h-44 bg-slate-100 overflow-hidden">
                      <img
                        src={room.image || '/src/assets/product_hero_bottom.jpg'}
                        alt={room.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => { e.target.src = '/src/assets/product_hero_bottom.jpg'; }}
                      />
                    </div>
                    <div className="p-4 space-y-3">
                      <h4 className="font-serif font-bold text-sm text-slate-900">
                        {room.title}
                      </h4>
                      <div className="space-y-1.5 text-xs text-slate-600">
                        <div className="flex items-center">
                          <span className="w-4 text-center mr-2 text-slate-400">📐</span>
                          <span>{room.size || '300 sq ft'}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-4 text-center mr-2 text-slate-400">👥</span>
                          <span>{room.capacity || 'Sleeps 2-3'}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-4 text-center mr-2 text-slate-400">🛏</span>
                          <span>{room.beds || 'Comfortable beds and personal study desk'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 pt-0 space-y-2">
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                      <span className="text-slate-500 font-medium">Semester Rate:</span>
                      <span className="font-extrabold text-slate-900">
                        LKR {(room.price || boarding.price || 1200).toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => handleOpenBooking({ title: room.title, price: room.price || boarding.price })}
                      className="w-full py-2 bg-[#4e89e7] hover:bg-[#3b78d6] text-white text-xs font-bold rounded-lg transition-colors shadow-sm cursor-pointer"
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* COVID Warning Banner exactly matching Product Page .png */}
          <div className="bg-[#f1f5f9] border border-slate-200/80 rounded-xl p-4 flex items-center space-x-3 text-xs text-slate-700">
            <AlertCircle className="w-5 h-5 text-slate-400 shrink-0" />
            <span>
              Check the latest COVID-19 restrictions before you travel.{' '}
              <a href="#learn-more" className="text-blue-600 hover:underline font-medium">
                Learn more
              </a>
            </span>
          </div>

        </main>
      )}

      {/* Tab 2: Guest Reviews */}
      {activeTab === 'reviews' && (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="font-serif font-bold text-2xl text-slate-900">Student Reviews & Experiences</h2>
              <p className="text-xs text-slate-500 mt-1">Verified reviews from past and current NSBM students</p>
            </div>
            <div className="flex items-center space-x-2 bg-amber-50 px-3.5 py-2 rounded-xl border border-amber-200">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="text-lg font-extrabold text-amber-900">{boarding.rating || 4.5}</span>
              <span className="text-xs text-amber-700">/ 5.0 Rating</span>
            </div>
          </div>

          {/* Submit Review Form */}
          <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-6 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              Write a Student Review
            </h3>

            {reviewSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 text-xs rounded-lg border border-emerald-200 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Thank you! Your review has been added to this boarding.
              </div>
            )}

            <form onSubmit={handleAddReview} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Faculty
                  </label>
                  <select
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="Faculty of Computing">Faculty of Computing</option>
                    <option value="Faculty of Business">Faculty of Business</option>
                    <option value="Faculty of Engineering">Faculty of Engineering</option>
                    <option value="Faculty of Science">Faculty of Science</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Rating
                  </label>
                  <div className="flex items-center space-x-1 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-semibold text-slate-700 ml-2">{newRating} Stars</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Review
                </label>
                <textarea
                  required
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share details about electricity, Wi-Fi speed, warden/owner hospitality, walking distance to NSBM, cleanliness..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={reviewSubmitting}
                className="px-6 py-2.5 bg-[#4e89e7] hover:bg-[#3b78d6] text-white text-xs font-bold rounded-lg shadow-xs disabled:opacity-50 transition-colors"
              >
                {reviewSubmitting ? 'Posting Review...' : 'Post Review'}
              </button>
            </form>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {(boarding.reviews && boarding.reviews.length > 0) ? (
              boarding.reviews.map((rev) => (
                <div key={rev.id} className="p-5 border border-slate-200 rounded-xl bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{rev.author}</h4>
                      <p className="text-[11px] text-slate-500">{rev.faculty}</p>
                    </div>
                    <div className="flex items-center space-x-1 text-amber-400">
                      {[...Array(Math.floor(rev.rating || 5))].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{rev.comment}</p>
                  <span className="text-[10px] text-slate-400 block">{rev.date}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 text-center py-6">
                No reviews yet for this boarding. Be the first to leave one!
              </p>
            )}
          </div>
        </main>
      )}

    </div>
  );
}
