const express = require('express');
const router = express.Router();
const {
  createAnalytics,
  getAllAnalytics,
  getAnalyticsById,
  updateAnalytics,
  deleteAnalytics
} = require('../controllers/AnalyticsController.js');

// CRUD routes
router.post('/', createAnalytics);             // Create analytics event
router.get('/', getAllAnalytics);             // Get all analytics
router.get('/:id', getAnalyticsById);         // Get single analytics
router.put('/:id', updateAnalytics);          // Update analytics
router.delete('/:id', deleteAnalytics);       // Delete analytics

module.exports = router;
