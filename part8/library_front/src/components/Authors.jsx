import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import EditAuthor from './EditAuthor'

const Authors = () => {
  const result = useQuery(
    ALL_AUTHORS,
    {}
  )
  if (result.loading) {
    return <div>loading</div>
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <thead>
          <tr>
          <td></td>
          <td>born</td>
          <td>books</td>
          </tr>
        </thead>
        <tbody>
          {result.data.allAuthors.map(a => <tr key={a.id}><td>{a.name}</td><td>{a.born}</td><td>{a.bookCount}</td></tr>)}
        </tbody>
      </table>
    <EditAuthor authors={result.data.allAuthors}/>
    </div>
  )
}

export default Authors
