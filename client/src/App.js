import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { restoreUser } from './store/session'
import LoginForm from './components/LoginForm'
import SignupForm from './components/AuthForms/SignUpForm'

import MainScreen from './components/MainScreen'
import SplashPage from './components/SplashPage'
import PublicNavBar from './components/PublicNavBar'
import PublicFooter from './components/PublicFooter'

function App () {
  // fetch user info (will set user to null if not logged in)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(restoreUser())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Public> <SplashPage /> </Public>} />
        <Route path='/login' exact element={<Public> <LoginForm /> </Public>} />
        <Route path='/signup' exact element={<Public> <SignupForm /> </Public>} />
        <Route path='/main/server' exact element={<Protected> <MainScreen /> </Protected>} />
        <Route path='/main/server/:serverId' exact element={<Protected> <MainScreen /> </Protected>} />
        <Route path='/main/server/:serverId/channel/:channelId' exact element={<Protected> <MainScreen /> </Protected>} />
        <Route path='*' element={<div>ERROR 404: PAGE WITH THIS URL DOES NOT EXIST</div>} />
      </Routes>
    </BrowserRouter>
  )
}

function Public ({ children }) {
  return (
    <>
      <PublicNavBar />
      {children}
      <PublicFooter />
    </>
  )
}
// router v6 implementaion gleaned here:
// https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5
function Protected ({ children }) {
  const auth = useSelector(state => state.session)
  return auth ? children : <Navigate to='/login' />
}

export default App
