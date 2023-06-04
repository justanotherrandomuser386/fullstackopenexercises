import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote,  voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
const AnecdoteList = () => {

  const vote = (anecdote) => {
    console.log('VOTE', anecdote)
    dispatch(voteAnecdote(anecdote))
  }


  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === '') {
      return anecdotes
    }
    return anecdotes.filter(a => {
      return a.content.startsWith(filter)
    })
  })
  const dispatch = useDispatch()
  return (
    <div>
    {
      anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => {
              dispatch(setNotification(`You voted for a '${anecdote.content}'`, 5))
              vote(anecdote)
          }}>vote</button>
        </div>
      </div>
      )
    }
    </div>
  )
}

export default AnecdoteList
