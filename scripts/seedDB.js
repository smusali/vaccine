const mongoose = require('mongoose')

const Vaccine = require('../src/schema')
const vaccines = require('./jsonData/vaccines.json')

async function seed () {
  await mongoose.connect('mongodb://localhost:27017/vaccinedb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  await Vaccine.deleteMany({})
  console.log('[MONGODB]: Deleted all Vaccines')
  await Vaccine.insertMany(vaccines)
  console.log(`[MONGODB]: Inserted ${vaccines.length} Vaccines`)

  mongoose.connection.close()
}

seed()
