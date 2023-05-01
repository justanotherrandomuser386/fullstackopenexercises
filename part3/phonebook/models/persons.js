const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const PORT = process.env.PORT
const url = process.env.MONGODB_URI

mongoose.connect(url).
  then(result =>{
  console.log('connectad to Mongodb')
}).
  catch(error => {
    console.log('error connecting MongoDB', error.message)
  })


const personSchema = new mongoose.Schema({
  name: String, 
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = new mongoose.model('Person', personSchema)