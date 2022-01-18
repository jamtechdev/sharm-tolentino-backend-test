import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { isEmpty } from 'lodash';

@Injectable()
export class PasswordUtils {
  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async hash(password: string): Promise<string> {
    if (isEmpty(password) || password.length < 8) {
      throw new Error('Password must be at least 8 characters.');
    }

    return bcrypt.hash(password, 10);
  }
}
