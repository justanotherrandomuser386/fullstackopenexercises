import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const add = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value    
    console.log('ADD', anecdote)
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(setNotification(`You created a new anecdote: ${anecdote}`))
    dispatch(createAnecdote(newAnecdote))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
