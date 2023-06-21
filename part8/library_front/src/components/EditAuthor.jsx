import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { EDIT_AUTHOR } from '../queries'

const EditAuthor = ({ authors }) => {
  
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [ updateAuthor ] = useMutation(EDIT_AUTHOR)


  const editAuthor = (event) => {
    event.preventDefault()

    updateAuthor({
      variables: { name, setBornTo: parseInt(born) }
    })
  
  setName('')
  setBorn('')
  }

  return (
    <div>
      <h3>update birthyear</h3>
      <form onSubmit={editAuthor}>
        <select value={name} onChange={event => setName(event.target.value)}>
          {authors.map(a => <option value={a.name}>{a.name}</option>)}
        </select>
    
        <div>
          born <input value={born} onChange={event => setBorn(event.target.value)} />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default EditAuthor
