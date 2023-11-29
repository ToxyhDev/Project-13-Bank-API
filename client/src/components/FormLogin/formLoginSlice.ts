import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IDataUser, IUser } from '../../types'

const initialState: IDataUser = {
  token: undefined,
  user: undefined,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    addProfileData: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
    deleteToken: (state) => {
      state.token = ''
    },
    updateNameProfile: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
  },
})
