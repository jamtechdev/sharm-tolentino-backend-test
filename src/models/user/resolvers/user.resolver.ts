import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../user.service';
import { User } from '../user.entity';
import UserInput from './user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../../auth/guards/gql-auth.guard';
import { CurrentUser } from '../../../auth/auth-user.decorator';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User], { nullable: true })
  public async users(): Promise<User[]> {
    return this.userService.find();
  }

  @Query(() => User, { nullable: true })
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return this.userService.findById(user?.id);
  }

  @Mutation(() => User)
  public async createUser(@Args('data') data: UserInput): Promise<User> {
    return this.userService.register(data);
  }

  @Mutation(() => User)
  public async updateUser(@Args('data') data: UserInput): Promise<User> {
    return this.userService.update(data);
  }

  @Mutation(() => User)
  public async deleteUser(@Args('data') data: UserInput): Promise<User> {
    return this.userService.delete(data);
  }
}
