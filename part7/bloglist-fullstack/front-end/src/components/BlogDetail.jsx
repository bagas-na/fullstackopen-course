import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { addCommentOfBlog, incrementLike } from '../reducers/blogReducer'
import { Button } from './ui/button'

const CommentList = ({ comments }) => {
  return (
    <ul className='pl-6 py-2 space-y-1'>
      {comments.map((comment) => (
        <li key={comment} className='list-disc'>
          {comment}
        </li>
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
    <form onSubmit={submitHandler} className='pl-6 w-full max-w-md flex gap-2'>
      <input
        type='text'
        name='comment'
        id='comment'
        placeholder='write your comment here...'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className='w-80 px-2 py-1 shadow-inner border flex-auto'
      />
      <Button type='submit' size='sm'>
        add comment
      </Button>
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
      <h2 className='text-2xl'>
        {blog.title} by {blog.author}
      </h2>
      <div>
        <p className='text-xs italic hover:cursor-pointer'>{blog.url}</p>
        <div className='my-4 space-x-4'>
          <p className='inline'>{blog.likes} likes</p>
          <Button
            variant='outline'
            className='px-2 py-1 h-6'
            onClick={likeHandler}
          >
            Like
          </Button>
        </div>
        <p className='my-4'>
          added by{' '}
          <Link
            to={`/users/${blog.user.id}`}
            className='hover:underline underline-offset-2'
          >
            {blog.user.name}
          </Link>
        </p>
      </div>
      <h3 className='font-medium mb-2'>Comments:</h3>
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
