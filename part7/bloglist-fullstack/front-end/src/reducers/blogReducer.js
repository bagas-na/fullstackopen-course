import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { pushNotification } from './notificationReducer'

const blogReducer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      const newBlogList = state.filter(blog => blog.id !== action.payload.id)
      return newBlogList
    },
    updateBlog(state, action) {
      const editedBlog = action.payload
      return state.map(blog => blog.id !== editedBlog.id ? blog : editedBlog)
    }
  },
})

const { setBlogs, appendBlog, removeBlog, updateBlog } = blogReducer.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogList = await blogService.getAll()
      dispatch(setBlogs(blogList))
    } catch (error) {
      dispatch(pushNotification({ message: 'Error initializing blogs', isError: true }))
    }
  }
}

export const createBlog = (blog) => {
  return async (dispatch, getState) => {
    try {
      const newBlog = await blogService.create(blog)
      const { session } = await getState()
      console.log('createBlog', session)
      dispatch(appendBlog({ ...newBlog, user: { name: session.name, username: session.username } }))
      dispatch(
        pushNotification({
          isError: false,
          message: `Successfully added blog ${blog.title}${blog.author.length > 0 ? ` by ${blog.author}` : ''}!`,
        })
      )
    } catch (error) {
      dispatch(
        pushNotification({ isError: true, message: 'Failed adding a blog' })
      )
    }
  }
}

export const removeBlogOfId = (id) => {
  return async (dispatch) => {
    const response = await blogService.remove(id)
    dispatch(removeBlog({ id }))
  }
}

export const incrementLike = (blog) => {
  return async (dispatch) => {
    const editedBlog = await blogService.incrementLike(blog.id)
    dispatch(updateBlog({ ...editedBlog, user: blog.user }))
  }
}

export default blogReducer.reducer