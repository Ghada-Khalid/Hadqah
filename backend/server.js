require('dotenv').config({
  path: require('path').join(__dirname, '.env')
});

const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const path     = require('path');

const ECCRoutes         = require('./routes/ECC');
const assessmentsRoutes = require('./routes/assessments');
const historyRoutes     = require('./routes/history');
const gapAnalysisRoutes = require('./routes/gapanalysis');
const usersRoutes       = require('./routes/users');
const domainsRoutes     = require('./routes/domains');

const app = express();
const PORT = process.env.PORT || 4000;

// 0) Load .env and sanity‐check
const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('❌ MONGO_URI is undefined. Check your .env filename and variable name.');
  process.exit(1);
}

// 1) Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser:    true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');

  // 2) Start Express
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('❌ Error connecting to MongoDB:', err);
  process.exit(1);
});

// 3) Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// 4) API routes
app.use('/api/assessments', assessmentsRoutes);
app.use('/api/history',     historyRoutes);
app.use('/api/gapanalysis', gapAnalysisRoutes);
app.use('/api/users',       usersRoutes);
app.use('/api/domains',     domainsRoutes);
app.use('/api/ecc',         ECCRoutes);


// 5) Static files & HTML pages
app.use(express.static(path.join(__dirname, '../hadaqah-frontend')));
app.use('/css', express.static(path.join(__dirname, '../hadaqah-frontend/css')));
app.use('/js',  express.static(path.join(__dirname, '../hadaqah-frontend/js')));

app.get(['/', '/index.html'], (req, res) => {
  res.sendFile(path.join(__dirname, '../hadaqah-frontend/html/index.html'));
});
app.get('/controls.html',    (req, res) => {
  res.sendFile(path.join(__dirname, '../hadaqah-frontend/html/controls.html'));
});
app.get('/assessments.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../hadaqah-frontend/html/assessments.html'));
});

// catch‐all → dashboard
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../hadaqah-frontend/html/index.html'));
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});
