const mongoose = require('mongoose')
const { MongoClient } = require('mongodb')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]



const url = `mongodb://192.168.1.225:27017/noteApp`

//const client = new MongoClient(url)
//client.connect().then( result => console.log(`Mongo driver ${result}`))

mongoose.set('strictQuery',false)
mongoose.connect(url).then(result => console.log(`connection ${result}`))



const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

 note = new Note ({
  content: 'HTML is easy',
  important: true,
})


note.save().then(result => {
  console.log('note saved!')
})
note = new Note ({
  content: 'HTML is so easy',
  important: true,
})


note.save().then(result => {
  console.log('note saved!')
})

note = new Note ({
  content: 'HTML is not so easy',
  important: true,
})

console.log('lets find something, shall we?')

note.save().then(result => {
  console.log('note saved!')
})

Note.find( {} ).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
