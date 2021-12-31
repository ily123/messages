import { useState } from 'react'
import ReactDOM from 'react-dom'
import styles from './index.module.css'

// https://www.digitalocean.com/community/tutorials/react-modal-component
export default function Modal ({ children, button }) {
  const [isHidden, setHidden] = useState(true)
  return (
    <>
      <button className={button.style} onClick={(e) => setHidden(false)}>{button.text}</button>
      <ModalBody isHidden={isHidden} setHidden={setHidden}>{children}</ModalBody>
    </>
  )
}

export function ModalBody ({ children, isHidden, setHidden }) {
  return ReactDOM.createPortal(
    <div className={isHidden ? styles.modalHide : styles.modalShow}>
      {children}
      <button onClick={(e) => setHidden(true)}>Close Modal</button>
    </div>,
    document.getElementById('root')
  )
}

export function ModalPortal ({ children, isHidden, setHidden }) {
  return ReactDOM.createPortal(
    <div className={isHidden ? styles.modalHide : styles.modalShow}>
      {children}
      <button className={styles.doneButton} onClick={(e) => setHidden(true)}>Done</button>
    </div>,
    document.getElementById('root')
  )
}
