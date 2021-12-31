import styles from './SideBar.module.css'
import { NavLink, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ModalPortal } from '../Modal'

export default function WorkSpaceDropDown ({ workspaces, serverId }) {
  const [isShown, setShown] = useState(false)
  const currentWorkspace = workspaces[serverId]

  const toggleShown = (_) => {
    setShown(!isShown)
  }

  const closeDropDown = (_) => {
    setShown(false)
  }

  useEffect(() => {
    if (isShown) {
      document.addEventListener('click', closeDropDown)
      return () => document.removeEventListener('click', closeDropDown)
    }
  }, [isShown])

  return (
    <div className={styles.workSpaceModal} onClick={(e) => e.stopPropagation()}>
      <div className={styles.currentWorkSpace} onClick={(e) => toggleShown(e)}>
        <span>{currentWorkspace.title}</span> <i className='fas fa-chevron-down' />
      </div>
      <div className={isShown ? styles.wsmShow : styles.wsmHide}>
        Your workspaces
        <menu>
          {Object.values(workspaces).map(server => {
            const { id, title, owner_id: ownerId } = server
            return (
              <li key={id} onClick={(e) => toggleShown(e)}>
                <NavLink to={`/main/server/${id}`}>{title}</NavLink>
              </li>
            )
          })}
        </menu>
        <div>
          <div>Join Workspace</div>
          <div>Create Workspace</div>
          <ServerSettings showParent={setShown} />
        </div>
      </div>
    </div>
  )
}

function ServerSettings ({ currentWorkspace, showParent }) {
  const [isHidden, setHidden] = useState(true)
  const handleModals = (_) => {
    showParent(false)
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
