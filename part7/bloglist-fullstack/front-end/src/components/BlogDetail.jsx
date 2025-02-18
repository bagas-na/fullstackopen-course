import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { incrementLike } from '../reducers/blogReducer'

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
          <button style={{ margin: 6 }} onClick={likeHandler}>like</button>
        </div>
        <p style={{ margin: 0 }}>added by <Link to={`/users/${blog.user.id}`} >{blog.user.name}</Link></p>
      </div>
      <h3 style={{ marginBottom: '0.5rem' }}>comments:</h3>
      {blog.comments.length > 0 ? (
        <ul style={{ margin: 0 }}>{blog.comments.map(comment => <li key={comment}>{comment}</li>)}</ul>
      ): <p>No comments has been added</p>}
    </div>
  )
}

export default BlogDetail
