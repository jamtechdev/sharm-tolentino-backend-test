import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserResolver } from './resolvers/user.resolver';
import { PasswordUtils } from '../../auth/utils/password.utils';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserResolver, PasswordUtils],
  exports: [UserService],
})
export class UserModule {}
