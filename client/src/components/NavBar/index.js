import styles from './NavBar.module.css'

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
  return (
    <div>Clock</div>
  )
}
