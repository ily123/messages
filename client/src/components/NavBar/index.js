import styles from './NavBar.module.css'
import LogOutButton from '../LogOutButton'
import { useState, useEffect } from 'react'

export default function NavBar () {
  return (
    <header>
      <Clock />
      <SearchBar />
      <div>
        <LogOutButton />
      </div>
    </header>
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
