const mongoose = require('mongoose')

const password  = process.argv[2]
const host      = process.argv[5] || '192.168.1.25:27017'
const person    = process.argv[3]
const number    = process.argv[4]
const url = `mongodb://${host}/phonebook`

mongoose.set('strictQuery',false)
mongoose.connect(url).then(() => {
console.log(`connected to ${url}`)
const personSchema = new mongoose.Schema({
  person: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (person === undefined) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.person} ${person.number}`)
    })
    return mongoose.connection.close()  
  })
} else {
  const newPerson = new Person({
    person,
    number,
  })
  newPerson.save().then(() => {
    console.log(`added ${person} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
})
