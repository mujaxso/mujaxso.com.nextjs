export function getEnv() {
  return {
    NODE_ENV: process.env.NODE_ENV || 'development',
    SITE_URL: process.env.SITE_URL || 'https://mujaxso.com',
  };
}

export const env = getEnv();
