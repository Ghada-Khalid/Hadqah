// backend/routes/domains.js
const express = require('express');
const fs      = require('fs');
const path    = require('path');
const router  = express.Router();

// adjust this to wherever your JSON “attached_assets” live
const ASSETS_DIR = path.join(__dirname, '../data/attached_assets');

router.get('/', (req, res) => {
  fs.readdir(ASSETS_DIR, (err, files) => {
    if (err) return res.status(500).json({ error: 'Could not list domain files' });

    // only pick your four domain JSONs
    const domainFiles = files.filter(f => f.endsWith('Domain.json'));

    const domains = domainFiles.map(f => {
      const json = JSON.parse(fs.readFileSync(path.join(ASSETS_DIR, f), 'utf8'));
      return {
        id:       Number(json.domainId),
        name:     json.domainName,
        nameAr:   json.domainNameAr
      };
    });

    res.json(domains);
  });
});

module.exports = router;
