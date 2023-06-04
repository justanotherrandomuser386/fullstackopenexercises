import { useEffect } from 'react'
import NewNote from './NewNote'
import Notes from './Notes'
import VisibilityFilter from './VisibilityFilter'
import { initializeNotes } from '../reducers/noteReducer'
import { useDispatch } from 'react-redux'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes())  
  }, [])

  return (
  <div>
    <NewNote />
    <VisibilityFilter />
    <Notes />
  </div>
  )
}

export default App
