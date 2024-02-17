import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryColumn()
  userId: string

  @Column()
  username: string

  @Column()
  avatar: string
}

@Entity()
export class Oauth2TokensEntity {
  @PrimaryColumn()
  userId: string

  @Column()
  accessToken: string

  @Column()
  refreshToken: string
}