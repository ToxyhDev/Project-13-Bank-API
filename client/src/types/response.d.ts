import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'

export interface IResponseFetch<T> {
  data?: {
    body: T
    message: string
    status: number
  }
  error?: FetchBaseQueryError | SerializedError
}

export interface IResponseData<T> {
  data: {
    body: T
    message: string
    status: number
  }
}

export interface IResponseToken {
  token: string
}

export interface IResponseProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  createdAt: string
  updatedAt: string
}
