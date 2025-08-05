// backend/models/ControlModel.js
const mongoose = require('mongoose')

const controlSchema = new mongoose.Schema({
  domain:          String,
  subdomain:       String,
  referenceNumber: { type: String, unique: true },
  clause:          String,
  type: {
    type: String,    // ← you must declare the field’s type…
    enum: [
      'Mandatory',
      'Non-Compliant',
      'Partially-Compliant',
      'Not-Applicable'
    ]
  }
}, { timestamps: true })

module.exports = mongoose.model('Control', controlSchema)