import styles from './index.module.css'
import { NavLink } from 'react-router-dom'
import Image from './ImageLoader'

export default function SplashPage () {
  console.log(styles)
  return (
    <div className={styles.splashPage}>
      <HeroImage />
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

function ProductDetails () {
  const features = [
    {
      id: 1,
      title: 'LIVE CHAT',
      descripton: 'The WS library powers lightning-fast instant messaging'
    }, {
      id: 2,
      title: 'WORK SPACES',
      descripton: 'Create an unlimited number of workspaces & servers'
    }, {
      id: 3,
      title: 'CHANNELS',
      descripton: 'Customize your workspace with topic-specific chat channels'
    }, {
      id: 4,
      title: 'DMs',
      descripton: 'Send direct messages to anyone on the same server'
    }, {
      id: 5,
      title: 'HISTORY',
      descripton: 'All message history is accessible in perpetuity without a paywall'
    }, {
      id: 6,
      title: 'FREE',
      descripton: 'All features are free, and you can invest you skrilla into NFTs'
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
      <div className={styles.cardDescription}>{descripton}</div>
    </div>
  )
}
