import styles from './SideBar.module.css'

export default function SideBar () {
  return (
    <aside>
      <div>CURRENT SERVER</div>
      <div>
        <h3>Channel List</h3>
        <menu>
          <li>Channel 1</li>
          <li>Channel 2</li>
          <li>Channel 3</li>
        </menu>
      </div>
      <div>
        <h3>Direct Messages</h3>
        <menu>
          <li>Bobby Marks</li>
          <li>Mark Robertson</li>
        </menu>
      </div>
    </aside>
  )
}
