import { useState, useReducer } from 'react'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'
import './main.css'
function App() {
  const [user, setUser] = useState('')
  
  const noificationReducer = (state, action) => {
    switch (action.type) {
      case 'NOTIFY':
        return action.payload
      default:
        return state
    }
  }

  const innitalState = {
    message: '',
    style: '',
  }

  const [notification, notificationDispatch] = useReducer(noificationReducer, innitalState)



  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <Notification />
      {console.log(user)}
      <Login user={user} setUser={setUser}/>
      <Blogs.Blogs token={user !==  '' ? user.token : ''} user={user}/>
    </NotificationContext.Provider>
  )
}

export default App
