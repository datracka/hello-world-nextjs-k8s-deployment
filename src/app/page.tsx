import { Pool } from "pg";
import React from "react";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

console.log(JSON.stringify(serverRuntimeConfig));

async function fetchDatabaseStatus() {
  let dbMessage = "Loading database connection status...";

  try {
    // Fetch runtime environment variables directly
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
      dbMessage = `Failed to connect to the database: ${error.message} ${JSON.stringify(serverRuntimeConfig)}`;
    } else {
      console.error("Unexpected error:", error);
      dbMessage = "Failed to connect to the database: An unexpected error occurred.";
    }
  }

  return dbMessage;
}

export default async function Home() {
  // Fetch the database connection status
  const dbMessage = await fetchDatabaseStatus();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-lg font-bold">Database Connection Test</h1>
        <p>{dbMessage}</p>
      </main>
    </div>
  );
}
