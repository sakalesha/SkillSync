const express = require('express');
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/UserController.js');

// CRUD routes
router.post('/', createUser);            // Create user
router.get('/', getAllUsers);           // Get all users
router.get('/:id', getUserById);        // Get single user
router.put('/:id', updateUser);         // Update user
router.delete('/:id', deleteUser);      // Delete user

module.exports = router;
