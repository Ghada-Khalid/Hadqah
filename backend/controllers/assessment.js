// controllers/assessment.js
const Assessment = require('../models/AssessmentModel');
const mongoose   = require('mongoose');

// 1) List all assessments
const getAssessments = async (req, res) => {
  try {
    const assessments = await Assessment
      .find()                       // fetch every document
      .sort({ updatedAt: -1 })      // newest first
      .populate('control user');    // if you’ve set up refs
    return res.status(200).json(assessments);
  } catch (err) {
    console.error('Error fetching assessments:', err);
    return res.status(500).json({ error: err.message });
  }
};

// 2) Get one by ID
const getAssessment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  try {
    const assessment = await Assessment.findById(id)
      .populate('control user');
    if (!assessment) {
      return res.status(404).json({ error: 'Not found' });
    }
    return res.status(200).json(assessment);
  } catch (err) {
    console.error(`Error fetching ${id}:`, err);
    return res.status(500).json({ error: err.message });
  }
};

// 3) Single creation (if you still need it)
const createAssessment = async (req, res) => {
  try {
    const a = await Assessment.create(req.body);
    return res.status(201).json(a);
  } catch (err) {
    console.error('Error creating assessment:', err);
    return res.status(400).json({ error: err.message });
  }
};

// 4) Update by ID
const updateAssessment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  try {
    const a = await Assessment.findByIdAndUpdate(id, req.body, { new: true });
    if (!a) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json(a);
  } catch (err) {
    console.error(`Error updating ${id}:`, err);
    return res.status(500).json({ error: err.message });
  }
};

// 5) Delete by ID
const deleteAssessment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  try {
    const a = await Assessment.findByIdAndDelete(id);
    if (!a) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json({ message: 'Deleted', id });
  } catch (err) {
    console.error(`Error deleting ${id}:`, err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAssessments,
  getAssessment,
  createAssessment,
  updateAssessment,
  deleteAssessment
};

