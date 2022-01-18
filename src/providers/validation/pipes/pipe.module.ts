import { Module } from '@nestjs/common';
import { ValidationPipe } from './validation.pipe';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [ValidationPipe],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class PipeModule {}
