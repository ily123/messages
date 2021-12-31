import styles from './SideBar.module.css'
import { useState, useEffect } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { AddServer, ServerOptions } from './Modals'
import { useDispatch, useSelector } from 'react-redux'
import { setServerSettingsShow, setWorkSpaceModalVisibility } from '../../store/interface'
import { ModalPortal } from '../Modal'

export default function SideBar ({ workspaces, activeIds }) {
  const [serverId, channelId] = activeIds
  const { Channels: channels } = workspaces[serverId]
  return (
    <aside>
      <div>
        <WorkSpaceModal workspaces={workspaces} serverId={serverId} />
      </div>
      <div className={styles.channelList}>
        <h3>Channels</h3>
        <ChannelList data={{ channels, serverId, channelId }} />
      </div>
    </aside>
  )
}
// <div>
//  <AddServer />
// </div>

function WorkSpaceModal ({ workspaces, serverId }) {
  const dispatch = useDispatch()
  const { isShown } = useSelector(state => state.interface.workSpaceModal)
  const currentWorkspace = workspaces[serverId]
  console.log(currentWorkspace)
  console.log('CURRENT TOGGLE WSM', isShown)
  const toggleModal = (_) => {
    dispatch(setWorkSpaceModalVisibility(!isShown))
  }

  const hardClose = (_) => {
    console.log('trying to close')
    dispatch(setWorkSpaceModalVisibility(false))
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
    dispatch(setWorkSpaceModalVisibility(false))
  }

  useEffect(() => {
    if (isShown) {
      document.addEventListener('click', closeModal)
      return () => document.removeEventListener('click', closeModal)
    }
  }, [isShown])

  return (
    <div className={styles.workSpaceModal}>
      <div onClick={(e) => toggleModal(e)} className={styles.currentWorkSpace}>
        <span>{currentWorkspace.title}</span> <i className='fas fa-chevron-down' />
      </div>
      <div className={isShown ? styles.wsmShow : styles.wsmHide}>
        Your workspaces
        <menu>
          {Object.values(workspaces).map(server => {
            const { id, title, owner_id: ownerId } = server
            return (
              <li key={id} onClick={(e) => toggleModal(e)}>
                <NavLink to={`/main/server/${id}`}>{title}</NavLink>
              </li>
            )
          })}
        </menu>
        <div>
          <div>Join Workspace</div>
          <div>Create Workspace</div>
          <ServerSettingsButton hideParent={hardClose} />
        </div>
      </div>
    </div>
  )
}

function ServerSettingsButton ({ currentWorkspace, hideParent }) {
  const [isHidden, setHidden] = useState(true)
  const handleModals = (_) => {
    hideParent(true)
    setHidden(false)
  }
  return (
    <>
      <div
        className={styles.deleteServerButton}
        onClick={(e) => handleModals(e)}
      >
        Workspace Settings
      </div>
      <ModalPortal isHidden={isHidden} setHidden={setHidden}>SHOW THIS</ModalPortal>
    </>
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
