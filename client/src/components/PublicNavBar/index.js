import styles from './index.module.css'
import { NavLink } from 'react-router-dom'

export default function PublicNavBar () {
  return (
    <nav className={styles.publicNav}>
      <NavLink to='/'>Home</NavLink>
      <div className={styles.navLinks}>
        <NavLink to='/login'>Log in</NavLink>
        <NavLink to='/signup'>Sign up</NavLink>
      </div>
    </nav>
  )
}
