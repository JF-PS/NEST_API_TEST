import { User, Role } from '@prisma/client';
import { Field, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

import { ProfileEntity } from './profile.entity';

@ObjectType()
export class UserEntity implements User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  hashedPassword: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hashedRefreshToken: string | null;

  @Field()
  @Column({ default: 'SIMPLE_USER' })
  role: Role;

  @Field(() => ProfileEntity, { nullable: true })
  @OneToOne(() => ProfileEntity, (profile) => profile.user, { cascade: true })
  @JoinColumn()
  profile?: ProfileEntity;

  @Field()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
