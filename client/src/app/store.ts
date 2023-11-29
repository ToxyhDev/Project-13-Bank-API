import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userSlice } from '../components/FormLogin/formLoginSlice'
import { api } from '../api/formLoginApi'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  user: userSlice.reducer,
  [api.reducerPath]: api.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(thunk),
})

// Doc REDUX
// Type RootState en dehors du configureStore pour éviter la référence circulaire
// Module A dépend de B et inversement
export type RootState = ReturnType<typeof rootReducer>
