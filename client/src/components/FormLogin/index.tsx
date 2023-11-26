import styles from './index.module.scss'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { userSlice } from './formLoginSlice'
import {
  useGetLoginTokenMutation,
  useGetProfilDataMutation,
} from '../../api/formLoginApi'
import { IUser } from '../../app/store'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export interface IBodyCredentials {
  body: ICredentials
}

export interface ICredentials {
  email: string
  password: string
}

export interface ITokenResult {
  data: {
    body: {
      token: string
    }
  }
  error: string
}

export interface IProfileResult {
  data: IUser
}

export default function FormLogin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const storage = localStorage.getItem('Token')
    if (storage) {
      fetchUserProfile(storage).catch((err) => console.error(err))
    }
  }, [])

  const [credentials, setCredentials] = useState<ICredentials>({
    email: '',
    password: '',
  })

  // -> Form input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }))
  }

  const [isChecked, setIsChecked] = useState(false)

  const checkHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked)
  }

  // -> Call API
  const [getLoginToken] = useGetLoginTokenMutation(credentials)

  const [getProfileData] = useGetProfilDataMutation()

  // --> Form submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const tokenResult = await getLoginToken({ body: credentials })
      console.log(tokenResult)
      await handleTokenResult(tokenResult)
    } catch (error) {
      dispatch(userSlice.actions.deleteToken())
      console.error('Erreur lors de la mutation', error)
    }
  }

  // --> Handle Token
  const handleTokenResult = async (tokenResult: ITokenResult) => {
    const { token } = tokenResult.data.body

    dispatch(userSlice.actions.addUserToken(token))
    await fetchUserProfile(token)

    handleLocalStorage(token)
  }

  const handleLocalStorage = (token: string) => {
    if (isChecked) {
      localStorage.setItem('Token', token)
    }
  }

  // --> Fetch User Data
  const fetchUserProfile = async (token: string) => {
    try {
      const response = await getProfileData({ token })

      handleProfileResult(response)
    } catch (error) {
      console.error(
        'Erreur lors de la récupération du profil utilisateur',
        error
      )
    }
  }

  // --> Handle Profile
  const handleProfileResult = (profilResult: IProfileResult) => {
    if (profilResult.data) {
      console.log(profilResult.data)
      dispatch(userSlice.actions.addProfileData(profilResult.data))
      const { body } = profilResult.data
      // Redirect to profile page
      navigate(`/${body?.firstName}-${body?.lastName}`)
    } else if (profilResult.error) {
      console.error(
        'Erreur lors de la récupération du profil utilisateur',
        profilResult.error
      )
    }
  }

  return (
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
        <input type="checkbox" id="remember-me" onChange={checkHandler} />
        <label htmlFor="remember-me">Remember me</label>
      </div>

      <button className={styles.signButton} type="submit">
        Sign In
      </button>
    </form>
  )
}
