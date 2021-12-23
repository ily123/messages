import styles from './Chat.module.css'

export default function Chat ({ messageData }) {
  const { Messages: messages, Users: users } = messageData
  return (
    <div className={styles.chatWrapper}>
      <Header title={messageData.title} />
      <MessageLog messages={messages} users={users} />
      <MessageEntryBox />
    </div>
  )
}

function Header ({ title }) {
  return <h2>{title}</h2>
}

function MessageLog ({ messages, users }) {
  return (
    <div>
      {messages.map(msg => {
        return <Message key={'message' + msg.id} content={msg.content} user={users[0]} />
      })}
    </div>
  )
}

function Message ({ content, user }) {
  return <p><b>{user.username} said</b>: {content}</p>
}

function MessageEntryBox () {
  return (
    <div>
      <input type='textarea' />
      <button>Submit message</button>
    </div>
  )
}
