const SkillGap = require('../models/SkillGap.js');

// CREATE SkillGap
exports.createSkillGap = async (req, res) => {
  try {
    const skillGap = await SkillGap.create(req.body);
    res.status(201).json({ success: true, data: skillGap });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// READ All SkillGaps
exports.getAllSkillGaps = async (req, res) => {
  try {
    const skillGaps = await SkillGap.find()
      .populate('user', 'firstName lastName email')  // Populate user basic info
      .populate('job', 'title company location');   // Populate job basic info
    res.status(200).json({ success: true, count: skillGaps.length, data: skillGaps });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// READ Single SkillGap by ID
exports.getSkillGapById = async (req, res) => {
  try {
    const skillGap = await SkillGap.findById(req.params.id)
      .populate('user', 'firstName lastName email')
      .populate('job', 'title company location');
    if (!skillGap) return res.status(404).json({ success: false, error: 'SkillGap not found' });
    res.status(200).json({ success: true, data: skillGap });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// UPDATE SkillGap
exports.updateSkillGap = async (req, res) => {
  try {
    const skillGap = await SkillGap.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!skillGap) return res.status(404).json({ success: false, error: 'SkillGap not found' });
    res.status(200).json({ success: true, data: skillGap });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE SkillGap
exports.deleteSkillGap = async (req, res) => {
  try {
    const skillGap = await SkillGap.findByIdAndDelete(req.params.id);
    if (!skillGap) return res.status(404).json({ success: false, error: 'SkillGap not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
