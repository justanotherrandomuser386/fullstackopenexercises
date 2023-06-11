import { useState, useReducer } from 'react'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'
import { UserContextProvider } from './UserContext'
import './main.css'
function App() {
  
  const noificationReducer = (state, action) => {
    switch (action.type) {
      case 'NOTIFY':
        return action.payload
      default:
        return state
    }
  }

  const notificationInitialState = {
    message: '',
    style: '',
  }
  
  const [notification, notificationDispatch] = useReducer(noificationReducer, notificationInitialState)

  
  return (
    <UserContextProvider>
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <Notification />
      <Login />
      <Blogs.Blogs />
    </NotificationContext.Provider>
    </UserContextProvider>
  )
}

export default App
