import { registerAs } from '@nestjs/config';
export default registerAs('postgres', () => ({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER_NAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  schema: process.env.POSTGRES_PUBLIC_SCHEMA,
  logging: process.env.POSTGRES_LOGGING,
}));
