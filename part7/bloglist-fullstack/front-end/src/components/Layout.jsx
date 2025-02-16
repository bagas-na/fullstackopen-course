import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { initializeBlogs } from '../reducers/blogReducer'
import { initializeUsers } from '../reducers/userReducer'
import BlogForm from './BlogForm'
import Navbar from './Navbar'
import Notification from './Notification'

const Layout = () => {
  const session = useSelector(({ session }) => session)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(initializeUsers())
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    if (!session.token) {
      navigate('/login')
    }
  }, [navigate, session.token])

  return (
    <div>
      <Navbar/>
      <h2>Blog app</h2>
      <Notification />
      <BlogForm session={session} />
      <Outlet />
    </div>
  )
}

export default Layout
