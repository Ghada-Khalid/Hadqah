const mongoose = require('mongoose')

const recommendationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  control: { type: mongoose.Schema.Types.ObjectId, ref: 'Control' },
  message: String
}, { timestamps: true })

module.exports = mongoose.model('Recommendation', recommendationSchema)

