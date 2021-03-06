import styles from './index.module.css'

export default function PublicFooter () {
  return (
    <footer className={styles.publicFooter}>
      <AboutLinks />
      <SocialMediaLinks />
    </footer>
  )
}

function AboutLinks () {
  return (
    <div className={styles.myName}>
      <div className={styles.one}>
        Messages was made by
      </div>
      <div className={styles.two}>
        <a href='https://ilyanovikov.io'>Ilya Novikov</a>
      </div>
    </div>
  )
}
function SocialMediaLinks () {
  return (
    <div className={styles.socialMediaLinks}>
      <a target='_blank' href='https://github.com/ily123/messages' rel='noreferrer'>
        <i className='fab fa-github-square' />
      </a>
      <a target='_blank' href='https://www.linkedin.com/in/ilyabnovikov' rel='noreferrer'>
        <i className='fab fa-linkedin' />
      </a>
      <a target='_blank' href='mailto:ibnovikov@gmail.com' rel='noreferrer'>
        <i className='fas fa-envelope-square' />
      </a>
    </div>
  )
}
