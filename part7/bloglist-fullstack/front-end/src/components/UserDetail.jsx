import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}
            {blog.author && ` -- ${blog.author}`}
          </Link>
        </li>
      ))}
    </ul>
  )
}
BlogList.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string,
    })
  ),
}

const UserDetail = () => {
  const params = useParams()
  const user = useSelector(({ users }) =>
    users.find((user) => user.id === params.id)
  )

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs:</h3>
      {user.blogs.length > 0
        ? <BlogList blogs={user.blogs} />
        :<p>This user has not added any blogs</p>
      }
    </div>
  )
}

export default UserDetail
