import { configureStore } from '@reduxjs/toolkit'
import blogReducer from '../reducers/blogReducer'
import notificationReducer from '../reducers/notificationReducer'
import sessionReducer from '../reducers/sessionReducer'
import userReducer from '../reducers/userReducer'

const store = configureStore({
  reducer: {
    session: sessionReducer,
    notification: notificationReducer,
    blogs: blogReducer,
    users: userReducer,
  },
})

export default store