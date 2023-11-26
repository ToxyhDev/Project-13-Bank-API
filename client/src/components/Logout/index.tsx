import { useNavigate } from 'react-router-dom'
import { ReactNode } from 'react'

interface ILogoutProps {
  classStyle?: string
  children?: ReactNode
}

export default function Logout({
  classStyle,
  children,
}: Readonly<ILogoutProps>) {
  const navigate = useNavigate()
  const butonHandler = () => {
    localStorage.removeItem('Token')
    navigate('/')
  }
  return (
    <button className={classStyle} onClick={butonHandler}>
      {children}
    </button>
  )
}
