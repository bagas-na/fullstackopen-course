import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { addCommentOfBlog, incrementLike } from '../reducers/blogReducer'

const CommentList = ({ comments }) => {
  return (
    <ul style={{ margin: 0 }}>
      {comments.map((comment) => (
        <li key={comment}>{comment}</li>
      ))}
    </ul>
  )
}
CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.string.isRequired),
}

const CommentForm = () => {
  const params = useParams()
  const blog = useSelector(({ blogs }) =>
    blogs.find((blog) => blog.id === params.id)
  )
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(addCommentOfBlog(blog, comment))
    setComment('')
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        type='text'
        name='comment'
        id='comment'
        placeholder='write your comment here...'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type='submit'>add comment</button>
    </form>
  )
}

const BlogDetail = () => {
  const params = useParams()
  const blog = useSelector(({ blogs }) =>
    blogs.find((blog) => blog.id === params.id)
  )
  const dispatch = useDispatch()

  const likeHandler = async () => {
    dispatch(incrementLike(blog))
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div>
        <p style={{ margin: 0 }}>{blog.url}</p>
        <div>
          <p style={{ margin: 0, display: 'inline' }}>{blog.likes} likes</p>
          <button style={{ margin: 6 }} onClick={likeHandler}>
            like
          </button>
        </div>
        <p style={{ margin: 0 }}>
          added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
        </p>
      </div>
      <h3 style={{ marginBottom: '0.5rem' }}>comments:</h3>
      <CommentForm />
      {blog.comments.length > 0 ? (
        <CommentList comments={blog.comments} />
      ) : (
        <p>No comments has been added</p>
      )}
    </div>
  )
}

export default BlogDetail
