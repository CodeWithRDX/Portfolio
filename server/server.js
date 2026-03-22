const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ── CORS: only allow known origins ─────────────────────────────────────────
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5000',
    process.env.CLIENT_ORIGIN,
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no Origin header (e.g. same-origin, mobile apps)
        if (!origin || allowedOrigins.some(o => origin.startsWith(o))) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST'],
    optionsSuccessStatus: 200
}));

// ── Global rate limiter: 100 req / 15 min per IP (DDoS guard) ──────────────
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests. Please slow down.' }
});
app.use(globalLimiter);

app.use(express.json({ limit: '10kb' })); // reject oversized payloads

// API Routes
app.use('/api/contact', contactRoutes);

// ---------- Production: serve React static files ----------
const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientBuildPath));

// Any route that is NOT /api/* → serve index.html (SPA fallback)
app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Connect to MongoDB and start server
if (process.env.NODE_ENV !== 'production') {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('✅ MongoDB connected');
            app.listen(PORT, () => {
                console.log(`🚀 Server running on port ${PORT}`);
            });
        })
        .catch((err) => {
            console.error('❌ MongoDB connection error:', err.message);
            process.exit(1);
        });
} else {
    // In production (Vercel), just connect without listening on a port
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('✅ MongoDB connected (Serverless)'))
        .catch(err => console.error('❌ MongoDB connection error:', err.message));
}

module.exports = app;
