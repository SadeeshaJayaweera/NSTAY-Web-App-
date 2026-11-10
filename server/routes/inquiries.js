import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// GET /api/inquiries
router.get('/', (req, res) => {
  try {
    const list = db.getInquiries();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve inquiries: ' + err.message });
  }
});

// POST /api/inquiries (Student Reserve / Booking Inquiry)
router.post('/', (req, res) => {
  try {
    const {
      boardingId,
      boardingTitle,
      roomId,
      studentName,
      studentEmail,
      studentPhone,
      checkInDate,
      checkOutDate,
      guests,
      message
    } = req.body;

    if (!studentName || !studentPhone || !boardingId) {
      return res.status(400).json({ 
        error: 'Student full name, contact phone, and target boarding are required.' 
      });
    }

    // Clean phone
    const cleanPhone = studentPhone.replace(/[\s-]/g, '');
    if (cleanPhone.length < 9) {
      return res.status(400).json({
        error: 'Please enter a valid contact phone number (at least 9 digits).'
      });
    }

    const newInquiry = {
      id: `inq-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      boardingId,
      boardingTitle: boardingTitle || 'Boarding Property',
      roomId: roomId || null,
      studentName: studentName.trim(),
      studentEmail: studentEmail ? studentEmail.trim().toLowerCase() : 'student@students.nsbm.ac.lk',
      studentPhone: studentPhone.trim(),
      checkInDate: checkInDate || 'Mar 18, 2023',
      checkOutDate: checkOutDate || 'March 20, 2023',
      guests: guests || '2 adult, 1 room',
      message: message ? message.trim() : 'Interested in booking this room for the academic semester.',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    db.addInquiry(newInquiry);

    if (req.app.get('io')) {
      req.app.get('io').emit('new_inquiry', newInquiry);
    }

    res.status(201).json({
      success: true,
      message: 'Booking inquiry submitted successfully to the boarding host.',
      inquiry: newInquiry
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit inquiry: ' + err.message });
  }
});

// PATCH /api/inquiries/:id/status
router.patch('/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['Pending', 'Confirmed', 'Rejected', 'Cancelled'];
    
    if (!status || !allowed.includes(status)) {
      return res.status(400).json({ 
        error: `Invalid status. Must be one of: [${allowed.join(', ')}]` 
      });
    }

    const updated = db.updateInquiryStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ error: 'Inquiry not found.' });
    }

    if (req.app.get('io')) {
      req.app.get('io').emit('inquiry_status_updated', updated);
    }

    res.json({
      success: true,
      message: `Inquiry status updated to ${status}.`,
      inquiry: updated
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status: ' + err.message });
  }
});

export default router;
