const User = require('../models/UserModel')
const bcrypt = require('bcrypt')

const signup = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ error: 'Email already in use' })

      
    const user = await User.create({ name, email, password })
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { signup }