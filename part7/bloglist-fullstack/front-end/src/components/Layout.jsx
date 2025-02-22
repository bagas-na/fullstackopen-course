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
    <div className='bg-zinc-50 h-screen w-screen'>
      <Navbar/>
      <div className="h-12"></div>
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-4xl'>Fullstack Open - Blog app</h2>
        <Notification />
        <BlogForm session={session} />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
