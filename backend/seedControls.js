// backend/seedControls.js
require('dotenv').config({
  path: require('path').join(__dirname, '.env')
});

const mongoose    = require('mongoose');
// make sure this path & filename match exactly
const ALL_DOMAINS = require('../hadaqah-frontend/js/controlsData');

// import the Control model (adjust filename if yours is different)
const Control     = require('./models/ECCModel');
// debug: did we actually import your array?
console.log( ALL_DOMAINS.map((d,i) => `${i}: ${d && d.domainId}`) );
console.log('🔍 First domain sample:', ALL_DOMAINS[0]);

async function run() {
  // use the exact env var name from your .env
  const uri = process.env.MONGO_URI;
  console.log('→ Connecting to:', uri);
  if (!uri) {
    console.error('ERROR: MONGO_URI is not defined in your .env');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('✅ Connected to MongoDB');

  // flatten controls out of your nested structure
  const controls = ALL_DOMAINS.flatMap(d =>
    d.subdomains.flatMap(s =>
      s.controls.map(c => ({
        domain:          d.domainName,
        subdomain:       s.subdomainName,
        referenceNumber: c.controlReferenceNumber,
        clause:          c.controlClause,
        type:            c.controlType
      }))
    )
  );
// …after you do:
// const controls = ALL_DOMAINS.flatMap(…)

console.log('🔍 flatten → controls.length =', controls.length);
console.log('🔍 sample control:', controls[0]);

  // seed the collection
  await Control.deleteMany({});
  const inserted = await Control.insertMany(controls, { ordered: false });
  console.log(`✅ Inserted ${inserted.length} controls`);
  process.exit(0);
}

run().catch(err => {
  console.error('Seeder error:', err);
  process.exit(1);
});
