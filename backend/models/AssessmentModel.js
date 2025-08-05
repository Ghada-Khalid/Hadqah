// backend/models/assessment.js

const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  sessionId: {
    type: Number,            // or Schema.Types.ObjectId if you switch to ObjectId refs
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  control: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Control',
    required: true
  },

  status: {
  type: String,
  enum: [
    'compliant', 'non-compliant', 'partially-compliant', 'not-applicable',
    'Implemented', 'Not Implemented', 'Partially Implemented', 'Not Applicable'
  ],
  required: true
}
,

  notes:    String,
  documentLinks: [String]

}, {
  timestamps: true,
  strict: true
});

module.exports = mongoose.model('Assessment', assessmentSchema);