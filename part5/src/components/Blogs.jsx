import PropTypes from 'prop-types'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'

const Blog = ({ user, blog, incrementLike, removeBlog }) => {
  const [showDetail, setShowDetail] = useState(false)

  const toggleDetail = () => {
    setShowDetail(!showDetail)
  }

  const likeHandler = async () => {
    await incrementLike(blog.id)
  }

  const removeHandler = async () => {
    const confirmation = window.confirm(
      `Remove blog ${blog.title}${blog.author.length > 0 ? ` by ${blog.author}` : ''}?`
    )
    if (confirmation) {
      await removeBlog(blog.id)
    }
  }

  const hideWhenDetailed = { display: showDetail ? 'none' : '' }
  const showWhenDetailed = { display: showDetail ? '' : 'none' }

  const removable = blog.user.username === user.username

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <p style={{ margin: 0, display: 'inline' }}>{blog.title} - {blog.author} </p>
      <button type="button" style={hideWhenDetailed} onClick={() => toggleDetail()}>
        view
      </button>
      <button type="button" style={showWhenDetailed} onClick={() => toggleDetail()}>
        hide
      </button>
      <div style={showWhenDetailed}>
        <p style={{ margin: 0 }}>{blog.url}</p>
        <p style={{ margin: 0, display: 'inline' }}>likes: {blog.likes} </p>
        <button type="button" onClick={() => likeHandler()}>
          like
        </button>
        <p style={{ margin: 0 }}>{blog.user.name}</p>
        <button type="button" onClick={() => removeHandler()} disabled={!removable}>
          remove
        </button>
      </div>
    </div>
  )
}
Blog.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  blog: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    user: PropTypes.object.isRequired,
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
  }).isRequired,
  incrementLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

const BlogForm = forwardRef(({ createBlog }, ref) => {
  const [visible, setVisible] = useState(false)
  const formRef = useRef(null)

  const hideWhenVisibleStyle = { display: visible ? 'none' : '' }
  const showWhenVisibleStyle = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  const createBlogHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData(formRef.current)
    const title = formData.get('title')
    const author = formData.get('author')
    const url = formData.get('url')

    await createBlog(title, author, url)
  }

  return (
    <div>
      <form ref={formRef} onSubmit={createBlogHandler} style={showWhenVisibleStyle}>
        <div>
          <label htmlFor="title">title:</label>
          <input type="text" name="title" id="title" />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input type="text" name="author" id="author" />
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input type="text" name="url" id="url" />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={() => toggleVisibility()}>
          cancel
        </button>
      </form>
      <button type="button" onClick={() => toggleVisibility()} style={hideWhenVisibleStyle}>
        new blog
      </button>
    </div>
  )
})
BlogForm.displayName = 'BlogForm'
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

const Blogs = ({ blogs, setBlogs, user, setUser }) => {
  const [notification, setNotification] = useState({ isError: false, message: null })
  const blogFormRef = useRef(null)

  const createBlog = async (title, author, url) => {
    try {
      await blogService.create({ title, author, url })
      const newBlogs = await blogService.getAll()

      setBlogs(newBlogs)
      blogFormRef.current.toggleVisibility()

      setNotification({
        isError: false,
        message: `Sucessfully added blog ${title}${author.length > 0 ? ` by ${author}` : ''}!`,
      })
      setTimeout(() => {
        setNotification({ isError: false, message: null })
      }, 5000)
    } catch (error) {
      setNotification({ isError: true, message: 'Failed adding a blog' })
      setTimeout(() => {
        setNotification({ isError: false, message: null })
      }, 5000)
    }
  }

  const incrementLike = async (blogId) => {
    await blogService.incrementLike(blogId)
    const newBlogs = await blogService.getAll()
    setBlogs(newBlogs)
  }

  const removeBlog = async (blogId) => {
    await blogService.remove(blogId)
    const newBlogs = await blogService.getAll()
    setBlogs(newBlogs)
  }

  const logoutHandler = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification isError={notification.isError} message={notification.message} />
      <BlogForm createBlog={createBlog} ref={blogFormRef} />
      <p>{user.name} logged in.</p>
      <button onClick={() => logoutHandler()}>log out</button>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            incrementLike={incrementLike}
            removeBlog={removeBlog}
          />
        ))}
    </div>
  )
}

Blogs.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      user: PropTypes.object.isRequired,
      title: PropTypes.string,
      author: PropTypes.string,
      url: PropTypes.string,
      likes: PropTypes.number,
    })
  ),
  setBlogs: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
}

export default Blogs
