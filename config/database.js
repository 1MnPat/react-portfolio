const mongoose = require('mongoose');
require('dotenv').config();

async function connectDatabase(mongoUri = process.env.MONGODB_URI) {
    if (!mongoUri) {
        throw new Error('MONGODB_URI is not defined');
    }

    mongoose.set('strictQuery', true);

    await mongoose.connect(mongoUri, {
        autoIndex: true,
        serverSelectionTimeoutMS: 15000,
    });
}

module.exports = { connectDatabase };


