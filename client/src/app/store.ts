import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userSlice } from '../components/FormLogin/formLoginSlice'
import { api } from '../api/formLoginApi'
import thunk from 'redux-thunk'

export interface IState {
  user: IDataUser
}

export interface IDataUser {
  token?: string
  user?: IUser
}

export interface IUser {
  body?: {
    id: string
    email: string
    firstName: string
    lastName: string
    createdAt: string
    updatedAt: string
  }
  message: string
  status: number
}

const state = {
  user: {},
}

export const store = configureStore({
  preloadedState: state,
  reducer: combineReducers({
    user: userSlice.reducer,
    [api.reducerPath]: api.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(thunk),
})
