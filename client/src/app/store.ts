import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userSlice } from '../components/FormLogin/formLoginSlice'
import { api } from '../api/formLoginApi'
import thunk from 'redux-thunk'
import { IStateUser } from '../types'

const state: IStateUser = {
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
