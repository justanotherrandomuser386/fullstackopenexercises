import { useState } from 'react'
import loginService from '../services/login'
import Togglable from './Togglable'


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

const UserData = ({ user, setUser }) => {
  return (
    <div>
      {`${user.name} logged in`}<button id='logout' onClick={() => setUser('')}>logout</button>
    </div>
  )
}


const Login = ({ user, setUser, setNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)


  const handleLogin = async (event) => {
    event.preventDefault()
    loginService
      .login({
        username,
        password
      })
      .then(user => {
        setUser(user)
        setNotification({
          message: `${user.name} logged in`,
          style: 'info'
        })
      })
      .catch(exception => {
        setNotification({
          message: `${exception.response.data.error}`,
          style: 'error'
        })
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
      <UserData user={user} setUser={setUser}/>
    </div>
  )
}

export default Login
