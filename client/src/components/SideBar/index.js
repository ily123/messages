import styles from './SideBar.module.css'

export default function SideBar ({ serverData }) {
  const { title, Channels: channels } = serverData
  return (
    <aside>
      <div>{title}</div>
      <div>
        <h3>Channel List</h3>
        <menu>
          {channels.map(channel => {
            const { id, title } = channel
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
