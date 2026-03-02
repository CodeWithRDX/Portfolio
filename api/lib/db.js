const mongoose = require('mongoose');

let cachedDb = null;

async function connectDB() {
    if (cachedDb && cachedDb.readyState === 1) {
        return cachedDb;
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    cachedDb = conn.connection;
    return cachedDb;
}

module.exports = connectDB;
