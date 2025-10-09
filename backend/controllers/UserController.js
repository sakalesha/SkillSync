const User = require('../models/UserModel.js');
const { calculateEmployabilityScore, countJobApplications, countCoursesCompleted } = require('../services/UserMetrics.js');

// CREATE User
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// READ All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// READ Single User by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// UPDATE User
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getUserByIdWithMetrics = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean(); // .lean() to get plain object
    if (!user) return res.status(404).json({ message: 'User not found' });

    const employabilityScore = calculateEmployabilityScore(user);
    const jobApplications = countJobApplications(user);
    const coursesCompleted = countCoursesCompleted(user);

    res.json({
      ...user,
      employabilityScore,
      jobApplications,
      coursesCompleted
    });
  } catch (error) {
    console.error('Error fetching user with metrics:', error);
    res.status(500).json({ message: 'Server error' });
  }
};