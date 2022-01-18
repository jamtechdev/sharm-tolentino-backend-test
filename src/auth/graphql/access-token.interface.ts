import { UserInterface } from '../../models/user/user.interface';

export interface AccessTokenInterface {
  accessToken: string;
  user: UserInterface;
}
