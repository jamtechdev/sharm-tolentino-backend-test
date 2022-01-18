import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import AuthInput from '../graphql/auth.input';
import { User } from '../../models/user/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(userInput: AuthInput): Promise<User> {
    const user = await this.authService.validateUser(userInput);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
