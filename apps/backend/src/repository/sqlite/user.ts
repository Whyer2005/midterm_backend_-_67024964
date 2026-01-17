import type {IUser, IUserEntity} from "@repo/domain/entity/user.js";
import type { IUserRepository } from "@repo/domain/repository/user.js";

import { db } from "../../db/sqlite/index.js"
import { users } from "../../db/sqlite/schemas/index.js";
import { eq } from "drizzle-orm";

export class UserRepositorySqlite implements IUserRepository {

    async findAll(): Promise<IUserEntity[]> {
        return await (db.select().from(users)) as IUserEntity[]
    }
    findById(id: number): Promise<IUserEntity> {
        return db.select().from(users).where(eq(users.id, id)).get() as Promise<IUserEntity>
    }
    async create(user: Partial<IUserEntity>): Promise<IUserEntity> {
        const [inserted]  = await db.insert(users)
            .values(user)
            .returning()   // ensures we get the inserted row back
        return inserted as IUserEntity
    }
    update(id: number, user: IUserEntity): Promise<IUserEntity> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }


}