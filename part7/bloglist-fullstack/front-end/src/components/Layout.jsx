import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutSession } from '../reducers/sessionReducer'
import BlogForm from './BlogForm'
import Notification from './Notification'

const Layout = ({ children }) => {
  const session = useSelector(({ session }) => session)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logoutSession())
    navigate('/login')
  }

  useEffect(() => {
    if (!session.token) {
      navigate('/login')
    }
  }, [])

  return (
    <div>
      <h2>Blog app</h2>
      <Notification />
      <BlogForm session={session} />
      <p>{session.name} logged in.</p>
      <button onClick={() => logoutHandler()}>log out</button>
      {children}
    </div>
  )
}
Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default Layout
