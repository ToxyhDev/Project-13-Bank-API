export interface IStateUser {
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
