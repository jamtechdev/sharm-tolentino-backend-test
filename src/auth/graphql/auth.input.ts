import { Field, InputType } from '@nestjs/graphql';

@InputType()
class AuthInput {
  @Field()
  email: string;
  @Field()
  password: string;
}

export default AuthInput;
