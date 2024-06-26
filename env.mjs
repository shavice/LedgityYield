import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    TWITTER_CLIENT_ID: z.string().optional(),
    TWITTER_CLIENT_SECRET: z.string().optional(),
    IPINFO_TOKEN: z.string(),
    SCORECHAIN_API_KEY: z.string(),
    AML_ALERT_WEBHOOK: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: z.string(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  },
});
