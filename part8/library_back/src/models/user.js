import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlenght: 3
  },
})

export default mongoose.model('User', schema)
