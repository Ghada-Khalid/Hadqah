const Assessment = require('../models/AssessmentModel')
const mongoose = require('mongoose')

const getAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find().sort({ updatedAt: -1 }).populate('control user')
    res.status(200).json(assessments)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}


const getAssessment = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'Invalid ID' })

  const assessment = await Assessment.findById(id).populate('control user')
  if (!assessment) return res.status(404).json({ error: 'Assessment not found' })

  res.status(200).json(assessment)
}

const createAssessment = async (req, res) => {
  const { userId, controlId, status, notes, documentLinks } = req.body
  try {
    const assessment = await Assessment.create({
      user: userId,
      control: controlId,
      status,
      notes,
      documentLinks
    })
    res.status(201).json(assessment)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const deleteAssessment = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' })

  const deleted = await Assessment.findByIdAndDelete(id)
  if (!deleted) return res.status(404).json({ error: 'Assessment not found' })

  res.status(200).json(deleted)
}

const updateAssessment = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' })

  const updated = await Assessment.findByIdAndUpdate(id, { ...req.body }, { new: true })
  if (!updated) return res.status(404).json({ error: 'Assessment not found' })

  res.status(200).json(updated)
}

module.exports = {
  getAssessments,
  getAssessment,
  createAssessment,
  deleteAssessment,
  updateAssessment
}