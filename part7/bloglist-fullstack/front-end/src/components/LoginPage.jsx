import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { pushNotification } from '../reducers/notificationReducer'
import { saveSession } from '../reducers/sessionReducer'
import loginService from '../services/login'
import Notification from './Notification'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginHandler = async (e) => {
    e.preventDefault()
    try {
      const session = await loginService.login({ username, password })
      dispatch(saveSession(session))
      dispatch(
        pushNotification({
          isError: false,
          message: `Successfully logged in as ${username}!`,
        })
      )
      setUsername('')
      setPassword('')
      navigate('/')
    } catch (error) {
      if (error.response.status === 500) {
        dispatch(
          pushNotification({
            isError: true,
            message: 'An error has occured',
          })
        )
        return
      }

      dispatch(
        pushNotification({
          isError: true,
          message: 'Wrong credentials!',
        })
      )
    }
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <Card className='max-w-md w-full'>
        <form onSubmit={loginHandler}>
          <CardHeader>
            <CardTitle className='text-xl'>Fullstack Open Blog App</CardTitle>
            <CardDescription>Log in to access your blog</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex flex-col justify-center gap-2 items-stretch'>
              <Label htmlFor='username'>Username</Label>
              <Input
                type='text'
                id='username'
                name='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Username'
              />
            </div>
            <div className='flex flex-col justify-center gap-2 items-stretch'>
              <Label htmlFor='password'>Password</Label>
              <Input
                type='password'
                id='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
              />
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button type='submit' className="w-20">Log in</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

const LoginPage = () => {
  return (
    <div>
      <Notification />
      <LoginForm />
    </div>
  )
}
export default LoginPage
