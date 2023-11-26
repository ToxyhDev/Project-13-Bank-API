import styles from './index.module.scss'
import stylesHeader from '../../components/Header/index.module.scss'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import FormLogin from '../../components/FormLogin'

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
          <FormLogin />
        </section>
      </main>
    </>
  )
}
