const express = require('express')
const router = express.Router()
const { getAllControls, getControlById } = require('../controllers/ecc')

router.get('/', getAllControls)
router.get('/:id', getControlById)

module.exports = router
