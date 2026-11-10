import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, AlertCircle, Building2, ArrowRight, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

export default function AuthPage({ initialMode = 'signup' }) {
  const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeCampusPhoto, setActiveCampusPhoto] = useState('/src/assets/nsbm_campus_front.jpg');

  const { register, login, oauthLogin } = useAuth();
  const navigate = useNavigate();

  const campusPhotos = [
    { label: 'Campus Front', src: '/src/assets/nsbm_campus_front.jpg' },
    { label: 'Aerial View', src: '/src/assets/nsbm_aerial.jpg' },
    { label: 'Computing Faculty', src: '/src/assets/nsbm_foc.jpg' },
    { label: 'Student Life', src: '/src/assets/nsbm_campus_students.jpg' }
  ];

  const validateNsbmEmail = (val) => {
    const trimmed = val.toLowerCase().trim();
    return trimmed.endsWith('.nsbm.ac.lk') || trimmed.endsWith('@nsbm.ac.lk');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check NSBM email domain requirement
    if (isSignUp && !validateNsbmEmail(email)) {
      setError('Students must register with an official NSBM email ending in .nsbm.ac.lk (e.g. yourname@students.nsbm.ac.lk)');
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        if (!fullName || !email || !password) {
          setError('Please fill in all fields');
          setLoading(false);
          return;
        }
        await register(fullName, email, password, 'student');
      } else {
        if (!email || !password) {
          setError('Please enter your email and password');
          setLoading(false);
          return;
        }
        await login(email, password);
      }
      navigate('/boardings');
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider) => {
    try {
      setLoading(true);
      await oauthLogin(provider);
      navigate('/boardings');
    } catch (err) {
      setError('OAuth login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50 lg:bg-white font-sans">
      
      {/* Mobile & Tablet Header Campus Banner (< lg) */}
      <div className="lg:hidden relative w-full h-44 sm:h-56 bg-slate-900 overflow-hidden shrink-0 shadow-md">
        <img
          src={activeCampusPhoto}
          alt="NSBM Green University Campus"
          className="w-full h-full object-cover object-center transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/20 flex flex-col justify-between p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="inline-flex items-center space-x-2 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
              <img src="/src/assets/nstay_logo.png" alt="NSTAY" className="h-5 w-auto" />
            </Link>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
              NSBM Student Portal
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold mb-0.5">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>NSBM Green University</span>
            </div>
            <h2 className="text-white text-base sm:text-lg font-bold">
              Student Accommodation Living
            </h2>
          </div>
        </div>
      </div>

      {/* Desktop Left Side: Authentic NSBM Green University Campus Visual Showcase */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-7/12 relative bg-slate-950 overflow-hidden flex-col justify-between p-8 xl:p-12 text-white min-h-screen">
        {/* Background Campus Photo with Smooth Transition */}
        <img
          src={activeCampusPhoto}
          alt="NSBM Green University Campus"
          className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out brightness-95"
          onError={(e) => {
            e.target.src = '/src/assets/nsbm_campus_front.jpg';
          }}
        />

        {/* Sophisticated Dark Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/35 to-slate-950/30 pointer-events-none" />

        {/* Top Header Row with Logo & Interactive Campus View Selector */}
        <div className="relative z-10 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center space-x-2.5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg hover:bg-white transition-all"
          >
            <img src="/src/assets/nstay_logo.png" alt="NSTAY" className="h-6 w-auto" />
            <span className="text-xs font-bold text-slate-800">NSTAY Green Comfort</span>
          </Link>

          {/* Campus View Switcher Pills */}
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md p-1 rounded-full border border-white/20 shadow-md">
            {campusPhotos.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveCampusPhoto(item.src)}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                  activeCampusPhoto === item.src
                    ? 'bg-emerald-500 text-white shadow-xs font-bold'
                    : 'text-white/80 hover:text-white hover:bg-white/15'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Hero Context Box */}
        <div className="relative z-10 space-y-4 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/25 backdrop-blur-md border border-emerald-400/40 text-emerald-300 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pitipana, Homagama • 60-Acre Modern University</span>
          </div>

          <h2 className="text-2xl xl:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Safe, Verified Boardings for NSBM Undergraduates.
          </h2>

          <p className="text-slate-300 text-xs xl:text-sm leading-relaxed">
            Connect directly with verified boarding hosts around Temple Junction, School Junction, Dampe, and Pitipana. No middlemen, no commission fees.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 text-white/90 font-medium">
              🌱 Green University Town
            </span>
            <span className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 text-white/90 font-medium">
              🔒 .nsbm.ac.lk Verified
            </span>
            <span className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 text-white/90 font-medium">
              ⚡ Free Fiber Wi-Fi
            </span>
          </div>
        </div>
      </div>

      {/* Right Side: Responsive Form Container */}
      <div className="w-full lg:w-1/2 xl:w-5/12 flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-10 xl:px-14 py-8 sm:py-12 max-w-lg mx-auto">
        
        {/* Switch to Boarding Owner Portal Banner */}
        <div className="mb-6 p-2.5 bg-emerald-50/80 border border-emerald-200/80 rounded-xl flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-emerald-900 font-medium truncate">
            <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate">Boarding Owner or Landlord?</span>
          </div>
          <Link
            to="/owner/login"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 shrink-0 ml-2"
          >
            <span>Host Portal</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Top Logo (Desktop view) */}
        <div className="hidden lg:flex justify-center mb-4">
          <Link to="/">
            <img
              src="/src/assets/nstay_logo.png"
              alt="NSTAY Green Comfort"
              className="h-12 w-auto object-contain hover:scale-105 transition-transform"
            />
          </Link>
        </div>

        {/* NSBM Student Portal Badge */}
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            NSBM Student Portal (.nsbm.ac.lk)
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-xl sm:text-2xl font-bold text-center text-slate-900 mb-6">
          {isSignUp ? 'Create your Free Student Account' : 'Log in as NSBM Student'}
        </h1>

        {error && (
          <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-medium flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name field (for signup) */}
          {isSignUp && (
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your Full Name here"
                className="w-full px-4 py-3 bg-[#e9edf2] text-xs text-slate-800 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7ed957] transition-all"
              />
            </div>
          )}

          {/* Email field with domain requirement note */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold text-slate-800">
                NSBM Student Email
              </label>
              <span className="text-[10px] text-emerald-700 font-semibold">
                Must end in .nsbm.ac.lk
              </span>
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. yourname@students.nsbm.ac.lk"
              className={`w-full px-4 py-3 bg-[#e9edf2] text-xs text-slate-800 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                email && !validateNsbmEmail(email) ? 'focus:ring-amber-500 border border-amber-300' : 'focus:ring-[#7ed957]'
              }`}
            />
            {email && !validateNsbmEmail(email) && (
              <p className="text-[11px] text-amber-600 mt-1">
                ⚠️ Notice: Please enter your official university email (e.g. @students.nsbm.ac.lk or @nsbm.ac.lk)
              </p>
            )}
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password here"
              className="w-full px-4 py-3 bg-[#e9edf2] text-xs text-slate-800 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7ed957] transition-all"
            />
          </div>

          {/* Submit Button matching mockup lime green */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#7ed957] hover:bg-[#72c74e] text-slate-900 font-bold text-sm rounded-lg shadow-sm transition-all duration-200 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
            >
              {loading
                ? 'Processing...'
                : isSignUp
                ? 'Create Account'
                : 'Log In'}
            </button>
          </div>
        </form>

        {/* Switch mode */}
        <div className="mt-4 text-center text-xs text-slate-600">
          {isSignUp ? (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-blue-600 font-semibold hover:underline"
              >
                Log in
              </button>
            </span>
          ) : (
            <span>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign up
              </button>
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="my-5 flex items-center justify-center">
          <span className="text-xs text-slate-400 font-medium tracking-widest">- OR -</span>
        </div>

        {/* Social Login buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleOAuth('google')}
            className="flex items-center justify-center space-x-2 py-2.5 px-3 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.87c2.26-2.09 3.56-5.17 3.56-9.15z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.05c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.25v3.13C3.25 21.3 7.31 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.63H1.25C.45 8.24 0 10.06 0 12s.45 3.76 1.25 5.37l4.02-3.13z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.25 6.63l4.02 3.13c.95-2.85 3.6-4.96 6.73-4.96z"
              />
            </svg>
            <span className="truncate">{isSignUp ? 'Sign up with Google' : 'Sign in with Google'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleOAuth('github')}
            className="flex items-center justify-center space-x-2 py-2.5 px-3 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <svg className="w-4 h-4 shrink-0 fill-slate-900" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span className="truncate">{isSignUp ? 'Sign up with GitHub' : 'Sign in with GitHub'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
