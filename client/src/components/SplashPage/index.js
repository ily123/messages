import SignupForm from '../SignUpForm'
import LoginForm from '../LoginForm'

export default function SplashPage () {
  return (
    <>
      <div style={{
        backgroundColor: 'black',
        padding: '100px',
        color: 'white'
      }}
      >🐤🐤🐤 There will be a splash page here.
      </div>
      <SignupForm />
      <LoginForm />
    </>
  )
}
