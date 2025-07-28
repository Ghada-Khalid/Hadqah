const mongoose = require('mongoose')

const historySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  control: { type: mongoose.Schema.Types.ObjectId, ref: 'Control' },
  oldStatus: String,
  newStatus: String,
  note: String
}, { timestamps: true })


module.exports = mongoose.model('HistoryLog', historySchema)
