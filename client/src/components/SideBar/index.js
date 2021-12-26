import styles from './SideBar.module.css'

export default function SideBar ({ workspaces, activeIds }) {
  const [serverId, channelId] = activeIds
  const { title, Channels: channels } = workspaces[serverId]
  return (
    <aside>
      <div>{title}</div>
      <div>
        <h3>Channel List</h3>
        <menu>
          {channels.map(channel => {
            const { id, title } = channel
            if (id === channelId) {
              return <li key={'channel' + id} style={{ color: 'red' }}>{title}</li>
            }
            return <li key={'channel' + id}>{title}</li>
          })}
        </menu>
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
