import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getNotes, createNote, updateNote } from '../requests'
const App = () => {
  const queryClient = useQueryClient()
  
  const newNoteMutation = useMutation(createNote, {
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData(['notes'])
      queryClient.setQueryData(['notes'], notes.concat(newNote))
    }
  })

  const updateNoteMutations = useMutation(updateNote, {
    onSuccess: (updatedNote) => {
      const notes = queryClient.getQueryData(['notes'])
      queryClient.setQueryData(['notes'], notes.map(n => n.id === updatedNote.id ? updatedNote : n))
    }
  })


  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    console.log(content)
    newNoteMutation.mutate({ content, important: false })
  }

  const toggleImportance = (note) => {
    console.log('toggle importance of', note.id)
    updateNoteMutations.mutate({...note, important: !note.important})
  }



 const result = useQuery(['notes'], getNotes, {
    refetchOnWindowFocus: false
  })
  

  console.log(result)
  if (result.isLoading) {
    return <div>loading data</div>
  } 
  const notes = result.data
  return(
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content} 
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      )}
    </div>
  )
}

export default App
