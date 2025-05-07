import { createClient, type Client } from "@libsql/client";
import { drizzle } from "drizzle-orm/singlestore";
import { createPool, type Pool } from "mysql2";

import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
};

const conn =
  globalForDb.conn ??
  createPool({
    host: process.env.SINGLESTORE_HOST,
    port: Number(process.env.SINGLESTORE_PORT),

    user: process.env.SINGLESTORE_USER,
    password: process.env.SINGLESTORE_PASS,
    database: process.env.SINGLESTORE_DB_NAME,
    ssl: {},
    maxIdle: 0,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.conn = conn;
}
// export const client =
//   globalForDb.client ?? createClient({ url: env.DATABASE_URL });
// if (env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle(conn, { schema });
