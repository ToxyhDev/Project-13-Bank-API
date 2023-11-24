import styles from './index.module.scss'
import stylesHeader from '../../components/Header/index.module.scss'
import Header from '../../components/Header'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <Header>
        <div>
          <Link className={stylesHeader.mainNavItem} to="/login">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        </div>
      </Header>
      <main className={styles.main}>
        <div className={styles.banner}>
          <section className={styles.bannerContent}>
            <h2 className="sr-only">Promoted Content</h2>
            <p className={styles.subtitle}>No fees.</p>
            <p className={styles.subtitle}>No minimum deposit.</p>
            <p className={styles.subtitle}>High interest rates.</p>
            <p className={styles.text}>
              Open a savings account with Argent Bank today!
            </p>
          </section>
        </div>
        <section className={styles.features}>
          <h2 className="sr-only">Features</h2>
          <div className={styles.featureItem}>
            <img
              src="./src/assets/icon-chat.png"
              alt="Chat Icon"
              className={styles.featureIcon}
            />
            <h3 className={styles.featureItemTitle}>You are our #1 priority</h3>
            <p>
              Need to talk to a representative? You can get in touch through our
              24/7 chat or through a phone call in less than 5 minutes.
            </p>
          </div>
          <div className={styles.featureItem}>
            <img
              src="./src/assets/icon-money.png"
              alt="Check Shield Icon"
              className={styles.featureIcon}
            />
            <h3 className={styles.featureItemTitle}>
              More savings means higher rates
            </h3>
            <p>
              The more you save with us, the higher your interest rate will be!
            </p>
          </div>
          <div className={styles.featureItem}>
            <img
              src="./src/assets/icon-security.png"
              alt="Chat Icon"
              className={styles.featureIcon}
            />
            <h3 className={styles.featureItemTitle}>Security you can trust</h3>
            <p>
              We use top of the line encryption to make sure your data and money
              is always safe.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
