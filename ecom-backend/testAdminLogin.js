require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

const testLogin = async () => {
  try {
    await connectDB();
    
    const user = await User.findOne({ email: 'admin@TrendyTints.com' });
    
    if (!user) {
      console.log('❌ Admin user not found!');
      process.exit(1);
    }
    
    console.log('✅ Admin user found:');
    console.log('Email:', user.email);
    console.log('Name:', user.name);
    console.log('isAdmin:', user.isAdmin);
    
    // Test password
    const isMatch = await user.comparePassword('admin123');
    console.log('Password match:', isMatch ? '✅ YES' : '❌ NO');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

testLogin();
