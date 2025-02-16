import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import { pushNotification } from './notificationReducer'

const userReducer = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  }
})

const { setUsers } = userReducer.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    try {
      const userList = await userService.getAll()
      dispatch(setUsers(userList))
    } catch (error) {
      dispatch(pushNotification({ message: 'Error initializing users data', isError: true }))
    }
  }
}

export default userReducer.reducer