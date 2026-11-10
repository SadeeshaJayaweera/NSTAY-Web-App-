import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import { initDatabase } from './db.js';
import authRoutes from './routes/auth.js';
import boardingRoutes from './routes/boardings.js';
import inquiryRoutes from './routes/inquiries.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

// Setup Socket.io for real-time updates
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  }
});

app.set('io', io);

// Security & Body parsing Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging in development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      console.log(`[HTTP] ${req.method} ${req.url} ${res.statusCode} - ${Date.now() - start}ms`);
    });
    next();
  });
}

// Socket.io connection logging
io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    // Client disconnected
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/boardings', boardingRoutes);
app.use('/api/inquiries', inquiryRoutes);

// Detailed Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'NSTAY Web API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Production Static Asset Serving
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath, { maxAge: '1d' }));

app.get('*', (req, res, next) => {
  if (req.url.startsWith('/api')) return next();
  const indexFile = path.join(distPath, 'index.html');
  res.sendFile(indexFile, (err) => {
    if (err) {
      res.status(200).send(`
        <html>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: center; padding: 60px 20px;">
            <h2 style="color: #1e293b;">NSTAY Full-Stack API is Running 🏡</h2>
            <p style="color: #64748b;">Visit the React Frontend at <a href="http://localhost:3000" style="color: #2b78e4; font-weight: 600;">http://localhost:3000</a></p>
          </body>
        </html>
      `);
    }
  });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

async function start() {
  await initDatabase();
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`===============================================`);
    console.log(`🏡 NSTAY Server running on http://localhost:${PORT}`);
    console.log(`📡 Real-time Socket.io initialized`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`===============================================`);
  });
}

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => console.log('HTTP server closed'));
});

start();
