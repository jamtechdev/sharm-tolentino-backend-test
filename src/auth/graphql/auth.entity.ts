import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'typeorm';
import { AuthInterface } from './auth.interface';

@ObjectType()
export class Auth extends BaseEntity implements AuthInterface {
  @Field(() => String)
  email: string;
  password: string;
}
