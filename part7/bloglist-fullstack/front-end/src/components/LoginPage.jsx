import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { pushNotification } from '../reducers/notificationReducer'
import { saveSession } from '../reducers/sessionReducer'
import loginService from '../services/login'
import Notification from './Notification'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginHandler = async (e) => {
    e.preventDefault()
    try {
      const session = await loginService.login({ username, password })
      dispatch(saveSession(session))
      dispatch(
        pushNotification({
          isError: false,
          message: `Successfully logged in as ${username}!`,
        })
      )
      setUsername('')
      setPassword('')
      navigate('/')
    } catch (error) {
      if (error.response.status === 500) {
        dispatch(
          pushNotification({
            isError: true,
            message: 'An error has occured',
          })
        )
        return
      }

      dispatch(
        pushNotification({
          isError: true,
          message: 'Wrong credentials!',
        })
      )
    }
  }

  return (
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
  )
}

const LoginPage = () => {
  return (
    <div>
      <h2>Log in to Application</h2>
      <Notification />
      <LoginForm />
    </div>
  )
}
export default LoginPage
