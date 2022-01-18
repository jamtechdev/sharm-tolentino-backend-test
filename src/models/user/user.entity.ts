import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UserInterface } from './user.interface';

@Unique(['email'])
@Index(['email'], { unique: true })
@ObjectType()
@Entity('users', { schema: 'public' })
@Directive('@key(fields: "id")')
export class User extends BaseEntity implements UserInterface {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  firstName: string;

  @Field(() => String)
  @Column()
  lastName: string;

  @Field(() => String)
  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Field(() => String)
  @Column()
  sex: string;

  @Field(() => Date)
  @Column()
  dob: Date;

  @Field()
  @CreateDateColumn()
  createdAt: string;

  @Field({ nullable: true })
  @UpdateDateColumn({ nullable: true })
  updatedAt: string;
}
