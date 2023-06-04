import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote,  voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
const AnecdoteList = () => {

  const vote = (id) => {
    console.log('VOTE', id)
    dispatch(voteAnecdote(id))
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
              dispatch(setNotification(`You voted for a '${anecdote.content}'`))
              vote(anecdote.id)
          }}>vote</button>
        </div>
      </div>
      )
    }
    </div>
  )
}

export default AnecdoteList
