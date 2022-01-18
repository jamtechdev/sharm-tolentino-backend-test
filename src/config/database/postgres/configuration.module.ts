import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresConfigService } from './configuration.service';
/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().default('localhost'),
        POSTGRES_PORT: Joi.number().default(5432),
        POSTGRES_USER_NAME: Joi.string().default('darkvador'),
        POSTGRES_PASSWORD: Joi.string().default('skywalker'),
        POSTGRES_DATABASE: Joi.string().default('clinic_database'),
        POSTGRES_SCHEMA: Joi.string().default('public'),
        POSTGRES_LOGGING: Joi.boolean().default(false),
      }),
    }),
  ],
  providers: [ConfigService, PostgresConfigService],
  exports: [ConfigService, PostgresConfigService],
})
export class PostgresConfigModule {}
