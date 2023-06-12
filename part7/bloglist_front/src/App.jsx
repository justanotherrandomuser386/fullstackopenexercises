import { useState, useReducer } from 'react'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'
import { UserContextProvider } from './UserContext'
import './main.css'
import Users from './components/Users'
import User from './components/User'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

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
          <div>
            <Link to='/users'>users</Link>
            <Link to='/blogs'>blogs</Link>
          </div>
          <Login />
          <Routes>
            <Route path='/users' element={<Users />}/>
            <Route path='/blogs' element={<Blogs.Blogs />}/>
            <Route path='/users/:id' element={<User />}/>
            <Route path='/blogs/:id' element={<Blogs.BlogEntry />}/>
          </Routes>
        </NotificationContext.Provider>
      </UserContextProvider>
  )
}

export default App
