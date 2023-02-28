const app = require('./app')
const mongoose = require('mongoose')

const port = 3000

init()

async function init () {
  try {
    await mongoose.connect('mongodb://localhost:27017/vaccinedb', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    await app.listen(port)
    console.log(`Server listening at http://localhost:${port}`);
  } catch (error) {
    console.error(error)
  }
}
