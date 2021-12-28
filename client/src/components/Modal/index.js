import { useState } from 'react'
import styles from './index.module.css'

// https://www.digitalocean.com/community/tutorials/react-modal-component
export default function Modal ({ children, button }) {
  const [isHidden, setHidden] = useState(true)
  return (
    <>
      <div className={isHidden ? styles.modalHide : styles.modalShow}>
        {children}
        <button onClick={(e) => setHidden(true)}>Close Modal</button>
      </div>
      <button className={button.style} onClick={(e) => setHidden(false)}>{button.text}</button>
    </>
  )
}
