import styles from './Chat.module.css'

export default function Chat () {
  return (
    <div className={styles.chatWrapper}>
      <Header />
      <MessageLog />
      <MessageEntryBox />
    </div>
  )
}

function Header () {
  return <h2>this is chat header</h2>
}

function MessageLog () {
  return (
    <div>
      {[1, 2, 3, 4, 5].map(item => {
        return <Message key={item} />
      })}
    </div>
  )
}

function Message () {
  return <p>this is a dummy message</p>
}

function MessageEntryBox () {
  return (
    <div>
      <input type='textarea' />
      <button>Submit message</button>
    </div>
  )
}
