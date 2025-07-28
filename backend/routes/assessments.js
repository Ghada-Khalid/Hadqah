const express = require('express')
const router = express.Router()
const {
  getAssessments,
  getAssessment,
  createAssessment,
  updateAssessment,
  deleteAssessment
} = require('../controllers/assessment')

router.get('/', getAssessments)
router.get('/:id', getAssessment)
router.post('/', createAssessment)
router.patch('/:id', updateAssessment)
router.delete('/:id', deleteAssessment)

module.exports = router
