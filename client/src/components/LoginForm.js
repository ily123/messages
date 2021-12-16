import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../store/session'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [credential, setCredential] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  const submit = async (event) => {
    event.preventDefault()
    try {
      await dispatch(loginUser(credential, password))
    } catch (response) { // the error object is the response
      const { errors } = await response.json()
      setErrors(errors)
    }
  }

  return (
    <div className='user-login-form'>
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
      <ul className='user-login-errors'>
        {errors.map(errorMsg => <li key={errorMsg}>{errorMsg}</li>)}
      </ul>
    </div>
  )
}

export default LoginForm
