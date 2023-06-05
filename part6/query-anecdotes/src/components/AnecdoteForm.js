import { useQueryClient, useMutation } from 'react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import AnecdoteContext from './AnecdoteContext.jsx'

const AnecdoteForm = () => {
  const [notifiction, notificationDispatch] = useContext(AnecdoteContext)

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', [...anecdotes, newAnecdote])
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 }, {
      onError: (err) => 
        notificationDispatch({ type:'NOTIFY', payload:err.response.data.error }),
      onSuccess: () =>
        notificationDispatch({ type: 'NOTIFY', payload:`anecdote '${content}' created`})
    })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
