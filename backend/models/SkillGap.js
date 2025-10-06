// models/SkillGap.js - Basic Essential Skill Gap Model
const mongoose = require('mongoose');

const skillGapSchema = new mongoose.Schema({
  // User Reference
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required']
  },
  
  // Job Reference
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: [true, 'Job reference is required']
  },
  
  // Basic Analysis Results
  matchPercentage: {
    type: Number,
    required: [true, 'Match percentage is required'],
    min: [0, 'Match percentage cannot be negative'],
    max: [100, 'Match percentage cannot exceed 100']
  },
  
  // Skills Analysis (Simplified)
  matchingSkills: [{
    skillName: {
      type: String,
      required: true,
      trim: true
    },
    userLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: true
    },
    requiredLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: true
    }
  }],
  
  missingSkills: [{
    skillName: {
      type: String,
      required: true,
      trim: true
    },
    requiredLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: true
    },
    priority: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium'
    }
  }],
  
  // Basic Recommendations
  recommendations: [{
    type: {
      type: String,
      enum: ['Skill Development', 'Course', 'Practice'],
      required: true
    },
    description: {
      type: String,
      required: true
    },
    priority: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium'
    }
  }],
  
  // Status
  status: {
    type: String,
    enum: ['Generated', 'Viewed'],
    default: 'Generated'
  }
}, {
  timestamps: true
});

// Virtual for readiness status
skillGapSchema.virtual('readinessStatus').get(function() {
  if (this.matchPercentage >= 80) return 'Ready';
  if (this.matchPercentage >= 60) return 'Nearly Ready';
  if (this.matchPercentage >= 40) return 'Needs Improvement';
  return 'Not Ready';
});

// Indexes
skillGapSchema.index({ user: 1, job: 1 });
skillGapSchema.index({ user: 1, createdAt: -1 });
skillGapSchema.index({ matchPercentage: -1 });

module.exports = mongoose.model('SkillGap', skillGapSchema);