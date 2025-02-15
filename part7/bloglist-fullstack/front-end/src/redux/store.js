import { configureStore } from '@reduxjs/toolkit'
import blogReducer from '../reducers/blogReducer'
import notificationReducer from '../reducers/notificationReducer'
import sessionReducer from '../reducers/sessionReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    session: sessionReducer,
  },
})

export default store