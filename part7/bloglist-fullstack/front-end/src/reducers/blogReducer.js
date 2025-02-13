import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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
  selectors: {}
})

const { setBlogs, appendBlog, removeBlog, updateBlog } = blogReducer.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogList = await blogService.getAll()
    dispatch(setBlogs(blogList))
  }
}

export const createBlog = (blog, user) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog({ ...newBlog, user: { username: user.username } }))
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