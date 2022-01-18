import { Module, ValidationError } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresProviderModule } from './providers/database/postgres/provider.module';
import { UserModule } from './models/user/user.module';
import { AppConfigModule } from './config/app/configuration.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLError } from 'graphql';
import { PipeModule } from './providers/validation/pipes/pipe.module';
import { PositionModule } from './models/position/position.module';
import { DoctorModule } from './models/doctor/doctor.module';
import { PatientModule } from './models/patient/patient.module';
import { AppointmentModule } from './models/appointment/appointment.module';

@Module({
  imports: [
    AppConfigModule,
    PostgresProviderModule,
    PipeModule,
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: 'schema.gql',
      formatError: (error: GraphQLError | ValidationError | any) => {
        return {
          status: error?.extensions?.response?.status || error?.status || 500,
          message:
            error?.extensions?.exception?.response?.message || error?.message,
        };
      },
    }),

    UserModule,
    AuthModule,
    PositionModule,
    DoctorModule,
    PatientModule,
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
