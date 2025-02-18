import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserDetail = () => {
  const params = useParams()
  const user = useSelector(({ users }) => users.find(user => user.id === params.id))

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs:</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}{blog.author && ` -- ${blog.author}`}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserDetail
