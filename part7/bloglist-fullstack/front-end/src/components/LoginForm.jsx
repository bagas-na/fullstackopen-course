import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { pushNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'
import Notification from './Notification'

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const loginHandler = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      dispatch(
        pushNotification({
          isError: false,
          message: `Successfully logged in as ${username}!`,
        })
      )
      setTimeout(() => {
        setUsername('')
        setPassword('')
        setUser(user)
      }, 5000)
    } catch (error) {
      dispatch(
        pushNotification({
          isError: true,
          message: 'Wrong credentials!',
        })
      )
    }
  }

  return (
    <div>
      <h2>Log in to Application</h2>
      <Notification />
      <form onSubmit={loginHandler}>
        <div>
          <label htmlFor='username'>username</label>
          <input
            type='text'
            id='username'
            name='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            id='password'
            name='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}
LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
}

export default LoginForm
