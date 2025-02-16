import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <ol style={{ margin: 0, padding: 0 }}>
        <li style={{ display: 'inline', listStyle: 'none', marginRight: '0.5rem' }}>
          <Link to='/'>blogs</Link>
        </li>
        <li style={{ display: 'inline', listStyle: 'none', marginRight: '0.5rem' }}>
          <Link to='/users'>users</Link>
        </li>
      </ol>
    </nav>
  )
}

export default Navbar
