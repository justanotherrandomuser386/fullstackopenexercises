import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote,  voteAnectode } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

  const vote = (id) => {
    console.log('VOTE', id)
    dispatch(voteAnectode(id))
  }


  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  return (<div>  
    {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
  </div>)
}

export default AnecdoteList
