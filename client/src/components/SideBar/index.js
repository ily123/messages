import styles from './SideBar.module.css'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

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

// https://www.digitalocean.com/community/tutorials/react-modal-component
function AddServer () {
  const [isHidden, setHidden] = useState(false)
  return (
    <>
      <div className={isHidden ? styles.modalHide : styles.modalShow}>
        <h3>modal content</h3>
        <button onClick={(e) => setHidden(false)}>Close Modal</button>
      </div>
      <button onClick={(e) => setHidden(true)}>NEW SERVER</button>
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
