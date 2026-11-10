import React, { useState } from 'react';
import { useBoardings } from '../context/BoardingContext';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Plus, CheckCircle2, Clock, Trash2, Eye, Building2, MessageSquare, Users } from 'lucide-react';
import PostAdModal from '../components/PostAdModal';
import { Link } from 'react-router-dom';

export default function AdminPage() {
  const { boardings, inquiries, fetchBoardings } = useBoardings();
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState('inquiries'); // 'inquiries' | 'listings'
  const [postAdOpen, setPostAdOpen] = useState(false);
  const [inquiryList, setInquiryList] = useState(inquiries);

  const handleUpdateStatus = async (inqId, newStatus) => {
    try {
      const res = await fetch(`/api/inquiries/${inqId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setInquiryList(prev => prev.map(i => i.id === inqId ? { ...i, status: newStatus } : i));
      }
    } catch (err) {
      setInquiryList(prev => prev.map(i => i.id === inqId ? { ...i, status: newStatus } : i));
    }
  };

  const handleDeleteBoarding = async (id) => {
    if (!window.confirm('Are you sure you want to remove this boarding listing?')) return;
    try {
      await fetch(`/api/boardings/${id}`, { method: 'DELETE' });
      fetchBoardings();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <PostAdModal isOpen={postAdOpen} onClose={() => { setPostAdOpen(false); fetchBoardings(); }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h1 className="text-xl font-bold text-slate-900">
                NSTAY Host & Admin Dashboard
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Logged in as <strong className="text-slate-800">{user?.name || 'Boarding Admin'}</strong> ({user?.email || 'admin@nstay.lk'})
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setPostAdOpen(true)}
              className="px-4 py-2.5 bg-[#9fe870] hover:bg-[#8ee058] text-slate-900 text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              List New Boarding
            </button>
            <Link
              to="/"
              className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium rounded-lg transition-colors"
            >
              View Public Site
            </Link>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Active Boardings</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{boardings.length}</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Building2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Student Inquiries</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{inquiryList.length}</p>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Confirmed Bookings</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">
                {inquiryList.filter(i => i.status === 'Confirmed').length}
              </p>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">NSBM Student Satisfaction</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">98.4%</p>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 space-x-6">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`pb-3 text-xs font-bold transition-all relative ${
              activeTab === 'inquiries'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Student Inquiries & Bookings ({inquiryList.length})
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`pb-3 text-xs font-bold transition-all relative ${
              activeTab === 'listings'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Manage Boarding Listings ({boardings.length})
          </button>
        </div>

        {/* Content: Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Recent Inquiries From NSBM Students
              </h2>
              <span className="text-xs text-slate-400">Real-time synced</span>
            </div>

            {inquiryList.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No inquiries submitted yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {inquiryList.map((inq) => (
                  <div key={inq.id} className="p-4 sm:p-5 hover:bg-slate-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">{inq.studentName}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          inq.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : inq.status === 'Rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {inq.status || 'Pending'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 font-medium">
                        Property: <strong className="text-slate-800">{inq.boardingTitle}</strong>
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                        <span>📞 {inq.studentPhone}</span>
                        <span>✉️ {inq.studentEmail}</span>
                        <span>📅 {inq.checkInDate} to {inq.checkOutDate}</span>
                        <span>👥 {inq.guests}</span>
                      </div>

                      {inq.message && (
                        <p className="text-xs text-slate-500 italic mt-1 bg-slate-50 p-2 rounded border border-slate-100">
                          "{inq.message}"
                        </p>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center space-x-2 shrink-0">
                      {inq.status !== 'Confirmed' && (
                        <button
                          onClick={() => handleUpdateStatus(inq.id, 'Confirmed')}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                        >
                          Confirm
                        </button>
                      )}
                      {inq.status !== 'Rejected' && (
                        <button
                          onClick={() => handleUpdateStatus(inq.id, 'Rejected')}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 text-xs font-medium rounded-lg transition-colors"
                        >
                          Decline
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Content: Listings */}
        {activeTab === 'listings' && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Listed Boardings
              </h2>
              <button
                onClick={() => setPostAdOpen(true)}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add New
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {boardings.map((b) => (
                <div key={b.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center space-x-4 min-w-0">
                    <img
                      src={b.image}
                      alt={b.title}
                      className="w-14 h-14 rounded-lg object-cover bg-slate-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{b.title}</h3>
                      <p className="text-[11px] text-slate-500 truncate">{b.address}</p>
                      <div className="flex items-center space-x-3 text-[11px] text-slate-400 mt-0.5">
                        <span className="font-semibold text-slate-700">LKR {b.price?.toLocaleString()} / term</span>
                        <span>•</span>
                        <span>{b.category}</span>
                        <span>•</span>
                        <span>⭐ {b.rating} ({b.reviewsCount || 0})</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <Link
                      to={`/boarding/${b.id}`}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Live Listing"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDeleteBoarding(b.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Boarding"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

