import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-[#fafbfc] border-t border-slate-200 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200/80">
          {/* Logo & Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/src/assets/nstay_logo.png"
                alt="NSTAY Logo"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Seamless boarding accommodation finder designed for NSBM Green University students, faculty, and local hosts.
            </p>
          </div>

          {/* Nstay Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Nstay
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link to="/about" className="hover:text-slate-900 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a href="#newsroom" className="hover:text-slate-900 transition-colors">
                  Newsroom
                </a>
              </li>
              <li>
                <a href="#advertising" className="hover:text-slate-900 transition-colors">
                  Advertising
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-slate-900 transition-colors">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          {/* Terms and Policies */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Terms and Policies
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <a href="#privacy" className="hover:text-slate-900 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-slate-900 transition-colors">
                  Terms of use
                </a>
              </li>
              <li>
                <a href="#accessibility" className="hover:text-slate-900 transition-colors">
                  Accessibility
                </a>
              </li>
              <li>
                <a href="#reward" className="hover:text-slate-900 transition-colors">
                  Reward system policy
                </a>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Help
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <a href="#support" className="hover:text-slate-900 transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#cancel" className="hover:text-slate-900 transition-colors">
                  Cancel your bookings
                </a>
              </li>
              <li>
                <a href="#coupons" className="hover:text-slate-900 transition-colors">
                  Use Coupon
                </a>
              </li>
              <li>
                <a href="#refunds" className="hover:text-slate-900 transition-colors">
                  Refund Policies
                </a>
              </li>
              <li>
                <a href="#docs" className="hover:text-slate-900 transition-colors">
                  International Travel Documents
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© NSTAY Green Comfort. All rights reserved.</p>
          <div className="flex space-x-6 mt-3 sm:mt-0 font-medium text-slate-500">
            <span>NSBM Green University, Pitipana, Homagama</span>
            <span>Made with 💚 for students</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

