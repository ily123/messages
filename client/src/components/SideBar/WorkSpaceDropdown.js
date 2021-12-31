import styles from './SideBar.module.css'
import modalStyles from './Modals.module.css'
import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
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
          <SidebarModal showParent={setShown} text='Join Workspace'>
            <ServerSettingsContent workspace={currentWorkspace} />
          </SidebarModal>
          <SidebarModal showParent={setShown} text='Create Workspace'>
            <CreateServerContent workspace={currentWorkspace} />
          </SidebarModal>
          <SidebarModal showParent={setShown} text='Workspace Settings'>
            <ServerSettingsContent workspace={currentWorkspace} />
          </SidebarModal>
        </div>
      </div>
    </div>
  )
}

function SidebarModal ({ showParent, text, children }) {
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
        {text}
      </div>
      <ModalPortal isHidden={isHidden} setHidden={setHidden}>
        {React.cloneElement(children, { setHidden })} {/* the clone is to pass setHidden to children */}
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
    }
  }

  const handleDelete = async e => {
    await dispatch(deleteServerRequest(serverId))
    // setIsPosted(true)
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

// Note on the setHidden:
// The portal wrapper gets setHidden and attaches it to "Done" button.
// Here, I am passing setHidden to the child directly too (via clone),
// so I can close the portal by clicking on the "Go There" Link inside
// the child.
function CreateServerContent ({ workspace, setHidden }) {
  const { id: serverId } = workspace
  const [title, setTitle] = useState('')
  const [isTitleInvalid, setIsTitleInvalid] = useState(false)
  const [isPosted, setIsPosted] = useState(false)
  const [newServerId, setNewServerId] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    setTitle('')
    setIsPosted(false)
    setIsTitleInvalid(false)
  }, [serverId])

  useEffect(() => {
    setIsTitleInvalid(!title.length)
    setIsPosted(false)
  }, [title])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!isTitleInvalid) {
      const { server } = await dispatch(postServerRequest(title))
      await dispatch(loadWorkspaces()) // this needs to be fixed
      setNewServerId(server.id)
      setIsPosted(true)
      // setTitle('')
    }
  }

  return (
    <div className={modalStyles.server}>
      <h3>Create New Workspace</h3>
      <p className={isTitleInvalid ? modalStyles.fail : modalStyles.pass}>Server title: must be at least 1 char</p>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='enter new server name...' value={title} onChange={(e) => setTitle(e.target.value)} />
        <button>submit</button>
      </form>
      <p className={isPosted ? modalStyles.reveal : modalStyles.hidden}>
        Added new workspace!<br />
        <span>
          <Link
            to={newServerId ? `/main/server/${newServerId}` : '/main/server/'}
            onClick={() => setHidden(true)}
          >Navigate there!
          </Link>
        </span>
      </p>
    </div>
  )
}
