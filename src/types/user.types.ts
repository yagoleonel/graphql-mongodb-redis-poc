export interface IUser {
  id: string;
  name: string;
  email: string;
}

export type UserFilter = {
  name?: string,
  email?: string
}