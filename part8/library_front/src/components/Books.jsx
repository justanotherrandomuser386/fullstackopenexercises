import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

  const Books = () => {

  const [filter, setFilter] = useState([])

  const result = useQuery(
    ALL_BOOKS,
    {variables : {
      genre: filter
    }}
  )



  if (result.loading) {
    return <div>loading</div>
  }
  
  const allGenres = result.data.allBooks.reduce((acc, curr) => {
    curr.genres.map(g => {
      if (!acc.includes(g))
        acc.push(g)
    })
    return acc
  }, [])
  
  const filterHandler  = (event) => {
    if (event.target.checked) {
      if (event.target.value === 'all') {
        setFilter([])
      } else {
        setFilter(filter.concat(event.target.value))
      }
    } else {
      setFilter(filter.filter(f => f != event.target.value))
    }

  }
  return (
    <div>
      <h2>books</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>author</td>
            <td>published</td>
          </tr>
        </thead>
        <tbody>
          {result.data.allBooks.map(b => <tr key={b.id}><td>{b.title}</td><td>{b.author.name}</td><td>{b.published}</td></tr>)}
        </tbody>
      </table>
        {allGenres.map(genre => {
          return (
            <span key={genre}>
              <input type='checkbox' name='filter' id={genre} value={genre} onChange={filterHandler} checked={filter.includes(genre) ? true : false} />
              <label htmlFor={genre}>{genre}</label>
            </span>
          )
        }
        )}
        <span>
          <input type='checkbox' name='filter' id={'all'} value={'all'} onChange={filterHandler} checked={filter.length === 0 ? true : false} />
          <label htmlFor={'all'}>all</label>

        </span>
        
    </div>
  )
}

export default Books
