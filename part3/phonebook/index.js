const morgan = require('morgan')
const express = require('express')
const app = express()


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

app.use(express.static('dist'))
app.use(express.json())
morgan.token('data', (request, response) => {return JSON.stringify(request.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/info', (request, response) => {
  const timestamp = new Date() 
  const size = persons.length

  response.end(`Phonebook has info for ${size} people\n\r${timestamp.toString()}`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = parseInt(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = parseInt(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const generateId = () => {
  const RANGE = 10**10
  return Math.floor(Math.random() * RANGE)
}


app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body)
  if (!body.name) {
    return response.status(400).json({error: 'Name missing'})
  }

  if (persons.filter(person => person.name === body.name).length > 0) {
    return response.status(400).json({error: 'name must be unique'})
  }
  if (!body.number) {
    return response.status(400).json({errror: 'Number missin'})
  }
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }
  persons = persons.concat(person)
  response.json(person)
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
