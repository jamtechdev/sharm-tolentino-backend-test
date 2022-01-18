import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../models/user/user.service';
import { PasswordUtils } from './utils/password.utils';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from './graphql/access-token.entity';
import AuthInput from './graphql/auth.input';
import { User } from '../models/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly passwordUtils: PasswordUtils,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userInput: AuthInput): Promise<User> {
    const user = await this.userService.findOne(userInput?.email);
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }
    if (await this.passwordUtils.compare(userInput?.password, user?.password)) {
      return user;
    }
    throw new UnauthorizedException('Incorrect password');
  }

  async login(userInput: AuthInput): Promise<AccessToken> {
    const user = await this.validateUser(userInput);
    const payload = { username: userInput.email, sub: user?.id };
    return {
      accessToken: this.jwtService.sign(payload),
      user: user,
    };
  }
}
