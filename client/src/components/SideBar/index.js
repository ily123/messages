import styles from './SideBar.module.css'
import { NavLink } from 'react-router-dom'

export default function SideBar ({ workspaces, activeIds }) {
  const [serverId, channelId] = activeIds
  const { Channels: channels } = workspaces[serverId]
  return (
    <aside>
      <div>
        <h3>Server List</h3>
        <WorkspaceList workspaces={workspaces} serverId={serverId} />
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
