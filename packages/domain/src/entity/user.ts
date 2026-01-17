export interface IUser {
    id: number
    username: string
    email: string
    password: string
}
export interface IUserEntity extends Partial<IUser> {}
