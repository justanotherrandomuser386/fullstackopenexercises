import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries.js'


const Recommended = () => {

  const resultM = useQuery(
    ME,
    {}
  )
  
  const resultB = useQuery(
    ALL_BOOKS,
    {
      variables: {
        genre: resultM.data ? resultM.data.me.favoriteGenre : []
      }
    }
  )


  if (resultB.loading || resultM.loading) {
    return <div>loading</div>
  }
  
  {console.log('resultB', resultB)}
  {console.log('resultM', resultM)}
  return (
    <div>
      <h2>recommendations</h2>

      books in your favorite genre <strong>{resultM.data.me.favoriteGenre}</strong>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>author</td>
            <td>published</td>
          </tr>
        </thead>
        <tbody>
          {resultB.data.allBooks.map(b => <tr key={b.id}><td>{b.title}</td><td>{b.author.name}</td><td>{b.published}</td></tr>)}
        </tbody>
      </table>
      
    </div>
  )
}


export default Recommended
