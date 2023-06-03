import { createAnecdote } from "../reducers/anecdoteReducer"
import { useSelector, useDispatch } from "react-redux"


const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const add = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    console.log('CREATE', anecdote)
    event.target.anecdote.value = ''
    dispatch(createAnecdote(anecdote))
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
