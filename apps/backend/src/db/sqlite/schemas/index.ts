import type {IUserEntity} from "@repo/domain/entity/user.js";
import { int, sqliteTable, text, type SQLiteColumnBuilderBase } from "drizzle-orm/sqlite-core";

const userSchema: Record<keyof IUserEntity, SQLiteColumnBuilderBase> = {
    id: int().primaryKey({ autoIncrement: true }),
    username: text().unique().notNull(),
    password: text().notNull(),
    email: text().notNull().unique(),
}

export const users = sqliteTable("users_table", userSchema);

