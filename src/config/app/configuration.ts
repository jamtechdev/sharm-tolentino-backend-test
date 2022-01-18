import { registerAs } from '@nestjs/config';
export default registerAs('app', () => ({
  port: process.env.PORT,
  host: process.env.HOST,
}));
