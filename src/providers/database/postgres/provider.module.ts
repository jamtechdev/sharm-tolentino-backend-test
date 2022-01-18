import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PostgresConfigModule } from '../../../config/database/postgres/configuration.module';
import { PostgresConfigService } from '../../../config/database/postgres/configuration.service';
import { RedisConfigModule } from '../../../config/cache/redis/configuration.module';
import { RedisConfigService } from '../../../config/cache/redis/configuration.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfigModule, RedisConfigModule],
      useFactory: async (
        postgresConfigService: PostgresConfigService,
        redisConfigService: RedisConfigService,
      ) => ({
        name: 'default',
        type: 'postgres' as DatabaseType,
        host: postgresConfigService.host,
        port: postgresConfigService.port,
        username: postgresConfigService.username,
        password: postgresConfigService.password,
        database: postgresConfigService.database,
        schema: postgresConfigService.schema,
        entities: ['dist/models/**/*.entity{ .ts,.js}'],
        synchronize: false,
        migrations: ['dist/database/migrations/*{.ts,.js}'],
        migrationsTableName: 'migrations_typeorm',
        migrationsRun: true,
        logging: postgresConfigService.logging,
        cache: {
          type: 'redis',
          duration: redisConfigService.duration,
          options: {
            host: redisConfigService.host,
            password: redisConfigService.password,
            port: redisConfigService.port,
            Db: 1, // This choice, 0 ~ 15 library can choose
          },
        },
      }),
      inject: [PostgresConfigService, RedisConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class PostgresProviderModule {}
