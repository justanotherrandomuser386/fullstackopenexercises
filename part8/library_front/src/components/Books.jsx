import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = () => {
  const result = useQuery(
    ALL_BOOKS,
    {}
  )

  if (result.loading) {
    return <div>loading</div>
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
          {result.data.allBooks.map(b => <tr key={b.id}><td>{b.title}</td><td>{b.author}</td><td>{b.published}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default Books
