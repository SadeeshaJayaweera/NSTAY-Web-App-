import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building2, PlusCircle, CheckCircle, Shield, ArrowLeft, Phone, Mail, Lock, User } from 'lucide-react';

export default function OwnerAuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        if (!name || !email || !password || !phone) {
          setError('Please provide your name, email, phone number, and password');
          setLoading(false);
          return;
        }
        await register(name, email, password, 'owner');
      } else {
        if (!email || !password) {
          setError('Please enter your email and password');
          setLoading(false);
          return;
        }
        await login(email, password);
      }
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-block">
          <img
            src="/src/assets/nstay_logo.png"
            alt="NSTAY Logo"
            className="h-12 w-auto mx-auto object-contain"
          />
        </Link>
        
        <div className="mt-4 flex items-center justify-center space-x-2">
          <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
            <Building2 className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Boarding Owner & Landlord Portal
          </span>
        </div>

        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
          {isSignUp ? 'Register as a Boarding Host' : 'Host Account Sign In'}
        </h2>
        <p className="mt-1 text-xs text-slate-600 max-w-sm mx-auto">
          List your properties near NSBM Green University and manage student booking inquiries.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-slate-200/80 sm:px-10">
          
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Owner / Host Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kavinda Perera"
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. kavinda@nstay.lk or yourname@gmail.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {isSignUp && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Contact Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 077 492 1232"
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter secure password"
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#9fe870] hover:bg-[#8ee058] text-slate-900 font-bold text-xs rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-[0.99] disabled:opacity-50"
              >
                <PlusCircle className="w-4 h-4" />
                <span>
                  {loading
                    ? 'Processing...'
                    : isSignUp
                    ? 'Create Host Account & List Property'
                    : 'Sign In to Host Dashboard'}
                </span>
              </button>
            </div>
          </form>

          {/* Toggle between Login and Register */}
          <div className="mt-4 text-center text-xs text-slate-600">
            {isSignUp ? (
              <span>
                Already registered your boarding?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="text-emerald-700 font-bold hover:underline"
                >
                  Sign in here
                </button>
              </span>
            ) : (
              <span>
                Are you a new host in Pitipana / Homagama?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="text-emerald-700 font-bold hover:underline"
                >
                  Register here
                </button>
              </span>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>NSBM Student Sign In</span>
            </Link>
            <Link to="/boardings" className="text-slate-500 hover:text-slate-700">
              Browse Listings
            </Link>
          </div>
        </div>

        {/* Value props for boarding owners */}
        <div className="mt-8 grid grid-cols-2 gap-3 text-center text-xs text-slate-500">
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
            <p className="font-bold text-slate-800">Direct Student Booking</p>
            <p className="text-[11px] mt-0.5">Receive inquiries directly from verified NSBM undergraduates</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
            <p className="font-bold text-slate-800">Zero Commission</p>
            <p className="text-[11px] mt-0.5">Free ad posting for local community hosts</p>
          </div>
        </div>
      </div>
    </div>
  );
}

