import styles from './MainScreen.module.css'
import modalStyles from '../SideBar/Modals.module.css'
import { ReactComponent as AddServerImage } from './undraw_sorting_thoughts_re_fgli.svg'
import { Link, useParams } from 'react-router-dom'
import NavBar from '../NavBar'
import SideBar from '../SideBar'
import Chat from '../Chat'
import { useEffect, useLayoutEffect, useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SidebarToggleContextProvider, { SideBarToggleContext } from '../../context/SideBarToggle'

import {
  postServerRequest,
  loadWorkspaces
} from '../../store/workspace'

export default function MainScreen () {
  let { serverId, channelId } = useParams()
  const [isLoaded, setLoaded] = useState(false)
  const [windowSize, setWindowSize] = useState(window.innerWidth)
  const dispatch = useDispatch()
  const workspaces = useSelector(state => state.workspaces)
  console.log(windowSize)
  useLayoutEffect(() => {
    const updateWindowSize = (_) => setWindowSize(window.innerWidth)
    window.addEventListener('resize', updateWindowSize)
    return () => window.removeEventListener('resize', updateWindowSize)
  }, [dispatch])

  // fetch metadata for user's workspaces and channels
  useEffect(() => {
    const loadWorkspaces_ = async () => {
      const isLoaded = await dispatch(loadWorkspaces())
      setLoaded(isLoaded)
    }
    loadWorkspaces_()
  }, [dispatch])

  if (!isLoaded) return <div style={{ backgroundColor: 'blue' }}>...LOADING...</div>
  if (isLoaded && !Object.keys(workspaces).length) {
    return <WelcomeScreen />
  }

  // if server & channel ids are not found in the URL,
  // or if the serverId is not found in workspace store,
  // grab the first ones from the store
  // and what if there are no servers in the store?... TODO
  if (!serverId) serverId = Object.values(workspaces)[0].id
  if (!Object.keys(workspaces).includes(serverId)) serverId = Object.values(workspaces)[0].id
  // if channel id that is being requested does NOT exist, reroute to first channel on server
  if (!workspaces[serverId].Channels.map(ch => Number(ch.id)).includes(+channelId)) {
    channelId = workspaces[serverId].Channels[0].id
  }
  if (!channelId) channelId = workspaces[serverId].Channels[0].id

  const currentWorkspace = workspaces[serverId]
  return (
    <>
      <div className={styles.appWrapper}>
        <NavBar />
        <div className={styles.wrapper}>
          <SidebarToggleContextProvider>
            <SideBar workspaces={workspaces} activeIds={[serverId, channelId]} windowSize={windowSize} />
            <Chat channelId={channelId} />
            <MainScreenBlur />
          </SidebarToggleContextProvider>
        </div>
      </div>
    </>
  )
}

// blurs screen in mobile mode, when sidebar is toggled
function MainScreenBlur () {
  const { isSideBarToggled, toggleSideBar } = useContext(SideBarToggleContext)
  return (
    <div
      className={`${styles.blurBackground} ${isSideBarToggled ? styles.isShown : styles.isHidden}`}
      onClick={(_) => toggleSideBar(prev => !prev)}
    />
  )
}

// display if user has no servers
function WelcomeScreen () {
  return (
    <div className={styles.appWrapper}>
      <NavBar />
      <CreateNewServer />
    </div>
  )
}

function CreateNewServer () {
  const [title, setTitle] = useState('')
  const [isTitleInvalid, setIsTitleInvalid] = useState(false)
  const [isPosted, setIsPosted] = useState(false)
  const [newServerId, setNewServerId] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    setIsTitleInvalid(!title.length)
    setIsPosted(false)
  }, [title])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!isTitleInvalid) {
      const { server } = await dispatch(postServerRequest(title))
      await dispatch(loadWorkspaces()) // this needs to be fixed
      setNewServerId(server.id)
      setIsPosted(true)
    }
  }

  return (
    <div className={styles.createNewServerwrapper}>
      <div className={modalStyles.server}>
        <h3>Looks like you don't have any workspaces!<br />Add a workspace using the form below!</h3>
        <p className={isTitleInvalid ? modalStyles.fail : modalStyles.pass}>Server title: must be at least 1 char</p>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='enter new server name...' value={title} onChange={(e) => setTitle(e.target.value)} />
          <button>Submit!</button>
        </form>
        <p className={isPosted ? modalStyles.reveal : modalStyles.hidden}>
          Added new workspace!<br />
          <span>
            <Link
              to={newServerId ? `/main/server/${newServerId}` : '/main/server/'}
            >Navigate there!
            </Link>
          </span>
        </p>
      </div>
      <AddServerImage className={styles.TEST} />
    </div>
  )
}
