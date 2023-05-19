import { useState } from 'react'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import './main.css'
function App() {
  const [user, setUser] = useState('')
  const [notification, setNotification] = useState({
    message: '',
    style: '',
  })
  
  return (
    <div>
      <Notification message={notification.message} style={notification.style} setNotification={setNotification}/>
      
      {console.log(user)}
      <Login user={user} setUser={setUser} setNotification={setNotification}/>
      <Blogs token={user !==  '' ? user.token : ''} setNotification={setNotification}/>
    </div>
  )
}

export default App
