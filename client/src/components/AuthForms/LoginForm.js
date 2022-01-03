import './SignupFormPage.css'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../store/session'
import { Navigate } from 'react-router-dom'

export default function LoginForm () {
  const dispatch = useDispatch()
  const [credential, setCredential] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [valid, setValid] = useState({
    credential: false,
    password: false
  })

  useEffect(() => {
    setValid(state => ({ ...state, credential: !!credential.length }))
    setValid(state => ({ ...state, password: !!password.length }))
  }, [credential, password])

  if (loggedIn) return <Navigate to='/main/server/' />

  const submit = async (event) => {
    event.preventDefault()
    try {
      await dispatch(loginUser(credential, password))
      setLoggedIn(true)
    } catch (response) { // the error object is the response
      const { errors } = await response.json()
      setErrors(errors)
    }
  }

  const check = (input) => input ? 'input valid' : 'input invalid'

  return (
    <div className='user-signup-form'>
      <div className='signup-validation more-padding'>
        <ul>
          <li className={check(valid.credential)}><CheckMark bool={valid.credential} />Enter user name</li>
          <li className={check(valid.password)}><CheckMark bool={valid.password} />Ener password</li>
        </ul>
      </div>
      <form onSubmit={submit}>
        <label>
          Username or email
          <input
            type='text'
            placeholder='Enter e-mail or username'
            required
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type='password'
            placeholder='Enter password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type='submit'>Log In</button>
      </form>
      <ul className='user-signup-errors'>
        {errors.map(errorMsg => <li key={errorMsg}>{errorMsg}</li>)}
      </ul>
    </div>
  )
}

function CheckMark ({ bool }) {
  return <span>{bool ? <i className='fas fa-check' /> : <i className='fas fa-times' />}</span>
}
