const express = require('express')
const router = express.Router()
const {
  createRecommendation,
  getRecommendations
} = require('../controllers/gapanalysis')

// POST /api/gapanalysis/recommendations
router.post('/recommendations', createRecommendation)

// GET /api/gapanalysis/recommendations
router.get('/recommendations', getRecommendations)

module.exports = router
