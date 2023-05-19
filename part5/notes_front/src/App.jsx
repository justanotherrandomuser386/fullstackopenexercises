import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes.js'
import { useState, useEffect, useRef } from 'react'
import Login from './components/Login'
import NoteFrom from './components/NoteForm'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [showAll, setShowAll] = useState(true)
  const [notification, setNotification] = useState({
    message: '',
    style: '',
  })

  const [user, setUser] = useState(null)
  const noteFormRef = useRef()

  useEffect(() => {
    noteService.getAll()
    .then(initialNotes => {
        setNotes(initialNotes)
      })
  }
  , [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)


  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      }).catch(error => {
          setNotification({
            message:`Note '${note.content}' was already removed from server`,
            style: 'error'
          })
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }
  
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={notification.message} style={notification.style} setNotification={setNotification}/>
      <Login user={user} setUser={setUser} setNotification={setNotification}/>
      {user !== null && noteService.setToken(user.token)}
      {user !== null && <NoteFrom createNote={addNote} ref={noteFormRef} />}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div> 
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
    </div>
  )
}

export default App
