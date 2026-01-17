import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
    out: './drizzle',
    schema: './src/db/sqlite/schemas/*',
    dialect: 'sqlite',
    dbCredentials: {
        url: process.env.SQLITE_FILE_NAME!,
    },
});