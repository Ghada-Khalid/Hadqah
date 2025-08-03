require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const path     = require('path');
const router  = express.Router();

const domainsRoutes = require('./routes/domains');

const ECCRoutes          = require('./routes/ECC');
const assessmentsRoutes  = require('./routes/assessments');
const historyRoutes      = require('./routes/history');
const gapAnalysisRoutes  = require('./routes/gapanalysis');
const usersRoutes        = require('./routes/users');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// API routes
app.use('/api/assessments', assessmentsRoutes);
app.use('/api/history',     historyRoutes);
app.use('/api/gapanalysis', gapAnalysisRoutes);
app.use('/api/users',       usersRoutes);
app.use('/api/domains', domainsRoutes);


// 1) Static assets (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, '../hadaqah-frontend')));
app.use('/css', express.static(path.join(__dirname, '../hadaqah-frontend/css')));
app.use('/js',  express.static(path.join(__dirname, '../hadaqah-frontend/js')));

// 2) HTML pages out of the html/ folder
app.get(['/', '/index.html'], (req, res) => {
  res.sendFile(path.join(__dirname, '../hadaqah-frontend/html/index.html'));
});
app.get('/controls.html',    (req, res) => {
  res.sendFile(path.join(__dirname, '../hadaqah-frontend/html/controls.html'));
});
app.get('/assessments.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../hadaqah-frontend/html/assessments.html'));
});

// 3) Catch-all: serve dashboard for any other path
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../hadaqah-frontend/html/index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Connect to MongoDB & start server
mongoose.connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to MongoDB');
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
