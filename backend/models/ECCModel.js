const mongoose = require('mongoose')

const controlSchema = new mongoose.Schema({
  domain: String,
  subdomain: String,
  referenceNumber: { type: String, unique: true },
  clause: String,
  type: { type: String, enum: ['أساسي', 'تشغيلي', 'إجرائي'] }
}, { timestamps: true })

module.exports = mongoose.model('Control', controlSchema)

