import AddBook from './components/AddBook'
import Authors from './components/Authors'
import Books from './components/Books'
import {
  Routes,
  Route,
  Link,
  BrowserRouter
} from 'react-router-dom'

function App() {

  const style = {
    padding: 5
  }

  return (
    <BrowserRouter>
      <div>
        <Link style={style} to='/authors'>authors</Link>
        <Link style={style} to='/books'>books</Link>
        <Link style={style} to='/add'>add book</Link>
      </div>

      <Routes>
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/add' element={<AddBook />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
