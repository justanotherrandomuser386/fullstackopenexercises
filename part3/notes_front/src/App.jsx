import Note from './components/Note'
import noteService from "./services/notes.js"
import { useState, useEffect } from 'react'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('a new note...')

  useEffect(() => {
    noteService.getAll()
    .then(initialNotes => {
        setNotes(initialNotes)
      })
  }
  , [])

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important }

  noteService
    .update(id, changedNote)
    .then(returnedNote => {
    setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
  }
  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }
  
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
        <ul>
          {notes.map(note => 
            <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
          )}
        </ul>
        <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type='submit'>save</button>
        </form>
    </div>
  )
}

export default App
