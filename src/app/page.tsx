import { Pool } from "pg";
import React from "react";

export default async function Home() {
  let dbMessage = "Loading database connection status...";

  try {
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
      dbMessage = `Failed to connect to the database: ${error.message} ${process.env.DATABASE_HOST} ${process.env.DATABASE_PORT} ${process.env.DATABASE_USER} ${process.env.DATABASE_PASSWORD} ${process.env.DATABASE_NAME}`;
    } else {
      console.error("Unexpected error:", error);
      dbMessage = "Failed to connect to the database: An unexpected error occurred.";
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-lg font-bold">Database Connection Test</h1>
        <p>{dbMessage}</p>
      </main>
    </div>
  );
}