import styles from './SideBar.module.css'
import modalStyles from './Modals.module.css'
import { NavLink, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadWorkspaces, postServerRequest, deleteServerRequest, patchServerRequest } from '../../store/workspace'
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
          <ServerSettings workspace={currentWorkspace} showParent={setShown} />
        </div>
      </div>
    </div>
  )
}

function ServerSettings ({ workspace, showParent }) {
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
      <ModalPortal isHidden={isHidden} setHidden={setHidden}>
        <ServerSettingsContent workspace={workspace} />
      </ModalPortal>
    </>
  )
}

function ServerSettingsContent ({ workspace }) {
  const { id: serverId, title: serverTitle } = workspace
  const [title, setTitle] = useState('')
  const [isTitleInvalid, setIsTitleInvalid] = useState(false)
  const [deleteTrue, setDeleteTrue] = useState(false)
  const [isPosted, setIsPosted] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setTitle(serverTitle)
    setDeleteTrue(false)
  }, [serverTitle])
  useEffect(() => {
    setIsTitleInvalid(!title.length)
  }, [title])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!isTitleInvalid) {
      await dispatch(patchServerRequest(serverId, title))
      setIsPosted(true)
    }
  }

  const handleDelete = async e => {
    await dispatch(deleteServerRequest(serverId))
  }

  // if (isPosted) return <Navigate to='/main/server' />
  return (
    <div className={modalStyles.server}>
      <h3>Workspace Settings</h3>
      <p className={isTitleInvalid ? modalStyles.fail : modalStyles.pass}>Edit title: must be at least 1 char</p>
      <form onSubmit={handleSubmit}>
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
        <button>submit</button>
      </form>
      <p className={!deleteTrue ? modalStyles.fail : modalStyles.pass}>Delete workspace: are you sure?</p>
      <form><input checked={deleteTrue} onChange={(_) => setDeleteTrue(!deleteTrue)} type='checkbox' /> Yes</form>
      <button
        className={`${modalStyles.deleteButton} ${(deleteTrue && modalStyles.pass)}`}
        onClick={handleDelete}
        disabled={!deleteTrue}
      >DELETE
      </button>
    </div>
  )
}
