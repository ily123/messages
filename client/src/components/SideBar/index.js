import { useContext } from 'react'
import { SideBarToggleContext } from '../../context/SideBarToggle'
import styles from './SideBar.module.css'
import WorkSpaceDropDown from './WorkSpaceDropdown'
import ChannelList from './ChannelList'

export default function SideBar ({ workspaces, activeIds, windowSize }) {
  const [serverId, channelId] = activeIds
  const { Channels: channels } = workspaces[serverId]
  const { isSideBarToggled, toggleSideBar } = useContext(SideBarToggleContext)

  let sideBarClasses = ''
  if (windowSize > 600) {
    toggleSideBar(false)
    sideBarClasses = ''
  } else if (windowSize <= 600 && isSideBarToggled) {
    sideBarClasses = styles.sideBarToggledOpen
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
