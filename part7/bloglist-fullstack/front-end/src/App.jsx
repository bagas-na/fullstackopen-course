import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import BlogList from './components/BlogList'
import Layout from './components/Layout'
import LoginPage from './components/LoginPage'
import MainPage from './components/MainPage'
import UserList from './components/UserList'
import UsersPage from './components/UsersPage'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeSession } from './reducers/sessionReducer'

const App = () => {
  const [isLoadingSession, setIsLoadingSession] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeSession()).then(() => setIsLoadingSession(false))
  }, [])

  if (isLoadingSession) {
    return null
  }

  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route index={true} element={<BlogList />} />
        <Route path='/users' element={<UserList />} />
      </Route>
    </Routes>
  )
}

export default App
