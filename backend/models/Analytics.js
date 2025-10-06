// models/Analytics.js - Basic Essential Analytics Model
const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  // User Reference
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required']
  },
  
  // Event Type
  eventType: {
    type: String,
    required: [true, 'Event type is required'],
    enum: [
      'user_login',
      'user_logout',
      'profile_view',
      'job_view',
      'job_search',
      'skill_gap_analysis',
      'profile_update'
    ]
  },
  
  // Basic Event Data
  eventData: {
    // For job-related events
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    },
    jobTitle: String,
    
    // For search events
    searchQuery: String,
    searchResults: Number,
    
    // For skill events
    skillsUpdated: [String],
    
    // Generic metadata
    metadata: mongoose.Schema.Types.Mixed
  },
  
  // Session Information
  sessionId: {
    type: String,
    required: [true, 'Session ID is required']
  },
  
  // Basic Device Info
  deviceType: {
    type: String,
    enum: ['Desktop', 'Mobile', 'Tablet'],
    default: 'Desktop'
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
analyticsSchema.index({ user: 1, eventType: 1, createdAt: -1 });
analyticsSchema.index({ eventType: 1, createdAt: -1 });
analyticsSchema.index({ sessionId: 1 });

module.exports = mongoose.model('Analytics', analyticsSchema);