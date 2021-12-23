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
  const [serverData, setServerData] = useState(null)

  useEffect(() => {
    const getServerData = async () => {
      const response = await csrfFetch(`/api/server/${serverId}`)
      const data = await response.json()
      setServerData(data)
      setLoaded(true)
    }
    getServerData()
  }, [serverId])

  if (!loaded) return <div style={{ backgroundColor: 'blue' }}>...LOADING...</div>
  console.log('😀', serverData)
  return (
    <div>
      <NavBar />
      <div className={styles.wrapper}>
        <SideBar serverData={serverData} />
        <Chat />
      </div>
    </div>
  )
}
