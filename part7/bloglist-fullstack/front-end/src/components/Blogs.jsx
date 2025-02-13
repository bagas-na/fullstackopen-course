import PropTypes from 'prop-types'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, incrementLike, removeBlogOfId } from '../reducers/blogReducer'
import { pushNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import Notification from './Notification'

const Blog = ({ user, blog }) => {
  const [showDetail, setShowDetail] = useState(false)
  const dispatch = useDispatch()

  const toggleDetail = () => {
    setShowDetail(!showDetail)
  }

  const likeHandler = async () => {
    dispatch(incrementLike(blog))
  }

  const removeHandler = async () => {
    const confirmation = window.confirm(
      `Remove blog ${blog.title}${
        blog.author.length > 0 ? ` by ${blog.author}` : ''
      }?`
    )
    if (confirmation) {
      dispatch(removeBlogOfId(blog.id))
    }
  }

  const removable = blog.user.username === user.username

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <article style={blogStyle} className='blog'>
      <p style={{ margin: 0, display: 'inline' }}>
        {blog.title} - {blog.author}{' '}
      </p>
      {!showDetail && (
        <button
          type='button'
          className='viewButton'
          onClick={() => toggleDetail()}
        >
          view
        </button>
      )}
      {showDetail && (
        <button
          type='button'
          className='hideButton'
          onClick={() => toggleDetail()}
        >
          hide
        </button>
      )}
      {showDetail && (
        <div className='blogDetail'>
          <p style={{ margin: 0 }}>{blog.url}</p>
          <p style={{ margin: 0, display: 'inline' }}>likes: {blog.likes} </p>
          <button type='button' className='likeButton' onClick={likeHandler}>
            like
          </button>
          <p style={{ margin: 0 }}>{blog.user.name}</p>
          <button
            type='button'
            className='removeButton'
            onClick={removeHandler}
            disabled={!removable}
          >
            remove
          </button>
        </div>
      )}
    </article>
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
}

const BlogForm = forwardRef(({ user }, ref) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
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

    try {
      dispatch(createBlog({ title, author, url }, user))

      toggleVisibility()

      dispatch(
        pushNotification({
          isError: false,
          message: `Successfully added blog ${title}${
            author.length > 0 ? ` by ${author}` : ''
          }!`,
        })
      )
    } catch (error) {
      dispatch(
        pushNotification({ isError: true, message: 'Failed adding a blog' })
      )
    }
  }

  return (
    <div>
      <form
        ref={formRef}
        onSubmit={createBlogHandler}
        style={showWhenVisibleStyle}
      >
        <div>
          <label htmlFor='title'>title:</label>
          <input type='text' name='title' id='title' />
        </div>
        <div>
          <label htmlFor='author'>author:</label>
          <input type='text' name='author' id='author' />
        </div>
        <div>
          <label htmlFor='url'>url:</label>
          <input type='text' name='url' id='url' />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={() => toggleVisibility()}>
          cancel
        </button>
      </form>
      <button
        type='button'
        onClick={() => toggleVisibility()}
        style={hideWhenVisibleStyle}
      >
        new blog
      </button>
    </div>
  )
})
BlogForm.displayName = 'BlogForm'
BlogForm.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
}

const Blogs = ({ user, setUser }) => {
  const blogs = useSelector(({ blogs }) => blogs)
  console.log('blogs', blogs)
  const blogFormRef = useRef(null)

  const logoutHandler = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <BlogForm ref={blogFormRef} user={user}  />
      <p>{user.name} logged in.</p>
      <button onClick={() => logoutHandler()}>log out</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  )
}

Blogs.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
}

export { Blog, BlogForm, Blogs }
