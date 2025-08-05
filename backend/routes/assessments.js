// backend/routes/assessments.js
const express    = require('express');
const router     = express.Router();
const Control    = require('../models/ECCModel');
const Assessment = require('../models/AssessmentModel');
const {
  getAssessments,
  getAssessment,
  createAssessment,
  updateAssessment,
  deleteAssessment,
  getOverallStats,
  getDomainStats
} = require('../controllers/assessment');

// 1) STATS
router.get('/stats/overall', getOverallStats);
router.get('/stats/domain',  getDomainStats);

// Alias for legacy front-end URLs
router.get('/stats',         getOverallStats);
router.get('/domain-stats',  getDomainStats);

// 2) BATCH UPSERT
router.post('/batch', async (req, res) => {
  try {
    const { assessments } = req.body;
    let savedCount = 0;

    console.log(`🔄 Batch upsert start: ${assessments.length} items`);

    for (const a of assessments) {
  // 1) Find the Control by its referenceNumber
  const ctrl = await Control.findOne({ referenceNumber: a.controlId });
  if (!ctrl) {
    console.error(`⚠️  No control found for ${a.controlId}`);
    return res.status(400).json({ message: `No control found for ${a.controlId}` });
  }

  console.log(
    `– Upserting assessment: sessionId=${a.sessionId}, control=${ctrl._id}, status=${a.status}`
  );

  // Normalize status before saving
const statusMap = {
  implemented: 'compliant',
  'Implemented': 'compliant',
  not_implemented: 'non-compliant',
  'Not Implemented': 'non-compliant',
  partially_implemented: 'partially-compliant',
  'Partially Implemented': 'partially-compliant',
  not_applicable: 'not-applicable',
  'Not Applicable': 'not-applicable'
};
const normalizedStatus = statusMap[a.status] || a.status.toLowerCase().replace(/\s+/g, '-');


  // Check sessionId exists
  if (!a.sessionId) {
    return res.status(400).json({ message: 'Session ID missing in assessment data.' });
  }

  // 2) Upsert assessment
  await Assessment.findOneAndUpdate(
  { control: ctrl._id, sessionId: Number(a.sessionId) }, // always Number
  {
    $setOnInsert: {
      control:   ctrl._id,
      sessionId: Number(a.sessionId),
    },
    $set: {
      status:   normalizedStatus,
        notes:                  a.notes || '',
        correctiveProcedures:   a.correctiveProcedures || '',
        remarks:                a.remarks || '',
        complianceLevel:        a.complianceLevel || '',
        expectedComplianceDate: a.expectedComplianceDate || null,
        updatedAt:              a.updatedAt
      }
    },
    {
      upsert:        true,
      new:           true,
      runValidators: true
    }
  );

  savedCount++;
}


    console.log(`✅ Batch upsert complete: ${savedCount} assessments saved`);
    return res.json({ count: savedCount });

  } catch (err) {
    console.error('🔥 Batch save error:', err);
    return res.status(500).json({ message: err.message });
  }
});

// 3) OTHER CRUD ROUTES
router.get('/',      getAssessments);
router.get('/:id',   getAssessment);
router.post('/',     createAssessment);
router.patch('/:id', updateAssessment);
router.delete('/:id', deleteAssessment);

module.exports = router;
