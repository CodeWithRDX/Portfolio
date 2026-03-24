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
        if (!origin || 
            allowedOrigins.some(o => origin.startsWith(o)) || 
            origin.endsWith('.vercel.app')) {
            callback(null, true);
        } else {
            // Do not throw an error, as it causes Express to return a 500 HTML page!
            // Just return false to block the CORS request gracefully.
            callback(null, false);
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

// Global Express Error Handler (catches CORS, rate-limit, and JSON parse errors)
app.use((err, req, res, next) => {
    console.error('❌ Express Middleware Error:', err.message);
    res.status(err.status || 500).json({ 
        success: false, 
        message: err.message || 'Internal Server Error' 
    });
});

module.exports = app;
