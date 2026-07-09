import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, type PoolConfig } from "pg";

import { schema } from "@/db/schema";

const globalForDb = globalThis as typeof globalThis & {
  __portfolioPool?: Pool;
};

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set.");
  }

  return databaseUrl;
}

function getPoolConfig(databaseUrl: string): PoolConfig {
  const config: PoolConfig = {
    connectionString: databaseUrl,
    connectionTimeoutMillis: 10_000,
    idleTimeoutMillis: 30_000,
    max: 5,
  };

  try {
    const url = new URL(databaseUrl);
    const sslMode = url.searchParams.get("sslmode");

    if (sslMode) {
      url.searchParams.delete("sslmode");
      config.connectionString = url.toString();
    }

    if (sslMode && sslMode !== "disable") {
      config.ssl = {
        rejectUnauthorized: sslMode !== "no-verify",
      };
    }
  } catch {
    return config;
  }

  return config;
}

function getPool() {
  const pool =
    globalForDb.__portfolioPool ??
    new Pool(getPoolConfig(getDatabaseUrl()));

  if (process.env.NODE_ENV !== "production") {
    globalForDb.__portfolioPool = pool;
  }

  return pool;
}

function getDrizzleDb() {
  return drizzle({ client: getPool(), schema });
}

export const db = new Proxy({} as Pick<ReturnType<typeof getDrizzleDb>, "select">, {
  get(_target, property) {
    if (property === "select") {
      const drizzleDb = getDrizzleDb();
      return drizzleDb.select.bind(drizzleDb);
    }

    return undefined;
  },
});