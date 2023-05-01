require('dotenv').config()
const express = require('express')
const Note = require('./models/note.cjs')

const app = express()

const PORT = process.env.PORT

app.use(express.json())


/*
app.post('/api/notes', (request, response) => {
  const body = request.body
  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: body.content,
    important: body.importatnt || false,
    id: generateId(),
  }
  console.log(note)
  notes = notes.concat(note)
  console.log(note)
  response.json(note)
})
*/

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing'})
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})


app.get('/', (request, response) =>{
  response.send('<h1>Hello World!</h1>')
})

/*
app.get('/api/notes', (request, response) => {
  response.json(notes)
})
*/
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

/*
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === parseInt(id))
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})
*/
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  }).catch(error => {
      console.log(error)
      response.status(400).send({error: 'malformed id'})
    })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

app.listen(PORT, () => {
  console.log(`Server running on posrt ${PORT}`)
})
