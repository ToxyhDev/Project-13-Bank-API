import styles from './index.module.scss'
import stylesHeader from '../../components/Header/index.module.scss'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'

export default function User() {
  return (
    <>
      <Header>
        <div>
          {/* Modifier id du lien par id user */}
          <Link className={stylesHeader.mainNavItem} to="/user/id">
            <i className="fa fa-user-circle"></i> Tony
          </Link>
          <Link className={stylesHeader.mainNavItem} to="/">
            <i className="fa fa-sign-out"></i> Sign Out
          </Link>
        </div>
      </Header>
      <main className={`${styles.main} ${styles.bgDark}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Welcome back
            <br />
            Tony Jarvis!
          </h2>
          <button className={styles.editButton}>Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className={styles.account}>
          <div className={styles.accountWrapper}>
            <h3 className={styles.accountTitle}>
              Argent Bank Checking (x8349)
            </h3>
            <p className={styles.accountAmount}>$2,082.79</p>
            <p className={styles.accountDescription}>Available Balance</p>
          </div>
          <div className={`${styles.accountWrapper} ${styles.cta}`}>
            <button className={styles.transactionButton}>
              View transactions
            </button>
          </div>
        </section>
      </main>
    </>
  )
}
