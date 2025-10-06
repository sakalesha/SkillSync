const Analytics = require('../models/Analytics.js');

// CREATE Analytics Event
exports.createAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.create(req.body);
    res.status(201).json({ success: true, data: analytics });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// READ All Analytics
exports.getAllAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.find()
      .populate('user', 'firstName lastName email')
      .populate('eventData.jobId', 'title company location');
    res.status(200).json({ success: true, count: analytics.length, data: analytics });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// READ Single Analytics Event by ID
exports.getAnalyticsById = async (req, res) => {
  try {
    const analytics = await Analytics.findById(req.params.id)
      .populate('user', 'firstName lastName email')
      .populate('eventData.jobId', 'title company location');
    if (!analytics) return res.status(404).json({ success: false, error: 'Analytics not found' });
    res.status(200).json({ success: true, data: analytics });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// UPDATE Analytics Event
exports.updateAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!analytics) return res.status(404).json({ success: false, error: 'Analytics not found' });
    res.status(200).json({ success: true, data: analytics });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE Analytics Event
exports.deleteAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.findByIdAndDelete(req.params.id);
    if (!analytics) return res.status(404).json({ success: false, error: 'Analytics not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
