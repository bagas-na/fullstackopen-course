import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const userReducer = createSlice({
  name: 'user',
  initialState: { name: null, token: null, username: null },
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser(state, action) {
      return { name: null, token: null, username: null }
    }
  }
})

const { setUser, clearUser } = userReducer.actions

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      blogService.setToken(loggedUser.token)
      dispatch(setUser(loggedUser))
    }
  }
}

export const storeUser = (user) => {
  return async (dispatch) => {
    dispatch(setUser(user))
    blogService.setToken(user.token)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(clearUser())
    blogService.setToken('')
    window.localStorage.removeItem('loggedBlogAppUser')
  }
}

export default userReducer.reducer