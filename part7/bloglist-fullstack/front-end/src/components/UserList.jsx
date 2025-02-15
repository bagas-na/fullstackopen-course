import PropTypes from 'prop-types'

const User = ({ user }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.blogs}</td>
    </tr>
  )
}
User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    blogs: PropTypes.number
  })
}

const data = [
  { name: 'Arto Hellas', blogs: 6 },
  { name: 'Matti Luukkainen', blogs: 0 },
  { name: 'Venla Ruuska', blogs: 0 },
]

const UserList = () => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <User key={user.name} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
