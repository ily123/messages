'use strict'

import styles from './Chat.module.css'
import { csrfFetch } from '../../store/csrf'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMessagesRequest, postMessageRequest, addMessage } from '../../store/chat'

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
  return <h2 className={styles.channelTitle}>{title}</h2>
}

function MessageLog ({ messages, users }) {
  return (
    <div id='messageLog' className={styles.messageLog}>
      {messages.map(msg => {
        return <Message key={'message' + msg.id} content={msg.content} user={users[0]} />
      })}
    </div>
  )
}

function Message ({ content, user }) {
  return (
    <div className={styles.messageWrapper}>
      <div className={styles.messageControls}>
        <i class='fas fa-pen' />
        <i class='fas fa-trash' />
      </div>
      <p className={styles.message}><b>{user.username} said</b>: {content}</p>
    </div>
  )
}

function MessageEntryBox ({ channelId }) {
  // const webSocket = useRef(null)
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (!channelId) return

    let HOST
    console.log('HOST', HOST)
    if (process.env.NODE_ENV !== 'production') {
      HOST = 'ws://localhost:5000'
    } else {
      HOST = window.location.origin.replace(/^http/, 'ws')
    }
    const ws = new window.WebSocket(HOST)
    // const webSocket.current = ws

    ws.onopen = (e) => {
      console.log('socket open:', e)
      console.log('time OPEN is', new Date())
      ws.send(JSON.stringify({ type: 'test-send', chatId: channelId }))
    }
    ws.onmessage = (e) => {
      console.log('server sent someting over WS', e)
      const { type, message, user } = JSON.parse(e.data)
      if (type === 'test') {
        dispatch(addMessage(message, user))
      }
      console.log(message)
    }
    ws.onerror = (e) => {}
    ws.onclose = (e) => {
      console.log('socket closed', e)
      console.log('time CLOSED is', new Date())
    }

    return function cleanup () {
      if (ws != null) {
        ws.close()
      }
    }
    // return function cleanup () {
    //  if (webSocket.current != null) {
    //    webSocket.curent.close()
    //  }
    // }
  }, [channelId])

  const handleSubmit = async e => {
    e.preventDefault()
    if (message.length) {
      await dispatch(postMessageRequest(channelId, message))
      // webSocket.current.send(JSON.stringify({ type: 'test-send', chatId: 1 }))
      setMessage('')
      // this scrolls to the bottom of the chat log when new msg is added
      const chatlog = document.getElementById('messageLog')
      chatlog.scrollTop = chatlog.scrollHeight
    }
  }

  return (
    <form className={styles.messageEntryForm} onSubmit={handleSubmit}>
      <textarea type='text' value={message} onChange={(e) => setMessage(e.target.value)} />
      <button>Submit message</button>
    </form>
  )
}
