require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const Person = require('./models/persons.js')
const app = express()

app.use(express.static('dist'))
app.use(express.json())
morgan.token('data', (request, response) => {return JSON.stringify(request.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
/*
app.get('/api/persons', (request, response) => {
  response.json(persons)
})
*/

app.get('/api/persons', (request, response, error) => {
  Person.find({}).then(persons => {
    response.json(persons)
  }).catch(error => next(error))
})

app.get('/api/info', (request, response) => {
  Person.find({}).then(persons => {
    const timestamp = new Date() 
    const size = persons.length

    response.end(`Phonebook has info for ${size} people\n\r${timestamp.toString()}`)
    
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.deleteOne({_id:request.params.id}).then(result => {
    if (result.deletedCount == 1) {
      response.status(204).end()
    }
  }).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({error: 'Name missing'})
  }
  
  if (!body.number) {
    return response.status(400).json({errror: 'Number missin'})
  }

  Person.countDocuments({name: body.name}).then(count => {
    if (count == 1) {
      return response.status(400).json({error: 'name must be unique'})
    }
  }).then(() => {
    const person = new Person ({
      name: body.name,
      number: body.number,
    })
    person.save().then(() => {
      response.json(person)
    })
  }).catch(error => next(error)) 
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({error: 'Name missing'})
  }
  if (!body.number) {
    return response.status(400).json({errror: 'Number missin'})
  }
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(request.params.id, person, {new: true}).
    then(updatedPerson => {
      response.json(updatedPerson)
    }).
    catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.log(error)
  return response.status(400).send({error: 'malformed id'})
}

app.use(errorHandler)
const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
