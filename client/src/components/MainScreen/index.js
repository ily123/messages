import styles from './MainScreen.module.css'
import NavBar from '../NavBar'
import SideBar from '../SideBar'
import Chat from '../Chat'

export default function MainScreen () {
  return (
    <div>
      <NavBar />
      <div className={styles.wrapper}>
        <SideBar />
        <Chat />
      </div>
    </div>
  )
}
