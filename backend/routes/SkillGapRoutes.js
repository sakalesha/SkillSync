const express = require('express');
const router = express.Router();
const {
  createSkillGap,
  getAllSkillGaps,
  getSkillGapById,
  updateSkillGap,
  deleteSkillGap
} = require('../controllers/SkillGapController.js');

// CRUD routes
router.post('/', createSkillGap);            // Create skill gap
router.get('/', getAllSkillGaps);           // Get all skill gaps
router.get('/:id', getSkillGapById);        // Get single skill gap
router.put('/:id', updateSkillGap);         // Update skill gap
router.delete('/:id', deleteSkillGap);      // Delete skill gap

module.exports = router;
