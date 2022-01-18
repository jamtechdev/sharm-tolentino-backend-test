import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/configuration.service';
import { ValidationPipe } from './providers/validation/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: AppConfigService = app.get(AppConfigService);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(
    process.env.PORT || appConfig.port || 80,
    process.env.HOST || appConfig.host || '0.0.0.0',
  );
  console.log(
    `🚀 test-app running and listening on port ${
      process.env.PORT || appConfig.port || 80
    }`,
  );
}

void bootstrap();
