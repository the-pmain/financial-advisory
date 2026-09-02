import 'dotenv/config';

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/** Fixed server defaults — only ADMIN_PIN is configured via .env. */
export const serverConfig = {
  adminPin: required('ADMIN_PIN'),
  sessionSecret: 'helfenstein-admin-session',
  apiPort: 3001,
  host: '0.0.0.0',
  port: Number(process.env.PORT) || 4173,
  isProd: process.env.NODE_ENV === 'production',
  sessionCookieName: 'helfenstein_admin_session',
  sessionTtlMs: 1000 * 60 * 60 * 8, // 8 hours
};
