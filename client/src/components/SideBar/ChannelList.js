import styles from './SideBar.module.css'
import modalStyles from './Modals.module.css'
import chatModalStyles from './ChatModals.module.css'
import React, { useState, useEffect } from 'react'
import { Navigate, NavLink, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ModalPortal } from '../Modal'
import {
  postChannelRequest,
  patchChannelRequest,
  deleteChannelRequest
} from '../../store/workspace'

export default function ChannelList ({ data }) {
  const { channels, serverId, channelId, workspaces } = data
  const user = useSelector(state => state.session)
  console.log('serverId -> ', serverId)
  return (
    <>
      <menu>
        {channels.map(channel => {
          const { id, title } = channel
          return (
            <li key={'channel' + id}>
              <div className={chatModalStyles.channelNameWrap}>
                <div style={{ visibility: channelId == id ? '' : 'hidden' }}><i className='fas fa-eye' /></div>
                <NavLink to={`/main/server/${serverId}/channel/${id}`}>{title}</NavLink>
                {title != 'General' && (
                  <ChannelSettingsModal>
                    <ChannelSettingsContent channel={channel} />
                  </ChannelSettingsModal>
                )}
              </div>
            </li>
          )
        })}
      </menu>
      {user.id == workspaces[serverId].owner_id && (
        <AddNewChannelModal>
          <AddNewChannelContent serverId={serverId} />
        </AddNewChannelModal>
      )}
    </>
  )
}

function AddNewChannelModal ({ children }) {
  const [isHidden, setHidden] = useState(true)
  const handleModals = (_) => {
    setHidden(false)
  }
  return (
    <>
      <div
        className={styles.deleteServerButton}
        onClick={(e) => handleModals(e)}
      >
        <p className={chatModalStyles.addChannel}> ➕ Add Channel</p>
      </div>
      <ModalPortal isHidden={isHidden} setHidden={setHidden}>
        {React.cloneElement(children, { setHidden, isHidden })} {/* the clone is to pass setHidden to children */}
      </ModalPortal>
    </>
  )
}

function AddNewChannelContent ({ serverId, isHidden }) {
  console.log('sup', serverId)
  const [title, setTitle] = useState('')
  const [isTitleInvalid, setIsTitleInvalid] = useState(false)
  const [isPosted, setIsPosted] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setIsTitleInvalid(!title.length)
  }, [title])

  useEffect(() => {
    // clear "posted!" message on every re-open of modal
    setIsPosted(false)
  }, [isHidden])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!isTitleInvalid) {
      const { channel } = await dispatch(postChannelRequest(serverId, title))
      // await dispatch(loadWorkspaces()) // this needs to be fixed
      setIsPosted(true)
      setTitle('')
    }
  }

  return (
    <div className={modalStyles.server}>
      <h3>Create New Channel</h3>
      <p className={isTitleInvalid ? modalStyles.fail : modalStyles.pass}>Title must be at least 1 char</p>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='enter new channel name...' value={title} onChange={(e) => setTitle(e.target.value)} />
        <button>submit</button>
      </form>
      <p className={isPosted ? modalStyles.reveal : modalStyles.hidden}>
        Added new channel!<br />
      </p>
    </div>
  )
}

function ChannelSettingsModal ({ children }) {
  const [isHidden, setHidden] = useState(true)
  const handleModals = (_) => {
    setHidden(false)
  }
  return (
    <>
      <div
        className={chatModalStyles.cogWheel}
        onClick={(e) => handleModals(e)}
      >
        <i className='fas fa-cog' />
      </div>
      <ModalPortal isHidden={isHidden} setHidden={setHidden}>
        {React.cloneElement(children, { setHidden, isHidden })} {/* the clone is to pass setHidden to children */}
      </ModalPortal>
    </>
  )
}

function ChannelSettingsContent ({ channel, setHidden }) {
  const { id: channelId, title: channelTitle } = channel
  const [title, setTitle] = useState('')
  const [isTitleInvalid, setIsTitleInvalid] = useState(false)
  const [deleteTrue, setDeleteTrue] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setTitle(channelTitle)
    setDeleteTrue(false)
  }, [setHidden])
  useEffect(() => {
    setIsTitleInvalid(!title.length)
  }, [title])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!isTitleInvalid) {
      await dispatch(patchChannelRequest(channelId, title))
    }
  }

  const handleDelete = async e => {
    await dispatch(deleteChannelRequest(channelId))
    setHidden(true)
  }

  return (
    <div className={modalStyles.server}>
      <h3>Channel Settings</h3>
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
