import React, { useState } from 'react';
import { X, Plus, Upload, Check } from 'lucide-react';
import { useBoardings } from '../context/BoardingContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function PostAdModal({ isOpen, onClose }) {
  const { addBoarding } = useBoardings();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Shared Space');
  const [price, setPrice] = useState('18000');
  const [address, setAddress] = useState('Pitipana, Homagama');
  const [phone, setPhone] = useState('07749212323');
  const [description, setDescription] = useState('Comfortable student boarding with high-speed Wi-Fi, study table, and 24/7 security near NSBM Green University.');
  const [selectedImage, setSelectedImage] = useState('/src/assets/temple_junction.jpg');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const imagePresets = [
    { label: 'Bedroom Desk', src: '/src/assets/temple_junction.png' },
    { label: 'Apartment View', src: '/src/assets/school_junction.png' },
    { label: 'Twin Residence', src: '/src/assets/devale_road.png' },
    { label: 'Green Village Hostels', src: '/src/assets/green_village.png' },
    { label: 'Girls Room', src: '/src/assets/nsbm_girls.png' },
    { label: 'Study Suite', src: '/src/assets/nsbm_student.png' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !phone) return;

    try {
      setLoading(true);
      await addBoarding({
        title,
        category,
        price: Number(price),
        address,
        phone,
        description,
        image: selectedImage,
        owner: user?.name || 'Boarding Owner'
      });
      setSuccess(true);
      addToast(`"${title}" published successfully!`, 'success');
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1200);
    } catch (err) {
      alert(err.message || 'Failed to post ad');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4 pb-2 border-b border-slate-100">
          <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider bg-[#9fe870] px-2 py-0.5 rounded">
            Post Ad
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            List a New Boarding Space
          </h2>
          <p className="text-xs text-slate-500">
            Publish your property to thousands of NSBM Green University students.
          </p>
        </div>

        {success ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Boarding Ad Published!</h3>
            <p className="text-xs text-slate-500">Your boarding is now live in the search results.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Property Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Pitipana Luxury Student Rooms"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50"
                >
                  <option value="Shared Space">Shared Space</option>
                  <option value="Hotel and apartments">Hotel and apartments</option>
                  <option value="Residence">Residence</option>
                  <option value="Resort">Resort</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Price (LKR / term)
                </label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="18000"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Temple Junction, Pitipana, Homagama"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="07749212323"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50"
                />
              </div>
            </div>

            {/* Image selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Select Card Photo
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {imagePresets.map((img) => (
                  <div
                    key={img.src}
                    onClick={() => setSelectedImage(img.src)}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all aspect-video relative ${
                      selectedImage === img.src ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                    {selectedImage === img.src && (
                      <div className="absolute top-1 right-1 bg-emerald-500 text-white rounded-full p-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Description
              </label>
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Rests include a glass of French champagne, parking and a late checkout. Gym included..."
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50"
              />
            </div>

            <div className="pt-2 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-[#9fe870] hover:bg-[#8ee058] text-slate-900 text-xs font-bold rounded-lg shadow-sm disabled:opacity-50 transition-colors"
              >
                {loading ? 'Publishing...' : 'Publish Boarding Ad'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

