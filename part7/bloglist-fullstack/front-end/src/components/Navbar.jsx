import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { logoutSession } from '../reducers/sessionReducer'

const Navbar = () => {
  const session = useSelector(({ session }) => session)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logoutSession())
    navigate('/login')
  }

  return (
    <nav
      style={{
        margin: '-0.5rem',
        padding: '0.5rem',
        backgroundColor: 'lightgray',
      }}
    >
      <ol style={{ display: 'inline-block', margin: 0, padding: 0 }}>
        <li
          style={{
            display: 'inline',
            listStyle: 'none',
            marginRight: '0.5rem',
          }}
        >
          <NavLink
            to='/'
            style={({ isActive }) => ({
              fontWeight: isActive ? 'bold' : 'normal',
            })}
          >
            blogs
          </NavLink>
        </li>
        <li
          style={{
            display: 'inline',
            listStyle: 'none',
            marginRight: '0.5rem',
          }}
        >
          <NavLink
            to='/users'
            style={({ isActive }) => ({
              fontWeight: isActive ? 'bold' : 'normal',
            })}
          >
            users
          </NavLink>
        </li>
      </ol>
      <div style={{ display: 'inline' }}>
        <p
          style={{
            display: 'inline',
            marginLeft: '0.5rem',
            marginRight: '0.5rem',
          }}
        >
          {session.name} logged in.
        </p>
        <button style={{ display: 'inline' }} onClick={() => logoutHandler()}>
          log out
        </button>
      </div>
    </nav>
  )
}

export default Navbar
