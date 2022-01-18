import { Field, InputType } from '@nestjs/graphql';

@InputType()
class UserInput {
  @Field({ nullable: true })
  readonly id: number;

  @Field({ nullable: true })
  readonly firstName: string;

  @Field({ nullable: true })
  readonly lastName: string;

  @Field({ nullable: true })
  readonly email: string;

  @Field({ nullable: true })
  readonly password: string;

  @Field({ nullable: true })
  readonly sex: string;

  @Field({ nullable: true })
  readonly dob: Date;
}

export default UserInput;
