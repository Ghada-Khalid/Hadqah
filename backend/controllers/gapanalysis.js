const Recommendation = require('../models/Recommendation')

// POST - Create recommendation
const createRecommendation = async (req, res) => {
  const { userId, controlId, message } = req.body
  try {
    const rec = await Recommendation.create({ user: userId, control: controlId, message })
    res.status(201).json(rec)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
} 

// GET - Get all recommendations
const getRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find()
      .sort({ createdAt: -1 })
      .populate('user control')
    res.status(200).json(recommendations)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createRecommendation,
  getRecommendations
}