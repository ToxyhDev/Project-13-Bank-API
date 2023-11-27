import styles from './index.module.scss'
import { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userSlice } from './formLoginSlice'
import {
  useGetLoginTokenMutation,
  useGetProfilDataMutation,
} from '../../api/formLoginApi'
import { useNavigate } from 'react-router-dom'
import {
  ICredentialsEmail,
  IResponseFetch,
  IResponseData,
  IResponseToken,
  IResponseProfile,
} from '../../types'

export default function FormLogin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const storage = localStorage.getItem('Token')
    if (storage) {
      fetchUserProfile(storage).catch((err) => console.error(err))
    }
  }, [])

  const [credentials, setCredentials] = useState<ICredentialsEmail>({
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

  const checkHandler = () => {
    setIsChecked(!isChecked)
  }

  // -> Call API
  const [getLoginToken] = useGetLoginTokenMutation({ body: credentials })

  const [getProfileData] = useGetProfilDataMutation()

  // --> Form submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const tokenResult: IResponseFetch<IResponseToken> = await getLoginToken({
        body: credentials,
      })
      console.log(tokenResult)

      await handleTokenResult(tokenResult)
    } catch (error) {
      // console.log(errorMsg)
      setErrorMsg('Problem during connection')
      dispatch(userSlice.actions.deleteToken())
      console.error('Erreur lors de la mutation', error)
    }
  }

  // --> Handle Token
  const handleTokenResult = async (
    tokenResult: IResponseData<IResponseToken>
  ) => {
    const { token } = tokenResult.data.body

    // dispatch(userSlice.actions.addUserToken(token))
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
      dispatch(userSlice.actions.addUserToken(token))

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
  const handleProfileResult = (
    profilResult: IResponseData<IResponseProfile>
  ) => {
    if (profilResult.data) {
      console.log(profilResult.data)
      setErrorMsg('')
      dispatch(userSlice.actions.addProfileData(profilResult.data))
      const { body } = profilResult.data
      // Redirect to profile page
      navigate(`/${body?.firstName}-${body?.lastName}`)
    } else if (profilResult.error) {
      setErrorMsg('Error retrieving user profile')
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
      {errorMsg ? <p className={styles.error}>{errorMsg}</p> : ''}
    </form>
  )
}
