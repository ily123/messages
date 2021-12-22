import styles from './Chat.module.css'

export default function Chat () {
  return (
    <div className={styles.chatWrapper}>
      <Header />
    </div>
  )
}

function Header () {
  return <h2>this is chat header</h2>
}
