import PropTypes from 'prop-types'
import { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import Notification from './Notification'

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState({ isError: false, message: null })

  const loginHandler = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      setNotification({ isError: false, message: `Successfully logged in as ${username}!` })
      setTimeout(() => {
        setUser(user)
        setUsername('')
        setPassword('')
        setNotification({ isError: false, message: null })
      }, 2000)
    } catch (error) {
      setNotification({ isError: true, message: 'Wrong credentials!' })
      setTimeout(() => {
        setNotification({ isError: false, message: null })
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Log in to Application</h2>
      <Notification isError={notification.isError} message={notification.message} />
      <form onSubmit={loginHandler}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            name="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            name="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}
LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired
}

export default LoginForm
