// controllers/assessmentsController.js
const Assessment = require('../models/AssessmentModel');
const mongoose   = require('mongoose');

// ─── CRUD ──────────────────────────────────────────────────────────────────────

// 1) List all
async function getAssessments(req, res) {
  try {
    const docs = await Assessment
      .find()
      .sort({ updatedAt: -1 })
      .populate('control user');
    res.status(200).json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// 2) Single fetch
async function getAssessment(req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: 'Invalid ID' });
  try {
    const doc = await Assessment.findById(id).populate('control user');
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// 3) Create
async function createAssessment(req, res) {
  try {
    const a = await Assessment.create(req.body);
    res.status(201).json(a);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}

// 4) Update
async function updateAssessment(req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: 'Invalid ID' });
  try {
    const a = await Assessment.findByIdAndUpdate(id, req.body, { new: true });
    if (!a) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(a);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// 5) Delete
async function deleteAssessment(req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: 'Invalid ID' });
  try {
    const a = await Assessment.findByIdAndDelete(id);
    if (!a) return res.status(404).json({ error: 'Not found' });
    res.status(200).json({ message: 'Deleted', id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// ─── STATS ─────────────────────────────────────────────────────────────────────

// Overall stats - get total controls and assessment breakdown

async function getOverallStats(req, res) {
  try {
    const Control = require('../models/ECCModel');
    
    // Get total controls count
    const total = await Control.countDocuments();
    
    // Get all assessments with the latest one first
    const assessments = await Assessment.find().sort({ updatedAt: -1 });
    
    // Get the latest assessment date
    const latestAssessment = assessments.length > 0 ? assessments[0] : null;
    const lastAssessmentDate = latestAssessment ? latestAssessment.updatedAt : null;
    
    console.log(`Found ${assessments.length} assessments out of ${total} total controls`);
    
    let implemented = 0, partially = 0, missing = 0, na = 0;
    
    // Count each status type
    for (const assessment of assessments) {
      const status = assessment.status.toLowerCase();
      
      if (status === 'compliant' || status === 'implemented') {
        implemented++;
      } else if (status === 'partially-compliant' || status === 'partially implemented') {
        partially++;
      } else if (status === 'non-compliant' || status === 'not implemented') {
        missing++;
      } else if (status === 'not-applicable' || status === 'not applicable') {
        na++;
      }
    }
    
    console.log(`Stats: implemented=${implemented}, partially=${partially}, missing=${missing}, na=${na}`);
    
    const response = {
      total,
      implemented,
      partially,
      partiallyImplemented: partially, // Both formats for compatibility
      missing,
      na,
      assessed: assessments.length,
      unassessed: total - assessments.length,
      lastAssessmentDate: lastAssessmentDate, // Add the latest assessment date
      sessionName: latestAssessment ? `Session ${latestAssessment.sessionId}` : null
    };
    
    res.json(response);
    
  } catch (err) {
    console.error('Overall stats error:', err);
    res.status(500).json({ error: err.message });
  }
}

// Domain stats - breakdown by domain
async function getDomainStats(req, res) {
  try {
    // Get the latest session ID (you might want to make this configurable)
    const latestAssessments = await Assessment.find()
      .sort({ updatedAt: -1 })
      .limit(1);
    
    if (!latestAssessments.length) {
      return res.json([]);
    }
    
    // For now, get all assessments (you can filter by session if needed)
    const aggregation = await Assessment.aggregate([
      {
        $lookup: {
          from: 'controls', // Make sure this matches your Control collection name
          localField: 'control',
          foreignField: '_id',
          as: 'ctrl'
        }
      },
      { $unwind: '$ctrl' },
      {
        $group: {
          _id: { 
            domain: '$ctrl.domain', // Make sure this field exists in your Control model
            status: '$status' 
          },
          count: { $sum: 1 }
        }
      }
    ]);
    
    console.log('Domain aggregation result:', aggregation);
    
    // Transform aggregation result into domain breakdown
    const domainMap = {};
    
    aggregation.forEach(({ _id: { domain, status }, count }) => {
      if (!domainMap[domain]) {
        domainMap[domain] = { 
          domainName: domain, 
          implemented: 0, 
          partially: 0, 
          missing: 0, 
          na: 0 
        };
      }
      
      const normalizedStatus = status.toLowerCase();
      if (normalizedStatus === 'compliant' || normalizedStatus === 'implemented') {
        domainMap[domain].implemented = count;
      } else if (normalizedStatus === 'partially-compliant' || normalizedStatus === 'partially implemented') {
        domainMap[domain].partially = count;
      } else if (normalizedStatus === 'non-compliant' || normalizedStatus === 'not implemented') {
        domainMap[domain].missing = count;
      } else if (normalizedStatus === 'not-applicable' || normalizedStatus === 'not applicable') {
        domainMap[domain].na = count;
      }
    });
    
    // Calculate totals and percentages
    const result = Object.values(domainMap).map(domain => {
      const total = domain.implemented + domain.partially + domain.missing + domain.na;
      const pct = total ? Math.round((domain.implemented / total) * 100) : 0;
      
      return { 
        ...domain, 
        total, 
        pct 
      };
    });
    
    console.log('Domain stats result:', result);
    res.json(result);
    
  } catch (err) {
    console.error('Domain stats error:', err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAssessments,
  getAssessment,
  createAssessment,
  updateAssessment,
  deleteAssessment,
  getOverallStats,
  getDomainStats
};