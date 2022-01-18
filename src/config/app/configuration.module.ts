import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './configuration.service';
/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
  imports: [ConfigModule],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
