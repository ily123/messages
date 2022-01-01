import { NavLink } from 'react-router-dom'

export default function ChannelList ({ data }) {
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
