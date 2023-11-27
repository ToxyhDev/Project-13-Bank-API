import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    addUserToken: (state, action: PayloadAction) => {
      state.token = action.payload
    },
    addProfileData: (state, action: PayloadAction) => {
      state.user = action.payload
    },
    deleteToken: (state) => {
      state.token = null
    },
    updateNameProfile: (state, action: PayloadAction) => {
      state.user = action.payload
    },
  },
})
