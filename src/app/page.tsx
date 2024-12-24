import Image from "next/image";
import { Pool } from "pg"; // Import PostgreSQL client
import React, { useState, useEffect } from "react";

export default function Home() {
  const [dbMessage, setDbMessage] = useState("Connecting to the database...");

  useEffect(() => {
    const testDatabaseConnection = async () => {
      try {
        // Create a new pool to connect to the database
        const pool = new Pool({
          host: process.env.NEXT_PUBLIC_DATABASE_HOST,
          port: Number(process.env.NEXT_PUBLIC_DATABASE_PORT),
          user: process.env.NEXT_PUBLIC_DATABASE_USER,
          password: process.env.NEXT_PUBLIC_DATABASE_PASSWORD,
          database: process.env.NEXT_PUBLIC_DATABASE_NAME,
        });

        // Test the connection
        const result = await pool.query("SELECT NOW() AS current_time");
        setDbMessage(`Connected successfully! Server time: ${result.rows[0].current_time}`);
        
        // Close the pool to release resources
        await pool.end();
      } catch (error) {
        setDbMessage(`Failed to connect to the database: ${error.message}`);
      }
    };

    testDatabaseConnection();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Image 5.0{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
        </div>
        <div className="mt-10">
          <h2 className="text-lg font-semibold">Database Connection Test</h2>
          <p className="mt-2">{dbMessage}</p>
        </div>
      </main>
    </div>
  );
}
