const HistoryLog = require('../models/HistoryLog')
const mongoose = require('mongoose')

// POST - Create history log
const createHistoryLog = async (req, res) => {
  const { userId, controlId, oldStatus, newStatus, note } = req.body
  try {
    const log = await HistoryLog.create({
      user: userId,
      control: controlId,
      oldStatus,
      newStatus,
      note
    })
    res.status(201).json(log)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


// GET - Get all history logs
const getHistoryLogs = async (req, res) => {
  try {
    const logs = await HistoryLog.find().sort({ createdAt: -1 }).populate('user control')
    res.status(200).json(logs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createHistoryLog,
  getHistoryLogs
}
