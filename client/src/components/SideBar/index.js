import styles from './SideBar.module.css'
import WorkSpaceDropDown from './WorkSpaceDropdown'
import ChannelList from './ChannelList'

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
