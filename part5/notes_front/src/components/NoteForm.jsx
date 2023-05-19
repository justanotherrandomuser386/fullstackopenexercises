import Togglable from "./Togglable"
import { useState, forwardRef } from 'react'

const NoteFrom = forwardRef(({ createNote }, refs) => {
  const [newNote, setNewNote] = useState('')
  
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important:true
    })

    setNewNote('')
  }

  return (
    <Togglable buttonLabel='show add form' ref={refs}>
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type='submit'>save</button>
      </form>
    </Togglable>
  )
})

export default NoteFrom
