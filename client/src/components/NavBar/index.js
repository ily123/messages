import styles from './NavBar.module.css'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../store/session'

export default function NavBar () {
  return (
    <header className={styles.appNavBar}>
      <Clock />
      <div>
        <LogOutButton />
      </div>
    </header>
  )
}

function LogOutButton () {
  const dispatch = useDispatch()
  return (
    <div className={styles.interactiveButton} onClick={() => dispatch(logoutUser())}>Log out</div>
  )
}

function SearchBar () {
  return (
    <input className={styles.searchBar} type='text' placeholder='Search...' />
  )
}

function Clock () {
  const [time, setTime] = useState(timeNow())
  useEffect(() => {
    const timeHandle = setInterval(() => setTime(timeNow()), 1000)
    return () => clearInterval(timeHandle)
  }, [])

  return (
    <div className={styles.clock}>{time}</div>
  )
}

const timeNow = () => new Date().toLocaleTimeString()
