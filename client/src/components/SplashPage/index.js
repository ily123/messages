import styles from './index.module.css'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Image from './ImageLoader'
import { loginUser } from '../../store/session'

export default function SplashPage () {
  const sessionUser = useSelector(state => state.session)
  if (sessionUser) return <Navigate to='/main/server/' />
  return (
    <div className={styles.splashPage}>
      <HeroImage />
      <DemoLoginButton />
      <ProductDetails />
    </div>
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

function DemoLoginButton () {
  const dispatch = useDispatch()
  const loginDemoUser = async () => {
    await dispatch(loginUser('joseph', '12345'))
  }
  return (
    <div
      className={styles.demoLoginButton}
      onClick={loginDemoUser}
    >
      Login as Demo User
    </div>
  )
}

function ProductDetails () {
  const features = [
    {
      id: 1,
      title: 'LIVE CHAT',
      descripton: ['The WS library powers', 'lightning-fast instant messaging']
    }, {
      id: 2,
      title: 'WORK SPACES',
      descripton: ['Create an unlimited number of', 'workspaces & servers']
    }, {
      id: 3,
      title: 'CHANNELS',
      descripton: ['Customize your workspace with', 'topic-specific chat channels']
    }, {
      id: 4,
      title: 'DMs',
      descripton: ['Send direct messages to anyone', 'on the same server']
    }, {
      id: 5,
      title: 'HISTORY',
      descripton: ['All message history is accessible', 'in perpetuity without a paywall']
    }, {
      id: 6,
      title: 'FREE',
      descripton: ['All features are free, and you can', 'invest your $$ into NFTs']
    }
  ]
  return (
    <div className={styles.productDetailsWrapper}>
      <h2>
        Messages is a websocket-powered instant chat messenger
      </h2>
      <div className={styles.detailCardsGrid}>
        {features.map(item => <DetailsCard key={`item-${item.id}`} details={item} />)}
      </div>
    </div>
  )
}

function DetailsCard ({ details }) {
  const { title, descripton, id } = details
  return (
    <div className={styles.detailsCard}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <Image className={styles.cardImage} id={id} />
      <div className={styles.cardDescription}>
        {descripton.map((line, index) => <p key={index}>{line}</p>)}
      </div>
    </div>
  )
}
