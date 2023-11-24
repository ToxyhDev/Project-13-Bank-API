import styles from './index.module.scss'
import stylesHeader from '../../components/Header/index.module.scss'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'

export default function Login() {
  return (
    <>
      <Header>
        <div>
          <Link className={stylesHeader.mainNavItem} to="/login">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        </div>
      </Header>
      <main className={`${styles.main} ${styles.bgDark}`}>
        <section className={styles.signContent}>
          <i className={`fa fa-user-circle ${styles.signIcon}`}></i>
          <h1>Sign In</h1>
          <form>
            <div className={styles.inputWrapper}>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
            </div>
            <div className={styles.inputRemember}>
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            <button className={styles.signButton}>Sign In</button>
          </form>
        </section>
      </main>
    </>
  )
}
