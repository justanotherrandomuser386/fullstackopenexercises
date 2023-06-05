import { useQueryClient, useQuery, useMutation } from 'react-query'
import { useContext } from 'react'
import { getAll, createAnecdote, updateAnecdote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteContext from './components/AnecdoteContext.jsx'
const App = () => {

  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a))
    }
  })

  const [notification, notificationDispatch ] = useContext(AnecdoteContext)
  const handleVote = (anecdote) => {
    console.log('vote', anecdote)
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1}, {
      onError: (err) => 
        notificationDispatch({ type:'NOTIFY', payload:err.message }),
      onSuccess: () => 
        notificationDispatch({ type:'NOTIFY', payload:`anecdote '${anecdote.content}' voted` })
    })
  }

  const result = useQuery('anecdotes', getAll, {
    refetchOnWindowFocus: false
  })
    
  if (result.isLoading) {
    return <div>loading </div>
  } 
  if (result.isError) {
    return <div>anecdote service not available due to server problem</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
