import styles from './SideBar.module.css'
import { NavLink } from 'react-router-dom'
import WorkSpaceDropDown from './WorkSpaceDropdown'

export default function SideBar ({ workspaces, activeIds }) {
  const [serverId, channelId] = activeIds
  const { Channels: channels } = workspaces[serverId]
  return (
    <aside>
      <div>
        <WorkSpaceDropDown workspaces={workspaces} serverId={serverId} />
      </div>
      <div className={styles.channelList}>
        <h3>Channels</h3>
        <ChannelList data={{ channels, serverId, channelId }} />
      </div>
    </aside>
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
