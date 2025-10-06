const express = require('express');
const router = express.Router();
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} = require('../controllers/JobController.js');

// CRUD routes
router.post('/', createJob);            // Create job
router.get('/', getAllJobs);           // Get all jobs
router.get('/:id', getJobById);        // Get single job
router.put('/:id', updateJob);         // Update job
router.delete('/:id', deleteJob);      // Delete job

module.exports = router;
