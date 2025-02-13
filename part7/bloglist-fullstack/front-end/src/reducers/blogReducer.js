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
    removeBlogOfId(state, action) {
      const newBlogList = state.filter(blog => blog.id !== action.payload.id)
      return newBlogList
    },
    updateBlog(state, action) {
      const editedBlog = action.payload
      return state.map(blog => blog.id !== editedBlog.id ? blog : editedBlog)
    }
  }
})

const { setBlogs, appendBlog, removeBlogOfId, updateBlog } = blogReducer.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogList = await blogService.getAll()
    dispatch(setBlogs(blogList))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    const response = await blogService.remove(id)
    dispatch(removeBlogOfId({ id }))
  }
}

export const editBlog = (blog) => {
  return async (dispatch) => {
    const editedBlog = await blogService.update(blog.id, blog)
    dispatch(updateBlog(blog))
  }
}

export default blogReducer.reducer