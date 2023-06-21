import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ADD_BOOK } from '../queries'


const GenresFrom = ({ genres, setGenres }) => {
  const [genre, setGenre] = useState('')

  const addGenre = (event) => {
    event.preventDefault()
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <input value={genre} onChange={event => setGenre(event.target.value)}/>
      <button onClick={addGenre}>add genre</button>
    </div>
  )
}

const AddBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(ADD_BOOK)
  
  const addBook = (event) => {
    event.preventDefault()
    createBook({
      variables: {title, author, published: parseInt(published), genres}
    })

    setTitle('')
    setAuthor('')
    setPublished('')
    setGenres([])
  }

  return (
    <form onSubmit={addBook}>
      <div>
        title <input required='true' value={title} onChange={event => setTitle(event.target.value)} />
      </div>
      <div>
        author <input required='true' value={author} onChange={event => setAuthor(event.target.value)} />
      </div>
      <div>
        published <input required='true' value={published} type='number' onChange={event => setPublished(event.target.value)} />
      </div>
      <GenresFrom genres={genres} setGenres={setGenres}/>
      <div>[{genres.join(', ')}]</div>
      <button type='submit'>create book</button>
    </form>
  )

}

export default AddBook
