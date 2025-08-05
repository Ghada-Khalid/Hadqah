const express = require('express')
const router = express.Router()
const {
  getAllControls,
  getControlById,
  getControlsByDomain,
  populateControls
} = require('../controllers/ecc')

// Get all controls
router.get('/', getAllControls)

// Get control by ID
router.get('/:id', getControlById)

// Get controls grouped by domain (used for dashboard stats, etc.)
router.get('/stats/by-domain', getControlsByDomain)

// Populate controls (for admin/setup only, protect in production!)
router.post('/populate', populateControls)

module.exports = router
