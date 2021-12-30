import styles from './SideBar.module.css'
import { useState, useEffect } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { AddServer, ServerOptions } from './Modals'

export default function SideBar ({ workspaces, activeIds }) {
  const [serverId, channelId] = activeIds
  const { Channels: channels } = workspaces[serverId]
  return (
    <aside>
      <div>
        <WorkSpaceModal />
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

function WorkSpaceModal () {
  const [isHidden, setHidden] = useState(true)

  const toggleModal = (_) => {
    if (isHidden) setHidden(false)
    else setHidden(true)
  }

  const closeModal = (e) => {
    let elementClickedOn = e.target
    // block state transition if user is clicking on the modal itself
    while (elementClickedOn) {
      if (elementClickedOn.className?.includes(styles.workSpaceModal)) {
        return
      }
      elementClickedOn = elementClickedOn.parentNode
    }
    setHidden(true)
  }

  useEffect(() => {
    if (!isHidden) {
      document.addEventListener('click', closeModal)
      return () => document.removeEventListener('click', closeModal)
    }
  }, [isHidden])

  return (
    <div className={styles.workSpaceModal}>
      <div onClick={(e) => toggleModal(e)} className={styles.currentWorkSpace}>
        <span>IT CORP CO</span> <i className='fas fa-chevron-down' />
      </div>
      <div className={isHidden ? styles.wsmHide : styles.wsmShow}>
        Go to workspace
        <menu>
          <li> server 1 </li>
          <li> server 1 </li>
          <li> server 1 </li>
          <li> server 2 </li>
          <li> server 2 </li>
          <li> server 2 </li>
        </menu>
        <div>
          <div>Join Workspace</div>
          <div>Create Workspace</div>
          <div>Leave IT CORP CO</div>
        </div>
      </div>
    </div>
  )
}

function WorkspaceList ({ workspaces, serverId }) {
  const userId = 1
  return (
    <menu>
      {Object.values(workspaces).map(server => {
        const { id, title, owner_id: ownerId } = server
        return (
          <li key={id}>
            <NavLink to={`/main/server/${id}`}>{id === Number(serverId) ? '>> ' + title : title}</NavLink>
            {ownerId === userId && <ServerOptions serverId={id} />}
          </li>
        )
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
