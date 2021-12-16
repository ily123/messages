import { useDispatch } from 'react-redux'
import { logoutUser } from '../store/session'

export default function LogOutButton () {
  const dispatch = useDispatch()

  return (
    <div>
      <button onClick={() => dispatch(logoutUser())}><i className='fas fa-sign-out-alt' />Log out</button>
    </div>
  )
}
