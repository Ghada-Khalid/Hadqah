// backend/routes/assessments.js
const express = require('express');
const router  = express.Router();
const {
  getAssessments,
  getAssessment,
  createAssessment,
  updateAssessment,
  deleteAssessment
} = require('../controllers/assessment');

// 1) Batch upsert (must come before `/:id`)
router.post('/batch', async (req, res) => {
  console.log('⚡️ POST /api/assessments/batch hit, payload:', req.body);
  try {
    const { assessments } = req.body;
    // ← your upsert‐all logic here (loop, validate, save…)
    return res.json({ count: assessments.length });
  } catch (err) {
    console.error('Batch save error:', err);
    return res.status(500).json({ message: 'Failed to save assessments' });
  }
});

// 2) List & single look‐ups
router.get('/',    getAssessments);
router.get('/:id', getAssessment);

// 3) Single‐item creation (optional)
router.post('/',   createAssessment);

// 4) Updates & deletes
router.patch('/:id',  updateAssessment);
router.delete('/:id', deleteAssessment);

module.exports = router;
