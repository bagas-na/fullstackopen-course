import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  return (
    <tr className=''>
      <td>
        <Link to={user.id} className='hover:underline underline-offset-2'>{user.name}</Link>
      </td>
      <td className='text-center'>{user.blogs.length}</td>
    </tr>
  )
}
User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    username: PropTypes.string,
    blogs: PropTypes.arrayOf(
      PropTypes.shape({
        author: PropTypes.string,
        id: PropTypes.string,
        likes: PropTypes.number,
        url: PropTypes.string,
      })
    ),
  }),
}

const UserList = () => {
  const usersData = useSelector(({ users }) => users)

  return (
    <div>
      <table className='w-full max-w-xs'>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
