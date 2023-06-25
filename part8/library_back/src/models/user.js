import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlenght: 3
  },
  favoriteGenre: {
    type: String,
  
  }
})

export default mongoose.model('User', schema)
