require('dotenv').config()

const morgan = require('morgan')
const express = require('express')
const Person = require('./models/persons.js')
const app = express()

/*
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
*/
app.use(express.static('dist'))
app.use(express.json())
morgan.token('data', (request, response) => {return JSON.stringify(request.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
/*
app.get('/api/persons', (request, response) => {
  response.json(persons)
})
*/

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/info', (request, response) => {
  Person.find({}).then(persons => {
    const timestamp = new Date() 
    const size = persons.length

    response.end(`Phonebook has info for ${size} people\n\r${timestamp.toString()}`)
    
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.deleteOne({_id:request.params.id}).then(result => {
    if (result.deletedCount == 1) {
      response.status(204).end()
    }
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body)
  if (!body.name) {
    console.log('1')
    return response.status(400).json({error: 'Name missing'})
  }
  
  if (!body.number) {
    console.log('3')
    return response.status(400).json({errror: 'Number missin'})
  }

  Person.countDocuments({name: body.name}).then(count => {
    if (count == 1) {
      console.log('2')
      return response.status(400).json({error: 'name must be unique'})
    }
  }).then(() => {
    const person = new Person ({
      name: body.name,
      number: body.number,
    })
    person.save().then(() => {
      console.log('4444')
      response.json(person)
    })
  }) 
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
