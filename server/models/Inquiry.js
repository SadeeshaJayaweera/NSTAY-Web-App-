import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  boardingId: {
    type: String,
    required: true,
    index: true
  },
  boardingTitle: {
    type: String,
    required: true
  },
  roomId: String,
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true
  },
  studentEmail: {
    type: String,
    required: [true, 'Student email is required'],
    trim: true,
    lowercase: true
  },
  studentPhone: {
    type: String,
    required: [true, 'Contact phone is required'],
    trim: true
  },
  checkInDate: {
    type: String,
    default: 'Mar 18, 2023'
  },
  checkOutDate: {
    type: String,
    default: 'March 20, 2023'
  },
  guests: {
    type: String,
    default: '2 adult, 1 room'
  },
  message: {
    type: String,
    maxlength: 1000
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Rejected', 'Cancelled'],
    default: 'Pending',
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);

