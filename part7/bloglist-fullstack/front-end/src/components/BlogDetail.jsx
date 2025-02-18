import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
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
      <h3>added blogs:</h3>
      <div>
        <p style={{ margin: 0 }}>{blog.url}</p>
        <div>
          <p style={{ margin: 0, display: 'inline' }}>{blog.likes} likes</p>
          <button style={{ margin: 6 }} onClick={likeHandler}>like</button>
        </div>
        <p style={{ margin: 0 }}>added by {blog.user.name}</p>
      </div>
    </div>
  )
}

export default BlogDetail
