import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import UserInput from './resolvers/user.input';
import { PasswordUtils } from '../../auth/utils/password.utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordUtils: PasswordUtils,
  ) {}

  async find(): Promise<User[]> {
    return await User.find();
  }

  async findOne(email: string): Promise<User> {
    return await User.findOne({
      where: {
        email: email,
      },
      relations: ['role', 'doctor', 'patient'],
    });
  }

  async findById(id: number) {
    return await User.find({
      where: {
        id: id,
      },
    });
  }

  async register(input: UserInput): Promise<User> {
    const user = new User();
    Object.assign(user, {
      ...input,
      password: await this.passwordUtils.hash(input?.password),
    });
    await user.save();
    return await user.save();
  }

  async update(input: UserInput): Promise<User> {
    const user = await User.findOneOrFail(input?.id);
    Object.assign(user, input);
    return await user.save();
  }

  async delete(input: UserInput): Promise<User> {
    const user = await User.findOneOrFail(input?.id);
    return await user.remove();
  }
}
