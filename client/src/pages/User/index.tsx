import styles from './index.module.scss'
import stylesHeader from '../../components/Header/index.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import { useSelector } from 'react-redux'
import { getProfileData } from '../../app/selector'
import { useEffect } from 'react'
import Logout from '../../components/Logout'
import EditName from '../../components/EditName'

export default function User() {
  const user = useSelector(getProfileData)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    // console.log(user?.body)
  }, [navigate, user])

  return (
    <>
      <Header>
        <div>
          <Link
            className={stylesHeader.mainNavItem}
            to={`/${user?.body?.firstName}-${user?.body?.lastName}`}
          >
            <i className="fa fa-user-circle"></i> {user?.body?.firstName}
          </Link>
          <Logout classStyle={stylesHeader.mainNavItem}>
            <i className="fa fa-sign-out"></i> Sign Out
          </Logout>
        </div>
      </Header>
      <main className={`${styles.main} ${styles.bgDark}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Welcome back
            <br />
            {`${user?.body?.firstName} ${user?.body?.lastName}!`}
          </h2>
          <EditName />
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
        <section className={styles.account}>
          <div className={styles.accountWrapper}>
            <h3 className={styles.accountTitle}>Argent Bank Saving (x6712)</h3>
            <p className={styles.accountAmount}>$10,928.42</p>
            <p className={styles.accountDescription}>Available Balance</p>
          </div>
          <div className={`${styles.accountWrapper} ${styles.cta}`}>
            <button className={styles.transactionButton}>
              View transactions
            </button>
          </div>
        </section>
        <section className={styles.account}>
          <div className={styles.accountWrapper}>
            <h3 className={styles.accountTitle}>
              Argent Bank Credit Card (x8349)
            </h3>
            <p className={styles.accountAmount}>$184.30</p>
            <p className={styles.accountDescription}>Current Balance</p>
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
