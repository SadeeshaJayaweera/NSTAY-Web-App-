import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Bell, Menu, X, User, PlusCircle, LogOut, ShieldCheck, GraduationCap, Building2, Search, Home as HomeIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenPostAd }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Discover', path: '/boardings' },
    { name: 'Activities', path: '/activities' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handlePostAdClick = () => {
    if (user?.role === 'owner') {
      if (onOpenPostAd) onOpenPostAd();
      else navigate('/admin');
    } else {
      // Direct non-owners to owner portal to list boarding
      navigate('/owner/login');
    }
  };

  return (
    <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src="/src/assets/nstay_logo.png" 
            alt="NSTAY Green Comfort" 
            className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-5 lg:space-x-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive ? 'text-slate-900 font-bold border-b-2 border-emerald-500 pb-0.5' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          {/* Browse All Boardings Button */}
          <Link
            to="/boardings"
            className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-white bg-[#4e89e7] hover:bg-[#3b78d6] shadow-xs transition-all active:scale-95 whitespace-nowrap"
            title="Browse all verified boardings near NSBM"
          >
            <Search className="w-3.5 h-3.5 shrink-0" />
            <span>Browse All Boardings</span>
          </Link>

          {/* Host / Landlord Portal Button */}
          <Link
            to="/owner/login"
            className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-slate-950 bg-[#a4f399] hover:bg-[#8ee058] shadow-xs transition-all active:scale-95 border border-[#8ce87f]/70 whitespace-nowrap"
            title="Host & Landlord Portal"
          >
            <Building2 className="w-3.5 h-3.5 shrink-0 text-slate-800" />
            <span>Host / Landlord Portal</span>
          </Link>

          {/* If logged in as Host, also show Post Ad quick action */}
          {user?.role === 'owner' && (
            <button
              onClick={handlePostAdClick}
              className="hidden lg:inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-900 bg-amber-300 hover:bg-amber-400 transition-all shadow-xs active:scale-95 whitespace-nowrap"
              title="List a boarding space"
            >
              <PlusCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Post Ad</span>
            </button>
          )}

          {/* Notifications Bell - Only visible when signed in */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors relative cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-slate-700" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
              </button>

              {notificationsOpen && (
                <div 
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 py-3 z-50"
                  onMouseLeave={() => setNotificationsOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Notifications</span>
                    <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">Mark all read</span>
                  </div>
                  <div className="divide-y divide-slate-50 max-h-72 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer">
                      <p className="text-xs font-semibold text-slate-800">New boarding added in Pitipana</p>
                      <p className="text-xs text-slate-500 mt-0.5">Green Village Hostels has 2 vacancies available.</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">10 mins ago</span>
                    </div>
                    <div className="px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer">
                      <p className="text-xs font-semibold text-slate-800">Booking inquiry confirmed</p>
                      <p className="text-xs text-slate-500 mt-0.5">Temple Junction Space accepted your reservation request.</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">1 hour ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* User Profile Avatar Dropdown or Student Sign In */}
          <div className="relative">
            {user ? (
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-center w-8 h-8 rounded-full ring-2 ring-emerald-400 hover:ring-emerald-500 transition-all focus:outline-none bg-emerald-600 text-white font-semibold text-xs shadow-sm cursor-pointer select-none"
                title={user.name || 'User Profile'}
                aria-label="User Profile"
              >
                {user.avatar && !user.avatar.includes('avatar.png') ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : user.name ? (
                  <span>{getInitials(user.name)}</span>
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </button>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 bg-white shadow-xs transition-colors whitespace-nowrap"
              >
                <GraduationCap className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Student Sign In</span>
              </Link>
            )}

            {/* Dropdown Menu */}
            {dropdownOpen && user && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 divide-y divide-slate-100"
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <div className="px-4 py-2.5 flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-semibold text-xs flex items-center justify-center shrink-0">
                    {user.avatar && !user.avatar.includes('avatar.png') ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : user.name ? (
                      <span>{getInitials(user.name)}</span>
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    <span className={`inline-block mt-0.5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded ${
                      user.role === 'owner' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {user.role === 'owner' ? 'Boarding Host' : 'NSBM Student'}
                    </span>
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    to="/admin"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 mr-2.5 text-blue-500" />
                    Host & Admin Dashboard
                  </Link>

                  <Link
                    to="/boardings"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <HomeIcon className="w-4 h-4 mr-2.5 text-emerald-500" />
                    Explore Boardings
                  </Link>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      handlePostAdClick();
                    }}
                    className="w-full flex items-center px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors text-left"
                  >
                    <PlusCircle className="w-4 h-4 mr-2.5 text-emerald-600" />
                    List New Boarding Ad
                  </button>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4 mr-2.5" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-md"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-2 pb-5 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              to="/boardings"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-[#4e89e7] hover:bg-[#3b78d6] shadow-xs transition-all active:scale-95"
            >
              <Search className="w-4 h-4 shrink-0" />
              <span>Browse All Boardings</span>
            </Link>

            <Link
              to="/owner/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-bold text-slate-950 bg-[#a4f399] hover:bg-[#8ee058] shadow-xs transition-all active:scale-95 border border-[#8ce87f]/70"
            >
              <Building2 className="w-4 h-4 shrink-0 text-slate-800" />
              <span>Host / Landlord Portal</span>
            </Link>

            {!user ? (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-bold text-slate-700 hover:text-slate-900 border border-slate-200 bg-white shadow-xs transition-colors"
              >
                <GraduationCap className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Student Sign In (.nsbm.ac.lk)</span>
              </Link>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                {user.role === 'owner' && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handlePostAdClick();
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-bold text-slate-900 bg-amber-300 hover:bg-amber-400 shadow-xs"
                  >
                    <PlusCircle className="w-4 h-4 shrink-0" />
                    <span>Post New Ad</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  <span>Sign Out ({user.name})</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
