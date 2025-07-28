require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')


// import routes
const ECCRoutes = require('./routes/ECC')
const assessmentsRoutes = require('./routes/assessments')
const historyRoutes = require('./routes/history')
const gapAnalysisRoutes = require('./routes/gapanalysis')
const usersRoutes = require('./routes/users')



// express app setup
const app = express()

//middleware 
app.use(cors())
app.use(express.json()) // for parsing application/json


app.use((req,res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
//console.log(req.path, req.method)
  next()

})


// root route
// Route 
app.use('/api/assessments', assessmentsRoutes)
app.use('/api/controls', ECCRoutes)
app.use('/api/history', historyRoutes)
app.use('/api/gapanalysis', gapAnalysisRoutes)
app.use('/api/users', usersRoutes)

// Error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})


// connect to MongoDB
mongoose.connect(process.env.MONG_URI)
  .then(() => {
 // listen for requests
app.listen(process.env.PORT, () => {
console.log(' Connected to MongoDB')
      console.log(`Server running at http://localhost:${process.env.PORT}`)
    
    })
 
  } )

  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)   

  })  



