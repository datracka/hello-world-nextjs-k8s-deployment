import { Pool } from "pg";
import React from "react";

export const dynamic = 'force-dynamic';

async function fetchDatabaseStatus() {
  let dbMessage = "Loading database connection status...";

  console.log("fetchDatabaseStatus has environment:", {
    TEST_ENV: process.env.TEST_ENV,
    DATABASE_HOST: process.env.DATABASE_HOST
    });

  try {
    console.log(process.env.NODE_ENV, process.env.TEST_ENV, process.env.DATABASE_HOST, process.env.DATABASE_PORT, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, process.env.DATABASE_NAME);
    // Fetch runtime environment variables directly
    const pool = new Pool({
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });

    // Test the connection with a simple query
    const result = await pool.query("SELECT NOW() AS current_time");
    dbMessage = `Connected successfully! Server time: ${result.rows[0].current_time}`;

    await pool.end();
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Database connection error:", error.message);
      dbMessage = `Failed to connect to the database: ${error.message}`;
    } else {
      console.error("Unexpected error:", error);
      dbMessage = "Failed to connect to the database: An unexpected error occurred.";
    }
  }

  return dbMessage;
}

export default async function Home() {

  console.log("Home() server-side environment:", {
    TEST_ENV: process.env.TEST_ENV,
    DATABASE_HOST: process.env.DATABASE_HOST
    });

  // Fetch the database connection status
  const dbMessage = await fetchDatabaseStatus();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-lg font-bold">Database Connection Test v17</h1>
        <p>{dbMessage}</p>
        <p>TEST_ENV: {process.env.TEST_ENV}</p>
        <p>NEXT_PUBLIC_TEST_ENV: {process.env.NEXT_PUBLIC_TEST_ENV}</p>
        <p>DATABASE_HOST: {process.env.DATABASE_HOST}</p>
        <p>DATABASE_PORT: {process.env.DATABASE_PORT}</p>
        <p>DATABASE_USER: {process.env.DATABASE_USER}</p>
        <p>DATABASE_PASSWORD: {process.env.DATABASE_PASSWORD}</p>
        <p>DATABASE_NAME: {process.env.DATABASE_NAME}</p>
      </main>
    </div>
  );
}
