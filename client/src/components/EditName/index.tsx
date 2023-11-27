import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'
import { useState, ChangeEvent, FormEvent } from 'react'
import { getUserToken } from '../../app/selector'
import { usePutProfileNameMutation } from '../../api/formLoginApi'
import { userSlice } from '../FormLogin/formLoginSlice'
import { ICredentialsName } from '../../types'

export default function EditName() {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [credentials, setCredentials] = useState<ICredentialsName>({
    firstName: '',
    lastName: '',
  })
  const token = useSelector(getUserToken)

  // -> Call API
  const [putProfileName] = usePutProfileNameMutation({
    token,
    body: credentials,
  })

  // -> Form input change
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
      const putUsernameResult = await putProfileName({
        token,
        body: credentials,
      })
      console.log(putUsernameResult)
      dispatch(userSlice.actions.updateNameProfile(putUsernameResult.data))
      setIsOpen(false)
    } catch (error) {
      console.error("Erreur lors de l'envoi des données", error)
    }
  }

  if (isOpen) {
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formSection}>
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div className={styles.formSection}>
          <button className={styles.button} type="submit">
            Save
          </button>
          <button
            className={styles.button}
            type="reset"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    )
  } else {
    return (
      <button className={styles.editButton} onClick={() => setIsOpen(true)}>
        Edit Name
      </button>
    )
  }
}
