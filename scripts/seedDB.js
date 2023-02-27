const mongoose = require('mongoose');
const fs = require('fs');

const Vaccine = require('../src/schema');
const vaccines = require('./jsonData/vaccines.json')

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

async function seed() {
  await Vaccine.deleteMany({});
  console.log('[MONGODB]: Deleted all Vaccines')
  await Vaccine.insertMany(vaccines)
  console.log(`[MONGODB]: Inserted ${vaccines.length} Vaccines`)
  mongoose.connection.close();
}

seed()
