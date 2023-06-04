import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [], 
  reducers: {
    createAnecdote(state, action) {
      return [...state, action.payload].sort((a, b) => b.votes - a.votes)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const originalAnecdote = state.find(a => a.id === id)
      const updatedAnecdote = {
        ...originalAnecdote,
        votes: originalAnecdote.votes + 1
      }
      return state.map(a => a.id === id
        ? updatedAnecdote
        : a
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export default anecdoteSlice.reducer
export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
