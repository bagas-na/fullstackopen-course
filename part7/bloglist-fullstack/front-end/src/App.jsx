import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import MainPage from './components/MainPage'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import blogService from './services/blogs'

const App = () => {
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(initializeUser()).then(() => setIsLoadingUser(false))
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  console.log(user)

  if (isLoadingUser) {
    return null
  }

  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route index={true} element={<MainPage />} />
    </Routes>
  )
}

export default App
