import styles from './SideBar.module.css'
import WorkSpaceDropDown from './WorkSpaceDropdown'
import ChannelList from './ChannelList'

export default function SideBar ({ workspaces, activeIds, windowSize }) {
  const [serverId, channelId] = activeIds
  const { Channels: channels } = workspaces[serverId]

  const toggleSideBar = true
  let sideBarClasses = ''
  if (windowSize > 600) {
    sideBarClasses = ''
  } else if (windowSize <= 600 && toggleSideBar) {
    sideBarClasses = '.toggleSideBarOpen'
  }

  return (
    <aside className={sideBarClasses}>
      <div>
        <WorkSpaceDropDown workspaces={workspaces} serverId={serverId} />
      </div>
      <div className={styles.channelList}>
        <h3>Channels</h3>
        <ChannelList data={{ channels, serverId, channelId, workspaces }} />
      </div>
    </aside>
  )
}
