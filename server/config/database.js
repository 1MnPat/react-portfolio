const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

async function connectDatabase(mongoUri = process.env.MONGODB_URI) {
    if (!mongoUri) {
        throw new Error('MONGODB_URI is not defined');
    }

    mongoose.set('strictQuery', true);

    await mongoose.connect(mongoUri, {
        autoIndex: true,
        serverSelectionTimeoutMS: 15000,
    });

    console.log('MongoDB Connected Successfully!');
}

module.exports = { connectDatabase };


