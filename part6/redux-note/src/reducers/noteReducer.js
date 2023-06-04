import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = [
    { content: 'reducer defines how redux store works', important: true, id: 1},
    { content: 'state of store can contain any data', important: false, id: 2}
  ]
 
const noteReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'NEW_NOTE':
      return [...state, action.payload]
    case 'TOGGLE_IMPORTANCE':
      const id = action.payload.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { 
        ...noteToChange, 
        important: !noteToChange.important 
      }
      return state.map(note =>
        note.id !== id ? note : changedNote 
      )
    default:
      return state
    }
  } 

const generateId = () => 
  Number((Math.random() * 1000000).toFixed(0))

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

export default noteSlice.reducer
export const { 
  createNote,
  toggleImportanceOf,
  appendNote,
  setNotes
} = noteSlice.actions
