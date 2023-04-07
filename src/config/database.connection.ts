import pg from "pg";
import 'dotenv/config';

const { Pool } = pg;

type ConfigType = {
    connectionString: string | undefined;
    ssl: boolean;
}

const configDatabase : ConfigType = {
    connectionString: process.env.DATABASE_URL,
    ssl: false,
};

if (process.env.MODE === "prod") configDatabase.ssl = true;

export const db = new Pool(configDatabase);