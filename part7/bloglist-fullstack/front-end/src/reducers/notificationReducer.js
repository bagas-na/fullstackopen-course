import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', isError: false },
  reducers: {
    updateNotification(state, action) {
      console.log(action.payload)
      const { message, isError } = action.payload
      return { message, isError }
    },
  }
})

const { updateNotification } = notificationSlice.actions

let timeoutID = null

export const pushNotification = (notification) => {
  return async (dispatch) => {
    dispatch(updateNotification(notification))

    if (timeoutID) {
      clearTimeout(timeoutID)
    }

    timeoutID = setTimeout(() => {
      dispatch(updateNotification({ message: '', isError: false }))
    }, 5 * 1000)

  }
}

export default notificationSlice.reducer