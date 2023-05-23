import { useState } from 'react'
import loginService from '../services/login'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

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
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}




const UserData = ({ user }) => {
  return (
    <div>
      {`${user.name} logged in`}
    </div>
  )
}

const Login = ({ user, setUser, setNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
        console.log(exception)
        setNotification({
          message: `${exception.response.data.error}`,
          style: 'error'
        })
      })
    setUsername('')
    setPassword('')
  }
  console.log('Login component')
  if (user === null) {
    return (
      <Togglable buttonLabel='show login' >
        <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin}/>
      </Togglable>
    )
  }
  return (
    <div>
      <UserData user={user}/>
    </div>
  )
}


export default Login
