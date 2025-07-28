const express = require('express')
const router = express.Router()
const {
  createHistoryLog,
  getHistoryLogs
} = require('../controllers/history')

// POST /api/history
router.post('/', createHistoryLog)

// GET /api/history
router.get('/', getHistoryLogs)

module.exports = router
