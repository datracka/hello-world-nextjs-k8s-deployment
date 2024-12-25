import type { NextConfig } from "next";

console.log("Loaded environment variables in next.config.ts:", {
  TEST_ENV: process.env.TEST_ENV,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    TEST_ENV: process.env.TEST_ENV,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_NAME: process.env.DATABASE_NAME,
  },
};

export default nextConfig;