import './App.css'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { restoreUser } from './store/session'

import SignupForm from './components/SignUpForm'
import LogOutButton from './components/LogOutButton'
import LoginForm from './components/LoginForm'

function App () {
  // fetch user info (will set user to null if not logged in)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(restoreUser())
  }, [dispatch])

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact>
            <div style={{
              backgroundColor: 'black',
              padding: '100px',
              color: 'white'
            }}
            >There is nothing here yet! 🐤
            </div>
            <SignupForm />
            <LoginForm />
            <LogOutButton />
          </Route>
          <Route path='/main' exact />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
