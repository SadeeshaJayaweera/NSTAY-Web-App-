import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'nstay-production-jwt-secret-key-nsbm-green-university-2024';

// Helper to validate NSBM student email: must end in .nsbm.ac.lk or @nsbm.ac.lk
function isValidNsbmEmail(email) {
  if (!email) return false;
  const clean = email.toLowerCase().trim();
  const nsbmRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.)?nsbm\.ac\.lk$/;
  return nsbmRegex.test(clean) || clean.endsWith('.nsbm.ac.lk') || clean.endsWith('@nsbm.ac.lk');
}

// Generate JWT token with secure claims
function generateToken(user) {
  return jwt.sign(
    { 
      id: user.id, 
      name: user.name, 
      email: user.email, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role = 'student', phone } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Please provide full name, email, and password.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Enforce NSBM domain check for students
    if (role === 'student' && !isValidNsbmEmail(cleanEmail)) {
      return res.status(400).json({
        error: 'Students must register using an official NSBM email address ending with .nsbm.ac.lk (e.g. yourname@students.nsbm.ac.lk).'
      });
    }

    const existing = db.getUserByEmail(cleanEmail);
    if (existing) {
      return res.status(409).json({ error: 'An account with this email address already exists.' });
    }

    // Hash password with bcrypt salt rounds = 10
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      role: role || 'student',
      phone: phone ? phone.trim() : null,
      avatar: null,
      createdAt: new Date().toISOString()
    };

    db.addUser(newUser);
    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,
        avatar: newUser.avatar
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create account. ' + err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = db.getUserByEmail(cleanEmail);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Verify password with bcrypt (supporting both hashed and legacy seeded fallback)
    const isMatch = user.password.startsWith('$2')
      ? bcrypt.compareSync(password, user.password)
      : user.password === password;

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = generateToken(user);
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Login error. ' + err.message });
  }
});

// POST /api/auth/oauth
router.post('/oauth', (req, res) => {
  const { provider } = req.body;
  const mockEmail = provider === 'github' ? 'github.student@students.nsbm.ac.lk' : 'google.student@students.nsbm.ac.lk';
  let user = db.getUserByEmail(mockEmail);

  if (!user) {
    user = {
      id: `oauth-${Date.now()}`,
      name: provider === 'github' ? 'NSBM GitHub Student' : 'NSBM Google Student',
      email: mockEmail,
      password: bcrypt.hashSync('oauth-secure-pass', 10),
      role: 'student',
      avatar: null,
      createdAt: new Date().toISOString()
    };
    db.addUser(user);
  }

  const token = generateToken(user);
  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    }
  });
});

// GET /api/auth/me (Protected Route)
router.get('/me', authenticateToken, (req, res) => {
  const user = db.getUserByEmail(req.user.email);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }
  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      avatar: user.avatar
    }
  });
});

export default router;
