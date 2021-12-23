import styles from './MainScreen.module.css'
import NavBar from '../NavBar'
import SideBar from '../SideBar'
import Chat from '../Chat'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { csrfFetch } from '../../store/csrf'

export default function MainScreen () {
  const { serverId } = useParams()
  const [loaded, setLoaded] = useState(false)

  useEffect(async () => {
    const response = await csrfFetch('/api/channel/1')
    const data = await response.json()
    setLoaded(true)
    console.log('😃', data)
  }, [serverId])
  console.log(serverId)

  if (!loaded) return <div style={{ backgroundColor: 'blue' }}>...LOADING...</div>
  return (
    <div>
      <NavBar />
      <div className={styles.wrapper}>
        <SideBar />
        <Chat />
      </div>
    </div>
  )
}
