import { createSlice } from "@reduxjs/toolkit"
import noteService from '../services/notes'


const noteSlice = createSlice({
  name: 'notes',
  initialState: [], 
  reducers: {
    createNote(state, action) {
      return [...state, action.payload]
    },
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      console.log('FROM_createSlise', state)
      return state.map(note => note.id !== id ? note : changedNote)
    },
    appendNote(state, action) {
      return [...state, action.payload]
    },
    setNotes(state, action) {
      return action.payload
    }
  }
})

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}

export default noteSlice.reducer
export const { 
  toggleImportanceOf,
  appendNote,
  setNotes
} = noteSlice.actions
