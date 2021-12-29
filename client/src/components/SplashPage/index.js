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
      <ProductDetails />
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

function ProductDetails () {
  const f = {
    id: 1,
    title: 'FREE',
    descripton: 'All features free, and you can invest the extra skrilla into NFTs'
  }
  const x = [f, f, f, f, f, f]
  return (
    <div className={styles.productDetailsWrapper}>
      <h2>
        Messages is a websocket-powered instant chat messenger
      </h2>
      <div className={styles.detailCardsGrid}>
        {x.map(item => <DetailsCard key={`item-${item.id}`} details={item} />)}
      </div>
    </div>
  )
}

function DetailsCard ({ details }) {
  const { title, descripton } = details
  return (
    <div className={styles.detailsCard}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <div className={styles.cardImage} />
      <div className={styles.cardDescription}>{descripton}</div>
    </div>
  )
}
