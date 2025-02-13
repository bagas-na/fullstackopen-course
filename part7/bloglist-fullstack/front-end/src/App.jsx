import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Blogs } from './components/Blogs'
import LoginForm from './components/LoginForm'
import { initializeBlogs } from './reducers/blogReducer'
import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  return (
    <>
      {user === null ? (
        <LoginForm setUser={setUser} />
      ) : (
        <Blogs user={user} setUser={setUser} />
      )}
    </>
  )
}

export default App
