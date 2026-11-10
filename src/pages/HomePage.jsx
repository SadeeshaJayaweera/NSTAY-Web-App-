import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, GraduationCap, Building2, Star, ArrowRight, CheckCircle2, Clock, Sparkles, Compass, BookOpen, Coffee, Dumbbell } from 'lucide-react';
import { useBoardings } from '../context/BoardingContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { boardings, setSearchLocation, setSearchQuery } = useBoardings();
  const [quickSearch, setQuickSearch] = useState('');
  const [quickLocation, setQuickLocation] = useState('Homagama');
  const [activeHeroTab, setActiveHeroTab] = useState(0);

  const heroImages = [
    {
      src: '/src/assets/nsbm_campus_front.jpg',
      title: 'NSBM Green University Main Campus',
      subtitle: 'Modern 60-acre eco-friendly campus in Pitipana, Homagama'
    },
    {
      src: '/src/assets/nsbm_students_study.jpg',
      title: 'Vibrant Undergraduate Student Life',
      subtitle: 'Join thousands of students studying in a supportive community'
    },
    {
      src: '/src/assets/nsbm_aerial.jpg',
      title: 'Aerial View of Pitipana Campus Perimeter',
      subtitle: 'Boardings located 1 to 5 minutes from lecture halls'
    }
  ];

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (quickLocation) setSearchLocation(quickLocation);
    if (quickSearch) setSearchQuery(quickSearch);
    navigate('/boardings');
  };

  const featured = boardings.slice(0, 4);

  const studentLifeGalleries = [
    {
      title: 'Ultra-Modern Campus Library',
      tag: 'Academic Focus',
      desc: 'Quiet research cubicles, computer hubs, and collaborative study pods.',
      image: '/src/assets/nsbm_library_life.jpg'
    },
    {
      title: 'Faculty of Computing (FOC)',
      tag: 'Innovation Hub',
      desc: 'Direct walk from boardings along Pitipana North & Perimeter Road.',
      image: '/src/assets/nsbm_foc.jpg'
    },
    {
      title: 'Olympic Swimming Pool & Gym',
      tag: 'Sports Complex',
      desc: 'World-class fitness amenities free for NSBM undergraduates.',
      image: '/src/assets/nsbm_sports_pool.jpg'
    },
    {
      title: 'Green Campus Lawns & Grounds',
      tag: 'Eco-Living',
      desc: 'Lush greenery, rainwater ponds, and serene open-air study spaces.',
      image: '/src/assets/nsbm_campus_students.jpg'
    },
    {
      title: 'Student Dining & Cafeterias',
      tag: 'Community Life',
      desc: 'Affordable meals, juice bars, and lively social centers.',
      image: '/src/assets/nsbm_cafe_hangout.jpg'
    },
    {
      title: 'Peer Project Discussions',
      tag: 'Collaboration',
      desc: 'Boardings equipped with high-speed fiber internet for group project sprints.',
      image: '/src/assets/nsbm_student_discussion.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* 1. Hero Section with Real NSBM Student Life Photography */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-slate-50/40 to-white pt-8 pb-14 lg:pt-14 lg:pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Heading, intro, and search */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-950 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>NSBM GREEN UNIVERSITY • OFFICIAL BOARDING FINDER</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Find Your Ideal Boarding Around <span className="text-emerald-600">NSBM Green University</span>
              </h1>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
                Welcome to <strong>NSTAY</strong> — the student-first web application designed specifically for NSBM undergraduates. Browse verified boardings in Pitipana and Homagama with authentic student reviews, real walking times to campus gates, transparent pricing, and direct host contacts.
              </p>

              {/* Quick Search Widget */}
              <form
                onSubmit={handleHeroSearch}
                className="pt-2 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-lg border border-slate-200/90 flex flex-col sm:flex-row gap-2 max-w-xl"
              >
                <div className="flex items-center flex-1 px-3 py-2 bg-[#f4f5f7] rounded-xl border border-slate-200/60">
                  <MapPin className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={quickLocation}
                    onChange={(e) => setQuickLocation(e.target.value)}
                    placeholder="Homagama / Pitipana"
                    className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                </div>
                <div className="flex items-center flex-1 px-3 py-2 bg-[#f4f5f7] rounded-xl border border-slate-200/60">
                  <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={quickSearch}
                    onChange={(e) => setQuickSearch(e.target.value)}
                    placeholder="Property or junction name..."
                    className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#4e89e7] text-white text-xs font-bold rounded-xl hover:bg-[#3b78d6] transition-colors shrink-0 shadow-sm"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Right Column: Hero Real Photography Showcase */}
            <div className="lg:col-span-5 space-y-3">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group aspect-[4/3]">
                <img
                  src={heroImages[activeHeroTab].src}
                  alt={heroImages[activeHeroTab].title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Overlay with Captions */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 w-fit px-2 py-0.5 rounded backdrop-blur-xs">
                    NSBM Green University Campus
                  </span>
                  <h3 className="text-base sm:text-lg font-bold mt-1">
                    {heroImages[activeHeroTab].title}
                  </h3>
                  <p className="text-xs text-slate-200 mt-0.5 line-clamp-1">
                    {heroImages[activeHeroTab].subtitle}
                  </p>
                </div>
              </div>

              {/* Thumbnails to switch hero photos */}
              <div className="grid grid-cols-3 gap-2">
                {heroImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveHeroTab(idx)}
                    className={`relative rounded-xl overflow-hidden h-16 border-2 transition-all ${
                      activeHeroTab === idx
                        ? 'border-emerald-500 ring-2 ring-emerald-300'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Visual Student Life Showcase Gallery */}
      <section className="py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Student Life Around Campus
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Experience the True NSBM Green Campus Environment
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              From study nights in the air-conditioned library to evening swims at the Olympic pool, your student accommodation should give you seamless access to every campus facility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentLifeGalleries.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                    {item.tag}
                  </span>
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
                    <span>Explore boardings nearby</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. What is NSTAY & Core Problem-Solving */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                Our University Mission
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Solving the NSBM Student Boarding Dilemma
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Every semester, over 10,000 undergraduates attend lectures across the Computing, Business, and Engineering faculties. Finding safe, clean, and reasonably priced accommodations shouldn't involve walking door-to-door in the sun or paying middleman fees.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Real Campus Walking Distances</h4>
                    <p className="text-xs text-slate-500">Boardings calibrated by walking and driving times to NSBM lecture gates.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 text-blue-800 rounded-lg shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Authentic Faculty Peer Reviews</h4>
                    <p className="text-xs text-slate-500">Honest feedback on Wi-Fi speeds, quiet hours, and meals from actual NSBM students.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-purple-100 text-purple-800 rounded-lg shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Direct Landlord Contact</h4>
                    <p className="text-xs text-slate-500">Speak directly with Pitipana and Homagama hosts with zero broker commissions.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Aerial Campus Feature Card */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src="/src/assets/nsbm_aerial.jpg"
                  alt="Aerial View of NSBM Green University"
                  className="w-full h-80 object-cover"
                />
                <div className="p-5 bg-white space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                    <span>NSBM Green University Campus Perimeter</span>
                    <span className="text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                      Homagama / Pitipana
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Over 50+ verified boardings and student apartments located within 500m to 2km of the campus entrance.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Dual Portal Cards */}
      <section className="py-16 bg-[#f8fafc] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Choose Your Portal
            </h2>
            <h3 className="text-2xl font-bold text-slate-900">
              Access Designed for Students & Property Hosts
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Student Portal Card */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-100 text-blue-700 rounded-xl">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      NSBM Undergraduates
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                      Student Access Portal
                    </h4>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Sign in using your official university student email address (ending in <code>.nsbm.ac.lk</code>) to reserve rooms, view host phone numbers, submit faculty reviews, and explore the Google Maps view.
                </p>

                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Instant room reservations with immediate landlord notification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Post authentic student reviews tagged by your Faculty</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Interactive Google Maps area exploration</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/login"
                className="w-full py-3 bg-[#4e89e7] hover:bg-[#3b78d6] text-white text-xs font-bold rounded-xl text-center shadow-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Sign In with NSBM Student Email</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Landlord Portal Card */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      Hosts & Landlords
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                      Boarding Host & Landlord Portal
                    </h4>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Own a boarding room, hostel, or residential space in Pitipana, Homagama, or surrounding areas? Sign in with your personal email and phone to publish ad listings and manage student inquiries.
                </p>

                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Publish boarding ads with photos, prices, and room dimensions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Review incoming student bookings with Confirm/Decline actions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Zero broker commission or listing charges</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/owner/login"
                className="w-full py-3 bg-[#a4f399] hover:bg-[#8ee058] text-slate-950 text-xs font-bold rounded-xl text-center shadow-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Enter Boarding Host Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Featured Listings Preview */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                Popular Boardings
              </h2>
              <h3 className="font-serif font-bold text-2xl text-slate-900 mt-1">
                Featured Accommodations Around NSBM
              </h3>
            </div>
            <Link
              to="/boardings"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View all {boardings.length} listings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((b) => (
              <div
                key={b.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-44 bg-slate-100 overflow-hidden">
                    <img
                      src={b.image}
                      alt={b.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-[#48a153] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {b.discount || '15% off'}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h4 className="font-serif font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {b.title}
                    </h4>

                    <div className="flex items-center space-x-1.5 text-xs text-slate-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-700">{b.rating}</span>
                      <span>({b.reviewsCount || 1200})</span>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2">
                      {b.address}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                  <div>
                    <span className="text-xs text-slate-400 line-through mr-1">LKR {(b.originalPrice || 1400).toLocaleString()}</span>
                    <span className="text-sm font-extrabold text-slate-900">LKR {(b.price).toLocaleString()}</span>
                  </div>

                  <Link
                    to={`/boarding/${b.id}`}
                    className="px-3 py-1.5 bg-[#4e89e7] hover:bg-[#3b78d6] text-white text-xs font-semibold rounded-lg shadow-xs"
                  >
                    See availability
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Call to Action Banner */}
      <section className="py-14 bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Ready to Find Your Home Near NSBM Green University?
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Join thousands of undergraduates who have secured peaceful, vetted, and comfortable boardings through NSTAY.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3.5 pt-2 max-w-md mx-auto">
            <Link
              to="/boardings"
              className="w-full sm:w-auto px-7 py-3.5 bg-white text-emerald-950 text-xs sm:text-sm font-bold rounded-xl shadow-lg hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-emerald-700" />
              <span>Browse All Boardings</span>
            </Link>
            <Link
              to="/owner/login"
              className="w-full sm:w-auto px-7 py-3.5 bg-[#a4f399] hover:bg-[#8ee058] text-slate-950 text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4 text-slate-800" />
              <span>Host / Landlord Portal</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
