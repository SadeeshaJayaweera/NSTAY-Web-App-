import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { initialBoardings, initialInquiries } from '../../server/data/seedData.js';

const BoardingContext = createContext(null);

export const BoardingProvider = ({ children }) => {
  const [boardings, setBoardings] = useState(initialBoardings);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search & Filter State matching Listing Page UI
  const [searchLocation, setSearchLocation] = useState('Homagama');
  const [checkInDate, setCheckInDate] = useState('Mar 18, 2023');
  const [checkOutDate, setCheckOutDate] = useState('March 20, 2023');
  const [guestsCount, setGuestsCount] = useState('2 adult, 1 room');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Our top picks');
  const [selectedBudgetRanges, setSelectedBudgetRanges] = useState([]);
  const [customBudgetMax, setCustomBudgetMax] = useState(35000);
  const [useCustomBudget, setUseCustomBudget] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPopularFilters, setSelectedPopularFilters] = useState([]);
  const [sortBy, setSortBy] = useState('Recommended');

  // Inquiries for admin & student
  const [inquiries, setInquiries] = useState(initialInquiries);

  // Fetch boardings from backend API
  const fetchBoardings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/boardings');
      if (res.ok) {
        const data = await res.json();
        setBoardings(data.boardings || []);
      }
    } catch (err) {
      console.warn('Backend API fetch error, using local fallback:', err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch inquiries
  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (err) {
      console.warn('Inquiries fetch error:', err.message);
    }
  };

  useEffect(() => {
    fetchBoardings();
    fetchInquiries();

    // Socket.io connection for real-time updates with graceful reconnection options
    const socket = io({
      reconnectionAttempts: 2,
      timeout: 3000,
      autoConnect: false // Connect only when needed
    });

    socket.on('connect_error', () => {
      // Gracefully handle local dev / sandbox environments
    });
    socket.on('new_boarding', (newB) => {
      setBoardings(prev => [newB, ...prev]);
    });
    socket.on('new_inquiry', (newInq) => {
      setInquiries(prev => [newInq, ...prev]);
    });
    socket.on('inquiry_status_updated', (updated) => {
      setInquiries(prev => prev.map(i => i.id === updated.id ? updated : i));
    });
    socket.on('new_review', ({ boardingId, review }) => {
      setBoardings(prev => prev.map(b => {
        if (b.id === boardingId) {
          const revs = b.reviews ? [review, ...b.reviews] : [review];
          return { ...b, reviews: revs, reviewsCount: (b.reviewsCount || 0) + 1 };
        }
        return b;
      }));
    });

    return () => socket.disconnect();
  }, []);

  // Filter and Sort computation
  const filteredBoardings = boardings.filter((item) => {
    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const match = item.title.toLowerCase().includes(q) ||
                    item.address.toLowerCase().includes(q) ||
                    (item.description && item.description.toLowerCase().includes(q));
      if (!match) return false;
    }

    // Category
    if (selectedCategory !== 'Our top picks' && selectedCategory !== 'all') {
      if (item.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
    }

    // Star rating
    if (selectedRating !== null) {
      if (item.rating < selectedRating) return false;
    }

    // Budget Filter
    if (useCustomBudget) {
      if (item.price > customBudgetMax) return false;
    } else if (selectedBudgetRanges.length > 0) {
      const matchAny = selectedBudgetRanges.some(range => {
        const parts = range.split('-').map(Number);
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
          return item.price >= parts[0] && item.price <= parts[1];
        }
        return true;
      });
      if (!matchAny) return false;
    }

    // Popular filters
    if (selectedPopularFilters.length > 0) {
      const hasAll = selectedPopularFilters.every(pf => 
        item.popularFilters && item.popularFilters.includes(pf)
      );
      if (!hasAll) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // Default recommended
  });

  const createInquiry = async (inquiryData) => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setInquiries(prev => [data.inquiry, ...prev]);
      return data.inquiry;
    } catch (err) {
      const fallbackInquiry = {
        id: `inq-${Date.now()}`,
        ...inquiryData,
        status: 'Pending',
        createdAt: new Date().toISOString()
      };
      setInquiries(prev => [fallbackInquiry, ...prev]);
      return fallbackInquiry;
    }
  };

  const addBoarding = async (formData) => {
    try {
      const res = await fetch('/api/boardings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setBoardings(prev => [data, ...prev]);
      return data;
    } catch (err) {
      const fallbackBoarding = {
        id: `b-${Date.now()}`,
        ...formData,
        rating: 5.0,
        reviewsCount: 1,
        image: formData.image || '/src/assets/temple_junction.png',
        gallery: [formData.image || '/src/assets/temple_junction.png'],
        reviews: []
      };
      setBoardings(prev => [fallbackBoarding, ...prev]);
      return fallbackBoarding;
    }
  };

  return (
    <BoardingContext.Provider value={{
      boardings,
      filteredBoardings,
      loading,
      searchLocation,
      setSearchLocation,
      checkInDate,
      setCheckInDate,
      checkOutDate,
      setCheckOutDate,
      guestsCount,
      setGuestsCount,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      selectedBudgetRanges,
      setSelectedBudgetRanges,
      customBudgetMax,
      setCustomBudgetMax,
      useCustomBudget,
      setUseCustomBudget,
      selectedRating,
      setSelectedRating,
      selectedPopularFilters,
      setSelectedPopularFilters,
      sortBy,
      setSortBy,
      inquiries,
      createInquiry,
      addBoarding,
      fetchBoardings
    }}>
      {children}
    </BoardingContext.Provider>
  );
};

export const useBoardings = () => useContext(BoardingContext);

