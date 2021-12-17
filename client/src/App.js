import './App.css'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { restoreUser } from './store/session'

import MainScreen from './components/MainScreen'
import SplashPage from './components/SplashPage'

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
          <Route path='/' exact element={<SplashPage />} />
          <Route path='/main' exact element={<MainScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
