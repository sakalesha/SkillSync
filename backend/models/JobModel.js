// models/Job.js - Basic Essential Job Model
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  // Essential Job Information
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Job description is required']
  },
  
  // Essential Location
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  
  // Essential Requirements
  requiredSkills: [{
    type: String,
    required: true,
    trim: true
  }],
  
  experienceLevel: {
    type: String,
    enum: ['Fresher', '0-1 years', '1-3 years', '3-5 years', '5+ years'],
    required: [true, 'Experience level is required']
  },
  
//   // Essential Compensation
//   salaryRange: {
//     min: {
//       type: Number,
//       required: [true, 'Minimum salary is required']
//     },
//     max: {
//       type: Number,
//       required: [true, 'Maximum salary is required']
//     }
//   },
  
  // Essential Job Details
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Internship', 'Contract'],
    required: [true, 'Job type is required']
  },
  
  workMode: {
    type: String,
    enum: ['Remote', 'On-site', 'Hybrid'],
    required: [true, 'Work mode is required']
  },
  
  // Application Details
  applicationEmail: {
    type: String,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email']
  },
  
  // Status
  status: {
    type: String,
    enum: ['Active', 'Closed'],
    default: 'Active'
  }
}, {
  timestamps: true
});

// // Virtual for formatted salary range
// jobSchema.virtual('formattedSalary').get(function() {
//   return `₹${this.salaryRange.min.toLocaleString()} - ₹${this.salaryRange.max.toLocaleString()}`;
// });

// Make a text search index on title, description, and company
jobSchema.index({ title: 'text', description: 'text', company: 'text' });

// Make a normal index on requiredSkills for faster queries
jobSchema.index({ requiredSkills: 1 });

// Make a compound index on status and createdAt (newest first)
jobSchema.index({ status: 1, createdAt: -1 });


module.exports = mongoose.model('Job', jobSchema);