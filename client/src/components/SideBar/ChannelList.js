import styles from './SideBar.module.css'
import modalStyles from './Modals.module.css'
import chatModalStyles from './ChatModals.module.css'
import React, { useState, useEffect } from 'react'
import { Navigate, NavLink, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ModalPortal } from '../Modal'
import {
  postChannelRequest
} from '../../store/workspace'

export default function ChannelList ({ data }) {
  const { channels, serverId, channelId } = data
  console.log('serverId -> ', serverId)
  return (
    <>
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
      <AddNewChannelModal>
        <AddNewChannelContent serverId={serverId} />
      </AddNewChannelModal>
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
