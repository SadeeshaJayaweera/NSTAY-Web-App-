import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  id: String,
  title: { type: String, required: true },
  size: { type: String, default: '300 sq ft' },
  capacity: { type: String, default: 'Sleeps 3' },
  beds: { type: String, default: '1 double bed and 1 twin bed' },
  price: { type: Number, required: true },
  image: String,
  available: { type: Boolean, default: true }
});

const reviewSchema = new mongoose.Schema({
  id: String,
  author: { type: String, required: true },
  faculty: { type: String, default: 'Faculty of Computing' },
  rating: { type: Number, min: 1, max: 5, required: true },
  date: { type: String, default: () => new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
  comment: { type: String, required: true }
});

const nearbyLocationSchema = new mongoose.Schema({
  name: String,
  time: String,
  type: { type: String, default: 'location' }
});

const boardingSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  title: {
    type: String,
    required: [true, 'Boarding title is required'],
    trim: true,
    index: true
  },
  category: {
    type: String,
    enum: ['Shared Space', 'Hotel and apartments', 'Residence', 'Resort', 'Our top picks'],
    default: 'Shared Space',
    index: true
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 1,
    max: 5,
    index: true
  },
  reviewsCount: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0,
    index: true
  },
  originalPrice: Number,
  discount: {
    type: String,
    default: '15% off'
  },
  city: {
    type: String,
    default: 'Homagama',
    index: true
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  phone: {
    type: String,
    required: [true, 'Contact phone is required']
  },
  email: String,
  owner: {
    type: String,
    default: 'Boarding Owner'
  },
  ownerId: String,
  lat: {
    type: Number,
    default: 6.8214
  },
  lng: {
    type: Number,
    default: 80.0416
  },
  image: {
    type: String,
    required: true
  },
  gallery: [String],
  description: String,
  longDescription: String,
  popularFilters: [String],
  topFacilities: [
    {
      name: String,
      icon: String
    }
  ],
  nearbyLocations: [nearbyLocationSchema],
  rooms: [roomSchema],
  reviews: [reviewSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Text index for fast multi-field search queries
boardingSchema.index({
  title: 'text',
  description: 'text',
  address: 'text',
  city: 'text'
});

export const Boarding = mongoose.models.Boarding || mongoose.model('Boarding', boardingSchema);

