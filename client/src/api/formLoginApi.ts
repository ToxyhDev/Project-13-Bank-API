import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IBodyCredentials } from '../components/FormLogin'

const API_BASE_URL = `${import.meta.env.VITE_BASE_URL}`

export const api = createApi({
  reducerPath: 'formLoginApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}` }),
  endpoints: (builder) => ({
    getLoginToken: builder.mutation<
      IBodyCredentials,
      Partial<IBodyCredentials>
    >({
      query: ({ body }) => ({
        url: `/user/login`,
        method: 'POST',
        body,
      }),
    }),
    getProfilData: builder.mutation({
      query: ({ token }) => ({
        url: '/user/profile',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    putProfileName: builder.mutation({
      query: ({ token, body }) => ({
        url: '/user/profile',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }),
    }),
  }),
})

export const {
  useGetLoginTokenMutation,
  useGetProfilDataMutation,
  usePutProfileNameMutation,
} = api