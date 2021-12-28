import styles from './SideBar.module.css'
import { NavLink, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadWorkspaces, postServerRequest } from '../../store/workspace'

export default function SideBar ({ workspaces, activeIds }) {
  const [serverId, channelId] = activeIds
  const { Channels: channels } = workspaces[serverId]
  return (
    <aside>
      <div>
        <h3>Server List</h3>
        <WorkspaceList workspaces={workspaces} serverId={serverId} />
        <AddServer />
      </div>
      <div>
        <h3>Channel List</h3>
        <ChannelList data={{ channels, serverId, channelId }} />
      </div>
      <div>
        <h3>Direct Messages</h3>
        <menu>
          <li>Bobby Marks</li>
          <li>Mark Robertson</li>
        </menu>
      </div>
    </aside>
  )
}

function AddServer () {
  const [title, setTitle] = useState('')
  const [isTitleInvalid, setIsTitleInvalid] = useState(false)
  const [isPosted, setIsPosted] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setIsTitleInvalid(!title.length)
  }, [title])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!isTitleInvalid) {
      await dispatch(postServerRequest(title))
      await dispatch(loadWorkspaces()) // this needs to be fixed
      setIsPosted(true)
    }
  }

  // if (isPosted) return <Navigate to='/main/server' />

  return (
    <Modal>
      <h3>modal content</h3>
      {isTitleInvalid && <p>Enter server title!</p>}
      {isPosted && <p>Added new server!</p>}
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='enter new server name...' value={title} onChange={(e) => setTitle(e.target.value)} />
        <button>submit</button>
      </form>
    </Modal>
  )
}

// https://www.digitalocean.com/community/tutorials/react-modal-component
function Modal ({ children }) {
  const [isHidden, setHidden] = useState(true)
  return (
    <>
      <div className={isHidden ? styles.modalHide : styles.modalShow}>
        {children}
        <button onClick={(e) => setHidden(true)}>Close Modal</button>
      </div>
      <button onClick={(e) => setHidden(false)}>NEW SERVER</button>
    </>
  )
}

function WorkspaceList ({ workspaces, serverId }) {
  return (
    <menu>
      {Object.values(workspaces).map(server => {
        const { id, title } = server
        return <li key={id}><NavLink to={`/main/server/${id}`}>{id === Number(serverId) ? '>> ' + title : title}</NavLink></li>
      })}
    </menu>
  )
}
function ChannelList ({ data }) {
  const { channels, serverId, channelId } = data
  return (
    <menu>
      {channels.map(channel => {
        const { id, title } = channel
        return (
          <li key={'channel' + id}>
            <NavLink to={`/main/server/${serverId}/channel/${id}`}>
              {Number(channelId) === id ? '>> ' + title : title}
            </NavLink>
          </li>
        )
      })}
    </menu>
  )
}
