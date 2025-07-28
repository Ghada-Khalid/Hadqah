const mongoose = require('mongoose')

const assessmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  control: { type: mongoose.Schema.Types.ObjectId, ref: 'Control', required: true },
  status: {
    type: String,
    enum: ['Implemented', 'Partially Implemented', 'Not Implemented', 'Not Applicable'],
    required: true
  },
  
  notes: String,
  documentLinks: [String]
}, { timestamps: true })

module.exports = mongoose.model('Assessment', assessmentSchema)
