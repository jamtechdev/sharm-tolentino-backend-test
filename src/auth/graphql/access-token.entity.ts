import { Field, ObjectType } from '@nestjs/graphql';
import { AccessTokenInterface } from './access-token.interface';
import { User } from '../../models/user/user.entity';

@ObjectType()
export class AccessToken implements AccessTokenInterface {
  @Field(() => String)
  accessToken: string;

  @Field(() => User)
  user: User;
}
