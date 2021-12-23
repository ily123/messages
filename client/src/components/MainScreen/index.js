import styles from './MainScreen.module.css'
import NavBar from '../NavBar'
import SideBar from '../SideBar'
import Chat from '../Chat'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { csrfFetch } from '../../store/csrf'

export default function MainScreen () {
  const { serverId, optionalChannelId } = useParams()
  const [loaded, setLoaded] = useState(false)
  const [serverData, setServerData] = useState(null)
  const [messages, setMessages] = useState(null)
  const [channelId, setChannelId] = useState(optionalChannelId)

  useEffect(() => {
    const getServerData = async () => {
      const response = await csrfFetch(`/api/server/${serverId}`)
      const data = await response.json()
      setServerData(data)
      if (!channelId) {
        // if channel id wasn't provided in the URL, set it to 1st channel on the server
        setChannelId(data.Channels[0].id)
      }
      // setLoaded(true)
    }
    getServerData()
  }, [serverId])

  useEffect(() => {
    const getChatMessages = async (channelId) => {
      const response = await csrfFetch(`/api/channel/${channelId}`)
      const data = await response.json()
      setMessages(data)
      setLoaded(true)
    }
    if (channelId) getChatMessages(channelId)
  }, [channelId])

  if (!loaded) return <div style={{ backgroundColor: 'blue' }}>...LOADING...</div>
  console.log('😀', serverData)
  console.log('this is the channel id', channelId)
  console.log('these are teh messages in the channel', messages)
  return (
    <div>
      <NavBar />
      <div className={styles.wrapper}>
        <SideBar serverData={serverData} />
        <Chat messageData={messages} />
      </div>
    </div>
  )
}
