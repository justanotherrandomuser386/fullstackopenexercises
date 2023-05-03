const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url).
  then(() => {
    console.log('connectad to Mongodb')
  }).
  catch(error => {
    console.log('error connecting MongoDB', error.message)
  })

const phoneValidator = [
  (v) => {
    return /\d{2,3}-\d/.test(v)
  },
  num => `${num.value} is not a valid phone number`,

]

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: {
    type: String,
    minLength: 8,
    validate: phoneValidator,
  }
})


personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = new mongoose.model('Person', personSchema)
