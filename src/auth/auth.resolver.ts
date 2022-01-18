import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import AuthInput from './graphql/auth.input';
import { AccessToken } from './graphql/access-token.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AccessToken)
  async login(@Args('data') data: AuthInput): Promise<AccessToken> {
    return this.authService.login(data);
  }
}
