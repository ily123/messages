import styles from './Modals.module.css'
import Modal from '../Modal'
import { useDispatch } from 'react-redux'
import { loadWorkspaces, postServerRequest } from '../../store/workspace'
import { useState, useEffect } from 'react'

// All these modals look awfully similar, but do NOT try to DRY them!
// There is enough specific functionality here that a general solution
// will be hard to implement.

export function ServerOptions () {
  const [title, setTitle] = useState('')
  const [isTitleInvalid, setIsTitleInvalid] = useState(false)
  const [isPosted, setIsPosted] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    setIsTitleInvalid(!title.length)
  }, [title])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!isTitleInvalid) {
      // await dispatch(postServerRequest(title))
      // await dispatch(loadWorkspaces()) // this needs to be fixed
      setIsPosted(true)
    }
  }

  // if (isPosted) return <Navigate to='/main/server' />
  return (
    <Modal button={{ text: 's', style: styles.optionsButton }}>
      <h3>Server Settings</h3>
      {isTitleInvalid && <p>Enter new server title!</p>}
      {isPosted && <p>Added new server!</p>}
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder={title} value={title} onChange={(e) => setTitle(e.target.value)} />
        <button>submit</button>
      </form>
      <h3>Delete Server</h3>
      <button style={{ backgroundColor: 'red' }}>DELETE</button>
    </Modal>
  )
}

export function AddServer () {
  const [title, setTitle] = useState('')
  const [isTitleInvalid, setIsTitleInvalid] = useState(false)
  const [isPosted, setIsPosted] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setIsTitleInvalid(!title.length)
  }, [title])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!isTitleInvalid) {
      await dispatch(postServerRequest(title))
      await dispatch(loadWorkspaces()) // this needs to be fixed
      setIsPosted(true)
    }
  }

  // if (isPosted) return <Navigate to='/main/server' />

  return (
    <Modal button={{ text: 'NEW SERVER', style: styles.newServerButton }}>
      <h3>New Server</h3>
      {isTitleInvalid && <p>Enter server title!</p>}
      {isPosted && <p>Added new server!</p>}
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='enter new server name...' value={title} onChange={(e) => setTitle(e.target.value)} />
        <button>submit</button>
      </form>
    </Modal>
  )
}
