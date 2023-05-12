const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    requred: true,
    unique: true,
    minLength: parseInt(process.env.MIN_USERNAME_LENGTH),
    },
  name: String,
  passwordHash: String
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('User', userSchema)
