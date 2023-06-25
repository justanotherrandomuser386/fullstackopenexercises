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
import { useApolloClient } from '@apollo/client'
import Recommended from './components/Recommended'

function App() {

  const [token, setToken] = useState(null)

  const style = {
    padding: 5
  }

  const client = useApolloClient()

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
