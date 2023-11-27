// Récupére dans le state global et traite l'info
import { IStateUser } from '../types'

export const getUserToken = (state: IStateUser) => state?.user.token

export const getProfileData = (state: IStateUser) => state?.user.user
