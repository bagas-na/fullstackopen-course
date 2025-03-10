import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { incrementLike, removeBlogOfId } from '../reducers/blogReducer'

const Blog = ({ session, blog }) => {
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

  const removable = blog.user.username === session.username

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (session.username === null || session.name === null) {
    return null
  }

  return (
    <article className='p-1 border border-solid shadow-sm'>
      <p className='m-0 inline'>
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
          <p className='m-0 inline'>likes: {blog.likes} </p>
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
  session: PropTypes.shape({
    username: PropTypes.string,
    name: PropTypes.string,
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

const BlogLink = ({ blog }) => {
  const style = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div className='py-1.5 px-3 border border-solid shadow-sm'>
      <p className='m-0 inline text-sm'>
        <Link to={`/blogs/${blog.id}`} className='hover:underline underline-offset-2'>
          {blog.title} - {blog.author}{' '}
        </Link>
      </p>
    </div>
  )
}
BlogLink.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    user: PropTypes.object.isRequired,
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
  }).isRequired,
}

const BlogList = () => {
  const session = useSelector(({ session }) => session)
  const blogs = useSelector(({ blogs }) => blogs)

  const sortedBlogs = useMemo(
    () => [...blogs].sort((a, b) => b.likes - a.likes),
    [blogs]
  )

  return (
    <div className='space-y-2'>
      {sortedBlogs.map((blog) => (
        <BlogLink key={blog.id} blog={blog} session={session} />
      ))}
    </div>
  )
}

export default BlogList
