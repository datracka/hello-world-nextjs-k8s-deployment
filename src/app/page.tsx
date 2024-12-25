import { Pool } from "pg";
import React from "react";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

console.log("Environment Variables:", {
  test: serverRuntimeConfig.TEST_ENV,
  host: serverRuntimeConfig.DATABASE_HOST,
  port: Number(serverRuntimeConfig.DATABASE_PORT),
  user: serverRuntimeConfig.DATABASE_USER,
  password: serverRuntimeConfig.DATABASE_PASSWORD,
  database: serverRuntimeConfig.DATABASE_NAME,
});

export default async function Home() {
  let dbMessage = "Loading database connection status...";

  try {
    const pool = new Pool({
      host: serverRuntimeConfig.DATABASE_HOST,
      port: Number(serverRuntimeConfig.DATABASE_PORT),
      user: serverRuntimeConfig.DATABASE_USER,
      password: serverRuntimeConfig.DATABASE_PASSWORD,
      database: serverRuntimeConfig.DATABASE_NAME,
    });

    // Test the connection with a simple query
    const result = await pool.query("SELECT NOW() AS current_time");
    dbMessage = `Connected successfully! Server time: ${result.rows[0].current_time}`;

    await pool.end();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Database connection error:", error.message);
      dbMessage = `Failed to connect to the database: ${error.message} ${serverRuntimeConfig.TEST_ENV} ${serverRuntimeConfig.DATABASE_HOST} ${serverRuntimeConfig.DATABASE_PORT} ${serverRuntimeConfig.DATABASE_USER} ${serverRuntimeConfig.DATABASE_PASSWORD} ${serverRuntimeConfig.DATABASE_NAME}`;
    } else {
      console.error("Unexpected error:", error);
      dbMessage = "Failed to connect to the database: An unexpected error occurred.";
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-lg font-bold">Database Connection Test 4</h1>
        <p>{dbMessage}</p>
      </main>
    </div>
  );
}