import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [], 
  reducers: {
    appendAnecdote(state, action) {
      return [...state, action.payload].sort((a, b) => b.votes - a.votes)
    },
    updateVotes(state, action) {
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

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  console.log(anecdote)
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(anecdote)
    dispatch(updateVotes(updatedAnecdote.id))
  }
}

export default anecdoteSlice.reducer
export const { updateVotes, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
