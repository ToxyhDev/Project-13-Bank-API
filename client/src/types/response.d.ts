export type IResponseFetch<T> = IResponseData<T> | IResponseError

export interface IResponseError {
  error: string
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
