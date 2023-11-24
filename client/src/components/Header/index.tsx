import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import { ReactNode } from 'react'

interface IHeaderProps {
  readonly children?: ReactNode
}

export default function Header({ children }: IHeaderProps) {
  return (
    <header>
      <nav className={styles.mainNav}>
        <Link className={styles.mainNavLogo} to="/">
          <img
            className={styles.mainNavLogoImage}
            src="../src/assets/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        {children}
      </nav>
    </header>
  )
}
