import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Blogs } from './components/Blogs'
import LoginForm from './components/LoginForm'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import blogService from './services/blogs'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
  }, [])

  return (
    <>
      {user.name === null ? (
        <LoginForm/>
      ) : (
        <Blogs/>
      )}
    </>
  )
}

export default App
