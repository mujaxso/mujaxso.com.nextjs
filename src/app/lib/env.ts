import { z } from 'zod';

// Server-side environment variables
const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  SITE_URL: z.string().url().default('https://mujaxso.com'),
  RESEND_API_KEY: z.string().optional(),
  CONTACT_EMAIL: z.string().email().optional(),
});

// Client-side environment variables (empty for now, but can be extended)
const clientEnvSchema = z.object({});

// Combined schema
const envSchema = z.object({
  ...serverEnvSchema.shape,
  ...clientEnvSchema.shape,
});

export type Env = z.infer<typeof envSchema>;

export function getEnv(): Env {
  // Parse server-side environment variables
  const serverEnv = serverEnvSchema.parse({
    NODE_ENV: process.env.NODE_ENV,
    SITE_URL: process.env.SITE_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  });

  // Combine with client-side environment variables (if any)
  return envSchema.parse({
    ...serverEnv,
  });
}

// Export validated environment variables
export const env = getEnv();

// Export client-side environment variables (for use in browser)
export const clientEnv = clientEnvSchema.parse({});
