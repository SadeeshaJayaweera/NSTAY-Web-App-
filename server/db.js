import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { initialBoardings, initialUsers, initialInquiries } from './data/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data', 'db.json');

let dbState = {
  boardings: [],
  users: [],
  inquiries: [],
  reviews: []
};

// Immediately load state on module import
loadFromFile();

function loadFromFile() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      dbState = JSON.parse(raw);
      let changed = false;
      if (!dbState.boardings || dbState.boardings.length === 0) {
        dbState.boardings = initialBoardings;
        changed = true;
      }
      if (!dbState.users || dbState.users.length === 0) {
        dbState.users = initialUsers;
        changed = true;
      }
      if (!dbState.inquiries || dbState.inquiries.length === 0) {
        dbState.inquiries = initialInquiries;
        changed = true;
      }
      if (changed) saveToFile();
    } else {
      dbState = {
        boardings: initialBoardings,
        users: initialUsers,
        inquiries: initialInquiries,
        reviews: []
      };
      saveToFile();
    }
  } catch (err) {
    console.error('Error reading JSON DB file, using seed data:', err.message);
    dbState = {
      boardings: initialBoardings,
      users: initialUsers,
      inquiries: initialInquiries,
      reviews: []
    };
  }
}

function saveToFile() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(dbState, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving DB file:', err.message);
  }
}

// Attempt MongoDB connection if MONGO_URI is set
let isMongoConnected = false;
export async function initDatabase() {
  loadFromFile();
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/nstay';
  try {
    const conn = await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
    isMongoConnected = true;
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (err) {
    console.log('MongoDB server offline or not configured. Using active NSTAY JSON data store.');
  }
}

export const db = {
  getBoardings: () => dbState.boardings,
  getBoardingById: (id) => dbState.boardings.find(b => b.id === id),
  addBoarding: (boarding) => {
    dbState.boardings.unshift(boarding);
    saveToFile();
    return boarding;
  },
  updateBoarding: (id, updates) => {
    const idx = dbState.boardings.findIndex(b => b.id === id);
    if (idx !== -1) {
      dbState.boardings[idx] = { ...dbState.boardings[idx], ...updates };
      saveToFile();
      return dbState.boardings[idx];
    }
    return null;
  },
  deleteBoarding: (id) => {
    dbState.boardings = dbState.boardings.filter(b => b.id !== id);
    saveToFile();
    return true;
  },
  getUsers: () => dbState.users,
  getUserByEmail: (email) => dbState.users.find(u => u.email.toLowerCase() === email.toLowerCase()),
  addUser: (user) => {
    dbState.users.push(user);
    saveToFile();
    return user;
  },
  getInquiries: () => dbState.inquiries,
  addInquiry: (inquiry) => {
    dbState.inquiries.unshift(inquiry);
    saveToFile();
    return inquiry;
  },
  updateInquiryStatus: (id, status) => {
    const inq = dbState.inquiries.find(i => i.id === id);
    if (inq) {
      inq.status = status;
      saveToFile();
      return inq;
    }
    return null;
  },
  addReview: (boardingId, review) => {
    const b = dbState.boardings.find(x => x.id === boardingId);
    if (b) {
      if (!b.reviews) b.reviews = [];
      b.reviews.unshift(review);
      b.reviewsCount = (b.reviewsCount || 0) + 1;
      // recalculate rating
      const sum = b.reviews.reduce((acc, r) => acc + (r.rating || 5), 0);
      b.rating = Number((sum / b.reviews.length).toFixed(1));
      saveToFile();
      return b;
    }
    return null;
  }
};

