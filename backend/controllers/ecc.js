const Control = require('../models/ECCModel')
const mongoose = require('mongoose')

const getAllControls = async (req, res) => {
  try {
    const controls = await Control.find().sort({ referenceNumber: 1 })
    res.status(200).json(controls)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


const getControlById = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'Invalid ID' })

  const control = await Control.findById(id)
  if (!control) return res.status(404).json({ error: 'Control not found' })

  res.status(200).json(control)
}

module.exports = { getAllControls, getControlById }
