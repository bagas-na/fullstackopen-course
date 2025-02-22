import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import BlogDetail from './components/BlogDetail'
import BlogList from './components/BlogList'
import Layout from './components/Layout'
import LoginPage from './components/LoginPage'
import UserDetail from './components/UserDetail'
import UserList from './components/UserList'
import { initializeSession } from './reducers/sessionReducer'

const App = () => {
  const [isLoadingSession, setIsLoadingSession] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeSession()).then(() => setIsLoadingSession(false))
  }, [dispatch])

  if (isLoadingSession) {
    return null
  }

  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route index={true} element={<BlogList />} />
        <Route path='blogs/:id' element={<BlogDetail />} />
        <Route path='/users' element={<UserList />} />
        <Route path='/users/:id' element={<UserDetail />} />
      </Route>
    </Routes>
  )
}

export default App
