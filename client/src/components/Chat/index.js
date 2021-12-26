'use strict'

import styles from './Chat.module.css'
import { csrfFetch } from '../../store/csrf'
import { useState, useEffect } from 'react'

export default function Chat ({ channelId }) {
  const [messageData, setMessageData] = useState(null)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const getChatMessages = async (channelId) => {
      const response = await csrfFetch(`/api/channel/${channelId}`)
      const data = await response.json()
      setMessageData(data)
      setLoaded(true)
    }
    getChatMessages(channelId)
  }, [channelId])
  if (!loaded) return <div style={{ backgroundColor: 'red' }}>Loading chat messages!</div>
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
