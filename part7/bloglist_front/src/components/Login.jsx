import { useState, useContext } from 'react'
import loginService from '../services/login'
import Togglable from './Togglable'
import NotificationContext from '../NotificationContext'
import UserContext from '../UserContext'

const LoginForm = ({ username, setUsername, password, setPassword, handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login' type="submit">login</button>
    </form>
  )
}

const UserData = ({ user, userDispatch }) => {
  return (
    <div>
      {`${user.name} logged in`}<button id='logout' onClick={() => userDispatch({ type:'LOGOUT' })}>logout</button>
    </div>
  )
}


const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const [user, userDispatch] = useContext(UserContext)
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const handleLogin = async (event) => {
    event.preventDefault()
    loginService
      .login({
        username,
        password
      })
      .then(user => {
        userDispatch({
          type:'SET',
          payload: user
        })
        notificationDispatch({
          type: 'NOTIFY',
          payload:{
          message: `${user.name} logged in`,
          style: 'info'
        }})
      })
      .catch(exception => {
        notificationDispatch({
          type: 'NOTIFY',
          payload:{
          message: `${exception.response.data.error}`,
          style: 'error'
        }})
      })
    setUsername('')
    setPassword('')
  }

  if (user === '') {
    return (
      <Togglable buttonLabel='show login' buttonId = 'showLogin'>
        <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin}/>
      </Togglable>
    )
  }
  return (
    <div>
      <UserData user={user} userDispatch={userDispatch}/>
    </div>
  )
}

export default Login
