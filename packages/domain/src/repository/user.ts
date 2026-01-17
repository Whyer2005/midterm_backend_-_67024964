import type {IUser, IUserEntity} from "../entity/user.js"


export interface IUserRepository {

    // Read
    findAll(): Promise<IUserEntity[]>
    findById(id: number): Promise<IUserEntity>

    // Create
    create(user: IUser): Promise<IUserEntity>

    // Update
    update(id: number, user: Partial<IUserEntity>): Promise<IUserEntity>

    // Delete
    delete(id: number): Promise<boolean>

}