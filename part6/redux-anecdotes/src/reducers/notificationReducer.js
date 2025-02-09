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

    if (notificationTimeOutId) {
      clearTimeout(notificationTimeOutId)
    }

    notificationTimeOutId = setTimeout(() => {
      dispatch(updateNotification(''))
    }, duration * 1000)
  }
}

export default notificationSlice.reducer