import { Link as NavigationLinkRadix } from '@radix-ui/react-navigation-menu'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logoutSession } from '../reducers/sessionReducer'
import { Button } from './ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu'

// const Barr = () => {
//   const session = useSelector(({ session }) => session)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const logoutHandler = () => {
//     dispatch(logoutSession())
//     navigate('/login')
//   }

//   return (
//     <nav
//       style={{
//         margin: '-0.5rem',
//         padding: '0.5rem',
//         backgroundColor: 'lightgray',
//       }}
//     >
//       <ol style={{ display: 'inline-block', margin: 0, padding: 0 }}>
//         <li
//           style={{
//             display: 'inline',
//             listStyle: 'none',
//             marginRight: '0.5rem',
//           }}
//         >
//           <NavLink
//             to='/'
//             style={({ isActive }) => ({
//               fontWeight: isActive ? 'bold' : 'normal',
//             })}
//           >
//             blogs
//           </NavLink>
//         </li>
//         <li
//           style={{
//             display: 'inline',
//             listStyle: 'none',
//             marginRight: '0.5rem',
//           }}
//         >
//           <NavLink
//             to='/users'
//             style={({ isActive }) => ({
//               fontWeight: isActive ? 'bold' : 'normal',
//             })}
//           >
//             users
//           </NavLink>
//         </li>
//       </ol>
//       <div style={{ display: 'inline' }}>
//         <p
//           style={{
//             display: 'inline',
//             marginLeft: '0.5rem',
//             marginRight: '0.5rem',
//           }}
//         >
//           {session.name} logged in.
//         </p>
//         <button style={{ display: 'inline' }} onClick={() => logoutHandler()}>
//           log out
//         </button>
//       </div>
//     </nav>
//   )
// }

const links = [
  { path: '/', text: 'Blogs' },
  { path: '/users', text: 'Users' },
]

const NavMenuLink = ({ link, ...props }) => {
  const pathname = useLocation().pathname
  console.log('pathname', pathname)
  const isActive = link.path === pathname

  return (
    <NavigationLinkRadix asChild active={isActive}>
      <Link to={link.path} className='NavigationMenuLink' {...props}>
        <Button
          variant='ghost'
          className={isActive ? 'font-medium' : 'font-normal'}
        >
          {link.text}
        </Button>
      </Link>
    </NavigationLinkRadix>
  )
}

const NavItem = ({ link }) => {
  return (
    <NavigationMenuItem>
      <NavMenuLink link = {link}></NavMenuLink>
    </NavigationMenuItem>
  )
}

const Navbar = () => {
  const session = useSelector(({ session }) => session)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logoutSession())
    navigate('/login')
  }

  return (
    <div className='max-w-full w-full g-zinc-800 fixed shadow-md'>
      <NavigationMenu className='max-w-4xl w-full mx-auto justify-between'>
        <NavigationMenuList>
          {links.map((link) => (
            <NavItem key={link.path} link={link} />
          ))}
        </NavigationMenuList>
        <div>
          {session.name} logged in.
          <Button variant='link' className='font-normal' onClick={logoutHandler}>
            Log Out
          </Button>
        </div>
      </NavigationMenu>
    </div>
  )
}

export default Navbar
