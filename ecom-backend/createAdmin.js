require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

const createAdmin = async () => {
  try {
    await connectDB();
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@TrendyTints.com' });
    
    if (existingAdmin) {
      console.log('Admin already exists in Admin collection');
    } else {
      await Admin.create({
        email: 'admin@TrendyTints.com',
        password: 'admin123'
      });
      console.log('Admin created successfully in Admin collection!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();