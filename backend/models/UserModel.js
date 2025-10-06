// models/User.js - Basic Essential User Model
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Essential Basic Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  
  // Basic Education (Simplified)
  education: {
    degree: {
      type: String,
      required: [true, 'Education level is required']
    },
    field: {
      type: String,
      required: [true, 'Field of study is required']
    }
  },
  
  // Basic Skills (Simplified)
  skills: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner'
    }
  }],
  
  // Basic Career Preferences (Simplified)
  interestedRoles: [{
    type: String,
    trim: true
  }],
  
  // System fields
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Before saving a user
userSchema.pre('save', async function(next) {
  // If the password was not changed, do nothing
  if (!this.isModified('password')) return next();

  // If password is new or changed, hash it
  this.password = await bcrypt.hash(this.password, 12);

  // Continue saving
  next();
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);