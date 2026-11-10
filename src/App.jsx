import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ListingPage from './pages/ListingPage';
import ProductPage from './pages/ProductPage';
import AuthPage from './pages/AuthPage';
import OwnerAuthPage from './pages/OwnerAuthPage';
import AdminPage from './pages/AdminPage';
import ActivitiesPage from './pages/ActivitiesPage';
import { AboutPage, ContactPage } from './pages/StaticPages';
import PostAdModal from './components/PostAdModal';
import { AuthProvider } from './context/AuthContext';
import { BoardingProvider, useBoardings } from './context/BoardingContext';

import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './context/ToastContext';

function AppContent() {
  const location = useLocation();
  const [postAdOpen, setPostAdOpen] = useState(false);
  const { fetchBoardings } = useBoardings();

  // Hide Navbar/Footer on Auth pages for exact split-screen mockup fidelity
  const isAuthPage = 
    location.pathname === '/login' || 
    location.pathname === '/register' ||
    location.pathname === '/owner/login' ||
    location.pathname === '/owner-login';

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Navbar onOpenPostAd={() => setPostAdOpen(true)} />}

      <PostAdModal
        isOpen={postAdOpen}
        onClose={() => {
          setPostAdOpen(false);
          fetchBoardings();
        }}
      />

      <div className="flex-1">
        <Routes>
          {/* Main Homepage explaining application purpose */}
          <Route path="/" element={<HomePage />} />

          {/* Listing Search Results matching Listing Page.png */}
          <Route path="/boardings" element={<ListingPage />} />

          {/* Detailed Accommodation View matching Product Page .png */}
          <Route path="/boarding/:id" element={<ProductPage />} />

          {/* Student Auth with NSTAY.jpg and .nsbm.ac.lk validation */}
          <Route path="/login" element={<AuthPage initialMode="login" />} />
          <Route path="/register" element={<AuthPage initialMode="signup" />} />

          {/* Boarding Owner & Host Auth */}
          <Route path="/owner/login" element={<OwnerAuthPage />} />
          <Route path="/owner-login" element={<OwnerAuthPage />} />

          {/* Boarding Host & Admin Dashboard */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Extra Information Pages */}
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>

      {!isAuthPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <BoardingProvider>
            <ToastProvider>
              <AppContent />
            </ToastProvider>
          </BoardingProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}
