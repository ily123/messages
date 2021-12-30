import styles from './MainScreen.module.css'
import NavBar from '../NavBar'
import SideBar from '../SideBar'
import Chat from '../Chat'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadWorkspaces } from '../../store/workspace'

export default function MainScreen () {
  let { serverId, channelId } = useParams()
  const [isLoaded, setLoaded] = useState(false)
  const dispatch = useDispatch()
  const workspaces = useSelector(state => state.workspaces)

  // fetch metadata for user's workspaces and channels
  useEffect(() => {
    const loadWorkspaces_ = async () => {
      const isLoaded = await dispatch(loadWorkspaces())
      setLoaded(isLoaded)
    }
    loadWorkspaces_()
  }, [dispatch])

  if (!isLoaded) return <div style={{ backgroundColor: 'blue' }}>...LOADING...</div>

  // if server & channel ids are not found in the URL, grab the first ones from the store
  if (!serverId) serverId = Object.values(workspaces)[0].id
  if (!channelId) channelId = workspaces[serverId].Channels[0].id
  console.log('🔴', serverId)
  console.log('🔴', channelId)

  return (
    <div className={styles.appWrapper}>
      <NavBar />
      <div className={styles.wrapper}>
        <SideBar workspaces={workspaces} activeIds={[serverId, channelId]} />
        <Chat channelId={channelId} />
      </div>
    </div>
  )
}
