import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    updateNotification(state, action) {
      const content = action.payload
      return content
    },
  }
})

const { updateNotification } = notificationSlice.actions;


let notificationTimeOutId = null;

export const setNotification = (message, duration = 5) => {
  return async (dispatch) => {
    dispatch(updateNotification(message))
    console.log(`Dispatched notification: ${message.slice(0, 20)}... timeOutId = ${notificationTimeOutId}`)

    if (notificationTimeOutId) {
      clearTimeout(notificationTimeOutId)
      console.log(`clear timeOutId: ${notificationTimeOutId}`)
    }

    notificationTimeOutId = setTimeout(() => {
      console.log('clear notification')
      dispatch(updateNotification(''))
    }, duration * 1000)
    console.log(`added new timeOutId: ${notificationTimeOutId}, duration: ${duration} seconds`)
  }
}

export default notificationSlice.reducer