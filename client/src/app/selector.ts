// Récupére dans le state global et traite l'info
import { IState } from './store'

export const getUserToken = (state: IState) => state?.user.token

export const getProfileData = (state: IState) => state?.user.user
