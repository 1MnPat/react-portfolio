require('dotenv').config({ path: require('path').join(__dirname, '..', '..', '.env') });
const mongoose = require('mongoose');
const User = require('../models/User');

const MONGODB_URI = process.env.MONGODB_URI;

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@portfolio.com' });
    
    if (existingAdmin) {
      // Update existing admin to ensure it has admin role
      existingAdmin.role = 'admin';
      await existingAdmin.save();
      console.log('Admin user already exists. Updated role to admin.');
      console.log('Email: admin@portfolio.com');
      console.log('Password: admin123');
    } else {
      // Create new admin user
      const admin = await User.create({
        name: 'Admin User',
        email: 'admin@portfolio.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Admin user created successfully!');
      console.log('Email: admin@portfolio.com');
      console.log('Password: admin123');
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdmin();


