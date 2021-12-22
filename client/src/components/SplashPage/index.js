import SignupForm from '../SignUpForm'
import LogOutButton from '../LogOutButton'
import LoginForm from '../LoginForm'

export default function SplashPage () {
  return (
    <>
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
    </>
  )
}
