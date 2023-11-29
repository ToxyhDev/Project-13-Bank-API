// Récupére dans le state global et traite l'info
import { RootState } from './store'

export const getUserToken = (state: RootState) => state?.user.token

export const getProfileData = (state: RootState) => state?.user.user
