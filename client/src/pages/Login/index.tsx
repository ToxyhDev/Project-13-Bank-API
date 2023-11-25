import styles from './index.module.scss'
import stylesHeader from '../../components/Header/index.module.scss'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import { ChangeEvent, FormEvent, useState } from 'react'
import axios, { AxiosResponse } from 'axios'

interface IResponse {
  body: {
    token: string
  }
}

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      console.log(credentials)
      const response: AxiosResponse<IResponse> = await axios.post(
        'http://localhost:3001/api/v1/user/login',
        credentials
      )
      console.log(response.status)
      // console.log(response.data.body.token)
      const { token } = response.data.body

      console.log(token)
      await fetchUserProfile(token)
    } catch (error) {
      console.error('Erreur lors de la récupération du token', error)
    }
  }

  const fetchUserProfile = async (token: string) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      }

      const response = await axios.post(
        'http://localhost:3001/api/v1/user/profile',
        {},
        { headers }
      )
      console.log(response.data)
    } catch (error) {
      console.error(
        'Erreur lors de la récupération du profil utilisateur',
        error
      )
    }
  }
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
          <form onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="email"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputRemember}>
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            <button className={styles.signButton} type="submit">
              Sign In
            </button>
          </form>
        </section>
      </main>
    </>
  )
}
