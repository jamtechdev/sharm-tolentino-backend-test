/*
This file is used for typeorm cli
 */
module.exports = {
  name: 'default',
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_USER_NAME || 'darkvador',
  password: process.env.POSTGRES_PASSWORD || 'skywalker',
  database: process.env.POSTGRES_DATABASE || 'clinic_database',
  schema: process.env.POSTGRES_PUBLIC_SCHEMA || 'public',
  entities: ['dist/models/**/*.entity{ .ts,.js}'],
  synchronize: false,
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: true,
  logging: process.env.POSTGRES_LOGGING || false,
  cli: {
    entitiesDir: 'src/models/**/*.entity{ .ts,.js}',
    migrationsDir: 'src/database/migrations',
  },
};
