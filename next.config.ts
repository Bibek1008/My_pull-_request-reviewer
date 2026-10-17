/**
 * Next.js configuration for Pull Request Reviewer.
 *
 * - `allowedDevOrigins`: lets ngrok (or similar) tunnel to the dev server for
 *   GitHub webhooks and OAuth callbacks during local development.
 * - `serverExternalPackages`: keeps heavy server-only packages out of the
 *   client bundle and avoids bundling issues with Prisma, pg, and Better Auth.
 */
import type { NextConfig } from "next";

const allowedDevOrigin = (() => {
  try {
    return process.env.BETTER_AUTH_URL
      ? new URL(process.env.BETTER_AUTH_URL).hostname
      : "localhost";
  } catch {
    return "localhost";
  }
})();

const nextConfig: NextConfig = {
  allowedDevOrigins: [allowedDevOrigin, "localhost", "127.0.0.1"],
  serverExternalPackages: [
    "better-auth",
    "@prisma/client",
    "prisma",
    "pg",
    "@prisma/adapter-pg",
  ],
};

export default nextConfig;
