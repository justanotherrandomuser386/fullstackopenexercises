import { createNote, toggleImportanceOf } from "../reducers/noteReducer"
import { useSelector, useDispatch } from "react-redux"

function App() {
  const dispatch = useDispatch()
  const notes = useSelector(state => state)

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
  }
  
  const togggleImportance = (id) => {
    console.log('click')
    dispatch(toggleImportanceOf(id))
  }


  return (
    <div>
      <form onSubmit={addNote}>
        <input name='note'/>
        <button type='submit'>add</button>
      </form>
      <ul>
        {notes.map(note =>
          <li
            key={note.id}
            onClick={() => togggleImportance(note.id)}
          >
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
