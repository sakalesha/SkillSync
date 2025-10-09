const User = require('../models/UserModel.js');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, education, experience } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already exists' });

    const user = await User.create({ 
      firstName, 
      lastName, 
      email, 
      password,
      education,     // Include nested education object
      experience     // Include experience if required in schema
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      data: { _id: user._id, email: user.email, fullName: user.fullName },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      data: { _id: user._id, email: user.email, fullName: user.fullName },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
