import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IProfileResult } from '.'

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    addUserToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    addProfileData: (state, action: PayloadAction<IProfileResult>) => {
      state.user = action.payload
    },
    deleteToken: (state) => {
      state.token = null
    },
  },
})
