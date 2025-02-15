import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import MainPage from './components/MainPage'
import UsersPage from './components/UsersPage'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeSession } from './reducers/sessionReducer'

const App = () => {
  const [isLoadingSession, setIsLoadingSession] = useState(true)
  const session = useSelector(({ session }) => session)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeSession()).then(() => setIsLoadingSession(false))
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  if (isLoadingSession) {
    return null
  }

  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/users' element={<UsersPage />} />
      <Route index={true} element={<MainPage />} />
    </Routes>
  )
}

export default App
