import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const sessionReducer = createSlice({
  name: 'session',
  initialState: { name: null, token: null, username: null },
  reducers: {
    setSession(state, action) {
      return action.payload
    },
    clearSession(state, action) {
      return { name: null, token: null, username: null }
    }
  }
})

const { setSession, clearSession } = sessionReducer.actions

export const initializeSession = () => {
  return async (dispatch) => {
    const currentSessionJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (currentSessionJSON) {
      const loggedUser = JSON.parse(currentSessionJSON)
      blogService.setToken(loggedUser.token)
      dispatch(setSession(loggedUser))
    }
  }
}

export const saveSession = (session) => {
  return async (dispatch) => {
    dispatch(setSession(session))
    blogService.setToken(session.token)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(session))
  }
}

export const logoutSession = () => {
  return async (dispatch) => {
    dispatch(clearSession())
    blogService.setToken('')
    window.localStorage.removeItem('loggedBlogAppUser')
  }
}

export default sessionReducer.reducer