import styles from './NavBar.module.css'
import { useState, useEffect } from 'react'

export default function NavBar () {
  return (
    <header>
      <Clock />
      <SearchBar />
      <div>
        <button>?</button>
        <button>P</button>
      </div>
    </header>
  )
}

function SearchBar () {
  return (
    <input type='text' placeholder='Search...' />
  )
}

function Clock () {
  const [time, setTime] = useState(timeNow())
  useEffect(() => {
    const timeHandle = setInterval(() => setTime(timeNow()), 1000)
    return () => clearInterval(timeHandle)
  }, [])

  return (
    <div>{time}</div>
  )
}

const timeNow = () => new Date().toLocaleTimeString()
