import styles from './index.module.css'
import SignupForm from '../SignUpForm'
import LoginForm from '../LoginForm'
import { NavLink } from 'react-router-dom'

export default function SplashPage () {
  console.log(styles)
  return (
    <div className={styles.splashPage}>
      <SplashNavBar />
      <HeroImage />
    </div>
  )
}

function SplashNavBar () {
  return (
    <nav>
      <div>LOGO?</div>
      <div className={styles.navLinks}>
        <NavLink to='/login'>Log in</NavLink>
        <NavLink to='/signup'>Sign up</NavLink>
      </div>
    </nav>
  )
}

function HeroImage () {
  return (
    <div className={styles.heroImage}>
      <div className={styles.centerLogo} />
      <h1>Messages by Ilya</h1>
      <h2>when Telegram, Slack, LINE, Viber, Discord, and ICQ aren't enough </h2>
    </div>
  )
}
