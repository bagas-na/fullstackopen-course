import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'
import BlogForm from './BlogForm'
import Notification from './Notification'

const Layout = ({ children }) => {
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logoutUser())
    navigate('/login')
  }

  useEffect(() => {
    if (!user.token) {
      navigate('/login')
    }
  }, [])

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <BlogForm user={user} />
      <p>{user.name} logged in.</p>
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
