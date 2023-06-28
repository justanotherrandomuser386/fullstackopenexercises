import { useEffect, useState } from 'react'
import AddBook from './components/AddBook'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import {
  Routes,
  Route,
  Link,
  BrowserRouter
} from 'react-router-dom'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommended from './components/Recommended'
import { BOOK_ADDED, ALL_BOOKS } from './queries.js'


export const updateCache = (cache, query, addedBook) => {
  console.log('cache', cache)
  console.log('query', query)
  console.log('addedBook', addedBook)
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  console.log('pre cache.updateQuery')
  cache.updateQuery(query, ({ allBooks }) => {
    console.log('inside cache.updateQuery allBooks', allBooks)
    return {
      allBooks: uniqByName(allBooks.concat(addedBook))
    }
  })
}

function App() {

  const [token, setToken] = useState(null)

  const style = {
    padding: 5
  }
  
const client = useApolloClient()
  
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      updateCache(client.cache, { query: ALL_BOOKS, variables: { genre:[] }}, addedBook)
      window.alert(`${addedBook.title} added`)
      console.log((data))
    }
  })

  
  const logout = () => {
    localStorage.clear()
    setToken(null)
    client.resetStore()
  }
  useEffect(() => {
    const storageToken = localStorage.getItem('library-user-token')
    if (storageToken) {
      setToken(storageToken)
    }
  })

  return (
    <BrowserRouter>
      <div>
        <Link style={style} to='/authors'>authors</Link>
        <Link style={style} to='/books'>books</Link>
        {token 
          ? ( <>
              <Link style={style} to='/add'>add book</Link>
              <Link style={style} to='/recommended'>recommended</Link>
              <button onClick={logout}>logout</button>
              </>
            ) 
          : <Link style={style} to='/login'>login</Link>}
      </div>

      <Routes>
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/add' element={<AddBook />} />
        <Route path='/recommended' element={<Recommended />} />
        <Route path='/login' element={<Login setToken={setToken} setError={null} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
