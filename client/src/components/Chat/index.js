'use strict'

import styles from './Chat.module.css'
import { csrfFetch } from '../../store/csrf'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMessagesRequest, postMessageRequest } from '../../store/chat'

export default function Chat ({ channelId }) {
  const [loaded, setLoaded] = useState(false)
  const messageData = useSelector(state => state.chat)
  const dispatch = useDispatch()

  useEffect(() => {
    const getChatMessages = async (channelId) => {
      await dispatch(getMessagesRequest(channelId))
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
      <MessageEntryBox channelId={channelId} />
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

function MessageEntryBox ({ channelId }) {
  const webSocket = useRef(null)
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (!channelId) return

    const ws = new window.WebSocket('ws://localhost:5000')// process.env.REACT_APP_WS_URL)
    webSocket.current = ws

    ws.onopen = (e) => {
      console.log('socket open:', e)
    }
    ws.onmessage = (e) => {}
    ws.onerror = (e) => {}
    ws.onclose = (e) => {
      console.log('socket closed', e)
    }

    return function cleanup () {
      if (webSocket.current !== null) {
        webSocket.curent.close()
      }
    }
  }, [channelId])

  const handleSubmit = async e => {
    e.preventDefault()
    if (message.length) {
      // await dispatch(postMessageRequest(channelId, message))
      webSocket.current.send(JSON.stringify({ type: 'test-send', message }))
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='textarea' value={message} onChange={(e) => setMessage(e.target.value)} />
      <button>Submit message</button>
    </form>
  )
}
